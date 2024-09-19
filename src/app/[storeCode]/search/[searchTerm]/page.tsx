import SearchTermPage from "@/lib/component/project/page/SearchTermPage";
import { getSearchCategoryFromMagento } from "@/lib/controller/searchController";
import { PageProps } from "@/lib/data/types/PageProps";

export default async function page({ params, searchParams }: PageProps) {
  const [searchCategory] = await Promise.all([
    getSearchCategoryFromMagento({
      params: params,
      searchParams,
      page: 1,
    }),
  ]);

  return (
    <SearchTermPage
      params={params}
      searchParams={searchParams}
      searchCategory={searchCategory}
    />
  );
}
