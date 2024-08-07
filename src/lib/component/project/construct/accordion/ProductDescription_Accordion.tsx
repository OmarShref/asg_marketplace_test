import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/lib/component/generic/ui/accordion";
import SimpleAccordion_Trigger from "../../part/accordion/SimpleAccordion_Trigger";
import { Texts, getText } from "@/lib/assets/text";

type Props = {
  storeCode: string;
  description: string;
};

export function ProductDescriptionAccordion({ storeCode, description }: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      className=""
      defaultValue="product-description"
    >
      <AccordionItem value="product-description" className="">
        <SimpleAccordion_Trigger
          storeCode={storeCode}
          title={getText({ storeCode: storeCode, text: Texts.description })}
        />
        <AccordionContent className=" py-5">
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className=" text-justify text-lg"
          ></div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
