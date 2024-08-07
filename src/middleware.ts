import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getDeviceType } from "./lib/helper/devicetype";
import { stores } from "./lib/core/basic/Constants";

// function getLandingHomePages(request: NextRequest, storeCode: string): string {
//   // getting device type
//   const deviceType = getDeviceType(request?.headers);

//   let data: string[];

//   switch (storeCode) {
//     case "SA_ar":
//       data = ["home", "home"];
//       break;
//     case "SA_en":
//       data = ["home", "home"];
//       break;
//     default:
//       data = ["home", "home"];
//       break;
//   }
//   const landingHomePages: string =
//     deviceType === "mobile" || deviceType === "tablet" ? data[0] : data[1];

//   return landingHomePages;
// }

export function middleware(request: NextRequest) {
  // path name
  const { pathname } = request.nextUrl;

  // to bypass unwanted requests from meddileware function
  if (
    pathname.includes(".ico") ||
    pathname.includes(".png") ||
    pathname.includes(".jpg") ||
    pathname.includes(".jpeg") ||
    pathname.includes(".gif") ||
    pathname.includes(".mp4") ||
    pathname.includes(".mp3") ||
    pathname.includes(".webp") ||
    pathname.includes(".svg") ||
    pathname.includes("undefiend") ||
    pathname.includes("null") ||
    pathname.includes("_next") ||
    pathname.startsWith("/api") ||
    pathname ===
      "/.well-known/apple-developer-merchantid-domain-association.txt" ||
    pathname === "/serviceworker.js" ||
    pathname === "/manifest.json"
  ) {
    return NextResponse.next();
  }

  // store code
  const storeCode = pathname.split("/")[1];

  // to handle empty "/" and only storeCode ex: "/SA_ar" pathnames
  if (pathname === "/SA_ar" || pathname === "/SA_en") {
    // getting landing pages
    // const landingHomePages = getLandingHomePages(request, storeCode);
    const landingHomePages = "home";

    return NextResponse.rewrite(
      new URL(`${pathname}/${landingHomePages}`, request.url),
    );
  } else if (pathname === "/") {
    // getting landing pages
    // const landingHomePages = getLandingHomePages(request, "SA_ar");
    const landingHomePages = "home";

    return NextResponse.rewrite(
      new URL(`/SA_ar/${landingHomePages}`, request.url),
    );
  }

  // handle payment gateways halosinations
  if (
    pathname?.includes("cancel") ||
    pathname?.includes("fail") ||
    pathname?.includes("checkout/cart")
  ) {
    return NextResponse.redirect(
      new URL(`/${storeCode}/checkout/billing`, request.url),
    );
  }

  // to add the default storeCode : "SA_ar" if the pathname doesn't have one
  if (stores.includes(storeCode)) {
    return NextResponse.next();
  } else {
    return NextResponse.rewrite(new URL(`/SA_ar${pathname}`, request.url));
  }
}
