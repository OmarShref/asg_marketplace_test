"use client";
import { pageTypes } from "@/lib/core/basic/Constants";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import PageType from "../../generic/utility/PageType";
import { Texts, getText } from "@/lib/assets/text";
import { PageProps } from "@/lib/data/types/PageProps";
import {
  Cart,
  CartContent,
  CartFooter,
  CartHeader,
} from "../../generic/pure/cart";
import CartFreeDelivery_Progress from "../construct/progress/CartFreeDelivery_Progress";
import Spacing from "../../generic/pure/spacing";
import ContinueShopping_Btn from "../part/button/ContinueShopping_Btn";
import CartCards_Grid from "../construct/grid/CartCards_Grid";
import CartTotals_Card from "../construct/card/CartTotals_Card";
import ConfirmOrder_Bar from "../construct/bar/ConfirmOrder_Bar";
import CouponGiftCard_Bar from "../construct/bar/CouponGiftCard_Bar";
import { Separator } from "../../generic/ui/separator";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import { ConfigurationModel } from "@/lib/data/models/ConfigurationModel";
import useUserStore from "@/lib/data/stores/UserStore";
import { useEffect, useState } from "react";
import { CartModel } from "@/lib/data/models/CartModel";
import Image from "../../generic/pure/image";
import { PaymentMethodInfoModel } from "@/lib/data/models/PaymentMethodInfoModel";
import { getCart } from "@/lib/network/repo/client_repos/gql/cart";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import Cms from "../construct/pageBuilder/Cms";
import AddGiftWrapToCart_Btn from "../part/button/AddGiftWrapToCart_Btn";
import { useToast } from "../../generic/ui/use-toast";
import TrendingItems_Carousel from "../construct/carousel/TrendingItems_Carousel";
import { FinishOrderToGetPoints_Label } from "../part/label/FinishOrderToGetPoints_Label";
import Page_Transition from "../part/transition/Page_Transition";

interface Props extends PageProps {
  configuration: ConfigurationModel;
  paymentMethodInfo: PaymentMethodInfoModel;
  cms: CmsPageModel | undefined;
  recommendationCms: CmsPageModel | undefined;
}

