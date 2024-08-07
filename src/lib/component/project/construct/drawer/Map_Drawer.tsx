"use client";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/lib/component/generic/ui/drawer";
import { getDirection } from "@/lib/helper/direction";
import Back_Btn from "../../part/button/Back_Btn";
import GoogleMapLoc from "../map/GoogleMap/GoogleMapLoc";

type Props = {
  storeCode: string;
  openMapDrawer: boolean;
  setOpenMapDrawer: (open: boolean) => void;
  editAddressId?: number | undefined | null;
};

export function Map_Drawer({
  storeCode,
  openMapDrawer,
  setOpenMapDrawer,
  editAddressId,
}: Props) {
  const direction = getDirection(storeCode);
  return (
    <Drawer
      dismissible={false}
      open={openMapDrawer}
      onOpenChange={(open) => {
        setOpenMapDrawer(open);
      }}
    >
      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto h-[100dvh] max-h-[100dvh] max-w-xl rounded-t-none"
      >
        <section className=" relative h-full">
          <GoogleMapLoc
            storeCode={storeCode}
            editAddressId={editAddressId}
            setOpenMapDrawer={setOpenMapDrawer}
          />
          <DrawerClose asChild className=" absolute left-3 top-3">
            <Back_Btn className=" rotate-180 shadow-circular_btn_inverted" />
          </DrawerClose>
        </section>
      </DrawerContent>
    </Drawer>
  );
}
