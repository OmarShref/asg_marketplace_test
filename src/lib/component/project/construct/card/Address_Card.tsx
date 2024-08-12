"use client";
import {
  Card,
  CardContent,
  CardSection,
} from "@/lib/component/generic/ui/card";
import { EditIcon } from "@/lib/assets/svg";
import Spacing from "@/lib/component/generic/pure/spacing";
import { AddressModel } from "@/lib/data/models/AddressModel";
import { Button } from "@/lib/component/generic/ui/button";
import { getCustomer, removeAddress } from "@/lib/network/client/gql/customer";
import useUserStore from "@/lib/data/stores/UserStore";
import { TrashIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  address: AddressModel;
  setEditAddressId?: (addressId: number) => void;
  setOpenMap?: (open: boolean) => void;
  setOpenSaveAddressDrawer?: (open: boolean) => void;
  choosenAddressId?: number;
  setChoosenAddressId?: (addressId: number) => void;
}

export default function Address_Card({
  address,
  setEditAddressId,
  setOpenMap,
  setOpenSaveAddressDrawer,
  choosenAddressId,
  setChoosenAddressId,
}: Props) {
  const pathname = usePathname();

  async function handleRemoveAddress() {
    const removeAddressData = await removeAddress({
      editAddressId: address?.id,
    });
    if (removeAddressData) {
      const getCustomerData = await getCustomer();
      if (getCustomerData?.customer?.id) {
        useUserStore.setState({
          customer: {
            ...useUserStore.getState().customer,
            ...getCustomerData?.customer,
          },
          cart: getCustomerData?.cart,
          customerRewardPoints: getCustomerData?.customerRewardPoints,
        });
      }
    }
  }

  function handleAddressCardClick(address: AddressModel) {
    if (!!setChoosenAddressId) {
      setChoosenAddressId(Number(address?.id));
    }
  }

  return (
    <Card
      className={` rounded-xl bg-background px-5 py-3 shadow-address_card ${
        choosenAddressId?.toString() === address?.id?.toString() &&
        pathname?.includes("checkout")
          ? " ring-4 ring-accent"
          : " ring-1 ring-slate-300"
      }`}
      onClick={() => {
        handleAddressCardClick(address);
      }}
    >
      <CardContent className=" flex items-stretch justify-between gap-4 font-light">
        <CardSection>
          <Spacing value={1} />
        </CardSection>
        <CardSection className=" flex-1">
          <p className=" font-fontEnglish h-auto max-h-[72px] overflow-clip text-base ">
            {address?.street}
          </p>
          <Spacing value={1} />
          <p className=" text-sm text-sub_secondry_text">
            {`${address?.firstName} ${address?.lastName} • ${address?.phone}`}
          </p>
        </CardSection>
        <CardSection className=" flex flex-col justify-between">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setEditAddressId?.(address?.id);
              setOpenMap?.(true);
              setOpenSaveAddressDrawer?.(true);
            }}
          >
            <EditIcon className=" h-5 w-5 text-accent" />
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemoveAddress();
            }}
          >
            <TrashIcon className=" h-5 w-5 text-accent" />
          </Button>
        </CardSection>
      </CardContent>
    </Card>
  );
}
