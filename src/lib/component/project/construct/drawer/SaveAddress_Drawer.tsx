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
import { Address_Form } from "../form/Address_Form";

type Props = {
  storeCode: string;
  setOpenSaveAddressDrawer: (open: boolean) => void;
  openSaveAddressDrawer: boolean;
  editAddressId?: number | undefined | null;
  choosenLocation?: any;
  setOpenMapDrawer?: (open: boolean) => void;
};

export function SaveAddress_Drawer({
  storeCode,
  setOpenSaveAddressDrawer,
  openSaveAddressDrawer,
  editAddressId,
  choosenLocation,
  setOpenMapDrawer,
}: Props) {
  const direction = getDirection(storeCode);

  return (
    <Drawer
      open={openSaveAddressDrawer}
      onOpenChange={(open) => setOpenSaveAddressDrawer(open)}
      dismissible={false}
    >
      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto h-[100dvh] max-h-[100dvh] max-w-md"
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle className=" text-lg">
            {getText({ storeCode: storeCode, text: Texts.address })}
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        <section className=" h-full overflow-y-auto">
          <Address_Form
            storeCode={storeCode}
            editAddressId={editAddressId}
            setOpenSaveAddressDrawer={setOpenSaveAddressDrawer}
            choosenLocation={choosenLocation}
            setOpenMapDrawer={setOpenMapDrawer}
          />
        </section>
      </DrawerContent>
    </Drawer>
  );
}
