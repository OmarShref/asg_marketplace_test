import { GiftWrapModel } from "@/lib/data/models/GiftWrapModel";
import { ClientGqlRequest } from "./base-request/ClientGqlRequest";

type giftWrapProps = {
  categoryId?: string;
  wrapId?: number;
  itemId?: number;
  cartId?: number;
};

export async function getGiftWrapCategories() {
  const getGiftWrapCategoriesQuery = `{
        getGiftWrapperCategories {
            id
            name
            name_ar
            image
        }
    }`;

  const data = await new ClientGqlRequest({
    query: getGiftWrapCategoriesQuery,
  }).getRequest();

  const giftWrap = new GiftWrapModel({
    giftWrapData: data?.data?.getGiftWrapperCategories,
  });

  return giftWrap;
}

export async function getGiftWrap({ categoryId }: giftWrapProps) {
  const getGiftWrapQuery = `{
        getGiftWrappers(category_id: "${categoryId}") {
            id
            name
            name_ar
            image
            price
        }
    }`;

  const data = await new ClientGqlRequest({
    query: getGiftWrapQuery,
  }).getRequest();

  const giftWrap = new GiftWrapModel({
    giftWrapData: data?.data?.getGiftWrappers,
  });

  return giftWrap;
}

export async function addItemGiftWrap({ wrapId, itemId }: giftWrapProps) {
  const addItemGiftWrapMutation = `mutation {
            addItemGiftWrap(item_id: ${itemId}, wrap_id: ${wrapId}) {
                item_id
            }
      }`;

  const data = await new ClientGqlRequest({
    query: addItemGiftWrapMutation,
  }).postRequest();

  const success = {
    success: !!data?.data?.addItemGiftWrap?.item_id,
  };

  return success;
}

export async function removeItemGiftWrap({ itemId }: giftWrapProps) {
  const removeItemGiftWrapMutation = `mutation {
              removeItemGiftWrap(item_id: ${itemId}) {
                  item_id
              }
        }`;

  const data = await new ClientGqlRequest({
    query: removeItemGiftWrapMutation,
  }).postRequest();

  const success = {
    success: !!data?.data?.removeItemGiftWrap?.item_id,
  };

  return success;
}

export async function addCartGiftWrap({ wrapId, cartId }: giftWrapProps) {
  const addCartGiftWrapMutation = `mutation {
            addCartGiftWrap(cart_id: "${cartId}", wrap_id: ${wrapId}) {
                item_id
            }
      }`;

  const data = await new ClientGqlRequest({
    query: addCartGiftWrapMutation,
  }).postRequest();

  const success = {
    success: !!data?.data?.addCartGiftWrap?.at(0)?.item_id,
  };

  return success;
}

export async function removeCartGiftWrap({ cartId }: giftWrapProps) {
  const removeCartGiftWrapMutation = `mutation {
            removeCartGiftWrap(cart_id: "${cartId}") {
                item_id
            }
      }`;

  const data = await new ClientGqlRequest({
    query: removeCartGiftWrapMutation,
  }).postRequest();

  const success = {
    success: !!data?.data?.removeCartGiftWrap?.at(0)?.item_id,
  };

  return success;
}
