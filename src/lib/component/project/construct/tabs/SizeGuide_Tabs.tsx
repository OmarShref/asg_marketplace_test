import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/component/generic/ui/tabs";
import { getDirection } from "@/lib/helper/direction";
import Spacing from "@/lib/component/generic/pure/spacing";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import Cms from "../pageBuilder/Cms";

type Props = {
  storeCode: string;
  cms: CmsPageModel[] | undefined;
};

export default function SizeGuide_Tabs({ storeCode, cms }: Props) {
  const direction = getDirection(storeCode);
  return (
    cms && (
      <Tabs
        defaultValue={cms?.at(0)?.url}
        className=""
        style={{ direction: direction }}
      >
        <TabsList className=" px-٢ sticky top-0 flex-wrap justify-center gap-2.5 border-b-2 border-b-devider_background bg-background py-2 text-sub_secondry_text">
          {cms?.map((cmsPage, index) => {
            return (
              <TabsTrigger
                key={index}
                value={cmsPage?.url}
                className=" w-fit flex-shrink-0 flex-grow-0 rounded-full border-2 border-devider_background px-4 py-1 data-[state=active]:border-accent data-[state=active]:bg-faint_accent  data-[state=active]:text-primary_text data-[state=active]:shadow"
              >
                {cmsPage.heading}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <Spacing value={1} />
        {cms?.map((cmsPage, index) => {
          return (
            <TabsContent key={index} value={cmsPage?.url} className="">
              <Cms storeCode={storeCode} cms={cmsPage} />
            </TabsContent>
          );
        })}
      </Tabs>
    )
  );
}
