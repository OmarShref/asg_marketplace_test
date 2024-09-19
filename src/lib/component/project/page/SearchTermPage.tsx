"use client";
import { useEffect, useRef, useState } from "react";
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
import { getSearchCategoryFromMagento } from "@/lib/controller/searchController";
import Page_Transition from "../part/transition/Page_Transition";
import { SortItemType, SortModel } from "@/lib/data/models/SortModel";
import { getLoadMoreUrl } from "@/lib/controller/categoryController";
import Filter_Section from "../construct/section/Filter_Section";

export default function SearchTermPage({
  params,
  searchParams,
  searchCategory,
}: PageProps & { searchCategory: CategoryModel }) {
  const sortOptions = useRef(new SortModel({ storeCode: params.storeCode }));
  const [sort, setSort] = useState<SortItemType>();
  const [clientCategory, setClientCategory] = useState<CategoryModel>();

  // ===============handle sort==========================

  function handleSort() {
    if (sort) {
      getSearchCategoryFromMagento({
        params: params,
        searchParams,
        page: 1,
        sort: sort?.value,
      }).then((category) => {
        setClientCategory(category);
        window.history.replaceState(
          {},
          "",
          getLoadMoreUrl({ params, searchParams, page: 1 }),
        );
      });
    }
  }

  useEffect(() => {
    handleSort();
  }, [sort]);

  // ================handle filter=========================

  function handleFilter() {
    if (sort) {
      getSearchCategoryFromMagento({
        params: params,
        searchParams,
        page: 1,
        sort: sort?.value,
      }).then((category) => {
        setClientCategory(category);
      });
    }
  }

  useEffect(() => {
    handleFilter();
  }, [searchParams?.customFilters]);

  return (
    searchCategory && (
      <Page_Transition>
        <Category className=" max-w-project pb-20 lg:mx-auto">
          <ScrollDetector id="category-page-scroll-detector" />

          {/* ====================================================== */}

          <section className=" mx-auto flex max-w-project gap-5 ">
            {/* for desktop */}
            <Filter_Section
              params={params}
              searchParams={searchParams}
              filters={searchCategory?.filters}
              className={" basis-[20%]"}
            />

            {/* ====================================================== */}

            <div className=" flex-1">
              <Spacing value={3} />
              <CategoryHeader>
                <CategoryName className=" mx-5 text-2xl font-medium text-secondry_text lg:mx-0">
                  {decodeURIComponent(params?.searchTerm ?? "")}
                </CategoryName>
                <ProductListUtility_Bar
                  params={params}
                  searchParams={searchParams}
                  totalCount={searchCategory?.totalCount}
                  filters={searchCategory?.filters}
                  sort={sort ?? sortOptions?.current?.defaultSort}
                  setSort={setSort}
                />
              </CategoryHeader>
              <Spacing value={3} />
              <ProductCards_Grid
                key={`${searchParams?.customFilters}`}
                storeCode={params.storeCode}
                products={clientCategory?.products ?? searchCategory?.products}
                category={clientCategory ?? searchCategory}
              />
              <Spacing value={3} />
              <LoadMore
                params={params}
                searchParams={searchParams}
                pageNumber={1}
                pagesCount={searchCategory?.pagesCount}
                loadingMore={(page: number) =>
                  getSearchCategoryFromMagento({
                    params: params,
                    searchParams,
                    sort: sort?.value,
                    page: page,
                  })
                }
                withUrlPagination={false}
              />
              <Spacing value={3} />
            </div>
          </section>

          {/* ====================================================== */}

          <ScrollUp_Btn
            id="category-page-scroll-detector"
            className=" lg:hidden"
          />
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
