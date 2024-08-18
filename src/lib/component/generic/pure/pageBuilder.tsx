import * as React from "react";
import { cn } from "@/lib/utils/utils";
import Spacing from "./spacing";

const PageBuilder = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <main ref={ref} className={cn("", className)} {...props}>
      {children}
    </main>
  );
});
PageBuilder.displayName = "PageBuilder";

// ====================================================================================

const Row = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <>
        <section
          ref={ref}
          className={cn(
            " flex flex-nowrap items-stretch justify-center",
            className,
          )}
          {...props}
        >
          {children}
        </section>
      </>
    );
  },
);
Row.displayName = "Row";

// ====================================================================================

const Column = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn(" grid ", className)} {...props}>
        {children}
      </section>
    );
  },
);
Column.displayName = "Column";

// ====================================================================================

export { PageBuilder, Row, Column };
