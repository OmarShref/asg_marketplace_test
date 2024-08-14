"use client";
import { pageBuilderAppearanceTypes } from "@/lib/core/basic/Constants";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";
import { ProductCards_Carousel_1 } from "../carousel/ProductCards_Carousel_1";
import { ProductCards_Carousel_2 } from "../carousel/ProductCards_Carousel_2";
import Title_1 from "../title/Title_1";
import Title_2 from "../title/Title_2";
import Spacing from "@/lib/component/generic/pure/spacing";
import { useRef } from "react";

interface Props {
  storeCode: string;
  products: PageBuilderType | undefined;
}

export default function Products({ storeCode, products }: Props) {
  const specialToDate = useRef(
    products?.products?.find((product) => product?.specialToDate?.length > 0)
      ?.specialToDate,
  );

  if (
    products?.properties?.appearance === pageBuilderAppearanceTypes.carousel
  ) {
    return (
      <>
        <Title_1
          storeCode={storeCode}
          title={products?.title ?? ""}
          specialToDate={specialToDate?.current ?? ""}
          watchAllUrl={products?.url}
        />
        <Spacing value={4} />
        <ProductCards_Carousel_1
          storeCode={storeCode}
          className=" mx-5 lg:mx-0"
          carouselItems={products?.products}
        />
      </>
    );
  } else if (
    products?.properties?.appearance ===
    pageBuilderAppearanceTypes.focusCarousel
  ) {
    return (
      <>
        <Title_2 title={products?.title ?? ""} />
        <Spacing value={5} />
        <ProductCards_Carousel_2
          storeCode={storeCode}
          className=" mx-5 lg:mx-0"
          carouselItems={products?.products}
        />
      </>
    );
  }
}
