"use client";
import { useEffect, useState } from "react";
import {
  Category,
  CategoryHeader,
  CategoryName,
} from "../../generic/pure/category";
import ScrollDetector from "../../generic/pure/scroll";
import Spacing from "../../generic/pure/spacing";
import ProductListUtility_Bar from "../construct/bar/ProductListUtility_Bar";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import { PageProps } from "@/lib/data/types/PageProps";
import ProductCards_Grid from "../construct/grid/ProductCards_Grid";
import ScrollUp_Btn from "../part/button/ScrollUp_Btn";
import PageType from "../../generic/utility/PageType";
import { pageTypes } from "@/lib/core/basic/Constants";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import LoadMore from "../part/utility/LoadMore";
import { getSearchCategoryController } from "@/lib/controller/searchController";
import Page_Transition from "../part/transition/Page_Transition";

export default function SearchTermPage({ params }: PageProps) {
  const [searchCategory, setSearchCategory] = useState<CategoryModel | null>(
    null,
  );
  async function handleSearch() {
    const searchresults = await getSearchCategoryController({
      params: params,
      page: 0,
    });

    setSearchCategory(searchresults);
  }
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    searchCategory && (
      <Page_Transition>
        <Category className=" max-w-project pb-20 lg:mx-auto">
          <ScrollDetector id="category-page-scroll-detector" />
          <Spacing value={3} />
          <CategoryHeader>
            <CategoryName className=" mx-5 text-lg font-light text-secondry_text">
              {searchCategory?.name}
            </CategoryName>
            <ProductListUtility_Bar
              params={params}
              totalCount={searchCategory?.totalCount}
            />
          </CategoryHeader>
          <Spacing value={3} />
          <ProductCards_Grid
            key={searchCategory?.totalCount}
            products={searchCategory?.products}
            storeCode={params.storeCode}
            category={searchCategory}
          />
          <Spacing value={3} />
          <LoadMore
            params={params}
            pageNumber={0}
            pagesCount={searchCategory?.pagesCount}
            loadingMore={(page: number) =>
              getSearchCategoryController({
                params: params,
                page: page,
              })
            }
            withUrlPagination={false}
          />
          <Spacing value={3} />
          <ScrollUp_Btn id="category-page-scroll-detector" />
          <PageType pageType={pageTypes.searchTerm} />
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
