import { ClientGqlRequest } from "./base-request/ClientGqlRequest";
import { UpdateAccountInfoModel } from "@/lib/data/models/UpdateInfoModel";
import { gqlCartItemInner } from "./cart";
import { GetCustomerModel } from "@/lib/data/models/GetCustomerModel";
import { AddressModel } from "@/lib/data/models/AddressModel";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { apiUrl } from "@/lib/core/basic/Constants";
import { gqlCategoryInnerItem } from "../../query/categoryQuery";
import { WishListModel } from "@/lib/data/models/WishListModel";
import { OrderModel } from "@/lib/data/models/OrderModel";

const gqlAddressItemInner = `
  id
  city
  company
  country_id
  firstname
  lastname
  postcode
  region
  region_id
  street
  telephone
  location
`;
const gqlCustomerItemInner = `
  id
  email
  created_at
  updated_at
  firstname
  lastname
  gender
  mobilenumber
  default_shipping {
      id
  }
  addresses {
      ${gqlAddressItemInner}
  }
`;
const gqlWishListInner = `
  id
  items_count
  items {
      id
      product_id
  }
`;
const gqlOrderItemInner = `
  paginatorInfo {
    currentPage
    perPage
    lastPage
    total
  }
  data {
    number
    order_date
    status
    customer_id
    shipping_method
    payment_method
    total_qty_ordered
    subtotal
    grand_total
    discount_amount
    shipping_amount
    tax_amount
    cod_fee_amount
    shipping_discount_amount
    items {
        item_id
        product_id
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
            configurable_parent {
                product_id
                sku
                url
            }
        }
    }
    address {
        id
        customer_id
        city
        country_id
        firstname
        lastname
        postcode
        region
        region_id
        street
        telephone
    }
  }
`;
const gqlCustomerRewardPointsItemInner = `
          current_balance
          history {
              id
              action_date
              amount
              comment
              action
              points_left
              visible_for_customer
              expiration_date
              expiring_amount
          }
`;

export async function getCustomer(): Promise<GetCustomerModel> {
  const getCustomerQuery = `
         {
            customer {
                ${gqlCustomerItemInner}
            }
            cart {
                ${gqlCartItemInner}
            }
            wishlist {
              ${gqlWishListInner}
            }
            customerRewardPoints {
              ${gqlCustomerRewardPointsItemInner}
            }
        }
`;
  const data = await new ClientGqlRequest({
    query: getCustomerQuery,
  }).getRequest();

  const customerData = new GetCustomerModel(data?.data);

  return customerData;
}

// ===================================customer info mutations=========================================

type UpdateCustomerProps = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth?: string;
};

export async function updateCustomerInfo({
  firstName,
  lastName,
  phone,
  email,
  gender,
  dateOfBirth,
}: UpdateCustomerProps): Promise<UpdateAccountInfoModel> {
  const updateCustomerInfoMutation = `
  mutation {
    customerInfoUpdate(
        input: {
            firstname: "${firstName}"
            lastname: "${lastName}"
            mobilenumber: "${phone}"
            email: "${email}"
            gender: ${gender}
            ${dateOfBirth ? `date_of_birth: "${dateOfBirth}"` : ""}
        }
    ) {
        success
        message
        customer_data {
            query {
                customer {
                    id
                    email
                    created_at
                    firstname
                    lastname
                    gender
                    mobilenumber
                }
            }
        }
     }
  }
`;

  const data = await new ClientGqlRequest({
    query: updateCustomerInfoMutation,
  }).postRequest();

  const updateAccountInfo = new UpdateAccountInfoModel(
    data?.data?.customerInfoUpdate,
  );

  return updateAccountInfo;
}

// ==================================address mutations==========================================

type AddressProps = {
  address?: AddressModel;
  editAddressId?: number;
};
function getAddressMutationInput(address: AddressModel | undefined) {
  return !!address
    ? `
          region: "${address?.region}"
          country_code: "${address?.country}"
          street: "${address?.street}"
          telephone: "${address?.phone}"
          postcode: "${address?.zip}"
          city: "${address?.city}"
          firstname: "${address?.firstName}"
          lastname: "${address?.lastName}"
          location:[${address?.lat}, ${address?.lng}]
          default_shipping: true
          default_billing: true
  `
    : "";
}

