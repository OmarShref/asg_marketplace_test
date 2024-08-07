import { Texts, getText } from "@/lib/assets/text";
import Anchor from "@/lib/component/generic/pure/anchor";
import { Button } from "@/lib/component/generic/ui/button";
import { isArabic } from "@/lib/helper/language";
import { cn } from "@/lib/utils/utils";
import { ChevronRightIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
  watchAllUrl?: string;
}

export default function WatchAll_Btn({
  storeCode,
  className,
  watchAllUrl,
  ...restProps
}: Props) {
  const isLanguageArabic = isArabic(storeCode);
  return (
    <Button className={cn("text-accent", className)} {...restProps}>
      <Anchor href={watchAllUrl ?? ""} className=" flex items-center">
        <p className=" text-xs">
          {getText({ storeCode: storeCode, text: Texts.watchAll })}
        </p>
        <ChevronRightIcon
          className={`h-4 w-4 ${isLanguageArabic && "rotate-180"}`}
        />
      </Anchor>
    </Button>
  );
}
