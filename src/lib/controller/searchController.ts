import { sortTypes } from "../core/basic/Constants";
import { CategoryModel } from "../data/models/CategoryModel";
import { PageProps } from "../data/types/PageProps";
import { getSearch } from "../network/repo/server_repos/gql/search";

type SearchRequestProps = {
  page?: number;
  sort?: string;
} & PageProps;

export async function getSearchCategoryFromMagento({
  params,
  searchParams,
  page,
  sort,
}: SearchRequestProps): Promise<CategoryModel> {
  const searchresults = await getSearch({
    params: params,
    searchParams,
    page: page,
    sort: sort ?? sortTypes?.merchandising,
  });

  return searchresults;
}
