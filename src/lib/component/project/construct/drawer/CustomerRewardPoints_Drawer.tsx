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
import { ChevronLeftIcon, CrownIcon } from "lucide-react";
import useUserStore from "@/lib/data/stores/UserStore";
import CustomerRewardPointsHistory_Card from "../card/CustomerRewardPointsHistory_Card";

type Props = {
  storeCode: string;
};

export function CustomerRewardPoints_Drawer({ storeCode }: Props) {
  const direction = getDirection(storeCode);
  const { customerRewardPoints } = useUserStore((state) => state);

  return (
    <Drawer dismissible={false}>
      <DrawerTrigger asChild>
        <Row
          withSeparator={false}
          className=" mx-5 rounded p-2 shadow ring-1 ring-yellow-400"
        >
          <RowSection className=" gap-3">
            <CrownIcon className=" w--5 h-5 text-yellow-400" />
            <p>{getText({ storeCode: storeCode, text: Texts.myPoints })}</p>
          </RowSection>
          <RowSection className=" gap-4">
            <p className=" font-montserrat-remove text-sm text-secondry_text">
              {customerRewardPoints?.currentBalance?.toFixed(2)}
            </p>
            <div className="  flex items-center justify-center gap-1 text-sub_secondry_text">
              <p className="text-xs">
                {getText({ storeCode: storeCode, text: Texts.pointsHistory })}
              </p>
              <ChevronLeftIcon
                className={`  h-3 w-3 ${
                  direction === "rtl" ? "rotate-0" : "rotate-180"
                }`}
              />
            </div>
          </RowSection>
        </Row>
      </DrawerTrigger>
      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto h-auto max-h-dvh min-h-dvh max-w-md"
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle>
            {getText({ storeCode: storeCode, text: Texts.pointsHistory })}
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        <Spacing value={4} />
        <div className=" px-5">
          {customerRewardPoints?.history?.map((historyItem, index) => (
            <CustomerRewardPointsHistory_Card
              key={index}
              storeCode={storeCode}
              customerRewardPointsHistoryItem={historyItem}
            />
          ))}
        </div>
        <Spacing value={4} />
      </DrawerContent>
    </Drawer>
  );
}
