import * as React from "react";
import { cn } from "@/lib/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "../ui/button";
import { FilterOptionType } from "@/lib/data/models/FilterModel";

const Filter = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("", className)} {...props}>
        {children}
      </section>
    );
  },
);
Filter.displayName = "Filter";

// ====================================================================================

const FilterSection = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <section ref={ref} className={cn(" px-4 py-3", className)} {...props}>
      {children}
    </section>
  );
});
FilterSection.displayName = "FilterSection";

// ====================================================================================

const FilterHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
FilterHeader.displayName = "FilterHeader";

// ====================================================================================

const FilterTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p ref={ref} className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </p>
  );
});
FilterTitle.displayName = "FilterTitle";

// ====================================================================================

const FilterContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
FilterContent.displayName = "FilterContent";

// ====================================================================================

const FilterOptions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        " flex flex-wrap items-center justify-start gap-3 md:gap-1.5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
FilterOptions.displayName = "FilterOptions";

// ====================================================================================

const FilterOptionVariants = cva(
  " md:w-full md:justify-start gap-3 md:py-1.5 md:px-3 relative",
  {
    variants: {
      variant: {
        default: " ",
        swatch: " ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface FilterOptionProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof FilterOptionVariants> {
  asChild?: boolean;
  filterOption?: FilterOptionType;
  isStaged?: boolean;
}

const FilterOption = React.forwardRef<HTMLButtonElement, FilterOptionProps>(
  ({ className, children, variant, filterOption, isStaged, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          `md:before:absolute  md:before:start-0 md:before:top-0 md:before:h-full md:before:w-1 md:before:rounded-e-sm md:before:transition-all ${
            isStaged
              ? "md:bg-accent/[.11] md:before:bg-accent"
              : " md:before:bg-transparent"
          }`,
          FilterOptionVariants({ variant, className }),
        )}
        {...props}
      >
        {filterOption?.swatchType !== "text" && (
          <div
            className={`aspect-square w-10 overflow-hidden rounded-full bg-cover bg-center bg-no-repeat shadow-md ring-2 md:w-6 ${
              isStaged
                ? " ring-filter_option_border md-max:ring-accent"
                : "ring-filter_option_border"
            }`}
            style={{
              backgroundColor: filterOption?.swatchValue,
              backgroundImage: filterOption?.swatchValue
                ? `url(${filterOption?.swatchValue})`
                : "",
            }}
          ></div>
        )}

        {/* ==================================================== */}

        {filterOption?.label && (
          <p
            className={` font-montserrat-remove md-max:min-w-10 md-max:rounded-lg md-max:py-1 md-max:ring-2 ${
              isStaged
                ? "md-max:text-accent md-max:ring-accent"
                : "md-max:ring-filter_option_border"
            } ${variant === "swatch" ? "md-max:hidden" : ""} `}
          >
            {!!filterOption?.label ? filterOption?.label : ""}
          </p>
        )}

        {/* ==================================================== */}

        {filterOption?.count && (
          <p
            className={` font-montserrat-remove text-xs text-sub_secondry_text md-max:hidden`}
          >
            {!!filterOption?.count ? `(${filterOption?.count})` : ""}
          </p>
        )}
      </Button>
    );
  },
);
FilterOption.displayName = "FilterOption";

// ====================================================================================

export {
  Filter,
  FilterSection,
  FilterHeader,
  FilterTitle,
  FilterContent,
  FilterOptions,
  FilterOption,
};
