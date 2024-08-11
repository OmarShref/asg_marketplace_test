import { Texts, getText } from "@/lib/assets/text";
import { Label } from "@/lib/component/generic/pure/label";

type Props = {
  storeCode: string;
  quantity: number;
};

export default function LeftInStock_Label({ storeCode, quantity }: Props) {
  return (
    quantity <= 10 && (
      <Label className=" bg-accent/15 text-xs text-accent md:text-base">
        <p className="pt-1 ">
          {`${getText({
            storeCode: storeCode,
            text: Texts?.leftInStock,
          })} ${quantity} ${getText({
            storeCode: storeCode,
            text: Texts?.products,
          })}`}
        </p>
      </Label>
    )
  );
}
