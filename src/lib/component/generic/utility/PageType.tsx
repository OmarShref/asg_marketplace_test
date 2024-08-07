"use client";

import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { useEffect } from "react";

type Props = {
  pageType: string;
};

export default function PageType({ pageType }: Props) {
  useEffect(() => {
    useUtilityStore.setState({ pageType: pageType });
  }, [pageType]);
  return null;
}
