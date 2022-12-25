import { useRouter } from "next/router";
import Script from "next/script";
import { FC, useEffect } from "react";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID;

export const Tracking: FC<{}> = () => {
  const router = useRouter();
  const { events } = router || {};
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!window) return;
      window.gtag("config", "${trackingId}", {
        page_path: url,
      });
    };
    events.on("routeChangeComplete", handleRouteChange);
    events.on("hashChangeComplete", handleRouteChange);
    return () => {
      events.off("routeChangeComplete", handleRouteChange);
      events.off("hashChangeComplete", handleRouteChange);
    };
  }, [events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
      </Script>
    </>
  );
};
