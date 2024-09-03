"use client";
import { pageTypes } from "@/lib/core/basic/Constants";
import Spacing from "../../generic/pure/spacing";
import ProductListUtility_Bar from "../construct/bar/ProductListUtility_Bar";
import ProductCards_Grid from "../construct/grid/ProductCards_Grid";
import PageType from "../../generic/utility/PageType";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import LoadMore from "../part/utility/LoadMore";
import { PageProps } from "@/lib/data/types/PageProps";
import { useEffect, useRef, useState } from "react";
import { getCategory } from "@/lib/network/server/gql/category";
import {
  getCategoryController,
  getLoadMoreUrl,
} from "@/lib/controller/categoryController";
import {
  Category,
  CategoryHeader,
  CategoryName,
} from "../../generic/pure/category";
import ScrollUp_Btn from "../part/button/ScrollUp_Btn";
import { ScrollDetector } from "../../generic/pure/scroll";
import { SortItemType, SortModel } from "@/lib/data/models/SortModel";
import HeaderOptions from "../../generic/utility/HeaderOptions";
import NavbarOptions from "../../generic/utility/NavbarOptions";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import Image from "../../generic/pure/image";
import Timer_1 from "../part/timer/Timer_1";
import { algoliaEventsSingleton } from "@/lib/core/analytics/Algolia";
import Filter_Section from "../construct/section/Filter_Section";
import Page_Transition from "../part/transition/Page_Transition";

interface Props extends PageProps {
  category: CategoryModel;
}

export default function CategoryPage({
  category,
  params,
  searchParams,
}: Props) {
  const sortOptions = useRef(new SortModel({ storeCode: params.storeCode }));
  const [sort, setSort] = useState<SortItemType>();
  const [clientCategory, setClientCategory] = useState<CategoryModel>();

  const [spicialToDate] = useState<string | undefined>(
    category?.products?.find((product) => product?.specialToDate?.length > 1)
      ?.specialToDate,
  );

  function handleSort() {
    if (sort) {
      getCategory({
        id: category.id,
        params,
        searchParams,
        page: 1,
        sort: sort.value,
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

  function handleFilter() {
    if (sort) {
      getCategory({
        id: category.id,
        params,
        searchParams,
        page: 1,
        sort: sort.value,
      }).then((category) => {
        setClientCategory(category);
      });
    }
  }

  useEffect(() => {
    handleSort();
  }, [sort]);

  useEffect(() => {
    handleFilter();
  }, [searchParams?.customFilters]);

  useEffect(() => {
    // gtm view item list event
    new GtmEvents({
      gtmCategory: CategoryModel?.toGtm(category),
    }).viewItemList();

    // algolia event
    algoliaEventsSingleton?.viewedObjectIDs({
      category,
    });
  }, []);

  return (
    <Page_Transition>
      <Category className=" pb-20">
        <ScrollDetector id="category-page-scroll-detector" />

        <section className=" mx-auto flex max-w-project gap-5 ">
          {/* for desktop */}
          <Filter_Section
            params={params}
            searchParams={searchParams}
            filters={category?.filters}
            className={" basis-3/12"}
          />

          {/* ============================================================================================= */}

          <div className=" flex-1">
            <CategoryHeader className=" bg-background ">
              <Spacing value={4} />

              <section className=" mx-5 flex max-w-project items-center justify-start gap-3 lg:mx-auto">
                <CategoryName className="  text-lg font-medium text-secondry_text md:text-xl">
                  {category.name}
                </CategoryName>
                <Timer_1 specialToDate={spicialToDate ?? ""} />
              </section>

              <ProductListUtility_Bar
                params={params}
                searchParams={searchParams}
                totalCount={category?.totalCount}
                filters={category?.filters}
                sort={sort ?? sortOptions?.current?.defaultSort}
                setSort={setSort}
              />
              <Spacing value={3} />

              <Spacing value={3} />
            </CategoryHeader>
            {!!category?.image && (
              <Image
                src={category?.image}
                alt={`${category?.name} category image`}
                className=" mx-auto h-auto w-full max-w-project"
              />
            )}
            <Spacing value={3} />
            <ProductCards_Grid
              key={`${searchParams?.customFilters}`}
              storeCode={params.storeCode}
              products={clientCategory?.products ?? category?.products}
              category={clientCategory ?? category}
              className=" xl:grid-cols-4"
            />
            <Spacing value={3} />
            {/* TODO: test without url pagination  */}
            <LoadMore
              params={params}
              searchParams={searchParams}
              pagesCount={category?.pagesCount}
              sort={sort ?? sortOptions?.current?.defaultSort}
              loadingMore={(page: number) =>
                getCategoryController({
                  id: category?.id,
                  params,
                  searchParams,
                  sort: sort?.value,
                  page: page,
                })
              }
              withUrlPagination={false}
              className=" xl:grid-cols-4"
            />
          </div>
        </section>

        {/* =================================================================================================== */}

        <ScrollUp_Btn
          id="category-page-scroll-detector"
          className=" md:hidden"
        />

        {/* pagination  */}
        {category?.paginationUrl?.previousUrl && (
          <link rel="prev" href={category?.paginationUrl?.previousUrl ?? "#"} />
        )}
        {category?.paginationUrl?.nextUrl && (
          <link rel="next" href={category?.paginationUrl?.nextUrl ?? "#"} />
        )}

        {/* utility */}
        <PageType pageType={pageTypes.category} />
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
  );
}
