import { Texts, getText } from "@/lib/assets/text";
import Spacing from "@/lib/component/generic/pure/spacing";
import {
  Card,
  CardContent,
  CardSection,
} from "@/lib/component/generic/ui/card";
import { Separator } from "@/lib/component/generic/ui/separator";
import { useToast } from "@/lib/component/generic/ui/use-toast";
import { CustomerRewardPointsHistoryItemType } from "@/lib/data/models/CustomerRewardPointsModel";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  storeCode: string;
  customerRewardPointsHistoryItem: CustomerRewardPointsHistoryItemType;
}

// TODO: add status colors by mapping values to colors
export default function CustomerRewardPointsHistory_Card({
  storeCode,
  customerRewardPointsHistoryItem,
}: Props) {
  return (
    <Card className=" rounded-xl bg-background px-5 py-3 shadow-md">
      <CardContent>
        <CardSection className=" flex items-center justify-between">
          <p className=" text-lg font-medium">{`${customerRewardPointsHistoryItem?.amount} ${getText(
            {
              storeCode,
              text: Texts.point,
            },
          )}`}</p>
          <p className=" text-xs text-sub_secondry_text">
            {customerRewardPointsHistoryItem?.actionDate?.split(" ")?.at(0)}
          </p>
        </CardSection>
        <Spacing value={2} />
        <Separator />
        <Spacing value={2} />
        <CardSection>
          <p className=" text-center text-sm text-secondry_text">
            {customerRewardPointsHistoryItem?.action}
          </p>
        </CardSection>
        <Spacing value={2} />
      </CardContent>
    </Card>
  );
}
