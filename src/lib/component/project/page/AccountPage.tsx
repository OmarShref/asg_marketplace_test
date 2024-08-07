"use client";
import React, { Fragment, useEffect, useState } from "react";
import PageType from "../../generic/utility/PageType";
import { pageTypes } from "@/lib/core/basic/Constants";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import {
  Account,
  AccountContent,
  AccountFooter,
  AccountHeader,
  AccountSection,
  AccountSectionTitle,
} from "../../generic/pure/account";
import { Texts, getText } from "@/lib/assets/text";
import Spacing from "../../generic/pure/spacing";
import { ChevronLeftIcon, CircleUserIcon, LinkedinIcon } from "lucide-react";
import AccountInfo_Btn from "../part/button/AccountInfo_Btn";
import AccountUtility_Bar from "../construct/bar/AccountUtility_Bar";
import { Country_Drawer } from "../construct/drawer/Country_Drawer";
import { Language_Drawer } from "../construct/drawer/Language_Drawer";
import { CustomerRewardPoints_Drawer } from "../construct/drawer/CustomerRewardPoints_Drawer";
import { ConfigurationModel } from "@/lib/data/models/ConfigurationModel";
import Anchor from "../../generic/pure/anchor";
import { Row, RowSection } from "../../generic/pure/row";
import {
  FacebookIcon,
  InstagramIcon,
  SnapChatIcon,
  TwitterIcon,
} from "@/lib/assets/svg";
import { getDirection } from "@/lib/helper/direction";
import useUserStore from "@/lib/data/stores/UserStore";
import { Button } from "../../generic/ui/button";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import { useRouter } from "next/navigation";
import { CustomerModel } from "@/lib/data/models/CustomerModel";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import Cms from "../construct/pageBuilder/Cms";
import Page_Transition from "../part/transition/Page_Transition";

type Props = {
  storeCode: string;
  configuration: ConfigurationModel;
  cms: CmsPageModel | undefined;
};

export default function AccountPage({ storeCode, configuration, cms }: Props) {
  const router = useRouter();

  const { customer } = useUserStore((state) => state);
  const [customerState, setCustomerState] = useState<CustomerModel | null>();
  useEffect(() => {
    setCustomerState(customer);
  }, [customer]);

  const direction = getDirection(storeCode);
  return (
    <Page_Transition>
      <Account className=" mx-6 max-w-md lg:mx-auto">
        <Spacing value={10} />
        <AccountHeader>
          {customerState && (
            <AccountSection>
              <AccountSectionTitle>
                {getText({ storeCode, text: Texts.myAccount })}
              </AccountSectionTitle>
              <Spacing value={3} />
              {/* TODO: split this row in outer component */}
              <Row className=" rounded-lg bg-active_row_background px-3 py-2">
                <RowSection className=" flex items-center gap-2">
                  <CircleUserIcon className=" h-8 w-8 text-accent" />
                  <p className=" text-secondry_text">{`${customerState.firstName} ${customerState.lastName}`}</p>
                </RowSection>
                <RowSection>
                  <AccountInfo_Btn
                    storeCode={storeCode}
                    onClick={() => {
                      router.push(`/${storeCode}/account/info`);
                    }}
                  />
                </RowSection>
              </Row>
            </AccountSection>
          )}
          {!customerState && (
            <Anchor href={`/${storeCode}/account/login`}>
              {/* TODO: split this anchor and button in outer component */}
              <Button className=" w-full rounded-full bg-black py-2 text-lg text-white">
                {getText({ storeCode, text: Texts.login })}
              </Button>
            </Anchor>
          )}
        </AccountHeader>
        <Spacing value={6} />
        <AccountContent>
          {customerState && <AccountUtility_Bar storeCode={storeCode} />}
          <Spacing value={4} />
          <Cms storeCode={storeCode} cms={cms} classNameArray={["p-0"]} />
          <Spacing value={4} />
          {customerState && (
            <CustomerRewardPoints_Drawer storeCode={storeCode} />
          )}
          <Spacing value={4} />
          <AccountSection>
            <AccountSectionTitle>
              {getText({ storeCode, text: Texts.settings })}
            </AccountSectionTitle>
            <Spacing value={4} />
            <Country_Drawer
              storeCode={storeCode}
              countries={configuration?.countries}
            />
            <Spacing value={4} />
            <Language_Drawer storeCode={storeCode} />
          </AccountSection>
          <Spacing value={6} />
          <AccountSection>
            <AccountSectionTitle>
              {getText({ storeCode, text: Texts.contactUs })}
            </AccountSectionTitle>
            <Spacing value={4} />
            {configuration?.staticPages?.map((page, index) => {
              return (
                <Fragment key={index}>
                  <Anchor href={`/${storeCode}/${page.urlIdentifier}`}>
                    <Row withSeparator={true} className=" mx-5">
                      <RowSection className=" gap-3">
                        <p>{page.label}</p>
                      </RowSection>
                      <RowSection>
                        <ChevronLeftIcon
                          className={` h-4 w-4 text-secondry_chevron ${
                            direction === "rtl" ? "rotate-0" : "rotate-180"
                          }`}
                        />
                      </RowSection>
                    </Row>
                  </Anchor>
                  <Spacing value={4} />
                </Fragment>
              );
            })}
          </AccountSection>
        </AccountContent>
        <Spacing value={4} />
        <AccountFooter>
          {/* TODO: split social bar to outer components */}
          <AccountSection className=" flex items-center justify-center gap-4">
            {configuration.socialAccounts?.map((account, index) => {
              const accountIcon = () => {
                switch (account?.code) {
                  case "instagram":
                    return <InstagramIcon />;
                  case "snap":
                    return <SnapChatIcon className=" h-5 w-5" />;
                  case "twitter":
                    return <TwitterIcon />;
                  case "facebook":
                    return <FacebookIcon />;
                  case "linkedin":
                    return <LinkedinIcon className=" h-5 w-5 text-blue-500" />;
                  default:
                    return null;
                }
              };
              return (
                <Anchor key={index} href={account.url}>
                  {accountIcon()}
                </Anchor>
              );
            })}
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
