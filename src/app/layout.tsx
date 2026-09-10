import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingChat from "@/components/layout/FloatingChat";
import { siteDetails } from "@/data/siteDetails";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

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
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ["/images/twitter-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d631b",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: siteDetails.siteName,
  alternateName: "Servicios Múltiples de Tecnologías Apropiadas",
  url: siteDetails.siteUrl,
  foundingDate: "1982",
  email: siteDetails.contacto.email,
  telephone: siteDetails.contacto.telefono,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteDetails.contacto.direccion,
    addressLocality: "La Paz",
    addressCountry: "BO",
  },
  areaServed: { "@type": "Country", name: "Bolivia" },
  sameAs: siteDetails.redes.map((r) => r.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-label-lg focus:font-semibold focus:text-on-primary"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingChat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}