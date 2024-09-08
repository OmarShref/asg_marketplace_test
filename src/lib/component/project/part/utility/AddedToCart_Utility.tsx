"use client";
import dynamic from "next/dynamic";
const AddedToCart_Drawer = dynamic(
  () => import("@/lib/component/project/construct/drawer/AddedToCart_Drawer"),
);
const AddedToCart_Sheet = dynamic(
  () => import("@/lib/component/project/construct/sheet/AddedToCart_Sheet"),
);

type Props = {
  isSmallDevice?: boolean;
};

export default function AddedToCart_Utility({ isSmallDevice }: Props) {
  return isSmallDevice ? <AddedToCart_Drawer /> : <AddedToCart_Sheet />;
}
