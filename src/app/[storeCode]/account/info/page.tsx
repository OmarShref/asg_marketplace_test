import AccountInfoPage from "@/lib/component/project/page/AccountInfoPage";
import { PageProps } from "@/lib/data/types/PageProps";

export default async function page({ params, searchParams }: PageProps) {
  return <AccountInfoPage storeCode={params.storeCode} />;
}
