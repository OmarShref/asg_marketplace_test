import { CartModel } from "@/lib/data/models/CartModel";
import { ClientGqlRequest } from "./base-request/ClientGqlRequest";
import useUserStore from "@/lib/data/stores/UserStore";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { RewardPointsModel } from "@/lib/data/models/RewardPointsModel";
import { productTypes } from "@/lib/core/basic/Constants";

// ===================================constants===========================================

// TODO: add type_id later
export const gqlCartItemInner = `
                id
                items_count
                items_qty
                currency
                shipping_method
                payment_method
                shipping_address {
                    customer_address_id
                    street
                    telephone
                    postcode
                    city
                    firstname
                    lastname
                }
                payment_method_list {
                    code
                    title
                    hint
                    icon
                    is_available
                    unavailable_message
                }
                totals_information {
                    grand_total
                    subtotal
                    discount_amount
                    shipping_amount
                    currency
                    coupon_code
                    coupon_title
                    lines {
                        code
                        title
                        value
                        area
                    }
                }
                gift_card_data {
                    gift_amount_total
                    gift_amount_used
                    gift_cards {
                        code
                        amount
                    }
                }
                items {
                    item_id
                    sku
                    qty
                    name
                    price
                    row_total
                    discount_amount
                    discount_percent
                    options {
                        value
                        label
                    }
                    product_data {
                        configurable_parent{
                          product_id
                          sku
                          url
                        }
                        product_id
                        is_in_stock
                        salable_qty
                        url
                        small_image
                        price_range {
                            minimum_price {
                                regular_price {
                                    value
                                    currency
                                }
                                final_price {
                                    value
                                    currency
                                }
                                discount {
                                    percent_off
                                    amount_off
                                }
                            }
                        }
                    }
                }
                `;

// =====================================types=========================================

type CartOperationType = {
  success?: boolean;
  errorMessage?: string;
  cartId?: string;
  cart?: CartModel;
  checkoutRewardPoints?: RewardPointsModel;
  productRewardPoints?: RewardPointsModel;
};

type CartRequestProps = {
  sku?: string;
  quantity?: number;
  productType?: string;
  guestCartId?: string;
  configurableOptions?: {
    optionId: number;
    optionValue: number;
  }[];
  itemId?: number;
  code?: string;
  addressId?: number;
  simpleProductId?: number;
};

// ==================================helper functions============================================

function getCartQuerySting({
  guestCartId,
  productId = 0,
}: {
  guestCartId: string | number | undefined;
  productId?: number;
}) {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  return `
  cart${!userToken ? `(guestCartId: "${guestCart}")` : ""} {
    ${gqlCartItemInner}
  }
  `;
}

async function getcartDataforMutation({
  data,
  mutationName,
}: {
  data: any;
  mutationName: string;
}) {
  const dataMutation = data?.data?.[mutationName];
  const dataQuery = dataMutation?.query;

  const userToken = useUserStore.getState()?.customer?.token;

  let errorData;
  let success = data?.data?.[mutationName]?.success;
  let errorMessage =
    data?.errors?.at(0)?.message ?? data?.data?.message ?? dataMutation?.error;
  let cart = dataQuery?.cart;
  let checkoutRewardPoints = dataQuery?.rewardPointsForCheckout;
  let productRewardPoints = dataQuery?.rewardPointsForProduct;

  if (errorMessage && userToken) {
    errorData = await handleCartErrors();
  }

  if (errorData?.shouldUpdateCart) {
    success = true;
    errorMessage = null;
    cart = errorData?.cart;
    checkoutRewardPoints = errorData?.checkoutRewardPoints;
    productRewardPoints = errorData?.productRewardPoints;
  }

  return {
    success: success,
    errorMessage: errorMessage,
    cart: new CartModel({
      cartData: cart,
      storeCode: useUtilityStore.getState()?.storeCode,
    }),
    checkoutRewardPoints: new RewardPointsModel({
      rewardPointsData: checkoutRewardPoints,
    })?.fromCheckout(),
    productRewardPoints: new RewardPointsModel({
      rewardPointsData: productRewardPoints,
    })?.fromProduct(),
  };
}

