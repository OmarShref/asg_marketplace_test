"use client";
import Image from "@/lib/component/generic/pure/image";
import {
  Card,
  CardContent,
  CardSection,
} from "@/lib/component/generic/ui/card";
import ProductStorage_Label from "../../part/label/ProductStorage_Label";
import CartCardProperty_Paragraph from "../../part/paragraph/CartCardProperty_Paragraph";
import CartCard_Counter from "../counter/CartCard_Counter";
import { useEffect, useRef, useState } from "react";
import {
  ProductCardName,
  ProductCardPrice,
  ProductCardPrices,
} from "@/lib/component/generic/pure/productcard";
import RemoveCartItem_Btn from "../../part/button/RemoveCartItem_Btn";
import AddCartItemToWishList_Btn from "../../part/button/AddCartItemToWishList_Btn";
import Spacing from "@/lib/component/generic/pure/spacing";
import { CartProductInterface } from "@/lib/data/models/CartModel";
import {
  removeItemFromCart,
  updateCartItem,
} from "@/lib/network/client/gql/cart";
import { productTypes } from "@/lib/core/basic/Constants";
import useUserStore from "@/lib/data/stores/UserStore";
import Anchor from "@/lib/component/generic/pure/anchor";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { ProductModel } from "@/lib/data/models/ProductModel";
import { Texts, getText } from "@/lib/assets/text";
import { usePathname } from "next/navigation";
import { useToast } from "@/lib/component/generic/ui/use-toast";
import { algoliaEventsSingleton } from "@/lib/core/analytics/Algolia";

type Props = {
  storeCode: string;
  cartItem: CartProductInterface;
};

