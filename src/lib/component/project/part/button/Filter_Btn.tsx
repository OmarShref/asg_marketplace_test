"use client";
import { FilterIcon } from "@/lib/assets/svg";
import { Button } from "@/lib/component/generic/ui/button";
import { PageProps } from "@/lib/data/types/PageProps";
import Itemcount_Label from "../label/Itemcount_Label";
import { forwardRef } from "react";

interface FilterBtnInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    PageProps {}
const Filter_Btn = forwardRef<HTMLButtonElement, FilterBtnInterface>(
  ({ params, searchParams, ...props }, ref) => {
    const appliedFilters =
      searchParams?.customFilter
        ?.split(";")
        ?.map((filter) => {
          const options = filter?.split(",");
          return options?.length;
        })
        ?.reduce((a, b) => a + b, 0) ?? 0;
    return (
      <Button
        ref={ref}
        variant={"circle"}
        className=" w-9 bg-rounded_btn_background_light"
        {...props}
      >
        <FilterIcon />
        {appliedFilters > 0 && (
          <Itemcount_Label
            value={`${appliedFilters}`}
            className="  font-montserrat-remove bottom-0 left-0"
          />
        )}
      </Button>
    );
  },
);

Filter_Btn.displayName = "Filter_Btn";

export { Filter_Btn };
