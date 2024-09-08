"use client";
import { Texts, getText } from "@/lib/assets/text";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/lib/component/generic/ui/sheet";
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

export default function AddedToCart_Sheet({}: Props) {
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
      <Sheet
        open={addedToCartOpen}
        onOpenChange={(open) => {
          setAddedToCartOpen(open);

          if (open === false) {
            setAddedToCartSuccess(false);
            setAddedToCartProduct(null);
            setAddedToCartRewardPoints(null);
          }
        }}
      >
        <SheetContent style={{ direction: direction }} className="px-4 pb-0">
          {addedToCartSuccess && (
            <SheetHeader className=" mx-7 mb-3 flex items-center justify-between rounded bg-positive_text px-3 py-2 text-background ">
              <section className=" flex flex-1 items-center gap-2">
                <CircleTrueIcon />
                {getText({
                  storeCode: storeCode,
                  text: Texts.addedSuccessfullyToYourCart,
                })}
              </section>
            </SheetHeader>
          )}

          {/* ======================================================================================================== */}

          <section className="h-[calc(100vh-100px)] overflow-y-auto bg-background px-0">
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
              isSmallDevice={false}
            />
            <Spacing value={20} />
          </section>

          {/* ======================================================================================================== */}

          <SheetFooter className=" absolute bottom-0 left-0 block w-full bg-background">
            <Separator />
            <ConfirmAddedToCart_Bar
              setAddedToCartDrawerOpen={setAddedToCartOpen}
              storeCode={storeCode}
              className=" mx-0 w-full py-3"
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <audio id="audio" src="/sound/sound.mp3" ref={successSoundRef}></audio>
    </>
  );
}
