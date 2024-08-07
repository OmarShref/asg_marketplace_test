import { Label } from "@/lib/component/generic/pure/label";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLLabelElement> {}

export default function Static_Label({ children, className }: Props) {
  return (
    <Label
      className={cn(
        " text-sub_secondry_text flex items-center justify-start gap-1 text-xs",
        className,
      )}
    >
      {children}
    </Label>
  );
}
