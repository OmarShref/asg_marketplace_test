"use client";
import { Texts } from "@/lib/assets/text";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/lib/component/generic/ui/drawer";
import Close_Btn from "../../part/button/Close_Btn";
import { Sort_Btn } from "../../part/button/Sort_Btn";
import SortDrawer_Btn from "../../part/button/SortDrawer_Btn";
import Spacing from "@/lib/component/generic/pure/spacing";
import { getDirection } from "@/lib/helper/direction";
import { useRef } from "react";
import { SortItemType, SortModel } from "@/lib/data/models/SortModel";
import { isArabic } from "@/lib/helper/language";
import { cn } from "@/lib/utils/utils";

type Props = {
  storeCode: string;
  sort: SortItemType;
  setSort: (sort: SortItemType) => void;
};

export function SortDrawer({
  storeCode,
  sort,
  setSort,
  className,
}: Props & React.HtmlHTMLAttributes<HTMLDivElement>) {
  const direction = getDirection(storeCode);
  const isArabicLanguage = isArabic(storeCode);
  const sorts = useRef(new SortModel({ storeCode }));
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Sort_Btn sortText={sort.Label} className={cn("", className)} />
      </DrawerTrigger>
      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto max-w-md"
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle>
            {isArabicLanguage ? Texts.sort[0] : Texts.sort[1]}
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        {sorts.current.options.map((sortItem) => {
          return (
            <DrawerClose asChild key={sortItem.value}>
              <SortDrawer_Btn
                applied={sort.value === sortItem.value}
                onClick={() => {
                  setSort(sortItem);
                }}
              >
                <p>{sortItem.Label}</p>
              </SortDrawer_Btn>
            </DrawerClose>
          );
        })}
        <Spacing value={7} />
      </DrawerContent>
    </Drawer>
  );
}
