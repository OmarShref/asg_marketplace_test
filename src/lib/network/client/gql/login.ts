import useUserStore from "@/lib/data/stores/UserStore";
import { ClientGqlRequest } from "./base-request/ClientGqlRequest";
import { LoginModel } from "@/lib/data/models/LoginModel";

type SendOtpProps = {
  loginType: string;
  loginData: string;
};

type VerifyOtpProps = {
  loginType: string;
  loginData: string;
  otp: string;
  guestCartId?: string;
};

export async function sendOtp({
  loginType,
  loginData,
}: SendOtpProps): Promise<LoginModel> {
  const sendOtpMutation = `mutation {
    customerLoginSendOtp(
        input: { identity_type: ${loginType}, identity: "${loginData}", resend: false }
    ) {
        success
        message
        resend
    }
}`;

  const data = await new ClientGqlRequest({
    query: sendOtpMutation,
  }).postRequest();

  const login = new LoginModel(data?.data?.customerLoginSendOtp);

  return login;
}

export async function verifyOtp({
  loginType,
  loginData,
  otp,
  guestCartId,
}: VerifyOtpProps): Promise<LoginModel> {
  const verifyOtpMutation = `mutation {
    customerVerifyOtpAndLogin(
        input: {
            otp: "${otp}"
            guest_cart_id: "${
              guestCartId ?? useUserStore.getState()?.cart?.id ?? ""
            }"
            identity: "${loginData}"
            identity_type: ${loginType}
        }
    ) {
        success
        message
        token
        update_required
        customer_data {
            firstname
            lastname
            email
            mobilenumber
            date_of_birth
            created_at
            gender
        }
    }
}`;

  const data = await new ClientGqlRequest({
    query: verifyOtpMutation,
  }).postRequest();

  const login = new LoginModel(data?.data?.customerVerifyOtpAndLogin);

  return login;
}
