import { baseUrl, sortTypes } from "../core/basic/Constants";
import { PageProps } from "../data/types/PageProps";
import {
  CategoryRequestProps,
  getCategory,
} from "../network/server/gql/category";

export function getLoadMoreUrl({
  params,
  searchParams,
  page,
}: PageProps & { page: number }): string {
  const newUrl = `${baseUrl}/${params.storeCode}/${params.route?.join("/")}${
    searchParams?.customFilter
      ? `?customFilter=${searchParams?.customFilter}`
      : ""
  }${
    page > 1
      ? searchParams?.customFilter
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
