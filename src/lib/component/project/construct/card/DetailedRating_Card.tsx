import { ReviewCount } from "@/lib/component/generic/pure/review";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/component/generic/ui/card";
import WatchAll_Btn from "../../part/button/WatchAll_Btn";
import { Texts, getText } from "@/lib/assets/text";
import { Separator } from "@/lib/component/generic/ui/separator";
import Spacing from "@/lib/component/generic/pure/spacing";
import DetailedRating_Progress from "../progress/DetailedRating_Progress";

type Props = {
  storeCode: string;
  reviewCount: number;
};

export default function DetailedRating_Card({ storeCode, reviewCount }: Props) {
  return (
    <Card className=" border border-devider_background px-2">
      <Spacing value={4} />
      <CardHeader>
        <CardTitle>
          {getText({ storeCode, text: Texts.isTheProductSizeAppropriate })}
        </CardTitle>
      </CardHeader>
      <Spacing value={3} />
      <CardContent className=" flex items-center justify-between gap-4">
        <DetailedRating_Progress
          progress={12}
          label={getText({ storeCode, text: Texts.small })}
        />
        <DetailedRating_Progress
          progress={80}
          label={getText({ storeCode, text: Texts.perfectFit })}
        />
        <DetailedRating_Progress
          progress={5}
          label={getText({ storeCode, text: Texts.large })}
        />
      </CardContent>
      <Spacing value={3} />
      <Separator />
      <Spacing value={3} />
      <CardFooter className=" flex items-center justify-between">
        <ReviewCount className=" text-sm">{`${reviewCount} ${getText({
          storeCode: storeCode,
          text: Texts.reviewes,
        })}`}</ReviewCount>
        <WatchAll_Btn storeCode={storeCode} />
      </CardFooter>
      <Spacing value={3} />
    </Card>
  );
}
