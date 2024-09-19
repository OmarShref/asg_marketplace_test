import MenuPage from "@/lib/component/project/page/MenuPage";
import { getMenu } from "@/lib/network/repo/server_repos/gql/menu";

type Props = {
  params: {
    storeCode: string;
  };
};

export default async function page({ params }: Props) {
  const menu = await getMenu({ params });
  return (
    <main>
      <MenuPage storeCode={params.storeCode} menu={menu} />
    </main>
  );
}
