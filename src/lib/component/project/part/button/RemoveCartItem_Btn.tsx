import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";
import { TrashIcon } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function RemoveCartItem_Btn({
  storeCode,
  className,
  ...restProps
}: Props) {
  return (
    <Button className={cn("text-sub_secondry_text", className)} {...restProps}>
      <TrashIcon className=" h-5 w-5 " />
    </Button>
  );
}
