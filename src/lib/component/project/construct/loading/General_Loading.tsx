"use client";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { Loader2Icon } from "lucide-react";

type Props = {};

export default function General_Loading({}: Props) {
  const { generalLoading } = useUtilityStore((state) => state);
  return (
    generalLoading && (
      <div className=" fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-sm">
        <div className=" rounded-lg bg-background p-2 ring-1 ring-accent">
          <Loader2Icon className=" mx-auto block h-8 w-8 animate-spin text-accent" />
        </div>
      </div>
    )
  );
}
