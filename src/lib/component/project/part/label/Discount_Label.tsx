import { Label } from "@/lib/component/generic/pure/label";
import { cn } from "@/lib/utils/utils";

type Props = {
  value?: string | number;
  className?: string;
};

export default function DiscountLabel({ value, className }: Props) {
  return Number(value) > 0 ? (
    <Label
      className={cn(
        " font-montserrat-remove w-fit rounded-e-full bg-accent py-1 pl-2 pr-1 text-sm text-white",
        className,
      )}
    >
      {value + " %"}
    </Label>
  ) : null;
}
