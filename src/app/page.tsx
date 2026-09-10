import HeroSlider from "@/components/home/HeroSlider";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import LineasDeAccion from "@/components/home/LineasDeAccion";
import PhotoEssay from "@/components/home/PhotoEssay";
import DualCallout from "@/components/home/DualCallout";
import Transparencia from "@/components/home/Transparencia";
import HomeCta from "@/components/home/HomeCta";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ImpactMetrics />
      <LineasDeAccion />
      <PhotoEssay />
      <DualCallout />
      <Transparencia />
      <HomeCta />
    </>
  );
}