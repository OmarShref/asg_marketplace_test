import { getDirection } from "@/lib/helper/direction";
import { Montserrat, Noto_Kufi_Arabic } from "next/font/google";
import NavBar from "@/lib/component/project/construct/bar/NavBar";
import Header_1 from "@/lib/component/project/construct/header/Header_1";
import "../globals.css";
// import CheckCustomerInfoUpdated from "@/lib/component/generic/utility/CheckCustomerInfoUpdated";
import ClientStore_Provider from "@/lib/component/generic/utility/ClientStore_Provider";
// import Analytics from "@/lib/component/generic/utility/Analytics";
import { getConfiguration } from "@/lib/network/repo/server_repos/gql/configuration";
import { getMenu } from "@/lib/network/repo/server_repos/gql/menu";
import { Toaster } from "@/lib/component/generic/ui/toaster";
import { Viewport } from "next";
import Main_Footer from "@/lib/component/project/construct/footer/Main_Footer";
// import Above_Header from "@/lib/component/project/construct/header/Above_Header";
import { Suspense } from "react";
// import LoadingPage from "./load";
import AddedToCart_Utility from "@/lib/component/project/part/utility/AddedToCart_Utility";
import { checkSmallDevice } from "@/lib/helper/devicetype";
import { headers } from "next/headers";

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

const fontArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-arabic",
});

const fontEnglish = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-english",
});

type Props = {
  children: React.ReactNode;
  params: { storeCode: string };
};

export default async function layout({ children, params }: Props) {
  const direction = getDirection(params.storeCode);
  const isSmallDevice = checkSmallDevice(headers());

  const [configuration, menu] = await Promise.all([
    getConfiguration({ params }),
    getMenu({ params }),
  ]);

  return (
    <html lang="en">
      <body
        className={`!bg-background ${
          direction === "rtl" ? fontArabic.className : fontEnglish.className
        } ${fontArabic.variable} ${fontEnglish.variable}`}
      >
        <main
          className={`min-h-screen overflow-x-clip`}
          style={{ direction: direction }}
        >
          {/* client utitlities  */}
          <ClientStore_Provider storeCode={params.storeCode} />

          {/* added to cart utility */}
          <AddedToCart_Utility isSmallDevice={isSmallDevice} />

          {/* Analytics */}
          {/* <Analytics /> */}

          {/* above header */}
          {/* <Above_Header storeCode={params.storeCode} /> */}

          {/* header */}
          <Header_1 params={params} configuration={configuration} menu={menu} />

          {/* all pages */}
          {/* <Suspense fallback={<LoadingPage />}>{children}</Suspense> */}
          {children}

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
