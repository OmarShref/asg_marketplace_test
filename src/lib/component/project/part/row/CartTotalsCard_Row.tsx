import Spacing from "@/lib/component/generic/pure/spacing";
import { Separator } from "@/lib/component/generic/ui/separator";
import { cn } from "@/lib/utils/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

interface CartTotalsCardRowProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  withSeparator?: boolean;
}

const CartTotalsCardRow = forwardRef<HTMLDivElement, CartTotalsCardRowProps>(
  ({ className, children, withSeparator = true, ...props }, ref) => {
    return (
      <>
        <div
          ref={ref}
          className={cn(" flex items-center justify-between", className)}
          {...props}
        >
          {children}
        </div>
        {withSeparator && (
          <>
            <Spacing value={2} />
            <Separator />
            <Spacing value={2} />
          </>
        )}
      </>
    );
  },
);
CartTotalsCardRow.displayName = "CartTotalsCardRow";

// ===================================================================================

const CartTotalsCardRowLabelVariants = cva("", {
  variants: {
    variant: {
      default: "",
      big: " text-lg font-semibold",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CartTotalsCardRowLabelProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof CartTotalsCardRowLabelVariants> {
  asChild?: boolean;
  details?: string;
}

const CartTotalsCardRowLabel = forwardRef<
  HTMLParagraphElement,
  CartTotalsCardRowLabelProps
>(({ className, children, variant, details = false, ...props }, ref) => {
  return (
    <div className="flex items-center justify-start gap-2">
      <p
        ref={ref}
        className={cn(CartTotalsCardRowLabelVariants({ variant, className }))}
        {...props}
      >
        {children}
      </p>
      {details && <p className=" text-xs text-faint_text">{details}</p>}
    </div>
  );
});
CartTotalsCardRowLabel.displayName = "CartTotalsCardRowLabel";

// ===================================================================================

const CartTotalsCardRowValueVariants = cva("font-semibold text-lg", {
  variants: {
    variant: {
      default: "",
      active: "text-positive_text",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CartTotalsCardRowValueProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof CartTotalsCardRowValueVariants> {
  asChild?: boolean;
}

const CartTotalsCardRowValue = forwardRef<
  HTMLParagraphElement,
  CartTotalsCardRowValueProps
>(({ className, children, variant, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(CartTotalsCardRowValueVariants({ variant, className }))}
      {...props}
    >
      {children}
    </p>
  );
});
CartTotalsCardRowValue.displayName = "CartTotalsCardRowValue";

// ===================================================================================

export { CartTotalsCardRow, CartTotalsCardRowLabel, CartTotalsCardRowValue };
