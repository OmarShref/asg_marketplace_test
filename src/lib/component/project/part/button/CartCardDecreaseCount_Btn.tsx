import { Button } from "@/lib/component/generic/ui/button";
import { MinusIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function CartCardDecreaseCount_Btn({ ...restProps }: Props) {
  return (
    <Button className=" w-6 shrink-0" {...restProps}>
      <MinusIcon className=" h-5 w-5 text-sub_secondry_text" />
    </Button>
  );
}
