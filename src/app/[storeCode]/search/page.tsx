import SearchPage from "@/lib/component/project/page/SearchPage";
import { PageProps } from "@/lib/data/types/PageProps";
import { getCmsPage } from "@/lib/network/server/gql/cmsPage";

export default async function page({ params }: PageProps) {
  const recommendationCms = await getCmsPage({
    params,
    urlIdentifier: "search-product-block",
  });
  return (
    <SearchPage params={params} recommendationCms={recommendationCms?.at(0)} />
  );
}
