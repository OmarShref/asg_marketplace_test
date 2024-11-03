"use client";
import PageType from "../../generic/utility/PageType";
import { pageTypes } from "@/lib/core/basic/Constants";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import Spacing from "../../generic/pure/spacing";
import useUserStore, { LastOrderType } from "@/lib/data/stores/UserStore";
import { useEffect, useRef, useState } from "react";
import { Texts, getText } from "@/lib/assets/text";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import Image from "../../generic/pure/image";
import ReviewProductContinueShopping_Btn from "../part/button/ReviewProductContinueShopping_Btn";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { CartModel } from "@/lib/data/models/CartModel";
import { OrderModel } from "@/lib/data/models/OrderModel";
import { useRouter } from "next/navigation";
import Page_Transition from "../part/transition/Page_Transition";

type Props = {
  storeCode: string;
};

export default function SuccessPage({ storeCode }: Props) {
  const router = useRouter();
  const successSoundRef = useRef<HTMLAudioElement>(null);

  const { lastOrder } = useUserStore((state) => state);
  const [lastOrderState, setLastOrderState] = useState<
    LastOrderType | undefined
  >();

  useEffect(() => {
    if (lastOrder) {
      setLastOrderState(lastOrder);

      // gtm event
      new GtmEvents({
        gtmCart: CartModel?.toGtm(lastOrder?.cart),
        gtmOrder: OrderModel?.toGtm(lastOrder?.order),
      })?.purchase();
      successSoundRef.current?.play();
    }
  }, []);

  useEffect(() => {
    if (lastOrderState) {
      useUserStore.setState({ cart: null, lastOrder: null });
    }
    if (!lastOrder) {
      router.push(`/${storeCode}`);
    }
  }, [lastOrderState]);

  return (
    <Page_Transition>
      <main className={` relative mx-5 h-full max-w-md lg:mx-auto`}>
        <Spacing value={40} />
        <section className=" h-full">
          <p className=" text-center text-2xl font-light">
            {getText({ storeCode: storeCode, text: Texts.congratsOnYourOrder })}
          </p>
          <Image src="/gif/success.gif" className=" mx-auto h-32 w-32" alt="" />
          <p className=" text-center text-2xl font-light">
            {getText({
              storeCode: storeCode,
              text: Texts.orderSuccessfullyPlaced,
            })}
          </p>
          <Spacing value={4} />
          <div className=" flex items-center justify-center gap-4">
            <p className=" text-center font-light ">
              {`${getText({
                storeCode: storeCode,
                text: Texts.orderNumber,
              })}`}
            </p>
            <p>{":"}</p>
            <p className=" text-center font-fontEnglish font-light">
              {`${lastOrderState?.order?.items?.at(0)?.number}`}
            </p>
          </div>
        </section>
        <ReviewProductContinueShopping_Btn
          storeCode={storeCode}
          className=" fixed bottom-16 left-0 w-full bg-fixed_btn_container_background px-5 pb-5 pt-2"
        />
        <audio
          id="audio"
          src="/sound/sound_success.mp3"
          ref={successSoundRef}
        ></audio>
        <PageType pageType={pageTypes.success} />
        <HeaderOptions
          headerOptions={{
            showHeader: true,
            withBackButton: true,
            withLogo: true,
            withSearch: true,
            searchExpanded: false,
            withBurgerButton: true,
            withWishlist: true,
          }}
        />
        <NavbarOptions navbarOptions={{ showNavbar: true }} />
      </main>
    </Page_Transition>
  );
}
