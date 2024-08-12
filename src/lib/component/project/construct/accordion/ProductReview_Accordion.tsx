import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/lib/component/generic/ui/accordion";
import SimpleAccordion_Trigger from "../../part/accordion/SimpleAccordion_Trigger";
import { Texts, getText } from "@/lib/assets/text";
import { ReviewItemType } from "@/lib/data/models/ProductModel";
import Stars_Bar from "../bar/Stars_Bar";
import Spacing from "@/lib/component/generic/pure/spacing";
import {
  Review,
  ReviewCount,
  ReviewRatingNumber,
  ReviewSection,
} from "@/lib/component/generic/pure/review";
import DetailedRating_Card from "../card/DetailedRating_Card";
import { ReviewCards_Carousel } from "../carousel/ReviewCards_Carousel";

type Props = {
  storeCode: string;
  rating: number;
  reviewCount: number;
  reviews: ReviewItemType[];
};

export function ProductReviewAccordion({
  storeCode,
  rating,
  reviewCount,
  reviews,
}: Props) {
  return (
    reviewCount >= 5 && (
      <Accordion type="single" collapsible className="">
        <AccordionItem value="product-review" className="">
          <SimpleAccordion_Trigger
            storeCode={storeCode}
            title={getText({ storeCode: storeCode, text: Texts.thereviewes })}
          />
          <AccordionContent className=" py-5">
            <Review>
              <ReviewSection className=" flex items-center justify-between">
                <ReviewRatingNumber className=" font-fontEnglish">
                  {rating}
                </ReviewRatingNumber>
                <ReviewSection>
                  <Stars_Bar rating={rating} starSize="25px" />
                  <Spacing value={2} />
                  <ReviewCount className=" text-end">{`${reviewCount} ${getText(
                    {
                      storeCode: storeCode,
                      text: Texts.reviewes,
                    },
                  )}`}</ReviewCount>
                </ReviewSection>
              </ReviewSection>
              <Spacing value={4} />
              {/* <DetailedRating_Card
              storeCode={storeCode}
              reviewCount={reviewCount}
            />
            <Spacing value={3} /> */}
              <ReviewCards_Carousel storeCode={storeCode} reviews={reviews} />
            </Review>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  );
}
