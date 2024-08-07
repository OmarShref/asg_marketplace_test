import * as React from "react";

import { cn } from "@/lib/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";

const GridVariants = cva(
  "mx-5 grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  {
    variants: {
      variant: {
        default: "",
        one_colomn:
          "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof GridVariants> {
  asChild?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, variant, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(GridVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  ),
);
Grid.displayName = "Grid";

export { Grid };
