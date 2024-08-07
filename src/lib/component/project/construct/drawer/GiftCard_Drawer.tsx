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
import GiftCard_Btn from "../../part/button/GiftCard_Btn";
import { GiftCard_Form } from "../form/GiftCard_Form";
import { useState } from "react";

type Props = {
  storeCode: string;
};

export function GiftCard_Drawer({ storeCode }: Props) {
  const [open, setOpen] = useState(false);
  const direction = getDirection(storeCode);
  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <GiftCard_Btn storeCode={storeCode} />
      </DrawerTrigger>
      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto max-w-md"
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle>
            {getText({ storeCode: storeCode, text: Texts.bloomingCards })}
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        <Spacing value={4} />
        <GiftCard_Form storeCode={storeCode} setGiftCardDrawerOpen={setOpen} />
        <Spacing value={4} />
      </DrawerContent>
    </Drawer>
  );
}
