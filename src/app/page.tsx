import HeroSlider from "@/components/home/HeroSlider";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import QuienesSomos from "@/components/home/QuienesSomos";
import LineasDeAccion from "@/components/home/LineasDeAccion";
import MapaBolivia from "@/components/home/MapaBolivia";
import HomeNoticias from "@/components/home/HomeNoticias";
import PhotoEssay from "@/components/home/PhotoEssay";
import DualCallout from "@/components/home/DualCallout";
import Transparencia from "@/components/home/Transparencia";
import CooperantesCarousel from "@/components/home/CooperantesCarousel";
import HomeCta from "@/components/home/HomeCta";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ImpactMetrics />
      <QuienesSomos />
      <LineasDeAccion />
      <MapaBolivia />
      <HomeNoticias />
      <PhotoEssay />
      <DualCallout />
      <Transparencia />
      <CooperantesCarousel />
      <HomeCta />
    </>
  );
}
