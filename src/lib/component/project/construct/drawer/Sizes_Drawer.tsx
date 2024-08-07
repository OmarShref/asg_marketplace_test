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
import { VariantOptionType, VariantType } from "@/lib/data/models/ProductModel";
import { Row } from "@/lib/component/generic/pure/row";
import { Button } from "@/lib/component/generic/ui/button";
import { TriangleDownIcon, TrueCircleIcon } from "@/lib/assets/svg";

type Props = {
  storeCode: string;
  sizeVariant: VariantType | undefined;
  curretSizeVariantOption: VariantOptionType | undefined;
  setCurretSizeVariantOption: (option: VariantOptionType | undefined) => void;
};

export default function Sizes_Drawer({
  storeCode,
  sizeVariant,
  curretSizeVariantOption,
  setCurretSizeVariantOption,
}: Props) {
  const direction = getDirection(storeCode);

  const [open, setOpen] = useState(false);

  return (
    (sizeVariant?.options ?? "")?.length > 0 && (
      <Drawer
        open={open}
        onOpenChange={(open) => setOpen(open)}
        dismissible={false}
      >
        <DrawerTrigger asChild>
          <Button className=" flex-1 justify-between rounded-md border border-slate-200 px-4 py-2">
            <p>
              {curretSizeVariantOption?.value ??
                getText({
                  storeCode: storeCode,
                  text: Texts.chooseSize,
                })?.replace(":", "")}
            </p>
            <TriangleDownIcon className=" h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent
          style={{ direction: direction }}
          className=" mx-auto max-h-[100dvh] max-w-md"
        >
          <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
            <DrawerTitle>
              {getText({
                storeCode: storeCode,
                text: Texts.chooseSize,
              })?.replace(":", "")}
            </DrawerTitle>
            <DrawerClose
              asChild
              className=" absolute left-3 top-1/2 -translate-y-1/2"
            >
              <Close_Btn />
            </DrawerClose>
          </DrawerHeader>
          <section className=" overflow-y-auto">
            {sizeVariant?.options?.map((option, index) => {
              return (
                <Row
                  key={index}
                  withSeparator
                  className={` p-0 ${
                    curretSizeVariantOption?.uId === option?.uId
                      ? " bg-faint_accent "
                      : ""
                  }`}
                >
                  <Button
                    className={` w-full justify-between px-5 py-4 text-sm`}
                    onClick={() => {
                      setCurretSizeVariantOption(option);
                      setOpen(false);
                    }}
                    disabled={!option?.isAvailabel}
                  >
                    <div className=" flex items-center gap-2">
                      {curretSizeVariantOption?.uId === option?.uId && (
                        <TrueCircleIcon />
                      )}
                      {option?.value}
                    </div>
                    <p>
                      {option?.isAvailabel
                        ? getText({
                            storeCode: storeCode,
                            text: Texts?.available,
                          })
                        : getText({
                            storeCode: storeCode,
                            text: Texts?.soldOut,
                          })}
                    </p>
                  </Button>
                </Row>
              );
            })}
          </section>
          <Spacing value={7} />
        </DrawerContent>
      </Drawer>
    )
  );
}
