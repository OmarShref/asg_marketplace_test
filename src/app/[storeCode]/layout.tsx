import { getDirection } from "@/lib/helper/direction";
import { Readex_Pro } from "next/font/google";
import NavBar from "@/lib/component/project/construct/bar/NavBar";
import Header_1 from "@/lib/component/project/construct/header/Header_1";
import "../globals.css";
// import CheckCustomerInfoUpdated from "@/lib/component/generic/utility/CheckCustomerInfoUpdated";
import ClientUtility from "@/lib/component/generic/utility/ClientUtility";
import Analytics from "@/lib/component/generic/utility/Analytics";
import { getConfiguration } from "@/lib/network/server/gql/configuration";
import { getMenu } from "@/lib/network/server/gql/menu";
import { Toaster } from "@/lib/component/generic/ui/toaster";
import { Viewport } from "next";
import Main_Footer from "@/lib/component/project/construct/footer/Main_Footer";
// import Above_Header from "@/lib/component/project/construct/header/Above_Header";
import { Suspense } from "react";
import LoadingPage from "./loading";

// export const dynamic = "force-static";
// export const dynamicParams = true;
// export const revalidate = 60;

// export async function generateStaticParams() {
//   return [];
// }

// viewport options
export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
  maximumScale: 1.0,
  userScalable: false,
};

const readex_pro = Readex_Pro({ subsets: ["latin", "arabic"] });

type Props = {
  children: React.ReactNode;
  params: { storeCode: string };
};

export default async function layout({ children, params }: Props) {
  const direction = getDirection(params.storeCode);

  const [configuration, menu] = await Promise.all([
    getConfiguration({ params }),
    getMenu({ params }),
  ]);

  return (
    <html lang="en">
      <body className={`!bg-background ${readex_pro.className} `}>
        <main
          className={`min-h-screen overflow-x-clip `}
          style={{ direction: direction }}
        >
          {/* client utitlities  */}
          <ClientUtility storeCode={params.storeCode} />

          {/* Analytics */}
          <Analytics />

          {/* above header */}
          {/* <Above_Header storeCode={params.storeCode} /> */}

          {/* header */}
          <Header_1 params={params} configuration={configuration} menu={menu} />

          {/* all pages */}
          <Suspense fallback={<LoadingPage />}>{children}</Suspense>

          {/* footer */}
          <Main_Footer
            storeCode={params.storeCode}
            configuration={configuration}
          />

          {/* mobile navigation bar */}
          <NavBar storeCode={params.storeCode} />

          {/* check if customer is updated */}
          {/* <CheckCustomerInfoUpdated storeCode={params.storeCode} /> */}
        </main>
        {/* Global Toast */}
        <Toaster />
      </body>
    </html>
  );
}
