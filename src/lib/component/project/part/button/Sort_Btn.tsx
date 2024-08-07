"use client";
import { TriangleDownIcon } from "@/lib/assets/svg";
import { Button } from "@/lib/component/generic/ui/button";
import { ButtonProps } from "@/lib/component/generic/ui/button";
import { forwardRef } from "react";

interface Props extends ButtonProps {
  sortText: string;
}

const Sort_Btn = forwardRef<HTMLButtonElement, Props>(
  ({ sortText, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={"rounded"}
        className=" flex w-auto items-center justify-between gap-1 bg-rounded_btn_background_light px-2 py-2 "
        {...props}
      >
        <p className=" text-xs font-light text-secondry_text md:text-base">
          {sortText}
        </p>
        <TriangleDownIcon className=" w-4 h-auto text-accent md:w-6" />
      </Button>
    );
  }
);

Sort_Btn.displayName = "Sort_Btn";

export { Sort_Btn };
