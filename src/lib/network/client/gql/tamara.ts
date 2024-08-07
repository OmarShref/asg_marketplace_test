import { OrderModel } from "@/lib/data/models/OrderModel";
import { ClientGqlRequest } from "./base-request/ClientGqlRequest";

type PlaceOrderType = {
  success: boolean;
  errorMessage: string;
  redirectUrl: string;
  order: OrderModel;
};

export async function tamaraPlaceOrder({
  code,
}: {
  code: string;
}): Promise<PlaceOrderType> {
  const tamaraPlaceOrderMutation = `
                mutation {
                    tamaraPlaceOrder(payment_method: "${code}") {
                        success
                        order_increment_id
                        error_message
                        redirect_url
                    }
                }
            `;

  const data = await new ClientGqlRequest({
    query: tamaraPlaceOrderMutation,
  }).postRequest();

  const tamaraPlaceOrder = {
    success: data?.data?.tamaraPlaceOrder?.success,
    errorMessage: data?.data?.tamaraPlaceOrder?.error_message,
    redirectUrl: data?.data?.tamaraPlaceOrder?.redirect_url,
    order: new OrderModel(data?.data?.tamaraPlaceOrder),
  };

  return tamaraPlaceOrder;
}
