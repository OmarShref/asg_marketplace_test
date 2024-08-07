"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/lib/component/generic/ui/accordion";
import SimpleAccordion_Trigger from "../../part/accordion/SimpleAccordion_Trigger";
import { Texts, getText } from "@/lib/assets/text";
import Spacing from "@/lib/component/generic/pure/spacing";
import RelatedProducts_Carousel from "../carousel/RelatedProducts_Carousel";

type Props = {
  storeCode: string;
  productIds: number[];
};

export function RelatedProductsAccordion({ storeCode, productIds }: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      className=""
      defaultValue="product-review"
    >
      <AccordionItem value="product-review" className="">
        <SimpleAccordion_Trigger
          storeCode={storeCode}
          title={getText({
            storeCode: storeCode,
            text: Texts.youMayAlsoLike,
          })}
        />
        <AccordionContent>
          <Spacing value={3} />
          <RelatedProducts_Carousel
            storeCode={storeCode}
            productIds={productIds}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
