import * as React from "react";
import { cn } from "@/lib/utils/utils";

const Cart = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <main ref={ref} className={cn("", className)} {...props}>
        {children}
      </main>
    );
  },
);
Cart.displayName = "Cart";

// ====================================================================================

const CartSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <section ref={ref} className={cn("", className)} {...props}>
      {children}
    </section>
  );
});
CartSection.displayName = "CartSection";

// ====================================================================================

const CartHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
CartHeader.displayName = "CartHeader";

// ====================================================================================

const CartContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
CartContent.displayName = "CartContent";

// ====================================================================================

const CartFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
CartFooter.displayName = "CartFooter";

// ====================================================================================

export { Cart, CartSection, CartHeader, CartContent, CartFooter };
