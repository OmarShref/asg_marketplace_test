import LoginPage from "@/lib/component/project/page/LoginPage";
import { PageProps } from "@/lib/data/types/PageProps";

export default async function page({ params, searchParams }: PageProps) {
  return <LoginPage storeCode={params.storeCode} />;
}
