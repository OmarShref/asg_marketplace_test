import { pageBuilderAppearanceTypes } from "@/lib/core/basic/Constants";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";
import { Carousel_1 } from "../carousel/Carousel_1";
import { Carousel_2 } from "../carousel/Carousel_2";

interface Props {
  storeCode: string;
  slider: PageBuilderType;
}

export default function Slider({ storeCode, slider }: Props) {
  if (
    slider?.children?.at(0)?.properties?.appearance ===
    pageBuilderAppearanceTypes.poster
  ) {
    return (
      <>
        <Carousel_1 storeCode={storeCode} carouselItems={slider} />
      </>
    );
  } else if (
    slider?.children?.at(0)?.properties?.appearance ===
    pageBuilderAppearanceTypes.wide
  ) {
    return (
      <>
        <Carousel_2 storeCode={storeCode} carouselItems={slider} />
      </>
    );
  }
}