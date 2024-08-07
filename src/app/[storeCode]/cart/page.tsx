import CartPage from "@/lib/component/project/page/CartPage";
import { PageProps } from "@/lib/data/types/PageProps";
import { getCmsPage } from "@/lib/network/server/gql/cmsPage";
import { getConfiguration } from "@/lib/network/server/gql/configuration";
import { getPaymentMethodInfo } from "@/lib/network/server/gql/paymentMethodInfo";

interface Props extends PageProps {}

export default async function page({ params }: Props) {
  const configuration = await getConfiguration({ params });
  const paymentMethodInfo = await getPaymentMethodInfo({ params });
  const cms = await getCmsPage({
    params: params,
    urlIdentifier: "cart-content",
  });
  const recommendationCms = await getCmsPage({
    params: params,
    urlIdentifier: "cart-recommendation",
  });

  return (
    <CartPage
      params={params}
      configuration={configuration}
      paymentMethodInfo={paymentMethodInfo}
      cms={cms?.at(0)}
      recommendationCms={recommendationCms?.at(0)}
    />
  );
}
