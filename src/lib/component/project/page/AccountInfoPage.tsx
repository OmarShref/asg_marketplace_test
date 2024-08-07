"use client";
import React, { useEffect } from "react";
import PageType from "../../generic/utility/PageType";
import { pageTypes } from "@/lib/core/basic/Constants";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import {
  Account,
  AccountContent,
  AccountFooter,
  AccountSection,
  AccountSectionTitle,
} from "../../generic/pure/account";
import { Texts, getText } from "@/lib/assets/text";
import Spacing from "../../generic/pure/spacing";
import useUserStore from "@/lib/data/stores/UserStore";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import { UpdateAccountInfo_Form } from "../construct/form/UpdateAccountInfo_Form";
import Logout_Btn from "../part/button/Logout_Btn";
import { useRouter } from "next/navigation";
import Page_Transition from "../part/transition/Page_Transition";

type Props = {
  storeCode: string;
};

export default function AccountInfoPage({ storeCode }: Props) {
  const router = useRouter();
  const { customer } = useUserStore((state) => state);
  useEffect(() => {
    if (!customer) {
      router.push(`/${storeCode}/account`);
    }
  }, [customer]);

  return (
    <Page_Transition>
      <Account className={` mx-6 max-w-md lg:mx-auto`}>
        <Spacing value={6} />
        <AccountContent>
          <AccountSection>
            <AccountSectionTitle>
              {getText({ storeCode, text: Texts.accountInfo })}
            </AccountSectionTitle>
            <Spacing value={6} />
            <UpdateAccountInfo_Form storeCode={storeCode} />
          </AccountSection>
        </AccountContent>
        <Spacing value={6} />
        <AccountFooter>
          <AccountSection className=" flex items-center justify-center gap-4">
            <Logout_Btn storeCode={storeCode} />
          </AccountSection>
        </AccountFooter>
        <Spacing value={40} />
        <PageType pageType={pageTypes.account} />
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
      </Account>
    </Page_Transition>
  );
}
