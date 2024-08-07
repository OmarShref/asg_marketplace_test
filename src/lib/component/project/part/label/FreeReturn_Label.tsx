import { cn } from "@/lib/utils/utils";
import { AvailableInStoreIcon, ProductReturnIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import { Label } from "@/lib/component/generic/pure/label";

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  storeCode: string;
}

export default function FreeReturn_Label({ storeCode, className }: Props) {
  return (
    <Label className={cn(" text-sub_secondry_text gap-2 text-xs", className)}>
      <ProductReturnIcon className=" h-5 w-5 text-accent" />
      <p>
        {getText({
          storeCode: storeCode,
          text: Texts.freeReturn,
        })}
      </p>
    </Label>
  );
}
