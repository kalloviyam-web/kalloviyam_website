import ServicesHero from "@/sections/services/ServicesHero";
import ServicesIntro from "@/sections/services/ServicesIntro";
import ServicesList from "@/sections/services/ServicesList";

export const metadata = {
  title: "Services | Kalloviyam",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#F8F7F5] overflow-hidden">

      <ServicesHero />

      <ServicesIntro />

      <ServicesList />

    </main>
  );
}