import { FilterItemType, FilterModel } from "../data/models/FilterModel";

export function getFilterQuery(searchParams?: {
  customFilter?: string;
}): string {
  const customFilter = searchParams?.customFilter;
  if (customFilter) {
    const filter = new FilterModel(customFilter);

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
  } else {
    return "";
  }
}

export function turnFiltersToSearchParams({
  filters,
}: {
  filters: FilterItemType[];
}): string {
  const filterSearchParamsArray = filters
    ?.map((filter) => {
      return filter.code === "price"
        ? `${filter.code}:${filter.min}_${filter.max}`
        : filter.options.length > 0
          ? `${filter.code}:${filter.options
              .map((option) => option.value)
              .join(",")}`
          : null;
    })
    ?.filter((value) => value && value?.length > 1);

  const filterSearchParams = filterSearchParamsArray?.join(";");

  const searchParams =
    filterSearchParams?.length > 0 ? `?customFilter=${filterSearchParams}` : "";

  return searchParams;
}
