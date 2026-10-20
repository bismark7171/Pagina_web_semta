import HeroSlider from "@/components/home/HeroSlider";
import QuienesSomos from "@/components/home/QuienesSomos";
import LineasDeAccion from "@/components/home/LineasDeAccion";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import MapaBolivia from "@/components/home/MapaBolivia";
import PhotoEssay from "@/components/home/PhotoEssay";
import DualCallout from "@/components/home/DualCallout";
import HomeNoticias from "@/components/home/HomeNoticias";
import CooperantesCarousel from "@/components/home/CooperantesCarousel";
import Transparencia from "@/components/home/Transparencia";
import HomeCta from "@/components/home/HomeCta";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSlider />
      <QuienesSomos />
      <LineasDeAccion />
      <ImpactMetrics />
      <MapaBolivia />
      <PhotoEssay />
      <DualCallout />
      <HomeNoticias />
      <CooperantesCarousel />
      <Transparencia />
      <HomeCta />
    </div>
  );
}
