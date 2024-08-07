import { cn } from "@/lib/utils/utils";
import { AvailableInStoreIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import { Label } from "@/lib/component/generic/pure/label";

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  storeCode: string;
  productQuantity: number;
}

export default function AvailableInStore_Label({
  storeCode,
  productQuantity,
  className,
}: Props) {
  return (
    (productQuantity ?? 0) > 0 && (
      <Label className={cn(" text-sub_secondry_text text-xs", className)}>
        <AvailableInStoreIcon className=" text-accent" />
        <p>
          {getText({
            storeCode: storeCode,
            text: Texts.availableInStore,
          })}
        </p>
      </Label>
    )
  );
}
