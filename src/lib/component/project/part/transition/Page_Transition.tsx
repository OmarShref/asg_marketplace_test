"use client";
import { cn } from "@/lib/utils/utils";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Page_Transition({ children, className }: Props) {
  return (
    <motion.div
      transition={{ duration: 0.4, ease: "easeInOut" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn("z-[1]", className)}
    >
      {children}
    </motion.div>
  );
}
