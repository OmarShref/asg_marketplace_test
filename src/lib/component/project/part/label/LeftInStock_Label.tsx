import { Texts, getText } from "@/lib/assets/text";
import { Label } from "@/lib/component/generic/pure/label";

type Props = {
  storeCode: string;
  quantity: number;
};

export default function LeftInStock_Label({ storeCode, quantity }: Props) {
  return (
    quantity <= 10 && (
      <Label className=" text-xs bg-accent/25 text-pink-600 md:text-base">
        {`${getText({
          storeCode: storeCode,
          text: Texts?.leftInStock,
        })} ${quantity} ${getText({
          storeCode: storeCode,
          text: Texts?.products,
        })}`}
      </Label>
    )
  );
}
