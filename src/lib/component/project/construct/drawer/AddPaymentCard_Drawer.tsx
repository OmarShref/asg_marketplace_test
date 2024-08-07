"use client";
import { Texts, getText } from "@/lib/assets/text";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,
} from "@/lib/component/generic/ui/drawer";
import Close_Btn from "../../part/button/Close_Btn";
import Spacing from "@/lib/component/generic/pure/spacing";
import { getDirection } from "@/lib/helper/direction";
import { Button } from "@/lib/component/generic/ui/button";
import { PlusIcon } from "lucide-react";
import { AddPaymentCard_Form } from "../form/AddPaymentCard_Form";
import { PaymentMethodInfoModel } from "@/lib/data/models/PaymentMethodInfoModel";
import useUtilityStore from "@/lib/data/stores/UtilityStore";

type Props = {
  storeCode: string;
  selectedPaymentMethod: string;
  paymentMethodInfo: PaymentMethodInfoModel;
  openAddPaymentDrawer: boolean;
  setOpenAddPaymentDrawer: (open: boolean) => void;
};

export function AddPaymentCard_Drawer({
  storeCode,
  selectedPaymentMethod,
  paymentMethodInfo,
  openAddPaymentDrawer,
  setOpenAddPaymentDrawer,
}: Props) {
  const direction = getDirection(storeCode);
  return (
    <Drawer
      open={openAddPaymentDrawer}
      onOpenChange={(open) => {
        useUtilityStore?.setState({ openAddPaymentCardDrawer: open });
        setOpenAddPaymentDrawer(open);
      }}
    >
      <DrawerTrigger asChild>
        <Button className=" w-full gap-2 rounded bg-faint_accent py-2 text-accent">
          <PlusIcon className=" h-5 w-5" />
          <p>{getText({ storeCode: storeCode, text: Texts.addCard })}</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        style={{ direction: direction }}
        className="mx-auto max-w-md"
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle>
            {getText({ storeCode: storeCode, text: Texts.cardInfo })}
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        <Spacing value={4} />
        <section className=" overflow-y-auto">
          <AddPaymentCard_Form
            storeCode={storeCode}
            setOpenAddPaymentDrawer={setOpenAddPaymentDrawer}
            paymentMethodInfo={paymentMethodInfo}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        </section>
        <Spacing value={4} />
      </DrawerContent>
    </Drawer>
  );
}
