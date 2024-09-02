import { FilterItemType, FilterModel } from "../data/models/FilterModel";

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
    filterSearchParams?.length > 0
      ? `?customFilters=${filterSearchParams}`
      : "";

  return searchParams;
}
