import { LocateIcon } from "@/lib/assets/svg";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function LocateMe_Btn({ className, ...restProps }: Props) {
  return (
    <Button
      className={cn(
        " rounded-lg border border-accent bg-background p-2",
        className,
      )}
      {...restProps}
    >
      <LocateIcon className=" text-accent" />
    </Button>
  );
}
