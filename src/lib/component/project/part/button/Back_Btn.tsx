"use client";
import { Button } from "@/lib/component/generic/ui/button";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@/lib/assets/svg";
import { cn } from "@/lib/utils/utils";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function Back_Btn({ className, onClick }: Props) {
  const router = useRouter();
  return (
    <Button
      variant={"circle"}
      className={cn(
        " w-9 bg-background text-primary_text shadow-circular_btn",
        className,
      )}
      onClick={
        onClick
          ? onClick
          : () => {
              router.back();
            }
      }
    >
      <ChevronRightIcon />
    </Button>
  );
}
