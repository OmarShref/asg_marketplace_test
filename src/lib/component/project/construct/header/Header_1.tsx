"use client";
import { isArabic } from "../../../../helper/language";
import Back_Btn from "../../part/button/Back_Btn";
import { MobileLogo } from "@/lib/assets/svg";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import Search_Bar from "../bar/Search_Bar";
import Search_Btn from "../../part/button/Search_Btn";
import { useRouter } from "next/navigation";
import Burger_Btn from "../../part/button/Burger_Btn";
import { ConfigurationModel } from "@/lib/data/models/ConfigurationModel";
import { MenuModel } from "@/lib/data/models/MenuModel";
import HeaderUtility_Bar from "../bar/HeaderUtility_Bar";
import HeaderCutomer_Bar from "../bar/HeaderCutomer_Bar";
import HeaderMenu_Bar from "../bar/HeaderMenu_Bar";
import { useEffect } from "react";
import { handleExpandedSearch, hideShowOnScroll } from "@/lib/helper/scroll";
import LandingPages_Bar from "../bar/LandingPages_Bar";
import { PageProps } from "@/lib/data/types/PageProps";
import { pageTypes } from "@/lib/core/basic/Constants";
import Anchor from "@/lib/component/generic/pure/anchor";
import Wishlist_Btn from "@/lib/component/project/part/button/Wishlist_Btn";

interface Props extends PageProps {
  configuration: ConfigurationModel;
  menu: MenuModel;
}

export default function Header_1({ params, configuration, menu }: Props) {
  const router = useRouter();
  const { headerOptions } = useUtilityStore();
  const isArabicLanguage = isArabic(params?.storeCode);

  const { pageType } = useUtilityStore((state) => state);

  // handle hiding on scroll
  useEffect(() => {
    hideShowOnScroll({ elementId: "mobile-header" });
  }, []);

  // handle expandable search
  useEffect(() => {
    if (headerOptions?.title) {
      window.onscroll = () => null;
    } else {
      handleExpandedSearch();
    }
  }, [headerOptions?.title]);

  return (
    <>
      {/* mobile header */}
      {headerOptions?.showHeader && (
        <header
          id="mobile-header"
          className=" sticky top-0 z-20  border-b bg-background  shadow-header transition-all duration-500 ease-in-out md:hidden"
        >
          {/* headers content */}
          <section className="relative flex items-center justify-between py-2">
            {/* back & menu & title */}
            <section className=" flex w-fit items-center justify-start gap-2 bg-background px-3">
              {headerOptions?.withBackButton && (
                <Back_Btn
                  className={` shadow-nonen w-7 ${
                    isArabicLanguage ? "" : " rotate-180"
                  }`}
                />
              )}
              {headerOptions?.withBurgerButton && (
                <Burger_Btn
                  storeCode={params?.storeCode}
                  className={` w-7 shadow-none`}
                />
              )}
              {headerOptions?.title && (
                <h2 className=" text-xl font-medium">{headerOptions.title}</h2>
              )}
            </section>
            {/* logo */}
            {headerOptions?.withLogo && pageType != pageTypes.search && (
              <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Anchor href={`/${params.storeCode}/`}>
                  <MobileLogo className=" h-10 w-auto text-accent" />
                </Anchor>
              </div>
            )}
            {/* search */}
            <section className=" flex flex-1 items-center justify-end gap-2 bg-background pe-3 ">
              {headerOptions?.withSearch &&
                (headerOptions?.searchExpanded ||
                pageType === pageTypes.search ? (
                  <Search_Bar
                    storeCode={params?.storeCode}
                    className={` flex-1 ${
                      isArabicLanguage ? "" : " [transform:rotateY(180deg)]"
                    }`}
                  />
                ) : (
                  <Search_Btn
                    onClick={() => {
                      router.push(`/${params?.storeCode}/search`);
                    }}
                    className=" text-black"
                  />
                ))}
            </section>
            {/* wishlist */}
            <section className=" flex items-center justify-start gap-2 bg-background pe-3 ">
              {headerOptions?.withWishlist && (
                <Wishlist_Btn
                  storeCode={params?.storeCode}
                  className=" w-7 shadow-none"
                />
              )}
            </section>
          </section>
          {/* landing pages tabs */}
          {/* {(pageType === pageTypes?.cms || pageType === pageTypes?.home) && (
            <section>
              <LandingPages_Bar configuration={configuration} className="" />
            </section>
          )} */}
        </header>
      )}

      {/* desktop header */}
      <header className=" sticky top-0 z-20 hidden md:block">
        <HeaderUtility_Bar
          storeCode={params?.storeCode}
          configuration={configuration}
        />
        <HeaderCutomer_Bar storeCode={params?.storeCode} />
        <HeaderMenu_Bar storeCode={params?.storeCode} menu={menu} />
      </header>
    </>
  );
}
