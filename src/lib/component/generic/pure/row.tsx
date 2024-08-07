import * as React from "react";
import { cn } from "@/lib/utils/utils";
import Spacing from "./spacing";
import { Separator } from "../ui/separator";

interface RowProps extends React.HTMLAttributes<HTMLElement> {
  withSeparator?: boolean;
  separatorClassName?: string;
}

const Row = React.forwardRef<HTMLElement, RowProps>(
  ({ className, children, withSeparator = false, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          ` flex items-center justify-between ${
            withSeparator && " border-b border-b-devider_background pb-2"
          }`,
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
);
Row.displayName = "Row";

// ====================================================================================

const RowSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
});
RowSection.displayName = "RowSection";

export { Row, RowSection };
