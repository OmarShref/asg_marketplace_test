import { ShareIcon } from "@/lib/assets/svg";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Shareproduct_Btn({ className, ...restProps }: Props) {
  return (
    <Button
      variant={"circle"}
      className={cn(
        ` h-auto w-10 bg-rounded_btn_background p-0 text-accent hover:bg-accent hover:text-white`,
        className,
      )}
      {...restProps}
    >
      <ShareIcon />
    </Button>
  );
}
