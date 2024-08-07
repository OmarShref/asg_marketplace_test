"use client";
import { pageTypes } from "@/lib/core/basic/Constants";
import Spacing from "../../generic/pure/spacing";
import ProductListUtility_Bar from "../construct/bar/ProductListUtility_Bar";
import ProductCards_Grid from "../construct/grid/ProductCards_Grid";
import PageType from "../../generic/utility/PageType";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
// import LoadMore from "../part/utility/LoadMore";
import { PageProps } from "@/lib/data/types/PageProps";
import {
  Category,
  CategoryHeader,
  CategoryName,
} from "../../generic/pure/category";
import ScrollUp_Btn from "../part/button/ScrollUp_Btn";
import { ScrollDetector } from "../../generic/pure/scroll";
import { Texts, getText } from "@/lib/assets/text";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import useUserStore from "@/lib/data/stores/UserStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CmsPageModel } from "@/lib/data/models/CmsPageModel";
import Cms from "../construct/pageBuilder/Cms";
import Page_Transition from "../part/transition/Page_Transition";

interface Props extends PageProps {
  cms: CmsPageModel | undefined;
}

export default function WishListPage({ params, searchParams, cms }: Props) {
  const router = useRouter();
  const { customer, wishList } = useUserStore((state) => state);
  const [wishListState, setWishListState] = useState<CategoryModel | null>(
    null
  );

  useEffect(() => {
    if (wishList) {
      setWishListState(wishList);
    }
  }, [wishList]);

  useEffect(() => {
    if (!customer?.token) {
      router.replace(`/${params.storeCode}/account/login`);
    }
  }, []);

  return (
    wishListState && (
      <Page_Transition>
        <Category className=" max-w-project pb-20 lg:mx-auto">
          <ScrollDetector id="category-page-scroll-detector" />
          <Spacing value={3} />
          <CategoryHeader>
            <CategoryName className=" mx-5 text-lg font-light text-secondry_text">
              {getText({ storeCode: params.storeCode, text: Texts.myWishList })}
            </CategoryName>
            <ProductListUtility_Bar
              params={params}
              searchParams={searchParams}
              totalCount={wishListState?.totalCount}
            />
          </CategoryHeader>
          <Spacing value={3} />
          <Cms cms={cms} storeCode={params.storeCode} />
          <Spacing value={1} />
          <ProductCards_Grid
            key={wishListState?.totalCount}
            products={wishListState.products}
            storeCode={params.storeCode}
          />
          <Spacing value={3} />
          {/* <LoadMore
        id={wishList.id}
        params={params}
        searchParams={searchParams}
        pagesCount={wishList.pagesCount}
      /> */}
          <Spacing value={3} />
          <ScrollUp_Btn id="category-page-scroll-detector" />
          <PageType pageType={pageTypes.wishlist} />
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
        </Category>
      </Page_Transition>
    )
  );
}
