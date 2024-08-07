import OrderPage from "@/lib/component/project/page/OrderPage";

import { PageProps } from "@/lib/data/types/PageProps";

export default function page({ params, searchParams }: PageProps) {
  return <OrderPage params={params} searchParams={searchParams} />;
}
