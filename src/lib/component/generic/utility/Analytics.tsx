"use client";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import useUserStore from "@/lib/data/stores/UserStore";
import {
  // adjustOptions,
  baseUrl,
  gtmOptions,
  // moengageOptions,
} from "@/lib/core/basic/Constants";
import useUtilityStore from "@/lib/data/stores/UtilityStore";
import { CustomerModel } from "@/lib/data/models/CustomerModel";

type Props = {};
export default function Analytics({}: Props) {
  // url state
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { storeCode } = useUtilityStore((state) => state);

  const { customer } = useUserStore((state) => state);

  // global variables event
  useEffect(() => {
    new GtmEvents({
      gtmCustomer: CustomerModel.toGtm(customer),
    }).globalVariables();
  }, [storeCode, customer]);

  // page view event
  useEffect(() => {
    const url = `${baseUrl}${pathname === "/" ? "" : pathname}${
      searchParams.toString().length > 0
        ? `?${searchParams.toString().replace("%3A", ":")}`
        : ""
    }`;
    if (pathname) {
      new GtmEvents({ url: url }).pageview();
    }
  }, [pathname, searchParams]);

  // const emptyDatalayerQueue = useDatalayerStore((state) => state?.empty);
  // useEffect(() => {
  //   const datalayerPushInterval = setInterval(() => {
  //     const datalayerQueue = useDatalayerStore.getState().data;
  //     if (datalayerQueue?.length > 0) {
  //       if (typeof window.dataLayer !== "undefined") {
  //         window.dataLayer.push({
  //           event: "view_promotion",
  //           ecommerce: {
  //             items: datalayerQueue,
  //           },
  //         });
  //         emptyDatalayerQueue();
  //       }
  //     }
  //   }, 5000);

  //   return () => clearInterval(datalayerPushInterval);
  // }, []);

  return (
    <>
      {/* GTM script */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmOptions?.containerId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmOptions?.containerId}');
          `,
        }}
      />

      {/* moengage script */}
      {/* <link rel="manifest" href="/manifest.json" />
      <Script
        id="serviceworker"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker
            .register("/serviceworker.js")
            .then((registration) => console.log("scope is: ", registration.scope));
        }
        `,
        }}
      /> */}
      {/* <Script
        id="moengage-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function(i,s,o,g,r,a,m,n){i.moengage_object=r;t={};q=function(f){return function(){(i.moengage_q=i.moengage_q||[]).push({f:f,a:arguments})}};f=['track_event','add_user_attribute','add_first_name','add_last_name','add_email','add_mobile','add_user_name','add_gender','add_birthday','destroy_session','add_unique_user_id','moe_events','call_web_push','track','location_type_attribute','add_selected_lang'],h={onsite:["getData"]};for(k in f){t[f[k]]=q(f[k])}a=s.createElement(o);m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);i.moe=i.moe||function(){n=arguments[0];return t};a.onload=function(){if(n){i[r]=moe(n)}}})(window,document,'script','https://cdn.moengage.com/webpush/moe_webSdk.min.latest.js','Moengage')


    Moengage = moe({
        app_id:"${moengageOptions?.app_id}",
        debug_logs: 1,
        enableSPA: true,
        cluster: "DC_4",
        swPath: "/serviceworker.js",
        swScope: '/'
    });

    Moengage.call_web_push({
        "soft_ask":true,
        "main_class":"moe-main-class",
        "allow_class":"moe-allow-class",
        "block_class":"moe-block-class"
    });
  `,
        }}
      /> */}

      {/* adjust script */}
      {/* <Script
        id="adjust-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(t,a,e,r,n,s,l,d,o,i,u){t.Adjust=t.Adjust||{},t.Adjust_q=t.Adjust_q||[];for(var c=0;c<d.length;c++)o(t.Adjust,t.Adjust_q,d[c]);i=a.createElement(e),u=a.getElementsByTagName(e)[0],i.async=!0,i.src="https://cdn.adjust.com/adjust-latest.min.js",i.onload=function(){for(var a=0;a<t.Adjust_q.length;a++)t.Adjust[t.Adjust_q[a][0]].apply(t.Adjust,t.Adjust_q[a][1]);t.Adjust_q=[]},u.parentNode.insertBefore(i,u)}(window,document,"script",0,0,0,0,["initSdk","getAttribution","getWebUUID","trackEvent","addGlobalCallbackParameters","addGlobalPartnerParameters","removeGlobalCallbackParameter","removeGlobalPartnerParameter","clearGlobalCallbackParameters","clearGlobalPartnerParameters","switchToOfflineMode","switchBackToOnlineMode","stop","restart","gdprForgetMe","disableThirdPartySharing","initSmartBanner"],(function(t,a,e){t[e]=function(){a.push([e,arguments])}}));
        Adjust.initSdk({
            appToken: '${adjustOptions?.appToken}',
            environment: 'production',
            logLevel: 'info'
        });

        Adjust.initSmartBanner({
                webToken: '${adjustOptions?.appToken}',
                logLevel: 'info'
            });
        `,
        }}
      /> */}
    </>
  );
}
