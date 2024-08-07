import { OrderModel } from "@/lib/data/models/OrderModel";
import { ClientGqlRequest } from "./base-request/ClientGqlRequest";

type PlaceOrderType = {
  success: boolean;
  errorMessage: string;
  redirectUrl: string;
  order: OrderModel;
};

export async function checkoutcomPlaceOrder({
  code,
  token,
}: {
  code: string;
  token: string;
}): Promise<PlaceOrderType> {
  const checkoutcomPlaceOrderMutation = `
                mutation {
                  ckPlaceOrder(payment_method: "${code}", payment_token: "${token}") {
                      success
                      order_increment_id
                      error_message
                      redirect_url
                  }
              }
            `;

  const data = await new ClientGqlRequest({
    query: checkoutcomPlaceOrderMutation,
  }).postRequest();

  const checkoutcomPlaceOrder = {
    success: data?.data?.ckPlaceOrder?.success,
    errorMessage: data?.data?.ckPlaceOrder?.error_message,
    redirectUrl: data?.data?.ckPlaceOrder?.redirect_url,
    order: new OrderModel(data?.data?.ckPlaceOrder),
  };

  return checkoutcomPlaceOrder;
}
