import { Button } from "@/lib/component/generic/ui/button";
import { PlusIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function CartCardIncreaseCount_Btn({ ...restProps }: Props) {
  return (
    <Button className=" w-6 shrink-0" {...restProps}>
      <PlusIcon className=" h-5 w-5 text-sub_secondry_text" />
    </Button>
  );
}
