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
import { ChevronLeftIcon, GlobeIcon } from "lucide-react";
import Image from "@/lib/component/generic/pure/image";
import { CountryInfoType } from "@/lib/data/models/ConfigurationModel";
import { useMemo } from "react";
import Country_RadioGroup from "../radiogroup/Country_RadioGroup";

type Props = {
  storeCode: string;
  countries: CountryInfoType[];
};

// TODO: replace code with the commented one when data is fixed from back end
export function Country_Drawer({ storeCode, countries }: Props) {
  const currentCountry = useMemo<CountryInfoType | undefined>(() => {
    console.log(storeCode);
    return countries?.find((country) => {
      return country?.code === storeCode?.slice(0, 2);
    });
  }, [storeCode]);

  const direction = getDirection(storeCode);

  return (
    <Drawer>
      {/* mobile view */}
      <DrawerTrigger asChild>
        <Row withSeparator={true} className=" mx-5 md:hidden">
          <RowSection className=" gap-3">
            <GlobeIcon className=" w--5 h-5" />
            <p>{getText({ storeCode: storeCode, text: Texts.country })}</p>
          </RowSection>
          <RowSection>
            <p className="text-xs">{currentCountry?.name}</p>
          </RowSection>
          <RowSection>
            <Image
              src={currentCountry?.flag}
              alt={`${currentCountry?.name} flag`}
              className=" h-auto w-6 object-contain"
            />
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
          <RowSection>
            <Image
              src={currentCountry?.flag}
              alt={`${currentCountry?.name} flag`}
              className=" h-auto w-6 object-contain"
            />
          </RowSection>
          <RowSection className=" gap-3">
            <p className=" text-sm ">
              {getText({ storeCode: storeCode, text: Texts.country })}
            </p>
          </RowSection>
        </Row>
      </DrawerTrigger>

      <DrawerContent
        style={{ direction: direction }}
        className={" md:mx-auto md:max-w-md"}
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle>
            {getText({ storeCode: storeCode, text: Texts.country })}
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        <Spacing value={4} />
        <Country_RadioGroup storeCode={storeCode} countries={countries} />
        <Spacing value={4} />
      </DrawerContent>
    </Drawer>
  );
}
