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
        " font-fontEnglish w-fit rounded-e bg-accent px-2  text-sm text-white",
        className,
      )}
    >
      {value + " %"}
    </Label>
  ) : null;
}
