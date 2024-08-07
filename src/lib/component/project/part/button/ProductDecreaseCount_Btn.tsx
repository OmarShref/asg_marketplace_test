import { Button } from "@/lib/component/generic/ui/button";
import { MinusIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ProductDecreaseCount_Btn({ ...restProps }: Props) {
  return (
    <Button
      variant={"circle"}
      className=" w-9 shrink-0 bg-background ring-1 ring-circular_change_btn_border disabled:bg-transparent"
      {...restProps}
    >
      <MinusIcon className=" text-circular_change_btn_foreground" />
    </Button>
  );
}
