"use server";
import { ServerReqProps } from "@/lib/data/types/ServerReqProps";
import { ServerGqlGetRequest } from "./base-request/ServerGqlGetRequest";
import { ProductModel } from "@/lib/data/models/ProductModel";
import { gqlProductInnerItem } from "../../query/productQuery";

export async function getProductChildren({
  params,
  id,
}: ServerReqProps): Promise<ProductModel[]> {
  const productChildrenQuery = `{
    productChildren( id: ${id} ) {
        items {
            ${gqlProductInnerItem}
            configurable_attributes {
                attribute_code
                label
                attribute_id
                values {
                    uuid
                    is_available
                    is_selected
                    option_id
                    value
                    swatch_data {
                        is_swatch
                        swatch_type
                        swatch_value
                    }
                }
            }
            configurable_parent{
                url
                product_id
                sku
            }
        }
    }
}
`;

  const data = await new ServerGqlGetRequest({
    storeCode: params.storeCode,
    query: productChildrenQuery,
  }).getData();

  const products =
    data?.data?.productChildren?.items?.map((product: any) => {
      return new ProductModel({
        productData: product,
        storeCode: params.storeCode,
      })?.create();
    }) ?? [];

  return products;
}
