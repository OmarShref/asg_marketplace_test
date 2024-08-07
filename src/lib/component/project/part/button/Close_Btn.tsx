"use client";
import { CloseIcon } from "@/lib/assets/svg";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Close_Btn({ className, ...props }: Props) {
  return (
    <Button className={cn(" h-5 w-5", className)} {...props}>
      <CloseIcon className=" h-full w-full" />
    </Button>
  );
}