export default function Cart_Card({ storeCode, cartItem }: Props) {
  const pathName = usePathname();

  const { toast } = useToast();

  const [cartItemCount, setCartItemCount] = useState(cartItem?.quantity);
  const initialCartItemCount = useRef(cartItem?.quantity);

  useEffect(() => {
    let updateCartItemTimeOut: any;
    if (initialCartItemCount.current != cartItemCount) {
      updateCartItemTimeOut = setTimeout(() => {
        handleUpdateCartItem();
      }, 750);
    }

    return () => {
      if (updateCartItemTimeOut) {
        clearTimeout(updateCartItemTimeOut);
      }
    };
  }, [cartItemCount]);

  async function handleRemoveItemFromCart() {
    const removeItemFromCartData = await removeItemFromCart({
      sku: cartItem?.sku,
      quantity: 1000,
      productType: productTypes?.simple,
      itemId: cartItem?.id,
    });
    if (removeItemFromCartData?.success) {
      useUserStore.setState({
        cart: removeItemFromCartData?.cart,
        checkoutRewardPoints: removeItemFromCartData?.checkoutRewardPoints,
      });

      const gtmProduct = ProductModel?.toGtm(cartItem?.product);
      gtmProduct.quantity = cartItem?.quantity;
      new GtmEvents({
        gtmProduct: gtmProduct,
      }).removeFromCart();
    } else {
      toast({
        description: removeItemFromCartData?.errorMessage,
        variant: "destructive",
      });
    }
  }

  async function handleUpdateCartItem() {
    const updateCartItemData = await updateCartItem({
      quantity: cartItemCount,
      itemId: cartItem?.id,
    });
    if (updateCartItemData?.success) {
      useUserStore.setState({
        cart: updateCartItemData?.cart,
        checkoutRewardPoints: updateCartItemData?.checkoutRewardPoints,
      });

      const difference = cartItemCount - initialCartItemCount.current;
      const productChangeQuantity = Math.abs(difference);

      const gtmProduct = ProductModel?.toGtm(cartItem?.product);

      if (difference > 0) {
        gtmProduct.quantity = productChangeQuantity;

        new GtmEvents({
          gtmProduct: gtmProduct,
        }).addToCart();

        // algolia event
        algoliaEventsSingleton.addToCart({
          product: cartItem?.product,
          quantity: productChangeQuantity,
        });
      } else {
        gtmProduct.quantity = productChangeQuantity;

        new GtmEvents({
          gtmProduct: gtmProduct,
        }).removeFromCart();
      }

      initialCartItemCount.current = cartItemCount;
    } else {
      setCartItemCount(cartItem?.quantity);

      toast({
        description: updateCartItemData?.errorMessage,
        variant: "destructive",
      });
    }
  }

  const [openGiftWrapDrawer, setOpenGiftWrapDrawer] = useState<boolean>(false);

  return (
    <Card>
      <CardContent className=" relative flex aspect-[180/100] max-h-48 w-full items-stretch justify-start gap-2 overflow-clip rounded-xl border border-slate-200 bg-background shadow-cart_card">
        <CardSection className=" aspect-[70/100] h-full">
          <Anchor
            href={`${cartItem?.product?.parentUrl?.length > 0 ? cartItem?.product?.parentUrl : cartItem?.product?.url}`}
            className=" relative h-full"
          >
            <Image
              src={cartItem?.product?.smallImage}
              alt=""
              className={` object-contain ${
                cartItem?.product?.inStock ? "" : "opacity-50 grayscale-[50%]"
              }`}
            />
          </Anchor>
        </CardSection>
        <CardSection className=" flex flex-1 flex-col items-stretch justify-evenly">
          <CardSection className=" flex items-start justify-between pe-3">
            <Anchor href={`${cartItem?.product?.parentUrl}`} className=" h-fit">
              <ProductCardName className=" h-auto max-h-12 overflow-clip text-base font-medium">
                {cartItem?.name}
              </ProductCardName>
            </Anchor>
            <div className=" flex flex-col items-center justify-center gap-3">
              {pathName === `/${storeCode}/cart` && (
                <RemoveCartItem_Btn
                  storeCode={storeCode}
                  onClick={() => {
                    handleRemoveItemFromCart();
                  }}
                  className="  pt-0.5"
                />
              )}

              {pathName === `/${storeCode}/cart` && (
                <AddCartItemToWishList_Btn
                  storeCode={storeCode}
                  productId={cartItem?.product?.id ?? 0}
                />
              )}
            </div>
          </CardSection>
          {pathName === `/${storeCode}/cart` && (
            <ProductStorage_Label
              storeCode={storeCode}
              quantity={
                cartItem?.product?.quantity <= 10
                  ? cartItem?.product?.quantity
                  : 0
              }
            />
          )}
          {cartItem?.options?.map((option, index) => {
            return (
              <CartCardProperty_Paragraph key={index}>
                {`${option?.label} : ${option?.value}`}
              </CartCardProperty_Paragraph>
            );
          })}
          <CardSection className=" flex items-center justify-between">
            {pathName === `/${storeCode}/cart` && (
              <CartCard_Counter
                cartItemCount={cartItemCount}
                setCartItemCount={setCartItemCount}
                isInStock={cartItem?.product?.inStock}
                quantity={cartItem?.product?.quantity}
              />
            )}
            <ProductCardPrices
              variant={"row_start"}
              className=" gap-1 px-0 pe-3"
            >
              {cartItem?.product?.discount > 0 && (
                <ProductCardPrice className=" text-xs font-light line-through">
                  {`${cartItem?.product?.regularPrice} ${cartItem?.product?.currency?.label}`}
                </ProductCardPrice>
              )}
              <ProductCardPrice className=" font-bold">
                {`${cartItem?.product?.salePrice} ${cartItem?.product?.currency?.label}`}
              </ProductCardPrice>
            </ProductCardPrices>
          </CardSection>
        </CardSection>
        {/* oos over lay */}
        {!cartItem?.product?.inStock && pathName === `/${storeCode}/cart` && (
          <CardSection className=" absolute inset-0 flex  items-center justify-center bg-glass_effect_background">
            <section className=" w-1/2 rounded-md bg-white">
              <Spacing value={2} />
              <p className=" px-2 text-center text-black">
                {getText({
                  storeCode,
                  text: Texts.soldOutPleaseRemoveTheItemToContinue,
                })}
              </p>
              <Spacing value={2} />
              <div className=" flex items-center justify-center gap-3">
                <RemoveCartItem_Btn
                  storeCode={storeCode}
                  onClick={() => {
                    handleRemoveItemFromCart();
                  }}
                  className="  aspect-square w-[28px] rounded-full bg-danger text-white"
                />
                <AddCartItemToWishList_Btn
                  storeCode={storeCode}
                  productId={cartItem?.product?.id ?? 0}
                />
              </div>
              <Spacing value={2} />
            </section>
          </CardSection>
        )}
      </CardContent>
    </Card>
  );
}
