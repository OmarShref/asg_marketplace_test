import { Texts, getText } from "@/lib/assets/text";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/component/generic/ui/tabs";
import { getDirection } from "@/lib/helper/direction";
import { ProductCards_Carousel_1 } from "../carousel/ProductCards_Carousel_1";
import Spacing from "@/lib/component/generic/pure/spacing";

type Props = {
  storeCode: string;
};

export default function RelatedProducts_Tabs({ storeCode }: Props) {
  const direction = getDirection(storeCode);
  return (
    <Tabs
      defaultValue="similarProducts"
      className=""
      style={{ direction: direction }}
    >
      <TabsList className=" border-b-2 border-b-devider_background text-sub_secondry_text">
        <TabsTrigger value="similarProducts">
          {getText({ storeCode, text: Texts.similarProducts })}
        </TabsTrigger>
        <TabsTrigger value="recommended">
          {getText({ storeCode, text: Texts.recommended })}
        </TabsTrigger>
        <TabsTrigger value="favourites">
          {getText({ storeCode, text: Texts.favourites })}
        </TabsTrigger>
      </TabsList>
      <Spacing value={1} />
      <TabsContent value="similarProducts">
        <ProductCards_Carousel_1 storeCode={storeCode} carouselItems={[]} />
      </TabsContent>
      <TabsContent value="recommended">
        <ProductCards_Carousel_1 storeCode={storeCode} carouselItems={[]} />
      </TabsContent>
      <TabsContent value="favourites">
        <ProductCards_Carousel_1 storeCode={storeCode} carouselItems={[]} />
      </TabsContent>
    </Tabs>
  );
}
