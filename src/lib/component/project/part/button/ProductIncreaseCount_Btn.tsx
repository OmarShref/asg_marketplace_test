import { Button } from "@/lib/component/generic/ui/button";
import { PlusIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ProductIncreaseCount_Btn({ ...restProps }: Props) {
  return (
    <Button
      variant={"circle"}
      className=" w-9 shrink-0 bg-background ring-1 ring-circular_change_btn_border disabled:bg-transparent"
      {...restProps}
    >
      <PlusIcon className=" text-circular_change_btn_foreground" />
    </Button>
  );
}
