import { ShippingCarIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import { Row, RowSection } from "@/lib/component/generic/pure/row";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/component/generic/ui/select";
import {
  CountryRegionsType,
  ShippingInfoType,
} from "@/lib/data/models/ConfigurationModel";
import { getExpectedShippingTime } from "@/lib/helper/dateTime";
import { getDirection } from "@/lib/helper/direction";
import { isArabic } from "@/lib/helper/language";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  storeCode: string;
  regions: CountryRegionsType;
  shippingInfo: ShippingInfoType;
};

export default function ProductShipping_Bar({
  storeCode,
  regions,
  shippingInfo,
}: Props) {
  const isArabicLanguage = useRef<boolean>(isArabic(storeCode));
  const direction = useRef<"ltr" | "rtl">(getDirection(storeCode));

  const [deliveryDate, setdeliveryDate] = useState<string>();
  const [orderWithin, setOrderWithin] = useState<number>();

  useEffect(() => {
    const expectedShipping = getExpectedShippingTime({
      storeCode,
      shippingInfo,
      regionId: "1108",
    });
    setOrderWithin(expectedShipping?.orderWithin);
    setdeliveryDate(expectedShipping?.deliveryDate);
  }, []);

  return (
    <Row className="justify-start gap-3">
      <ShippingCarIcon />
      <RowSection className=" block">
        {deliveryDate && orderWithin && (
          <p className=" text-sm text-positive_text">{`${getText({
            storeCode: storeCode,
            text: Texts.toGetItOn,
          })} ${deliveryDate} ${getText({
            storeCode,
            text: Texts.orderWithin,
          })} ${orderWithin} ${getText({ storeCode, text: Texts.hour })}`}</p>
        )}
        <div className=" flex items-center gap-3">
          <p className=" text-xs text-faint_text">
            {`${getText({ storeCode: storeCode, text: Texts.deliverTo })}`}
          </p>
          <Select
            defaultValue={"1108"} // riyadh region id
            onValueChange={(value) => {
              const expectedShipping = getExpectedShippingTime({
                storeCode,
                shippingInfo,
                regionId: value,
              });
              setOrderWithin(expectedShipping?.orderWithin);
              setdeliveryDate(expectedShipping?.deliveryDate);
            }}
          >
            <SelectTrigger
              className={`${isArabicLanguage ? "" : "font-montserrat-remove"} `}
              dir={direction?.current}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              className={` ${isArabicLanguage ? "" : "font-montserrat-remove"} `}
              dir={direction?.current}
            >
              <SelectGroup>
                {regions?.availabelRegions?.map((region, index) => {
                  return (
                    <SelectItem
                      key={index}
                      value={region?.id?.toString()}
                      className=""
                    >
                      <p className="">
                        {isArabicLanguage?.current
                          ? region?.arabicName
                          : region?.name}
                      </p>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </RowSection>
    </Row>
  );
}
