import Spacing from "@/lib/component/generic/pure/spacing";
import {
  Card,
  CardSection,
  CardContent,
  CardHeader,
} from "@/lib/component/generic/ui/card";
import { ReviewItemType } from "@/lib/data/models/ProductModel";
import { CircleUserIcon } from "lucide-react";
import Stars_Bar from "../bar/Stars_Bar";

type Props = {
  review: ReviewItemType;
};

export default function Review_Card({ review }: Props) {
  return (
    <Card className=" aspect-[364/100]  w-80 bg-review_card_background px-2 py-1">
      <CardHeader className=" flex items-start justify-between">
        <CardSection className=" flex items-center justify-center gap-2">
          <CircleUserIcon className=" h-8 w-8 text-accent" />
          <CardSection>
            <p className=" max-h-5 max-w-32 overflow-hidden text-primary_text ">
              {review.name}
            </p>
            <Stars_Bar rating={review?.rating} starSize="14px" />
          </CardSection>
        </CardSection>
        <CardSection>
          <p className=" font-montserrat-remove text-xs text-faint_text">
            {review?.date?.split(" ")?.at(0)}
          </p>
        </CardSection>
      </CardHeader>
      <Spacing value={4} />
      <CardContent className=" flex items-center justify-between gap-4">
        <p className=" max-h-8 overflow-hidden text-xs text-primary_text">
          {review?.detail}
        </p>
      </CardContent>
    </Card>
  );
}
