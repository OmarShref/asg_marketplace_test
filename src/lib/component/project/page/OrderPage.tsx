"use client";
import React, { useEffect, useState } from "react";
import PageType from "../../generic/utility/PageType";
import { pageTypes } from "@/lib/core/basic/Constants";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import {
  Account,
  AccountContent,
  AccountHeader,
} from "../../generic/pure/account";
import { Texts, getText } from "@/lib/assets/text";
import Spacing from "../../generic/pure/spacing";
import useUserStore from "@/lib/data/stores/UserStore";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import { PageProps } from "@/lib/data/types/PageProps";
import { getOrders } from "@/lib/network/repo/client_repos/gql/customer";
import { CustomerModel } from "@/lib/data/models/CustomerModel";
import Order_Card from "../construct/card/Order_Card";
import { OrderDetails_Drawer } from "../construct/drawer/OrderDetails_Drawer";
import { OrderItemType } from "@/lib/data/models/OrderModel";
import Page_Transition from "../part/transition/Page_Transition";

interface Props extends PageProps {}

export default function OrderPage({ params, searchParams }: Props) {
  const { customer } = useUserStore((state) => state);
  const [customerState, setCustomerState] = useState<CustomerModel | null>(
    null,
  );
  useEffect(() => {
    if (customer) {
      setCustomerState(customer);
    }
  }, [customer]);

  async function handleGetOrders() {
    const orders = await getOrders({
      page: 1,
      pageSize: 100,
    });

    const customerWithOrders = {
      ...customer,
      orders: orders,
    } as CustomerModel;

    useUserStore.setState({
      customer: customerWithOrders,
    });
  }

  useEffect(() => {
    handleGetOrders();
  }, []);

  // ================================================================================================

  const [openOrderDetailsDrawer, setOpenOrderDetailsDrawer] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderItemType | null>(null);

  return (
    <Page_Transition>
      <Account className={` mx-6 max-w-md lg:mx-auto`}>
        <AccountHeader></AccountHeader>
        <Spacing value={6} />
        <AccountContent className="flex flex-col gap-4">
          {customerState?.orders?.items
            ?.map((order, index) => {
              return (
                <Order_Card
                  key={index}
                  storeCode={params.storeCode}
                  order={order}
                  setCurrentOrder={setCurrentOrder}
                  setOpenOrderDetailsDrawer={setOpenOrderDetailsDrawer}
                />
              );
            })
            ?.reverse()}
        </AccountContent>
        <Spacing value={40} />
        <OrderDetails_Drawer
          storeCode={params?.storeCode}
          order={currentOrder}
          openOrderDetailsDrawer={openOrderDetailsDrawer}
          setOpenOrderDetailsDrawer={setOpenOrderDetailsDrawer}
        />
        <PageType pageType={pageTypes.order} />
        <HeaderOptions
          headerOptions={{
            showHeader: true,
            withBackButton: true,
            withLogo: false,
            withSearch: false,
            searchExpanded: false,
            title: getText({
              storeCode: params.storeCode,
              text: Texts.myOrders,
            }),
          }}
        />
        <NavbarOptions navbarOptions={{ showNavbar: true }} />
      </Account>
    </Page_Transition>
  );
}
