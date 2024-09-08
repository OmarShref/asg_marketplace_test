"use client";
import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";
import { ShoppingCartIcon } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function Addtocart_Btn_3({
  storeCode,
  className,
  ...restProps
}: Props) {
  return (
    <Button
      variant={"brand"}
      className={cn(`gap-2 py-1.5`, className)}
      {...restProps}
    >
      <ShoppingCartIcon className=" h-5 w-auto " />
      <p className="">{getText({ storeCode, text: Texts.addToCart })}</p>
    </Button>
  );
}
