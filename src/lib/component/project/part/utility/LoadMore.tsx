"use client";
import { Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProductCards_Grid from "../../construct/grid/ProductCards_Grid";
import { ProductModel } from "@/lib/data/models/ProductModel";
import { PageProps } from "@/lib/data/types/PageProps";
import Spacing from "@/lib/component/generic/pure/spacing";
import { getLoadMoreUrl } from "@/lib/controller/categoryController";
import { getPageNumber } from "@/lib/controller/paginationController";
import { SortItemType } from "@/lib/data/models/SortModel";
import { sortTypes } from "@/lib/core/basic/Constants";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import { GtmEvents } from "@/lib/core/analytics/Gtm";

interface Props extends PageProps, React.HTMLAttributes<HTMLDivElement> {
  pageNumber?: number;
  pagesCount: number;
  sort?: SortItemType;
  loadingMore: (page: number) => Promise<CategoryModel>;
  withUrlPagination?: boolean;
}

export default function LoadMore({
  params,
  searchParams,
  pageNumber,
  pagesCount,
  sort,
  loadingMore,
  withUrlPagination = false,
  className,
}: Props) {
  const { ref, inView } = useInView({
    rootMargin: "1000px",
  });
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [category, setCategory] = useState<CategoryModel | undefined>();
  const [page, setPage] = useState<number>(
    getPageNumber(pageNumber ?? searchParams?.page) + 1,
  );
  const currentSort = useRef(sort?.value);
  const currentFilter = useRef(searchParams?.customFilters);

  function resetLoadMore(page?: number) {
    setProducts([]);
    setCategory(undefined);
    setPage(page ?? 2);
  }
  function handleSortChange() {
    if (currentSort.current != sort?.value) {
      resetLoadMore();
      currentSort.current = sort?.value ?? sortTypes?.merchandising;
    }
  }
  function handleFilterChange() {
    if (currentFilter.current != searchParams?.customFilters) {
      resetLoadMore();
      currentFilter.current = searchParams?.customFilters;
    }
  }
  function handlePageChange() {
    const rightPageNumber = getPageNumber(pageNumber ?? searchParams?.page) + 1;
    if (page !== rightPageNumber) {
      resetLoadMore(rightPageNumber);
    }
  }
  async function handleLoadingMore() {
    const loadingMoreCategory = await loadingMore(page);

    setProducts([...products, ...loadingMoreCategory?.products]);
    setPage(page + 1);
    setCategory(loadingMoreCategory);

    new GtmEvents({
      gtmCategory: CategoryModel?.toGtm(loadingMoreCategory),
    }).viewItemList();

    if (withUrlPagination) {
      window.history.replaceState(
        {},
        "",
        getLoadMoreUrl({ params, searchParams, page: page }),
      );
    }
  }

  useEffect(() => {
    handleSortChange();
  }, [sort]);

  useEffect(() => {
    handleFilterChange();
    handlePageChange();
  }, [searchParams]);

  useEffect(() => {
    if (inView) {
      handleLoadingMore();
    }
  }, [inView, params, searchParams, sort]);

  return (
    <>
      <ProductCards_Grid
        storeCode={params.storeCode}
        products={products}
        category={category}
        className={className}
      />
      <Spacing value={3} />
      {page <= pagesCount && (
        <Loader2Icon
          ref={ref}
          className=" mx-auto block h-8 w-8 animate-spin text-accent"
        />
      )}
    </>
  );
}
