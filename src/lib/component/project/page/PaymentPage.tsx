"use client";
import React, { useEffect, useState } from "react";
import PageType from "../../generic/utility/PageType";
import { pageTypes } from "@/lib/core/basic/Constants";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import {
  Account,
  AccountContent,
  AccountFooter,
  AccountSection,
} from "../../generic/pure/account";
import Spacing from "../../generic/pure/spacing";
import useUserStore from "@/lib/data/stores/UserStore";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import Payment_RadioGroup from "../construct/radiogroup/Payment_RadioGroup";
import { CartModel } from "@/lib/data/models/CartModel";
import CouponGiftCard_Bar from "../construct/bar/CouponGiftCard_Bar";
import ConfirmOrder_Bar from "../construct/bar/ConfirmOrder_Bar";
import { Separator } from "../../generic/ui/separator";
import PaymentAddress_Card from "../construct/card/PaymentAddress_Card";
import ChangeAddress_Btn from "../part/button/ChangeAddress_Btn";
import { Texts, getText } from "@/lib/assets/text";
import CartTotals_Card from "../construct/card/CartTotals_Card";
import { PaymentMethodInfoModel } from "@/lib/data/models/PaymentMethodInfoModel";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import Cms from "../construct/pageBuilder/Cms";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { useToast } from "../../generic/ui/use-toast";
import { getCart } from "@/lib/network/client/gql/cart";
import { useRouter } from "next/navigation";
import ScrollDetector from "../../generic/pure/scroll";
import General_Loading from "../construct/loading/General_Loading";
import { FinishOrderToGetPoints_Label } from "../part/label/FinishOrderToGetPoints_Label";
import Page_Transition from "../part/transition/Page_Transition";

type Props = {
  storeCode: string;
  paymentMethodInfo: PaymentMethodInfoModel;
  cms: CmsPageModel | undefined;
};

export default function PaymentPage({
  storeCode,
  paymentMethodInfo,
  cms,
}: Props) {
  const router = useRouter();
  const { customer, cart, lastOrder } = useUserStore((state) => state);
  const { toast } = useToast();

  const [cartState, setCartState] = useState<CartModel | null>(null);
  useEffect(() => {
    if (customer) {
      setCartState(cart);
    }
  }, [cart]);

  // =============================================================

  useEffect(() => {
    if (lastOrder?.isWaiting) {
      toast({
        description: getText({
          storeCode,
          text: Texts.sorrySomethingWentWrongWithYourPayment,
        }),
        variant: "destructive",
      });
      if (lastOrder?.cart) {
        new GtmEvents({
          gtmCart: CartModel?.toGtm(lastOrder?.cart),
          errorMessage: getText({
            storeCode,
            text: Texts.sorrySomethingWentWrongWithYourPayment,
          }),
        })?.paymentFailuer();
      }
      useUserStore.setState({ lastOrder: null });
    }
  }, []);

  // =============================================================

  async function handleGetCart() {
    const getCartData = await getCart({});
    if (getCartData?.success) {
      useUserStore.setState({ cart: getCartData?.cart });
    }
  }
  useEffect(() => {
    handleGetCart();
  }, []);

  // =============================================================

  useEffect(() => {
    if ((cart?.quantity ?? 0) <= 0) {
      router?.push(`/${storeCode}/cart`);
    }
  }, [cart]);

  return (
    <Page_Transition>
      <Account className={` mx-6 max-w-md lg:mx-auto `}>
        <Spacing value={6} />
        <AccountContent>
          <AccountSection>
            <FinishOrderToGetPoints_Label />
            <Spacing value={4} />
            <PaymentAddress_Card
              storeCode={storeCode}
              address={cartState?.shippingAddress}
            />
            <Spacing value={4} />
            <ChangeAddress_Btn
              storeCode={storeCode}
              className=" mx-auto flex"
            />
          </AccountSection>
          <Spacing value={4} />
          <Cms storeCode={storeCode} cms={cms} classNameArray={["p-0"]} />
          <Spacing value={1} />
          <ScrollDetector id="select-payment-method-section" />
          <AccountSection>
            <h3 className=" text-center text-3xl">
              {getText({ storeCode, text: Texts.choosePaymentMethod })}
            </h3>
            <Spacing value={6} />
            <Payment_RadioGroup
              storeCode={storeCode}
              paymentMethods={cartState?.paymentMethods}
              selectedPaymentMethod={cartState?.paymentMethod}
              paymentMethodInfo={paymentMethodInfo}
            />
          </AccountSection>
          <Spacing value={10} />
          <AccountSection>
            <CartTotals_Card
              storeCode={storeCode}
              totalsLines={cartState?.totalsLines}
              quantity={cartState?.quantity}
              className=" mx-0"
            />
          </AccountSection>
        </AccountContent>
        <Spacing value={40} />
        <AccountFooter className=" fixed bottom-16 left-0 z-10 w-full max-w-md bg-background shadow-navbar lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 ">
          <CouponGiftCard_Bar
            storeCode={storeCode}
            coupon={cartState?.coupon}
            giftCard={cartState?.giftCard}
            rewardPoints={cartState?.rewardPoints}
          />
          <Separator />
          <ConfirmOrder_Bar
            storeCode={storeCode}
            cart={cartState}
            paymentMethodInfo={paymentMethodInfo}
          />
        </AccountFooter>
        <Spacing value={40} />
        <PageType pageType={pageTypes.account} />
        <HeaderOptions
          headerOptions={{
            showHeader: true,
            withBackButton: true,
            withLogo: false,
            withSearch: false,
            searchExpanded: false,
            title: getText({ storeCode: storeCode, text: Texts.payment }),
          }}
        />
        <NavbarOptions navbarOptions={{ showNavbar: true }} />
        <General_Loading />
      </Account>
    </Page_Transition>
  );
}
