"use client";
import useUtilityStore, {
  NavbarOptionsType,
} from "@/lib/data/stores/UtilityStore";
import { useEffect } from "react";

type Props = {
  navbarOptions: NavbarOptionsType;
};
export default function NavbarOptions({ navbarOptions }: Props) {
  useEffect(() => {
    useUtilityStore.setState({ navbarOptions: navbarOptions });
  }, []);
  return null;
}
