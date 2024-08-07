import { StarIcon } from "lucide-react";
import Repeat from "../../../generic/utility/Repeat";

type Props = {
  rating: number;
  starSize?: string;
};

export default function Stars_Bar({ rating, starSize }: Props) {
  const roundedRating = Math.round(rating);
  return (
    <div
      className=" flex items-center justify-center"
      style={{ direction: "ltr" }}
    >
      <Repeat count={roundedRating}>
        <StarIcon
          style={{ width: starSize, height: starSize }}
          className=" fill-active_star stroke h-5 w-5 stroke-none"
        />
      </Repeat>
      <Repeat count={5 - roundedRating}>
        <StarIcon
          style={{ width: starSize, height: starSize }}
          className=" fill-inactive_star stroke h-5 w-5 stroke-none"
        />
      </Repeat>
    </div>
  );
}
