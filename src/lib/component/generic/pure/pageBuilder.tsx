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
            " mb-[10px] flex !flex-row items-stretch justify-between gap-[10px] px-[10px] lg:px-0",
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
      <section
        ref={ref}
        className={cn(" relative grid gap-[10px]", className)}
        {...props}
      >
        {children}
      </section>
    );
  },
);
Column.displayName = "Column";

// ====================================================================================

export { PageBuilder, Row, Column };
