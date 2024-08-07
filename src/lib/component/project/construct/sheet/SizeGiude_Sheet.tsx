import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/component/generic/ui/sheet";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import { getDirection } from "@/lib/helper/direction";
import { getCmsPage } from "@/lib/network/server/gql/cmsPage";
import { useEffect, useState } from "react";
import SizeGuide_Btn from "../../part/button/SizeGuide_Btn";
import { Texts, getText } from "@/lib/assets/text";
import Spacing from "@/lib/component/generic/pure/spacing";
import SizeGuide_Tabs from "../tabs/SizeGuide_Tabs";

type Props = {
  storeCode: string;
};

export default function SizeGiude_Sheet({ storeCode }: Props) {
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
    <Sheet>
      <SheetTrigger asChild>
        <SizeGuide_Btn storeCode={storeCode} />
      </SheetTrigger>
      <SheetContent
        style={{ direction: direction }}
        className=" overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>
            {getText({ storeCode: storeCode, text: Texts.sizeGuide })}
          </SheetTitle>
        </SheetHeader>

        <section className=" overflow-y-auto">
          <SizeGuide_Tabs storeCode={storeCode} cms={sizeGuideCms} />
        </section>
        <Spacing value={7} />
      </SheetContent>
    </Sheet>
  );
}
