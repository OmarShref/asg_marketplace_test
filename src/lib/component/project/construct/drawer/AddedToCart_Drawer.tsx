"use client";
import { Texts, getText } from "@/lib/assets/text";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
  DrawerFooter,
} from "@/lib/component/generic/ui/drawer";
import Close_Btn from "../../part/button/Close_Btn";
import Spacing from "@/lib/component/generic/pure/spacing";
import { getDirection } from "@/lib/helper/direction";
import ConfirmAddedToCart_Bar from "../bar/ConfirmAddedToCart_Bar";
import { Separator } from "@/lib/component/generic/ui/separator";
import { CircleTrueIcon } from "@/lib/assets/svg";
import { BoughtTogether_Section } from "../section/BoughtTogether_Section";
import { FinishBuyingProductToGetPoints_Label } from "../../part/label/FinishBuyingProductToGetPoints_Label";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { useEffect, useRef } from "react";

type Props = {};

export default function AddedToCart_Drawer({}: Props) {
  const {
    storeCode,
    addedToCartOpen,
    setAddedToCartOpen,
    addedToCartSuccess,
    setAddedToCartSuccess,
    addedToCartProduct,
    setAddedToCartProduct,
    addedToCartRewardPoints,
    setAddedToCartRewardPoints,
  } = useUtilityStore((state) => state);

  const direction = getDirection(storeCode);

  const successSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (addedToCartSuccess) {
      successSoundRef.current?.play();
    }
  }, [addedToCartSuccess]);

  return (
    <>
      <Drawer
        open={addedToCartOpen}
        onOpenChange={(open) => {
          setAddedToCartOpen(open);
          if (open === false) {
            setAddedToCartSuccess(false);
            setAddedToCartProduct(null);
            setAddedToCartRewardPoints(null);
          }
        }}
        dismissible={false}
      >
        <DrawerContent
          style={{ direction: direction }}
          className=" mx-auto max-w-md border-none bg-transparent"
        >
          {addedToCartSuccess && (
            <DrawerHeader className=" relative mx-5 mb-3 flex items-center justify-between rounded bg-positive_text px-3 py-2 text-background ">
              <section className=" flex flex-1 items-center gap-2">
                <CircleTrueIcon />
                {getText({
                  storeCode: storeCode,
                  text: Texts.addedSuccessfullyToYourCart,
                })}
              </section>
              <Separator orientation="vertical" className="h-4" />
              <DrawerClose asChild>
                <Close_Btn className=" h-4 w-4 text-background" />
              </DrawerClose>
            </DrawerHeader>
          )}
          <section className="bg-background px-5">
            <FinishBuyingProductToGetPoints_Label
              productRewardPoints={addedToCartRewardPoints}
            />
            <Spacing value={2} />
            <h3 className=" text-xl font-semibold">
              {getText({
                storeCode: storeCode,
                text: Texts.mySuggestionsForYou,
              })}
            </h3>
            <Spacing value={4} />
            <BoughtTogether_Section
              storeCode={storeCode}
              productIds={[addedToCartProduct?.id ?? 0]}
              isSmallDevice={true}
            />
            <Spacing value={4} />
          </section>
          <Separator />
          <DrawerFooter className=" bg-background">
            <ConfirmAddedToCart_Bar
              setAddedToCartDrawerOpen={setAddedToCartOpen}
              storeCode={storeCode}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <audio id="audio" src="/sound/sound.mp3" ref={successSoundRef}></audio>
    </>
  );
}
