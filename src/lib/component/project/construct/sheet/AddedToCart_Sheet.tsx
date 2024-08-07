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
import { RewardPointsModel } from "@/lib/data/models/RewardPointsModel";
import { FinishBuyingProductToGetPoints_Label } from "../../part/label/FinishBuyingProductToGetPoints_Label";

type Props = {
  storeCode: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  addedtoCartSuccess: boolean;
  setAddedtoCartSuccess: (success: boolean) => void;
  productIds: number[];
  productRewardPoints?: RewardPointsModel;
};

export default function AddedToCart_Sheet({
  storeCode,
  open,
  setOpen,
  addedtoCartSuccess,
  setAddedtoCartSuccess,
  productIds,
  productRewardPoints,
}: Props) {
  const direction = getDirection(storeCode);

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open === false) {
          setAddedtoCartSuccess(false);
        }
      }}
    >
      <SheetContent style={{ direction: direction }} className="px-4 pb-0">
        {addedtoCartSuccess && (
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

        <section className="bg-background px-0 h-[calc(100vh-100px)] overflow-y-auto">
          <FinishBuyingProductToGetPoints_Label
            productRewardPoints={productRewardPoints}
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
            productIds={productIds}
            isSmallDevice={false}
          />
          <Spacing value={20} />
        </section>

        {/* ======================================================================================================== */}

        <SheetFooter className=" bg-background w-full absolute left-0 bottom-0 block">
          <Separator />
          <ConfirmAddedToCart_Bar
            setAddedToCartDrawerOpen={setOpen}
            storeCode={storeCode}
            className=" w-full py-3 mx-0"
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
