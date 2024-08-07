import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/component/generic/ui/accordion";
import { MenuItemType } from "@/lib/data/models/MenuModel";
import { ChevronRightIcon } from "lucide-react";
import { isArabic } from "@/lib/helper/language";
import Image from "@/lib/component/generic/pure/image";
import Anchor from "@/lib/component/generic/pure/anchor";

type Props = {
  storeCode: string;
  menuItem: MenuItemType;
};

export function Menu_Accordion({ storeCode, menuItem }: Props) {
  const isLanguageArabic = isArabic(storeCode);
  return (
    <Accordion type="single" collapsible defaultValue={`${menuItem?.name}`}>
      <AccordionItem value={`${menuItem?.name}`} className="">
        <AccordionTrigger
          className={` flex w-full items-center justify-between pt-4 [&[data-state=open]>svg]:rotate-90`}
        >
          <p className=" text-lg">{menuItem?.name}</p>
          <ChevronRightIcon
            className={`h-4 w-4 transition-transform ${
              isLanguageArabic && "rotate-180"
            }`}
          />
        </AccordionTrigger>
        <AccordionContent className=" grid grid-cols-3 gap-y-4 pt-7">
          {menuItem?.children?.map((item, index) => {
            return (
              <Anchor
                key={index}
                href={item?.url}
                className=" flex flex-col items-center justify-center gap-3 "
              >
                <div className=" aspect-square w-[80%] overflow-hidden rounded-full">
                  <Image src={item?.icon} />
                </div>
                <p className=" h-4 overflow-hidden text-xs">{item?.name}</p>
              </Anchor>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
