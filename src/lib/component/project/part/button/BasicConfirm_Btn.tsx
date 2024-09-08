"use client";
import { Button } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function BasicConfirm_Btn({
  children,
  className,
  ...restProps
}: Props) {
  return (
    <Button
      variant={"rounded"}
      className={cn(
        ` w-full gap-2 rounded-lg bg-black py-2 text-base font-medium text-background`,
        className,
      )}
      {...restProps}
    >
      {children}
    </Button>
  );
}
