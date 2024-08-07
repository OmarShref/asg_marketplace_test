import {
  Card,
  CardContent,
  CardSection,
} from "@/lib/component/generic/ui/card";
import Spacing from "@/lib/component/generic/pure/spacing";
import { GiftWrapType } from "@/lib/data/models/GiftWrapModel";
import Image from "@/lib/component/generic/pure/image";
import { getCurrency } from "@/lib/helper/currency";
import useUtilityStore from "@/lib/data/stores/UtilityStore";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  item: GiftWrapType;
}

export default function GiftWrap_Card({ item, children, ...restProps }: Props) {
  return (
    <Card {...restProps}>
      <CardContent>
        <CardSection className=" relative flex aspect-square items-center justify-center rounded border-2 border-slate-200 p-3">
          <Image src={item?.image} className=" object-contain" alt="" />
        </CardSection>
        <Spacing value={4} />
        <CardSection className=" flex items-center justify-between gap-4">
          <CardSection>
            <p className=" h-4 overflow-clip text-xs">{item?.arabicName}</p>
            <p className=" h-4 overflow-clip text-xs">{`${item?.price} ${getCurrency(
              { storeCode: useUtilityStore?.getState()?.storeCode },
            )?.label}`}</p>
          </CardSection>
          {children}
        </CardSection>
      </CardContent>
    </Card>
  );
}