export default function CartPage({
  params,
  configuration,
  paymentMethodInfo,
  cms,
  recommendationCms,
}: Props) {
  const { toast } = useToast();

  const { cart, lastOrder } = useUserStore((state) => state);
  const [cartState, setCartState] = useState<CartModel | null>();
  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  async function handleGetCart() {
    const getCartData = await getCart({});
    if (getCartData?.success) {
      useUserStore.setState({ cart: getCartData?.cart });
    }
  }
  useEffect(() => {
    handleGetCart();

    // gtm view cart event
    if (cart) {
      new GtmEvents({ gtmCart: CartModel?.toGtm(cart) })?.viewCart();
    }

    // handle when returning from payment gateway to cart
    if (lastOrder?.isWaiting) {
      toast({
        description: getText({
          storeCode: params?.storeCode,
          text: Texts.sorrySomethingWentWrongWithYourPayment,
        }),
        variant: "destructive",
      });

      if (lastOrder?.cart) {
        new GtmEvents({
          gtmCart: CartModel?.toGtm(lastOrder?.cart),
          errorMessage: getText({
            storeCode: params?.storeCode,
            text: Texts.sorrySomethingWentWrongWithYourPayment,
          }),
        })?.paymentFailuer();
      }
      useUserStore.setState({ lastOrder: null });
    }
  }, []);

  const [openGiftWrapDrawer, setOpenGiftWrapDrawer] = useState<boolean>(false);

  return (
    <Page_Transition>
      {/* mobile view */}
      <Cart className=" md:hidden">
        <Spacing value={5} />
        <CartHeader>
          {(cartState?.quantity ?? 0) < 1 && (
            <Image
              src="/image/empty_cart.jpeg"
              className=" mx-auto h-auto w-44"
              alt=""
            />
          )}
          <CartFreeDelivery_Progress
            storeCode={params.storeCode}
            freeShipping={configuration?.shippingInfo?.freeShipping}
            subTotal={cartState?.subTotal}
          />
          {!!cartState?.quantity && (
            <>
              <Spacing value={3} />
              <FinishOrderToGetPoints_Label />
              <Spacing value={3} />
              <Cms storeCode={params.storeCode} cms={cms} />
            </>
          )}
          <Spacing value={3} />
          {(cartState?.quantity ?? 0) < 1 && (
            <>
              <ContinueShopping_Btn
                storeCode={params.storeCode}
                className=" mx-auto block"
              />
              <Spacing value={5} />
            </>
          )}
        </CartHeader>
        <CartContent>
          <CartCards_Grid
            storeCode={params.storeCode}
            cartItems={cartState?.items}
          />
          <Spacing value={5} />
          <CartTotals_Card
            storeCode={params.storeCode}
            totalsLines={cartState?.totalsLines}
            quantity={cartState?.quantity}
          />
          <Spacing value={6} />
          {!!cartState?.quantity && (
            <section className=" px-5">
              <h3 className=" text-xl font-medium">
                {getText({
                  storeCode: params?.storeCode,
                  text: Texts.youMayAlsoLike,
                })}
              </h3>
              <Spacing value={4} />
              <TrendingItems_Carousel
                storeCode={params?.storeCode}
                productIds={
                  cartState?.items?.map((item) => item?.product?.parentId) ?? []
                }
              />
            </section>
          )}
          {!!!cartState?.quantity && (
            <Cms storeCode={params?.storeCode} cms={recommendationCms} />
          )}
          <Spacing value={80} />
        </CartContent>
        <CartFooter className=" fixed bottom-16 left-0 z-10 w-full bg-background shadow-navbar">
          {!!cartState?.quantity && (
            <CouponGiftCard_Bar
              storeCode={params.storeCode}
              coupon={cartState?.coupon}
              giftCard={cartState?.giftCard}
              rewardPoints={cartState?.rewardPoints}
            />
          )}
          <Separator />
          <ConfirmOrder_Bar
            storeCode={params.storeCode}
            cart={cartState}
            paymentMethodInfo={paymentMethodInfo}
          />
        </CartFooter>
        <PageType pageType={pageTypes.cart} />
        <HeaderOptions
          headerOptions={{
            showHeader: true,
            withBackButton: true,
            withLogo: false,
            withSearch: false,
            title: getText({
              storeCode: params.storeCode,
              text: Texts.cart,
            }),
          }}
        />
        <NavbarOptions navbarOptions={{ showNavbar: true }} />
      </Cart>

      {/* ========================================================================================================================== */}

      {/* desktop view */}
      <Cart className=" mx-auto hidden max-w-project py-5 md:block">
        {/* empty cart content */}
        {!!!cartState?.quantity && (
          <>
            <Image src="/image/empty_cart.jpeg" className=" mx-auto w-80" />
            <ContinueShopping_Btn
              storeCode={params.storeCode}
              className=" mx-auto block"
            />
            <Spacing value={5} />
          </>
        )}

        {/* ============================================================= */}

        {/* cart content  */}
        <section className=" flex items-start justify-start">
          {/* cart header and products */}
          <section className=" basis-1/2 overflow-hidden">
            <CartHeader>
              <CartFreeDelivery_Progress
                storeCode={params.storeCode}
                freeShipping={configuration?.shippingInfo?.freeShipping}
                subTotal={cartState?.subTotal}
              />
              {!!cartState?.quantity && (
                <>
                  <Spacing value={3} />
                  <FinishOrderToGetPoints_Label />
                  <Spacing value={3} />
                  <Cms storeCode={params.storeCode} cms={cms} />
                </>
              )}
              <Spacing value={3} />
            </CartHeader>

            {/* ============================================================= */}

            {!!cartState?.quantity && (
              <CartContent>
                <CartCards_Grid
                  storeCode={params.storeCode}
                  cartItems={cartState?.items}
                />
              </CartContent>
            )}
          </section>

          {/* ============================================================= */}

          {/* cart totals  and add to cart */}
          {!!cartState?.quantity && (
            <section className=" sticky top-[175px] flex-1">
              <CartTotals_Card
                storeCode={params.storeCode}
                totalsLines={cartState?.totalsLines}
                quantity={cartState?.quantity}
              />
              <Spacing value={6} />
              <CartFooter className=" z-10 w-full ">
                {!!cartState?.quantity && (
                  <CouponGiftCard_Bar
                    storeCode={params.storeCode}
                    coupon={cartState?.coupon}
                    giftCard={cartState?.giftCard}
                    rewardPoints={cartState?.rewardPoints}
                  />
                )}
                <Spacing value={1} />
                <Separator />
                <Spacing value={1} />
                <ConfirmOrder_Bar
                  storeCode={params.storeCode}
                  cart={cartState}
                  paymentMethodInfo={paymentMethodInfo}
                />
              </CartFooter>
            </section>
          )}
        </section>

        {/* ============================================================= */}

        {/* recommendation carousel  */}
        <section>
          <Spacing value={5} />
          {!!cartState?.quantity && (
            <section className=" px-5">
              <h3 className=" text-xl font-medium">
                {getText({
                  storeCode: params?.storeCode,
                  text: Texts.youMayAlsoLike,
                })}
              </h3>
              <Spacing value={4} />
              <TrendingItems_Carousel
                storeCode={params?.storeCode}
                productIds={
                  cartState?.items?.map((item) => item?.product?.parentId) ?? []
                }
              />
            </section>
          )}
          {!!!cartState?.quantity && (
            <Cms storeCode={params?.storeCode} cms={recommendationCms} />
          )}
        </section>

        {/* ============================================================= */}

        <PageType pageType={pageTypes.cart} />
      </Cart>
    </Page_Transition>
  );
}
