import { CurrencyType, getCurrency } from "@/lib/helper/currency";
import { AddressModel } from "./AddressModel";
import { GtmProductType, ProductModel } from "./ProductModel";
import useUserStore from "../stores/UserStore";

export type GtmCartType = {
  value: number | undefined;
  currency: string | undefined;
  coupon: string | undefined;
  gift_card: string | undefined;
  shipping_tier: string | undefined;
  shipping_address: string | undefined;
  payment_type: string;
  items: GtmProductType[] | undefined;
};
export type CartProductOptionType = {
  value: string;
  label: string;
};
export interface CartProductInterface {
  id: number;
  sku: string;
  quantity: number;
  name: string;
  totalPrice: number;
  price: number;
  discount: number;
  discountPercentage: number;
  options: CartProductOptionType[];
  product: ProductModel;
}
type DiscountItemType = {
  title?: string;
  code: string;
  amount: number;
};
export interface DiscountInterface {
  totalAmount: number;
  totalAmountUsed?: number;
  items: DiscountItemType[];
}
export type TotalsLinesItemType = {
  code?: string;
  title: string;
  value: number;
  area?: string;
};
export type PaymentMethodItemType = {
  code: string;
  title: string;
  hint: string;
  icon: string;
  isAvailable: boolean;
  unavailableMessage: string;
};
export type CartItemGiftWrapType = {
  id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  wrapId: number;
  allCart: boolean;
};

interface CartInterface {
  id: number;
  count: number;
  quantity: number;
  currency: CurrencyType;
  subTotal: number;
  grandTotal: number;
  codFee: number;
  shippingFee: number;
  unavailableMessage: string;
  shippingMethod: string;
  paymentMethod: string;
  coupon: DiscountInterface;
  giftCard: DiscountInterface;
  rewardPoints: DiscountInterface;
  shippingAddress: AddressModel;
  totalsLines: TotalsLinesItemType[];
  paymentMethods: PaymentMethodItemType[];
  giftWrap: CartItemGiftWrapType[];
  items: CartProductInterface[];
}

export class CartModel implements CartInterface {
  id: number;
  count: number;
  quantity: number;
  currency: CurrencyType;
  subTotal: number;
  grandTotal: number;
  codFee: number;
  shippingFee: number;
  unavailableMessage: string;
  shippingMethod: string;
  paymentMethod: string;
  coupon: DiscountInterface;
  giftCard: DiscountInterface;
  rewardPoints: DiscountInterface;
  shippingAddress: AddressModel;
  totalsLines: TotalsLinesItemType[];
  paymentMethods: PaymentMethodItemType[];
  giftWrap: CartItemGiftWrapType[];
  items: CartProductInterface[];

  //   TODO: fix mapping when data comes
  constructor({ cartData, storeCode }: { cartData: any; storeCode?: string }) {
    const totalsInfo = cartData?.totals_information;
    const giftCard = cartData?.gift_card_data;
    const rewardPoints = cartData?.reward_points;
    const paymentMethods = cartData?.payment_method_list;
    const items = cartData?.items ?? [];
    const giftWrapData = cartData?.gift_wrap_data ?? [];

    this.id = cartData?.id ?? 0;
    this.count = cartData?.items_count ?? 0;
    this.quantity = cartData?.items_qty ?? 0;
    this.currency = getCurrency({ storeCode: storeCode });
    this.shippingMethod = cartData?.shipping_method ?? "";
    this.paymentMethod = cartData?.payment_method ?? "";
    this.subTotal = totalsInfo?.subtotal ?? 0;
    this.grandTotal = totalsInfo?.grand_total ?? 0;
    // TODO: fix mapping
    this.codFee = cartData?.cod_fees ?? 0;
    this.shippingFee = totalsInfo?.shipping_amount ?? 0;
    // TODO: fix mapping
    this.unavailableMessage = cartData?.unavailable_message ?? "";
    this.coupon = {
      totalAmount: totalsInfo?.coupon?.total_amount ?? 0,
      items: [
        {
          code: totalsInfo?.coupon_code ?? null,
          title: totalsInfo?.coupon_title ?? null,
          amount: totalsInfo?.discount_amount ?? 0,
        },
      ],
    };
    this.giftCard = {
      totalAmount: giftCard?.gift_amount_total ?? 0,
      totalAmountUsed: giftCard?.gift_amount_used ?? 0,
      items: giftCard?.gift_cards?.map((giftCard: any): DiscountItemType => {
        return {
          code: giftCard?.code ?? "",
          amount: giftCard?.amount ?? 0,
        };
      }),
    };
    this.rewardPoints = {
      totalAmount:
        useUserStore?.getState()?.customerRewardPoints?.currentBalance ?? 0,
      totalAmountUsed: rewardPoints?.applied_points || 0,
      items: [
        {
          code: "",
          amount: 0,
        },
      ],
    };
    this.shippingAddress = new AddressModel(cartData?.shipping_address);
    this.totalsLines = totalsInfo?.lines?.map(
      (line: any): TotalsLinesItemType => {
        return {
          code: line?.code ?? "",
          title: line?.title ?? "",
          value: Math.round(line?.value) ?? 0,
          area: line?.area ?? "",
        };
      }
    );
    this.paymentMethods = paymentMethods?.map(
      (paymentMethod: any): PaymentMethodItemType => {
        return {
          code: paymentMethod?.code ?? "",
          title: paymentMethod?.title ?? "",
          hint: paymentMethod?.hint ?? "",
          icon: paymentMethod?.icon ?? "",
          isAvailable: paymentMethod?.is_available ?? false,
          unavailableMessage: paymentMethod?.unavailable_message ?? "",
        };
      }
    );
    this.giftWrap = giftWrapData?.map(
      (giftWrapItem: any): CartItemGiftWrapType => {
        return {
          id: giftWrapItem?.item_id,
          name: giftWrapItem?.name,
          price: giftWrapItem?.price,
          wrapId: giftWrapItem?.wrap_id,
          image: giftWrapItem?.image,
          quantity: giftWrapItem?.amount,
          allCart: giftWrapItem?.all_cart,
        };
      }
    );
    this.items = items?.map((cartItem: any): CartProductInterface => {
      const product = new ProductModel({
        productData: cartItem?.product_data,
        storeCode,
      });
      product.name = cartItem?.name;
      product.sku = cartItem?.sku;

      return {
        id: cartItem?.item_id ?? 0,
        sku: cartItem?.sku ?? "",
        quantity: cartItem?.qty ?? 0,
        name: cartItem?.name ?? "",
        totalPrice: cartItem?.row_total ?? 0,
        price: cartItem?.price ?? 0,
        discount: cartItem?.discount_amount ?? 0,
        discountPercentage: cartItem?.discount_percent ?? 0,
        options:
          cartItem?.options?.map((option: any): CartProductOptionType => {
            return {
              value: option?.value ?? "",
              label: option?.label ?? "",
            };
          }) ?? [],
        product: product,
      };
    });
  }

  static toGtm(cart: CartModel): GtmCartType {
    const taxPercentage = 0.15;

    return {
      value: Math.round(cart?.grandTotal),
      currency: cart?.currency?.value,
      coupon: cart?.coupon?.items?.at(0)?.code,
      gift_card: cart?.giftCard?.items?.at(0)?.code,
      shipping_tier: cart?.shippingMethod,
      shipping_address: cart?.shippingAddress?.street,
      payment_type: cart?.paymentMethod,
      items: cart?.items.map((item) => {
        const gtmProduct = ProductModel?.toGtm(item?.product);
        gtmProduct.quantity = item?.quantity;

        return gtmProduct;
      }),
    };
  }
}