async function handleCartErrors() {
  const getCartData = await getCart({});
  const shouldUpdateCart = !!((getCartData?.cart?.count ?? 0) === 0);

  const errorData = {
    shouldUpdateCart: shouldUpdateCart,
    cart: getCartData?.cart,
    checkoutRewardPoints: getCartData?.checkoutRewardPoints,
    productRewardPoints: getCartData?.productRewardPoints,
  };

  return errorData;
}

// ===================================queries===========================================

export async function getCart({
  guestCartId,
}: CartRequestProps): Promise<CartOperationType> {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  const getCartQuery = `
         {
          ${getCartQuerySting({ guestCartId: guestCart })}
        }
`;

  const data = await new ClientGqlRequest({
    query: getCartQuery,
  }).getRequest();

  const getCartData = {
    success: !!data?.data?.cart?.id,
    cart: new CartModel({
      cartData: data?.data?.cart,
      storeCode: useUtilityStore.getState()?.storeCode,
    }),
    rewardPoints: new RewardPointsModel({
      rewardPointsData: data?.data?.rewardPointsForCheckout,
    }).fromCheckout(),
  };

  return getCartData;
}

export async function createEmptyCartId(): Promise<CartOperationType> {
  const CreateEmptyCartIdMutation = `
    mutation {
        createEmptyCart
    }    
    `;

  const data = await new ClientGqlRequest({
    query: CreateEmptyCartIdMutation,
  }).postRequest();

  const createEmptyCart = {
    cartId: data?.data?.createEmptyCart,
  };

  return createEmptyCart;
}

// =================================mutations=============================================

export async function addItemToCart({
  sku,
  quantity,
  productType,
  guestCartId,
  configurableOptions,
  simpleProductId,
}: CartRequestProps): Promise<CartOperationType> {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  if (!userToken && !guestCart) {
    const createEmptyCart = await createEmptyCartId();
    if (createEmptyCart?.cartId) {
      guestCart = createEmptyCart?.cartId;
    }
  }

  const addItemToCartMutation = `
  mutation {
    addItemToCart(
        sku: "${sku}"
        qty: ${quantity}
        ${!userToken ? `guestCartId: "${guestCart}"` : ""}
        productType: ${productType?.toUpperCase()}
        ${
          productType === productTypes?.configurable
            ? `
        configurableOptions: [${configurableOptions?.map((option) => {
          return `{
                optionId: ${option?.optionId}
                optionValue: ${option?.optionValue}
            }`;
        })}]
        `
            : ""
        }
    ) {
        success
        query {
          ${getCartQuerySting({
            guestCartId: guestCart,
            productId: simpleProductId,
          })}
        }
    }
}
`;

  const data = await new ClientGqlRequest({
    query: addItemToCartMutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "addItemToCart",
  });
}

export async function removeItemFromCart({
  sku,
  quantity,
  productType,
  guestCartId,
  itemId,
}: CartRequestProps): Promise<CartOperationType> {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  const removeItemFromCartMutation = `
    mutation {
        removeItemFromCart(
          sku: "${sku}"
          qty: ${quantity}
          ${!userToken ? `guestCartId: "${guestCart}"` : ""}
          productType: ${productType?.toUpperCase()}
          itemId: ${itemId}
      ) {
          success
          query {
            ${getCartQuerySting({ guestCartId: guestCart })}
          }
      }
  }
  `;

  const data = await new ClientGqlRequest({
    query: removeItemFromCartMutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "removeItemFromCart",
  });
}

export async function updateCartItem({
  quantity,
  guestCartId,
  itemId,
}: CartRequestProps): Promise<CartOperationType> {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  const updateCartItemMutation = `
      mutation {
        changeCartItemQty(
            qty: ${quantity}
            ${!userToken ? `guestCartId: "${guestCart}"` : ""}
            itemId: ${itemId}
        ) {
            success
            query {
              ${getCartQuerySting({ guestCartId: guestCart })}
            }
        }
    }
    `;

  const data = await new ClientGqlRequest({
    query: updateCartItemMutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "changeCartItemQty",
  });
}

