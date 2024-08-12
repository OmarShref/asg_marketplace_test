"use client";
import { TriangleDownIcon } from "@/lib/assets/svg";
import { Button } from "@/lib/component/generic/ui/button";
import { ButtonProps } from "@/lib/component/generic/ui/button";
import { cn } from "@/lib/utils/utils";
import { forwardRef } from "react";

interface Props extends ButtonProps {
  sortText: string;
}

const Sort_Btn = forwardRef<HTMLButtonElement, Props>(
  ({ sortText, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          " flex w-auto items-center justify-between gap-1 bg-slate-100 px-2 py-1 ",
          className,
        )}
        {...props}
      >
        <p className="  text-sm font-light text-secondry_text md:text-base">
          {sortText}
        </p>
        <TriangleDownIcon className=" h-auto w-4 text-accent md:w-6" />
      </Button>
    );
  },
);

Sort_Btn.displayName = "Sort_Btn";

export { Sort_Btn };
