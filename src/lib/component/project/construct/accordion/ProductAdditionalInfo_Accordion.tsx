import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/lib/component/generic/ui/accordion";
import SimpleAccordion_Trigger from "../../part/accordion/SimpleAccordion_Trigger";
import { Texts, getText } from "@/lib/assets/text";
import { AttributeType } from "@/lib/data/models/ProductModel";

type Props = {
  storeCode: string;
  attributes: AttributeType[];
};

export function ProductAdditionalInfo_Accordion({
  storeCode,
  attributes,
}: Props) {
  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="product-additional-info" className="">
        <SimpleAccordion_Trigger
          storeCode={storeCode}
          title={getText({ storeCode: storeCode, text: Texts.addtionalInfo })}
        />
        <AccordionContent className=" py-5">
          <div>
            {attributes?.map((attribute, index) => {
              return (
                attribute?.show && (
                  <div
                    key={index}
                    className=" flex items-center justify-start rounded px-6 py-3 odd:bg-ultra_faint_accent"
                  >
                    <p className=" basis-6/12">{`${attribute?.name}`}</p>
                    <p className=" font-light">{`${attribute?.value}`}</p>
                  </div>
                )
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