export async function applyCouponToCart({
  guestCartId,
  code,
}: CartRequestProps): Promise<CartOperationType> {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  const applyCouponToCartMutation = `
        mutation {
            applyCouponToCart(
                coupon: "${code}"
                ${!userToken ? `guestCartId: "${guestCart}"` : ""}
          ) {
              success
              query {
                ${getCartQuerySting({ guestCartId: guestCart })}
              }
          }
      }
      `;

  const data = await new ClientGqlRequest({
    query: applyCouponToCartMutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "applyCouponToCart",
  });
}

export async function removeCouponFromCart({
  guestCartId,
}: CartRequestProps): Promise<CartOperationType> {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  const removeCouponFromCartMutation = `
          mutation {
            removeCouponFromCart
              ${!userToken ? `(guestCartId: "${guestCart}")` : ""}
             {
                success
                query {
                  ${getCartQuerySting({ guestCartId: guestCart })}
                }
            }
          }
        `;

  const data = await new ClientGqlRequest({
    query: removeCouponFromCartMutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "removeCouponFromCart",
  });
}

export async function applyRewardPointsToCart({ points }: { points: number }) {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = useUserStore?.getState()?.cart?.id;

  if (!userToken) return;

  const mutation = `
          mutation {
            applyRewardPoints(points: ${points}) {
                success
                error
                query {
                  ${getCartQuerySting({ guestCartId: guestCart })}
                }
            }
          }
        `;

  const data = await new ClientGqlRequest({
    query: mutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "applyRewardPoints",
  });
}

export async function removeRewardPointsFromCart({}) {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = useUserStore?.getState()?.cart?.id;

  if (!userToken) return;

  const mutation = `
        mutation {
          removeRewardPoints {
              success
              error
              query {
                ${getCartQuerySting({ guestCartId: guestCart })}
              }
          }
        }
        `;

  const data = await new ClientGqlRequest({
    query: mutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "removeRewardPoints",
  });
}

export async function addGiftCardToCart({
  guestCartId,
  code,
}: CartRequestProps): Promise<CartOperationType> {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  const addGiftCardToCartMutation = `
          mutation {
            addGiftCardToCart(
                code: "${code}"
                ${!userToken ? `guestCartId: "${guestCart}"` : ""}
            ) {
                success
                query {
                  ${getCartQuerySting({ guestCartId: guestCart })}
                }
            }
        }
        `;

  const data = await new ClientGqlRequest({
    query: addGiftCardToCartMutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "addGiftCardToCart",
  });
}

export async function removeGiftCardFromCart({
  guestCartId,
  code,
}: CartRequestProps): Promise<CartOperationType> {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  const removeGiftCardFromCartMutation = `
            mutation {
              removeGiftCardFromCart(
                  code: "${code}"
                  ${!userToken ? `guestCartId: "${guestCart}"` : ""}
              ) {
                  success
                  query {
                    ${getCartQuerySting({ guestCartId: guestCart })}
                  }
              }
          }
          `;

  const data = await new ClientGqlRequest({
    query: removeGiftCardFromCartMutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "removeGiftCardFromCart",
  });
}

export async function setCartAddress({
  guestCartId,
  addressId,
}: CartRequestProps): Promise<CartOperationType> {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  const setCartAddressMutation = `
            mutation {
              setCartAddress(
                  address_id: ${addressId}
                  ${!userToken ? `guestCartId: "${guestCart}"` : ""}
              ) {
                  success
                  query {
                    ${getCartQuerySting({ guestCartId: guestCart })}
                  }
              }
            }
          `;

  const data = await new ClientGqlRequest({
    query: setCartAddressMutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "setCartAddress",
  });
}

export async function setCartPayment({
  guestCartId,
  code,
}: CartRequestProps): Promise<CartOperationType> {
  const userToken = useUserStore.getState()?.customer?.token;
  let guestCart = guestCartId ?? useUserStore?.getState()?.cart?.id;

  const setCartPaymentMutation = `
            mutation {
              setCartPaymentMethod(
                  code: "${code}"
                  ${!userToken ? `guestCartId: "${guestCart}"` : ""}
              ) {
                  success
                  query {
                    ${getCartQuerySting({ guestCartId: guestCart })}
                  }
              }
          }
          `;

  const data = await new ClientGqlRequest({
    query: setCartPaymentMutation,
  }).postRequest();

  return getcartDataforMutation({
    data,
    mutationName: "setCartPaymentMethod",
  });
}
