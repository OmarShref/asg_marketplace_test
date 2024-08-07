"use client";
import useUtilityStore, {
  HeaderOptionsType,
} from "@/lib/data/stores/UtilityStore";
import { useEffect } from "react";

type Props = {
  headerOptions: HeaderOptionsType;
};
export default function HeaderOptions({ headerOptions }: Props) {
  useEffect(() => {
    useUtilityStore.setState({ headerOptions: headerOptions });
  }, []);
  return null;
}
