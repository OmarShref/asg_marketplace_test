import * as React from "react";
import { cn } from "@/lib/utils/utils";

const Account = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <main ref={ref} className={cn("", className)} {...props}>
      {children}
    </main>
  );
});
Account.displayName = "Account";

// ====================================================================================

const AccountSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <section ref={ref} className={cn("", className)} {...props}>
      {children}
    </section>
  );
});
AccountSection.displayName = "AccountSection";

// ====================================================================================

const AccountSectionTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(" text-sub_secondry_text", className)}
      {...props}
    >
      {children}
    </p>
  );
});
AccountSectionTitle.displayName = "AccountSectionTitle";

// ====================================================================================

const AccountHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
AccountHeader.displayName = "AccountHeader";

// ====================================================================================

const AccountContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
AccountContent.displayName = "AccountContent";

// ====================================================================================

const AccountFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  );
});
AccountFooter.displayName = "AccountFooter";

// ====================================================================================

export {
  Account,
  AccountSection,
  AccountSectionTitle,
  AccountHeader,
  AccountContent,
  AccountFooter,
};
