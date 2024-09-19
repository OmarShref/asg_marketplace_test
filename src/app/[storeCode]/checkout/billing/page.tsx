import PaymentPage from "@/lib/component/project/page/PaymentPage";
import { PageProps } from "@/lib/data/types/PageProps";
import { getCmsPage } from "@/lib/network/repo/server_repos/gql/cmsPage";
import { getPaymentMethodInfo } from "@/lib/network/repo/server_repos/gql/paymentMethodInfo";

export default async function page({ params, searchParams }: PageProps) {
  const paymentMethodInfo = await getPaymentMethodInfo({ params });
  const cms = await getCmsPage({
    params: params,
    urlIdentifier: "cart-content",
  });
  return (
    <PaymentPage
      storeCode={params.storeCode}
      paymentMethodInfo={paymentMethodInfo}
      cms={cms?.at(0)}
    />
  );
}
