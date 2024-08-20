import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";
import { ShareIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Shareproduct_Btn({ className, ...restProps }: Props) {
  return (
    <Button
      variant={"circle"}
      className={cn(
        ` h-auto w-8 border border-accent bg-background p-0 text-accent hover:bg-accent hover:text-white`,
        className,
      )}
      {...restProps}
    >
      <ShareIcon className=" h-auto w-5 stroke-[1.5]" />
    </Button>
  );
}
