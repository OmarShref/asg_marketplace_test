import WishListPage from "@/lib/component/project/page/WishListPage";
import { PageProps } from "@/lib/data/types/PageProps";
import { getCmsPage } from "@/lib/network/server/gql/cmsPage";

interface Props extends PageProps {}

export default async function page({ params, searchParams }: Props) {
  const cms = await getCmsPage({
    params: params,
    urlIdentifier: "wishlist-content",
  });

  return (
    <WishListPage
      params={params}
      searchParams={searchParams}
      cms={cms?.at(0)}
    />
  );
}
