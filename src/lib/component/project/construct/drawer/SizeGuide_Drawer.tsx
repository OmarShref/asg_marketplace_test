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
import SizeGuide_Btn from "../../part/button/SizeGuide_Btn";
import { useEffect, useState } from "react";
import { getCmsPage } from "@/lib/network/server/gql/cmsPage";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import SizeGuide_Tabs from "../tabs/SizeGuide_Tabs";

type Props = {
  storeCode: string;
};

export default function SizeGuide_Drawer({ storeCode }: Props) {
  const direction = getDirection(storeCode);

  const [sizeGuideCms, setSizeGuideCms] = useState<
    CmsPageModel[] | undefined
  >();
  useEffect(() => {
    getCmsPage({
      params: { storeCode: storeCode },
      search: "size",
    }).then((cms) => {
      setSizeGuideCms(cms);
    });
  }, []);

  return (
    <Drawer dismissible={false}>
      <DrawerTrigger asChild>
        <SizeGuide_Btn storeCode={storeCode} />
      </DrawerTrigger>
      <DrawerContent
        style={{ direction: direction }}
        className=" mx-auto h-[100dvh] max-h-[100dvh] max-w-md rounded-none"
      >
        <DrawerHeader className=" relative flex items-center justify-center border-b border-b-devider_background py-2">
          <DrawerTitle>
            {getText({ storeCode: storeCode, text: Texts.sizeGuide })}
          </DrawerTitle>
          <DrawerClose
            asChild
            className=" absolute left-3 top-1/2 -translate-y-1/2"
          >
            <Close_Btn />
          </DrawerClose>
        </DrawerHeader>
        <section className=" overflow-y-auto">
          <SizeGuide_Tabs storeCode={storeCode} cms={sizeGuideCms} />
        </section>
        <Spacing value={7} />
      </DrawerContent>
    </Drawer>
  );
}
