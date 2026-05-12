//src/app/about/page.js
import AboutHero from "@/sections/about/AboutHero";
import VisionMission from "@/sections/about/VisionMission";
import WhyChooseUs from "@/sections/about/WhyChooseUs";

export const metadata = {
  title: "About Us | Kalloviyam",
  description: "Learn more about Kalloviyam and our eco-friendly construction vision.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#F8F7F5] overflow-hidden">

      <AboutHero />

      <VisionMission />

      <WhyChooseUs />

    </main>
  );
}