"use server";
import { ServerReqProps } from "@/lib/data/types/ServerReqProps";
import { ServerGqlGetRequest } from "./base-request/ServerGqlGetRequest";
import { ProductModel } from "@/lib/data/models/ProductModel";
import { gqlProductInnerItem } from "../../query/productQuery";

export async function getProduct({
  params,
  id,
  configurableProductUIds,
}: ServerReqProps): Promise<ProductModel> {
  // TODO: send to product controller
  const configurableProductUIdsQuery =
    (configurableProductUIds ?? []).length > 0
      ? `configurable_options_selection: {
        options_uuids: [${configurableProductUIds?.map((uId) => `"${uId}"`)}]
    }`
      : "";
  const productQuery = `{
    vestedProducts( 
        filter: { Entity_id: { eq: ${id} } }
        ${configurableProductUIdsQuery}
        ) {
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
            configurable_variant {
                ${gqlProductInnerItem}
            }
        }
    }
}
`;
  const data = await new ServerGqlGetRequest({
    storeCode: params.storeCode,
    query: productQuery,
  }).getData();

  const product = new ProductModel({
    productData: data,
    storeCode: params.storeCode,
  })?.create();

  return product;
}
