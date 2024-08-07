import { Texts, getText } from "@/lib/assets/text";
import Spacing from "@/lib/component/generic/pure/spacing";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/component/generic/ui/card";
import {
  CartTotalsCardRow,
  CartTotalsCardRowLabel,
  CartTotalsCardRowValue,
} from "../../part/row/CartTotalsCard_Row";
import { TotalsLinesItemType } from "@/lib/data/models/CartModel";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  storeCode: string;
  totalsLines: TotalsLinesItemType[] | undefined;
  quantity: number | undefined;
}

// TODO: color the lines based on their code
export default function CartTotals_Card({
  storeCode,
  totalsLines,
  quantity,
  className,
}: Props) {
  return (
    (quantity ?? 0) > 0 && (
      <Card className={cn(" mx-5", className)}>
        <CardHeader>
          <CardTitle className=" text-xl font-medium">
            {getText({ storeCode: storeCode, text: Texts.orderDetails })}
          </CardTitle>
        </CardHeader>
        <Spacing value={3} />
        <CardContent className="rounded-xl border border-dashed border-accent px-4 py-4 caret-cart_totals_card_border">
          {totalsLines?.map((item, index) => {
            return Math.abs(item?.value) >= 0 ? (
              <CartTotalsCardRow
                key={index}
                withSeparator={index != totalsLines?.length - 1}
              >
                <CartTotalsCardRowLabel className=" text-justify text-sm">
                  {item?.title}
                </CartTotalsCardRowLabel>
                <CartTotalsCardRowValue className=" flex-shrink-0 basis-4/12 text-end text-sm">{`${item?.value} ر.س`}</CartTotalsCardRowValue>
              </CartTotalsCardRow>
            ) : null;
          })}
          {/* sub total  */}
          {/* <CartTotalsCardRow>
          <CartTotalsCardRowLabel details={`( ${"1"} منتج )`}>
            {"المجموع الفرعي"}
          </CartTotalsCardRowLabel>
          <CartTotalsCardRowValue>{"100 ر.س"}</CartTotalsCardRowValue>
        </CartTotalsCardRow> */}
          {/* shipping cost  */}
          {/* <CartTotalsCardRow>
          <CartTotalsCardRowLabel>{"مصاريف الشحن"}</CartTotalsCardRowLabel>
          <CartTotalsCardRowValue>{"100 ر.س"}</CartTotalsCardRowValue>
        </CartTotalsCardRow> */}
          {/* discount  */}
          {/* <CartTotalsCardRow>
          <CartTotalsCardRowLabel>{"خصم العرض"}</CartTotalsCardRowLabel>
          <CartTotalsCardRowValue variant={"active"}>
            {"100 ر.س"}
          </CartTotalsCardRowValue>
        </CartTotalsCardRow> */}
          {/* coupon or gift card  */}
          {/* <CartTotalsCardRow>
          <CartTotalsCardRowLabel>{"خصم"}</CartTotalsCardRowLabel>
          <CartTotalsCardRowValue variant={"active"}>
            {"100 ر.س"}
          </CartTotalsCardRowValue>
        </CartTotalsCardRow> */}
          {/* grand total  */}
          {/* <CartTotalsCardRow withSeparator={false}>
          <CartTotalsCardRowLabel variant={"big"}>
            {"المجموع"}
          </CartTotalsCardRowLabel>
          <CartTotalsCardRowValue>{"700 ر.س"}</CartTotalsCardRowValue>
        </CartTotalsCardRow> */}
        </CardContent>
      </Card>
    )
  );
}
