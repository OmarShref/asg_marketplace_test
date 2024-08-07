import AddressPage from "@/lib/component/project/page/AddressPage";
import { PageProps } from "@/lib/data/types/PageProps";

export default function page({ params, searchParams }: PageProps) {
  return <AddressPage storeCode={params.storeCode} />;
}
