"use client";
import { Texts, getText } from "@/lib/assets/text";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/lib/component/generic/ui/drawer";
import Close_Btn from "../../part/button/Close_Btn";
import Spacing from "@/lib/component/generic/pure/spacing";
import { getDirection } from "@/lib/helper/direction";
import Image from "@/lib/component/generic/pure/image";
import { useEffect, useState } from "react";
import {
  getGiftWrap,
  getGiftWrapCategories,
} from "@/lib/network/repo/client_repos/gql/giftwrap";
import { GiftWrapModel, GiftWrapType } from "@/lib/data/models/GiftWrapModel";
import { Card } from "@/lib/component/generic/ui/card";
import GiftWrap_RadioGroup from "../radiogroup/GiftWrap_RadioGroup";

type Props = {
  storeCode: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  itemId?: number;
};

export function GiftWrap_Drawer({ storeCode, open, setOpen, itemId }: Props) {
  const direction = getDirection(storeCode);

  const [giftWrapCategories, setGiftWrapCategories] =
    useState<GiftWrapModel | null>(null);
  const [selectedGiftWrapCategory, setSelectedGiftWrapCategory] =
    useState<GiftWrapType | null>(null);
  const [giftWrap, setGiftWrap] = useState<GiftWrapModel | null>(null);

  async function handleGetGiftWrapCategories() {
    const giftWrapCategories = await getGiftWrapCategories();
    setGiftWrapCategories(giftWrapCategories);
  }
  async function handleGetGiftWrap() {
    const giftWrap = await getGiftWrap({
      categoryId: selectedGiftWrapCategory?.id,
    });
    setGiftWrap(giftWrap);
  }
  useEffect(() => {
    if (selectedGiftWrapCategory) {
      handleGetGiftWrap();
    }
  }, [selectedGiftWrapCategory]);

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open) {
          setGiftWrapCategories(null);
          setSelectedGiftWrapCategory(null);
          setGiftWrap(null);
          handleGetGiftWrapCategories();
        }
      }}
    >
      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto max-w-md"
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle>
            {getText({
              storeCode: storeCode,
              text: Texts.chooseGiftWrapperType,
            })}
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        {!giftWrap && (
          <section className=" grid grid-cols-2 gap-x-5 gap-y-5 overflow-y-auto p-5">
            {giftWrapCategories?.items?.map((item, index) => {
              return (
                <Card
                  key={index}
                  className=" relative flex items-center justify-center rounded-md border-2 border-slate-200 p-3"
                  onClick={() => {
                    setSelectedGiftWrapCategory(item);
                  }}
                >
                  <Image src={item?.image} className="" alt="" />
                  {/* <p className=" absolute font-medium ">{item?.arabicName}</p> */}
                </Card>
              );
            })}
          </section>
        )}
        {giftWrap && (
          <section className=" overflow-y-auto p-5">
            {
              <GiftWrap_RadioGroup
                giftWrap={giftWrap}
                setOpenGiftWrapDrawer={setOpen}
                storeCode={storeCode}
                itemId={itemId}
              />
            }
          </section>
        )}
        <Spacing value={7} />
      </DrawerContent>
    </Drawer>
  );
}
