import SearchPage from "@/lib/component/project/page/SearchPage";
import { PageProps } from "@/lib/data/types/PageProps";
import { getCmsPage } from "@/lib/network/repo/server_repos/gql/cmsPage";

export default async function page({ params, searchParams }: PageProps) {
  const recommendationCms = await getCmsPage({
    params,
    urlIdentifier: "search-product-block",
  });
  return (
    <SearchPage
      params={params}
      searchParams={searchParams}
      recommendationCms={recommendationCms?.at(0)}
    />
  );
}
