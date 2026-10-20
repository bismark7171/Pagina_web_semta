import type { Metadata } from "next";
import GoogleNewsSection from "@/components/noticias/GoogleNewsSection";
import HomeNoticias from "@/components/home/HomeNoticias";

export const metadata: Metadata = {
  title: "Noticias y Novedades",
  description:
    "Actualidad sobre agroecología, cambio climático, seguridad hídrica y actividades comunitarias de SEMTA en Bolivia.",
};

export default function NoticiasPage() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop space-y-16">
        <HomeNoticias />
        <GoogleNewsSection />
      </div>
    </div>
  );
}
