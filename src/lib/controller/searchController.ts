import { CategoryModel } from "../data/models/CategoryModel";
import {
  algoliaTextSearch,
  algoliaProps,
} from "../network/client/rest/algolia";

export async function getSearchCategoryController({
  params,
  page,
}: algoliaProps): Promise<CategoryModel> {
  const searchresults = await algoliaTextSearch({
    params: params,
    page: page,
  });

  return searchresults;
}
