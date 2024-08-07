import { Texts, getText } from "@/lib/assets/text";
import { Label } from "@/lib/component/generic/pure/label";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  value?: string | number;
  storeCode: string;
}

export default function RecentlyBoughtLabel({
  value,
  storeCode,
  className,
}: Props) {
  return Number(value) > 0 ? (
    <Label
      style={{ direction: "ltr" }}
      className={cn(
        " w-fit rounded-full bg-label_discount_background px-3 py-1 text-xs font-light text-label_primary",
        className,
      )}
    >
      {`${getText({
        storeCode: storeCode,
        text: Texts.productIsBought,
      })} ${value} ${getText({
        storeCode: storeCode,
        text: Texts.timesToday,
      })}`}
    </Label>
  ) : null;
}
