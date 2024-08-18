"use client";
import { Button } from "@/lib/component/generic/ui/button";
import { PageProps } from "@/lib/data/types/PageProps";
import Itemcount_Label from "../label/Itemcount_Label";
import { forwardRef } from "react";
import { FilterIcon } from "lucide-react";

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
        className=" bg-secondary w-9"
        {...props}
      >
        <FilterIcon className=" h-auto w-5 text-accent" />
        {appliedFilters > 0 && (
          <Itemcount_Label
            value={`${appliedFilters}`}
            className="  bottom-0 left-0 font-fontEnglish"
          />
        )}
      </Button>
    );
  },
);

Filter_Btn.displayName = "Filter_Btn";

export { Filter_Btn };
