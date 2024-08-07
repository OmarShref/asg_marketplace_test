import AccountPage from "@/lib/component/project/page/AccountPage";
import { PageProps } from "@/lib/data/types/PageProps";
import { getCmsPage } from "@/lib/network/server/gql/cmsPage";
import { getConfiguration } from "@/lib/network/server/gql/configuration";

export default async function page({ params, searchParams }: PageProps) {
  const configuration = await getConfiguration({ params });
  const cms = await getCmsPage({
    params: params,
    urlIdentifier: "cart-content",
  });

  return (
    <AccountPage
      storeCode={params.storeCode}
      configuration={configuration}
      cms={cms?.at(0)}
    />
  );
}
