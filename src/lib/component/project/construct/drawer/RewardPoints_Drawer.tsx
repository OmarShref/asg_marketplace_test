"use client";
import { Texts, getText } from "@/lib/assets/text";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/lib/component/generic/ui/drawer";
import Close_Btn from "../../part/button/Close_Btn";
import Spacing from "@/lib/component/generic/pure/spacing";
import { getDirection } from "@/lib/helper/direction";
import { useState } from "react";
import { RewardPoints_Form } from "../form/RewardPoints_Form";
import RewardPoints_Btn from "../../part/button/RewardPoints_Btn";
import useUserStore from "@/lib/data/stores/UserStore";

type Props = {
  storeCode: string;
};

export function RewardPoints_Drawer({ storeCode }: Props) {
  const [open, setOpen] = useState(false);
  const direction = getDirection(storeCode);
  const { customerRewardPoints } = useUserStore((state) => state);

  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <RewardPoints_Btn storeCode={storeCode} />
      </DrawerTrigger>
      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto max-w-md"
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle className=" flex gap-3 items-end">
            <span>
              {getText({ storeCode: storeCode, text: Texts.applyMyPoints })}
            </span>
            <span className=" text-xs text-faint_text">
              {`${getText({
                storeCode: storeCode,
                text: Texts.total,
              })} : ${customerRewardPoints?.currentBalance?.toFixed(2)}`}
            </span>
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        <Spacing value={4} />
        <RewardPoints_Form
          storeCode={storeCode}
          setOpenRewardPointsDrawer={setOpen}
        />
        <Spacing value={4} />
      </DrawerContent>
    </Drawer>
  );
}
