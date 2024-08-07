"use client";
import { RadioGroup } from "@/lib/component/generic/ui/radio-group";
import { getDirection } from "@/lib/helper/direction";
import Address_Card from "../card/Address_Card";
import { AddressModel } from "@/lib/data/models/AddressModel";
import useUserStore from "@/lib/data/stores/UserStore";

type Props = {
  storeCode: string;
  addresses: AddressModel[] | undefined;
  setChoosenAddressId: (addressId: number) => void;
  setEditAddressId?: (addressId: number) => void;
  setOpenMap?: (open: boolean) => void;
};

//TODO remove this file later
export default function Address_RadioGroup({
  storeCode,
  addresses,
  setChoosenAddressId,
  setEditAddressId,
  setOpenMap,
}: Props) {
  const direction = getDirection(storeCode);
  const { cart } = useUserStore((state) => state);

  function handleAddressCardClick(address: AddressModel) {
    if (typeof document !== "undefined") {
      const targetRadiogroupItem = document.getElementById(
        address?.id?.toString(),
      );
      if (targetRadiogroupItem) {
        targetRadiogroupItem.click();
      }
    }
  }

  return (
    addresses && (
      <div key={addresses?.length + (addresses?.at(0)?.id ?? 0)}>
        <RadioGroup
          defaultValue={
            addresses
              ?.find(
                (address) =>
                  address?.id?.toString() ===
                  cart?.shippingAddress?.id?.toString(),
              )
              ?.id?.toString() ?? addresses?.at(-1)?.id?.toString()
          }
          style={{ direction: direction }}
          className=" mx-5 gap-4"
          onValueChange={(value) => {
            setChoosenAddressId(Number(value));
          }}
        >
          {addresses
            ?.map((address, index) => {
              return (
                <Address_Card
                  key={index}
                  id={address?.id?.toString()}
                  address={address}
                  setEditAddressId={setEditAddressId}
                  setOpenMap={setOpenMap}
                  onClick={() => {
                    handleAddressCardClick(address);
                  }}
                />
              );
            })
            .reverse()}
        </RadioGroup>
      </div>
    )
  );
}