export async function addAddress({
  address,
}: AddressProps): Promise<AddressModel> {
  const addAddressMutation = `
    mutation {
      createCustomerAddress(
          input: {
              ${getAddressMutationInput(address)}
          }
      ) {
          id
      }
    }
  `;

  const data = await new ClientGqlRequest({
    query: addAddressMutation,
  }).postRequest();

  const addressData = new AddressModel(data?.data?.createCustomerAddress);

  return addressData;
}

export async function updateAddress({
  address,
  editAddressId,
}: AddressProps): Promise<AddressModel> {
  const updateAddressMutation = `
  mutation {
    updateCustomerAddress(
        id: ${editAddressId}
        input: {
          ${getAddressMutationInput(address)}
        }
    ) {
        id
    }
  }
  `;

  const data = await new ClientGqlRequest({
    query: updateAddressMutation,
  }).postRequest();

  const addressData = new AddressModel(data?.data?.updateCustomerAddress);

  return addressData;
}

export async function removeAddress({
  editAddressId,
}: AddressProps): Promise<boolean> {
  const removeAddressMutation = `
  mutation {
    deleteCustomerAddress(id: ${editAddressId})
  }
  `;

  const data = await new ClientGqlRequest({
    query: removeAddressMutation,
  }).postRequest();

  const addressRemoved = data?.data?.deleteCustomerAddress;

  return addressRemoved;
}

// ==================================wishlist queries and mutations==========================================

export async function getWishListProducts(wishList: WishListModel) {
  const wishListQuery = `
  {
    vestedProducts(
        currentPage: 1
        pageSize: 100
        filter: { Entity_id: { in: [${wishList?.items?.map(
          (item) => item?.id,
        )}] } }
    ) {
        ${gqlCategoryInnerItem}
    }
}
`;

  const data = await new ClientGqlRequest({
    query: wishListQuery,
    apiUrl: apiUrl.main,
  }).postRequest();

  const wishlist = new CategoryModel({
    categoryData: data,
    storeCode: useUtilityStore?.getState()?.storeCode,
  });

  return wishlist;
}

export async function getWishList() {
  const getWishListQuery = `
    {
      wishlist {
        ${gqlWishListInner}
      }
    }
  `;

  const data = await new ClientGqlRequest({
    query: getWishListQuery,
  }).postRequest();

  const wishlist = new WishListModel({
    wishListData: data?.data?.wishlist,
  });

  return wishlist;
}

export async function addToWishList(productId: number) {
  const addToWishListMutation = `
      mutation {
        addProductsToWishlist(wishlistItems: { product_id: ${productId}, qty: 1 }) {
          ${gqlWishListInner}
        }
      }
  `;

  const data = await new ClientGqlRequest({
    query: addToWishListMutation,
  }).postRequest();

  const wishlist = new WishListModel({
    wishListData: data?.data?.addProductsToWishlist,
  });

  return wishlist;
}

export async function removeFromWishList(productId: number) {
  const removeFromWishListMutation = `
    mutation {
      removeProductsFromWishlist(wishlistItems: { product_id: ${productId} }) {
        ${gqlWishListInner}
      }
    }
  `;

  const data = await new ClientGqlRequest({
    query: removeFromWishListMutation,
  }).postRequest();

  const wishlist = new WishListModel({
    wishListData: data?.data?.removeProductsFromWishlist,
  });

  return wishlist;
}

// ============================================================================

type OrderRequestProps = {
  page: number;
  pageSize: number;
};

export async function getOrders({
  page,
  pageSize,
}: OrderRequestProps): Promise<OrderModel> {
  const getOrdersQuery = `
  {
    customer {
        orders(first: ${pageSize}, page: ${page}) {
            ${gqlOrderItemInner}
        }
    }
  }
`;
  const data = await new ClientGqlRequest({
    query: getOrdersQuery,
  }).getRequest();

  const ordersData = new OrderModel(data?.data?.customer?.orders);

  return ordersData;
}
