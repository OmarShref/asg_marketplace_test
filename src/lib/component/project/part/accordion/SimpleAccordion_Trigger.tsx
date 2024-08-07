import { AccordionTrigger } from "@/lib/component/generic/ui/accordion";
import { isArabic } from "@/lib/helper/language";
import { cn } from "@/lib/utils/utils";
import { ChevronRightIcon } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  storeCode: string;
  title: string;
}

export default function SimpleAccordion_Trigger({
  storeCode,
  title,
  className,
}: Props) {
  const isLanguageArabic = isArabic(storeCode);
  return (
    <AccordionTrigger
      className={cn(
        ` flex w-full items-center justify-between border-b border-b-devider_background pb-3 [&[data-state=open]>svg]:rotate-90`,
        className,
      )}
    >
      <p className=" text-xl">{title}</p>
      <ChevronRightIcon
        className={`h-5 w-5 transition-transform ${
          isLanguageArabic && "rotate-180"
        }`}
      />
    </AccordionTrigger>
  );
}
