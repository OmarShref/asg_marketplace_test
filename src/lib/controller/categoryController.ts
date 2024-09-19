import { baseUrl, sortTypes } from "../core/basic/Constants";
import { PageProps } from "../data/types/PageProps";
import {
  CategoryRequestProps,
  getCategory,
} from "../network/repo/server_repos/gql/category";

export function getLoadMoreUrl({
  params,
  searchParams,
  page,
}: PageProps & { page: number }): string {
  const newUrl = `${baseUrl}/${params.storeCode}/${params.route?.join("/") ?? `search/${params?.searchTerm}`}${
    searchParams?.customFilters
      ? `?customFilters=${searchParams?.customFilters}`
      : ""
  }${
    page > 1
      ? searchParams?.customFilters
        ? `&page=${page}`
        : `?page=${page}`
      : ""
  }`;
  return newUrl;
}

export async function getCategoryController({
  id,
  params,
  searchParams,
  page,
  sort,
}: CategoryRequestProps) {
  const category = await getCategory({
    id,
    params,
    searchParams,
    page,
    sort: sort ?? sortTypes?.merchandising,
  });
  return category;
}
