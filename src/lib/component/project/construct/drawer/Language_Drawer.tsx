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
import { Row, RowSection } from "@/lib/component/generic/pure/row";
import { ChevronLeftIcon, MessageSquareTextIcon } from "lucide-react";
import { getLanguageLabel } from "@/lib/helper/language";
import Language_RadioGroup from "../radiogroup/Language_RadioGroup";

type Props = {
  storeCode: string;
};

export function Language_Drawer({ storeCode }: Props) {
  const direction = getDirection(storeCode);
  return (
    <Drawer>
      {/* mobile view */}
      <DrawerTrigger asChild>
        <Row withSeparator={true} className=" mx-5 md:hidden">
          <RowSection className=" gap-3">
            <MessageSquareTextIcon className=" w--5 h-5" />
            <p>{getText({ storeCode: storeCode, text: Texts.language })}</p>
          </RowSection>
          <RowSection>
            <p>{getLanguageLabel(storeCode)}</p>
            <ChevronLeftIcon
              className={` h-4 w-4 text-secondry_chevron ${
                direction === "rtl" ? "rotate-0" : "rotate-180"
              }`}
            />
          </RowSection>
        </Row>
      </DrawerTrigger>

      {/* desktop view */}
      <DrawerTrigger asChild>
        <Row
          withSeparator={false}
          className=" hidden cursor-pointer gap-2 md:flex"
        >
          <RowSection className=" gap-3">
            <MessageSquareTextIcon className=" w--5 h-5 text-accent" />
          </RowSection>
          <RowSection>
            <p className=" text-sm">{getLanguageLabel(storeCode)}</p>
          </RowSection>
        </Row>
      </DrawerTrigger>

      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto max-w-md"
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle>
            {getText({ storeCode: storeCode, text: Texts.language })}
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        <Spacing value={4} />
        <Language_RadioGroup storeCode={storeCode} />
        <Spacing value={4} />
      </DrawerContent>
    </Drawer>
  );
}
