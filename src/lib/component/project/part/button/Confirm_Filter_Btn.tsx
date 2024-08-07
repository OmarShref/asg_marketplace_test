import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function Confirm_Filter_Btn({
  className,
  children,
  ...restProps
}: Props) {
  return (
    <Button
      className={cn(
        " bg-accent py-1 text-lg text-background hover:bg-accent/80",
        className
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
}
