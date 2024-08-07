"use client";
import useUserStore from "@/lib/data/stores/UserStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  storeCode: string;
};

export default function CheckCustomerInfoUpdated({ storeCode }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { customer } = useUserStore((state) => state);
  useEffect(() => {
    if (customer?.token && !customer?.gender) {
      router.push(`/${storeCode}/account/info`);
    }
  }, [customer, pathname]);
  return null;
}
