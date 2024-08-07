import { CurrencyType, getCurrency } from "@/lib/helper/currency";
import useUtilityStore from "../stores/UtilityStore";
import { AddressModel } from "./AddressModel";
import {
  CartProductInterface,
  CartProductOptionType,
  TotalsLinesItemType,
} from "./CartModel";
import { ProductModel } from "./ProductModel";

export type GtmOrderType = {
  transaction_id: string | undefined;
};
export type OrderItemType = {
  number: string;
  status: string;
  date: string;
  shippingMethod: string;
  paymentMethod: string;
  qauntity: number;
  currency?: CurrencyType;
  totalsLines?: TotalsLinesItemType[];
  address: AddressModel;
  products: CartProductInterface[];
};
interface OrderInterface {
  totalCount: number;
  pageSize?: number;
  currentPage?: number;
  pagesCount?: number;
  items: OrderItemType[];
}
export class OrderModel implements OrderInterface {
  totalCount: number;
  pageSize?: number;
  currentPage?: number;
  pagesCount?: number;
  items: OrderItemType[];

  constructor(orderData: any) {
    const orders = orderData?.data ?? orderData;
    const paginatorInfo = orderData?.paginatorInfo;

    this.totalCount = paginatorInfo?.total;
    this.pageSize = paginatorInfo?.perPage;
    this.currentPage = paginatorInfo?.currentPage;
    this.pagesCount = paginatorInfo?.lastPage;

    this.items = Array.isArray(orders)
      ? orders?.map((order: any): OrderItemType => {
          return {
            number: order?.number ?? "",
            status: order?.status ?? "",
            date: order?.order_date ?? "",
            shippingMethod: order?.shipping_method ?? "",
            paymentMethod: order?.payment_method ?? "",
            qauntity: order?.total_qty_ordered ?? 0,
            address: new AddressModel(order?.address),
            currency: getCurrency({
              storeCode: useUtilityStore?.getState()?.storeCode,
            }),
            totalsLines: [
              {
                title: "Subtotal",
                value: Math.round(order?.subtotal),
              },
              {
                code: "grand_total",
                title: "Grand Total",
                value: Math.round(order?.grand_total),
              },
              {
                title: "Discount",
                value: Math.round(order?.discount_amount),
              },
              {
                title: "Shipping",
                value: Math.round(order?.shipping_amount),
              },
              {
                title: "Tax",
                value: Math.round(order?.tax_amount),
              },
              {
                title: "Shipping Discount",
                value: Math.round(order?.shipping_discount_amount),
              },
              {
                title: "COD Fee",
                value: Math.round(order?.cod_fee_amount),
              },
            ],
            products: order?.items?.map(
              (productData: any): CartProductInterface => {
                const product = new ProductModel({
                  productData: productData?.product_data,
                  storeCode: useUtilityStore?.getState()?.storeCode,
                });
                product.name = productData?.name;
                product.sku = productData?.sku;

                return {
                  id: productData?.item_id ?? 0,
                  sku: productData?.sku ?? "",
                  quantity: productData?.qty ?? 0,
                  name: productData?.name ?? "",
                  totalPrice: productData?.row_total ?? 0,
                  price: productData?.price ?? 0,
                  discount: productData?.discount_amount ?? 0,
                  discountPercentage: productData?.discount_percent ?? 0,
                  options:
                    productData?.options?.map(
                      (option: any): CartProductOptionType => {
                        return {
                          value: option?.value ?? "",
                          label: option?.label ?? "",
                        };
                      },
                    ) ?? [],
                  product: product,
                };
              },
            ),
          };
        })
      : [
          {
            number: orderData?.order_increment_id ?? "",
            status: orderData?.status ?? "",
            date: orderData?.created_at ?? "",
            shippingMethod: orderData?.shipping_method ?? "",
            paymentMethod: orderData?.payment_method ?? "",
            qauntity: orderData?.total_qty_ordered ?? 0,
            address: orderData?.shipping_address,
            products: orderData?.items?.map(
              (productData: any): CartProductInterface => {
                return {} as any;
              },
            ),
          },
        ];
  }

  static toGtm(order: OrderModel): GtmOrderType {
    return {
      transaction_id: order?.items?.at(0)?.number,
    };
  }
}
