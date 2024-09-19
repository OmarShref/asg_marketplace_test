import { OrderModel } from "@/lib/data/models/OrderModel";
import { ClientGqlRequest } from "./base-request/ClientGqlRequest";

type PlaceOrderType = {
  success: boolean;
  errorMessage: string;
  order: OrderModel;
};

export async function codPlaceOrder({
  code,
}: {
  code: string;
}): Promise<PlaceOrderType> {
  const codPlaceOrderMutation = `
                mutation {
                    defaultPlaceOrder(payment_method_code: "${code}") {
                        success
                        order_increment_id
                        error_message
                    }
                }
            `;

  const data = await new ClientGqlRequest({
    query: codPlaceOrderMutation,
  }).postRequest();

  const codPlaceOrder = {
    success: data?.data?.defaultPlaceOrder?.success,
    errorMessage: data?.data?.defaultPlaceOrder?.error_message,
    order: new OrderModel(data?.data?.defaultPlaceOrder),
  };

  return codPlaceOrder;
}
