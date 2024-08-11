"use client";
import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import useUserStore from "@/lib/data/stores/UserStore";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function Addtocart_Btn_3({
  storeCode,
  className,
  ...restProps
}: Props) {
  return (
    <Button variant={"brand"} className={cn(``, className)} {...restProps}>
      <p className="pt-1">{getText({ storeCode, text: Texts.addToCart })}</p>
    </Button>
  );
}
