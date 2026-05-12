import HeroSection from "@/sections/home/HeroSection";
import AboutPreview from "@/sections/home/AboutPreview";
import ServicesPreview from "@/sections/home/ServicesPreview";
import ProjectsPreview from "@/sections/home/ProjectsPreview";
import WhyChooseUs from "@/sections/home/WhyChooseUs";

export default function Home() {
  return (
    <main className="bg-[#F8F7F5] overflow-hidden">

      <HeroSection />

      <AboutPreview />

      <ServicesPreview />

      <ProjectsPreview />

      <WhyChooseUs />

    </main>
  );
}