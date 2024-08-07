"use client";
import { Button } from "@/lib/component/generic/ui/button";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@/lib/assets/svg";
import { cn } from "@/lib/utils/utils";
import { MenuIcon } from "lucide-react";
import Anchor from "@/lib/component/generic/pure/anchor";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function Burger_Btn({ className, onClick, storeCode }: Props) {
  const router = useRouter();
  return (
    <Button
      variant={"circle"}
      className={cn(
        " w-9 bg-background text-primary_text shadow-circular_btn",
        className,
      )}
      onClick={onClick}
    >
      <Anchor href={`/${storeCode}/menu`}>
        <MenuIcon className="" />
      </Anchor>
    </Button>
  );
}
