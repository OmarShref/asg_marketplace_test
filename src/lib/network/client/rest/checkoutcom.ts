import { checkoutcom } from "@/lib/core/basic/Constants";
import { ClientRestRequest } from "./base-request/ClientRestRequest";

type CheckoutcomProps = {
  query: {
    type: string;
    cardNumber?: string;
    maxMonth?: string;
    maxYear?: string;
    cvv?: string;
    tokenData?: any;
  };
  authorization: string;
};
export async function getCheckoutcomToken({
  query,
  authorization,
}: CheckoutcomProps) {
  const getCheckoutcomTokenQuery = {
    type: query?.type,
    number: query?.cardNumber,
    expiry_month: query?.maxMonth,
    expiry_year: query?.maxYear,
    cvv: query?.cvv,
    token_data: query?.tokenData,
  };

  const data = await new ClientRestRequest({
    apiUrl: checkoutcom?.tokenApiUrl,
    query: getCheckoutcomTokenQuery,
    authorization: authorization,
  }).postRequest();

  const checkoutcomToken = data?.token;

  return checkoutcomToken;
}
