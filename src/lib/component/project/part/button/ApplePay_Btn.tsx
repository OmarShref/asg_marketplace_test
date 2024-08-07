"use client";

import Image from "@/lib/component/generic/pure/image";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ApplePay_Btn({
  children,
  className,
  ...restProps
}: Props) {
  return (
    <Button
      variant={"outline"}
      className={cn(` w-full gap-2 rounded-full font-medium`, className)}
      {...restProps}
    >
      <Image
        src="/image/ic_apple_pay.png"
        className=" h-7 w-auto object-contain"
      />
    </Button>
  );
}
