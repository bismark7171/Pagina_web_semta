const fs = require('fs');
const file = 'src/components/analytics/GoogleAnalytics.tsx';
let code = fs.readFileSync(file, 'utf8');

// Suspense boundary is needed when using useSearchParams in Next.js static generation!
// Let's replace the whole file with a Suspense wrapper.
const newCode = `"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

function AnalyticsInner({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.gtag) {
      const url = searchParams?.size ? \`\${pathname}?\${searchParams.toString()}\` : pathname;
      
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
        anonymize_ip: true, 
      });
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return null;
}

export function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={\`https://www.googletagmanager.com/gtag/js?id=\${GA_MEASUREMENT_ID}\`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: \`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '\${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          \`,
        }}
      />
      <Suspense fallback={null}>
        <AnalyticsInner GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
      </Suspense>
    </>
  );
}
`;
fs.writeFileSync(file, newCode);
