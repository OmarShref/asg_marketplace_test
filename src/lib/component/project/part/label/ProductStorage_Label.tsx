import { Texts, getText } from "@/lib/assets/text";
import { Label } from "@/lib/component/generic/pure/label";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  quantity: number;
  storeCode: string;
}

export default function ProductStorage_Label({
  quantity,
  storeCode,
  className,
}: Props) {
  return quantity > 0 ? (
    <Label
      className={cn(
        ` w-fit rounded-full px-3 py-0.5 text-xs font-light  ${
          quantity > 0
            ? "bg-label_discount_background text-label_primary"
            : " bg-label_outofstock_background text-label_outofstock"
        }`,
        className,
      )}
    >
      {`${getText({
        storeCode: storeCode,
        text:
          quantity > 0
            ? quantity === 1
              ? Texts.thereIs
              : Texts.thereAre
            : Texts.outOfStock,
      })} ${quantity > 0 ? quantity : ""} ${
        quantity > 0
          ? getText({
              storeCode: storeCode,
              text: Texts.inStore,
            })
          : ""
      }`}
    </Label>
  ) : null;
}
