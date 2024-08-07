import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function Clear_Filter_Btn({
  className,
  children,
  ...restProps
}: Props) {
  return (
    <Button
      className={cn(
        " py-1 text-lg text-accent bg-white hover:bg-accent/10",
        className
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
}
