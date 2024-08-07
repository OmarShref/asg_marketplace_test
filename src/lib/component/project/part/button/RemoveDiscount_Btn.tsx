import { Button } from "@/lib/component/generic/ui/button";
import { XIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function RemoveDiscount_Btn({ ...restProps }: Props) {
  return (
    <Button
      variant={"circle"}
      className=" bg-remove_discount_btn_background p-1.5"
      {...restProps}
    >
      <XIcon className=" h-4 w-4" />
    </Button>
  );
}
