"use client";
import React, { useEffect, useState } from "react";
import PageType from "../../generic/utility/PageType";
import { pageTypes } from "@/lib/core/basic/Constants";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import {
  Account,
  AccountContent,
  AccountFooter,
  AccountSection,
} from "../../generic/pure/account";
import { Texts, getText } from "@/lib/assets/text";
import Spacing from "../../generic/pure/spacing";
import useUserStore from "@/lib/data/stores/UserStore";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import { usePathname, useRouter } from "next/navigation";
import { Map_Drawer } from "../construct/drawer/Map_Drawer";
import { CustomerModel } from "@/lib/data/models/CustomerModel";
import ConfirmAddress_Btn from "../part/button/ConfirmAddress_Btn";
import { setCartAddress } from "@/lib/network/client/gql/cart";
import AddAddress_Btn from "../part/button/AddAddress_Btn";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { CartModel } from "@/lib/data/models/CartModel";
import { getCustomer } from "@/lib/network/client/gql/customer";
import { useToast } from "../../generic/ui/use-toast";
import Address_Card from "../construct/card/Address_Card";
import { getValidCartShippingAddressId } from "@/lib/controller/addressController";
// import { SaveAddress_Drawer } from "../construct/drawer/SaveAddress_Drawer";
import Page_Transition from "../part/transition/Page_Transition";

type Props = {
  storeCode: string;
};

export default function AddressPage({ storeCode }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const { customer, cart } = useUserStore((state) => state);
  const [customerState, setCustomerState] = useState<CustomerModel | null>(
    null,
  );

  // ==============================================================================

  async function initialCustomerDataRefresh() {
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

  useEffect(() => {
    initialCustomerDataRefresh();
  }, []);

  // ==============================================================================

  useEffect(() => {
    if (customer) {
      setCustomerState(customer);
    } else {
      if (pathname.includes("/checkout")) {
        router.push(`/${storeCode}/checkout/login`);
      } else {
        router.push(`/${storeCode}/account/login`);
      }
    }
  }, [customer]);

  // ==============================================================================

  const [editAddressId, setEditAddressId] = useState<
    number | undefined | null
  >();

  const [openMap, setOpenMap] = useState<boolean>(false);
  const [openSaveAddressDrawer, setOpenSaveAddressDrawer] =
    useState<boolean>(false);

  async function handleSetAddressOnCart() {
    if (!!choosenAddressId) {
      const setAddressOnCartData = await setCartAddress({
        addressId: choosenAddressId,
      });

      if (setAddressOnCartData?.success) {
        useUserStore.setState({ cart: setAddressOnCartData?.cart });
        if (setAddressOnCartData?.cart) {
          new GtmEvents({
            gtmCart: CartModel?.toGtm(setAddressOnCartData?.cart),
          })?.addShippiingInfo();
        }
        router.push(`/${storeCode}/checkout/billing`);
      } else {
        toast({
          description: setAddressOnCartData?.errorMessage,
          variant: "destructive",
        });
      }
    } else {
      toast({
        description: getText({ storeCode, text: Texts?.pleaseAddYourAddress }),
        variant: "destructive",
      });
    }
  }

  // ==============================================================================

  const [choosenAddressId, setChoosenAddressId] = useState<number | undefined>(
    Number(getValidCartShippingAddressId() ?? customer?.addresses?.at(-1)?.id),
  );

  // to set initial address selection
  useEffect(() => {
    setChoosenAddressId(
      Number(
        getValidCartShippingAddressId() ?? customer?.addresses?.at(-1)?.id,
      ),
    );
  }, [customer?.addresses]);

  return (
    <Page_Transition>
      <Account className={` max-w-lg lg:mx-auto`}>
        <Spacing value={6} />
        <AccountSection className=" flex items-center justify-center gap-4">
          <AddAddress_Btn
            storeCode={storeCode}
            onClick={() => {
              setEditAddressId(null);
              setOpenMap(true);
              setOpenSaveAddressDrawer(true);
            }}
          />
        </AccountSection>
        <Spacing value={6} />
        <AccountContent>
          <AccountSection className="mx-5 flex flex-col gap-4">
            {customerState?.addresses
              ?.map((address, index) => {
                return (
                  <Address_Card
                    key={index}
                    id={address?.id?.toString()}
                    address={address}
                    setEditAddressId={setEditAddressId}
                    setOpenMap={setOpenMap}
                    setOpenSaveAddressDrawer={setOpenSaveAddressDrawer}
                    choosenAddressId={choosenAddressId}
                    setChoosenAddressId={setChoosenAddressId}
                  />
                );
              })
              ?.reverse()}
          </AccountSection>
        </AccountContent>
        <Spacing value={6} />
        <AccountFooter>
          <AccountSection className=" flex items-center justify-center gap-4">
            {customerState && pathname?.includes("/checkout/shipping") && (
              <ConfirmAddress_Btn
                storeCode={storeCode}
                className="fixed bottom-16 left-0 z-10 w-full max-w-md bg-fixed_btn_container_background px-5 pb-5 pt-2 lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2"
                onClick={handleSetAddressOnCart}
              />
            )}
          </AccountSection>
        </AccountFooter>
        <Spacing value={40} />
        {/* Map_Drawer */}
        <Map_Drawer
          storeCode={storeCode}
          editAddressId={editAddressId}
          openMapDrawer={openMap}
          setOpenMapDrawer={setOpenMap}
        />
        {/* Address Drawer */}
        {/* <SaveAddress_Drawer
          storeCode={storeCode}
          editAddressId={editAddressId}
          openSaveAddressDrawer={openSaveAddressDrawer}
          setOpenSaveAddressDrawer={setOpenSaveAddressDrawer}
        /> */}
        <PageType pageType={pageTypes.address} />
        <HeaderOptions
          headerOptions={{
            showHeader: true,
            withBackButton: true,
            withLogo: false,
            withSearch: false,
            searchExpanded: false,
            title: getText({ storeCode, text: Texts.myAddress }),
          }}
        />
        <NavbarOptions navbarOptions={{ showNavbar: true }} />
      </Account>
    </Page_Transition>
  );
}
