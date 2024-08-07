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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/lib/component/generic/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

type Props = {
  storeCode: string;
  setOpenMapDrawer?: (open: boolean) => void;
  setOpenAddressSave: (open: boolean) => void;
  openAddressSave: boolean;
  choosenLocation?: any;
  editAddressId?: number | undefined | null;
};

export function SaveAddress_Modal({
  storeCode,
  openAddressSave,
  setOpenAddressSave,
  choosenLocation,
  editAddressId,
  setOpenMapDrawer,
}: Props) {
  const direction = getDirection(storeCode);
  return (
    <Dialog
      open={openAddressSave}
      onOpenChange={(open) => setOpenAddressSave(open)}
    >
      <DialogContent
        style={{ direction: direction }}
        className=" mx-auto w-11/12 max-w-md rounded-lg p-0"
      >
        <DialogHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DialogTitle className=" text-lg">
            {getText({ storeCode: storeCode, text: Texts.address })}
          </DialogTitle>
          <DialogClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DialogClose>
        </DialogHeader>
        <section className=" max-h-[70dvh] overflow-y-auto">
          <Address_Form
            storeCode={storeCode}
            choosenLocation={choosenLocation}
            editAddressId={editAddressId}
            setOpenSaveAddressDrawer={setOpenAddressSave}
            setOpenMapDrawer={setOpenMapDrawer}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
}
