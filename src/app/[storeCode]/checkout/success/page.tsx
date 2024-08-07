import SuccessPage from "@/lib/component/project/page/SuccessPage";
import { PageProps } from "@/lib/data/types/PageProps";

export default async function page({ params }: PageProps) {
  return <SuccessPage storeCode={params.storeCode} />;
}
