"use client";
import PageType from "../../generic/utility/PageType";
import { pageTypes } from "@/lib/core/basic/Constants";
import { MenuModel } from "@/lib/data/models/MenuModel";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import Menu_Tabs from "../construct/tabs/Menu_Tabs";
import Page_Transition from "../part/transition/Page_Transition";

type Props = {
  storeCode: string;
  menu: MenuModel;
};

export default function MenuPage({ storeCode, menu }: Props) {
  return (
    <Page_Transition>
      <main className={` pb-20`}>
        <Menu_Tabs storeCode={storeCode} menu={menu} />
        <PageType pageType={pageTypes.menu} />
        <HeaderOptions
          headerOptions={{
            showHeader: true,
            withBackButton: true,
            withLogo: true,
            withSearch: true,
            searchExpanded: false,
            withBurgerButton: true,
            withWishlist: true,
          }}
        />
        <NavbarOptions navbarOptions={{ showNavbar: true }} />
      </main>
    </Page_Transition>
  );
}
