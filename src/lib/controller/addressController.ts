import useUserStore from "../data/stores/UserStore";

export function getValidCartShippingAddressId() {
  const validCartShippingAddressId = useUserStore
    ?.getState()
    ?.customer?.addresses?.find(
      (address) =>
        address?.id?.toString() ===
        useUserStore?.getState()?.cart?.shippingAddress?.id?.toString(),
    )?.id;
  return validCartShippingAddressId;
}
