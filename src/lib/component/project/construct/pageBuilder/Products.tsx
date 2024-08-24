"use client";
import { PageBuilderType } from "@/lib/data/models/CmsPageModel";
import { ProductCards_Carousel_1 } from "../carousel/ProductCards_Carousel_1";
import Title_1 from "../title/Title_1";
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

  return (
    <div>
      <Title_1
        storeCode={storeCode}
        title={products?.title ?? ""}
        specialToDate={specialToDate?.current ?? ""}
        watchAllUrl={products?.url}
      />
      <Spacing value={4} />
      <ProductCards_Carousel_1
        storeCode={storeCode}
        className=""
        carouselItems={products?.products}
      />
    </div>
  );
}
