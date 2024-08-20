"use server";
import { ServerReqProps } from "@/lib/data/types/ServerReqProps";
import { ServerGqlGetRequest } from "./base-request/ServerGqlGetRequest";
import { PaymentMethodInfoModel } from "@/lib/data/models/PaymentMethodInfoModel";
import { apiUrl } from "@/lib/core/basic/Constants";

export async function getPaymentMethodInfo({
  params,
}: ServerReqProps): Promise<PaymentMethodInfoModel> {
  const paymentMethodInfoQuery = `
    query checkoutComInfo {
      checkoutComInfo {
          public_key
          environment
          language
          mada_enabled
          apple_pay_method_name
          apple_merchant_name
          apple_country_code
          apple_merchant_id
          apple_supported_networks
      }
      tamaraData {
          enabled
          public_key
      }
  }
`;

  const data = await new ServerGqlGetRequest({
    storeCode: params.storeCode,
    query: paymentMethodInfoQuery,
    apiUrl: apiUrl?.sales,
  }).getData();

  const paymentMethodInfo = new PaymentMethodInfoModel(data)?.create();

  return paymentMethodInfo;
}
