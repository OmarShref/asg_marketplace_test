import * as React from "react";
import { cn } from "@/lib/utils/utils";

const Review = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <main ref={ref} className={cn("", className)} {...props}>
        {children}
      </main>
    );
  },
);
Review.displayName = "Review";

// ====================================================================================

const ReviewSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <section ref={ref} className={cn("", className)} {...props}>
      {children}
    </section>
  );
});
ReviewSection.displayName = "ReviewSection";

// ====================================================================================

const ReviewRatingNumber = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(" text-[40px] font-semibold", className)}
      {...props}
    >
      {children}
    </p>
  );
});
ReviewRatingNumber.displayName = "ReviewRatingNumber";

// ====================================================================================

const ReviewCount = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(" text-faint_text text-xs", className)}
      {...props}
    >
      {children}
    </p>
  );
});
ReviewCount.displayName = "ReviewCount";

// ====================================================================================

export { Review, ReviewSection, ReviewRatingNumber, ReviewCount };
