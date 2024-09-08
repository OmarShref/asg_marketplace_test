"use client";
import useUserStore from "@/lib/data/stores/UserStore";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { generateUniqueId } from "@/lib/helper/uid";
import { useEffect } from "react";

type Props = {
  storeCode: string;
};

export default function ClientStore_Provider({ storeCode }: Props) {
  const { anonymousId } = useUserStore((state) => state);
  useEffect(() => {
    useUtilityStore.setState({ storeCode: storeCode });

    // generate anonymous id if there is not
    if (!anonymousId) {
      useUserStore.setState({ anonymousId: generateUniqueId() });
    }
  }, []);
  return null;
}
