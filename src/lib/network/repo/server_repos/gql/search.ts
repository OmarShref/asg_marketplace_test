"use server";
import { ServerReqProps } from "@/lib/data/types/ServerReqProps";
import { ServerGqlGetRequest } from "./base-request/ServerGqlGetRequest";
import { CategoryModel } from "@/lib/data/models/CategoryModel";
import { sortTypes } from "@/lib/core/basic/Constants";
import { gqlCategoryInnerItem } from "../../../queries/categoryQuery";
import { FilterModel } from "@/lib/data/models/FilterModel";

export interface CategoryRequestProps extends ServerReqProps {
  page?: number;
  sort?: string;
}

export async function getSearch({
  params,
  searchParams,
  page,
  sort,
}: CategoryRequestProps): Promise<CategoryModel> {
  const filterQuery = getFilterQuery(searchParams);

  // TODO: add product type to filter -ex : "configurable"-
  const categoryQuery = `query vestedCategory {
    vestedProducts(
        search: "${params?.searchTerm ?? ""}"
        filter: {
          Is_in_stock: { eq: 1 }
          ${filterQuery}
        }
        sort: ${sort ?? sortTypes.merchandising}
        pageSize: 20
        currentPage: ${page ? page : (searchParams?.page ?? 1)}
    ) {
        ${gqlCategoryInnerItem}
     }
  }
`;

  const data = await new ServerGqlGetRequest({
    storeCode: params.storeCode,
    query: categoryQuery,
  }).getData();

  const category = new CategoryModel({
    categoryData: data,
    storeCode: params.storeCode,
  })?.create();

  return category;
}

function getFilterQuery(searchParams?: { customFilters?: string }): string {
  const customFilters = searchParams?.customFilters;

  if (!customFilters) {
    return "";
  }

  const filter = new FilterModel(customFilters);

  const filterQuery = filter.filters
    .map((filter) => {
      if (filter.code === "price") {
        return `${filter.correspondingFilter}: { between: [${filter.min} ,${filter.max}] }`;
      } else {
        return `${filter.correspondingFilter}: { in: [${filter.options
          .map((option) => option.value)
          .join(",")}] }`;
      }
    })
    ?.join(" ");

  return filterQuery;
}
