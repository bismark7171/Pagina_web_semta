import type { Metadata } from "next";
import "./globals.css";
import { siteDetails } from "@/data/siteDetails";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import FloatingChat from "@/components/layout/FloatingChat";
import SplashScreen from "@/components/layout/SplashScreen";
import { ThemeProvider, ThemeScript } from "@/components/layout/ThemeProvider";
import { ImageViewerProvider } from "@/components/ui/ImageViewerContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL(siteDetails.siteUrl),
  title: {
    default: siteDetails.metadata.title,
    template: `%s · ${siteDetails.siteName}`,
  },
  description: siteDetails.metadata.description,
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    siteName: siteDetails.siteName,
    locale: "es_BO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className="flex min-h-screen flex-col bg-surface text-on-surface antialiased transition-colors duration-200"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SplashScreen />
          <ImageViewerProvider>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <BackToTop />
            <FloatingChat />
            <Toaster position="top-right" richColors />
          </ImageViewerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
