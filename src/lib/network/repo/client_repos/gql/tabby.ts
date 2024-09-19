import { OrderModel } from "@/lib/data/models/OrderModel";
import { ClientGqlRequest } from "./base-request/ClientGqlRequest";

type PlaceOrderType = {
  success: boolean;
  errorMessage: string;
  redirectUrl: string;
  order: OrderModel;
};

export async function tabbyPlaceOrder({
  code,
}: {
  code: string;
}): Promise<PlaceOrderType> {
  const tabbyPlaceOrderMutation = `
                mutation {
                  tabbyPlaceOrder(payment_method: "${code}") {
                        success
                        order_increment_id
                        error_message
                        redirect_url
                    }
                }
            `;

  const data = await new ClientGqlRequest({
    query: tabbyPlaceOrderMutation,
  }).postRequest();

  const tabbyPlaceOrder = {
    success: data?.data?.tabbyPlaceOrder?.success,
    errorMessage: data?.data?.tabbyPlaceOrder?.error_message,
    redirectUrl: data?.data?.tabbyPlaceOrder?.redirect_url,
    order: new OrderModel(data?.data?.tabbyPlaceOrder),
  };

  return tabbyPlaceOrder;
}
