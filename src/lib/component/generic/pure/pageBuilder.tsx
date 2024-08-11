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
          className={cn(" flex w-full items-center justify-center", className)}
          {...props}
        >
          {children}
        </section>
        <Spacing value={2} />
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
        className={cn(" text-xs text-faint_text", className)}
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