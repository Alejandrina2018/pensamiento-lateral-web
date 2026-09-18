import Hero from "@/sections/home/Hero";
import ClientCredentials from "@/sections/home/ClientCredentials";
import ServiceIntro from "@/sections/home/ServiceIntro";
import MethodTimeline from "@/sections/home/MethodTimeline";
import AudienceSplit from "@/sections/home/AudienceSplit";
import FeaturedCases from "@/sections/home/FeaturedCases";
import AboutSection from "@/sections/home/AboutSection";
import FeaturedInsights from "@/sections/home/FeaturedInsights";
import ContactSection from "@/sections/home/ContactSection";

// Section order per CLAUDE.md #11.
export default function Home() {
  return (
    <>
      <Hero />
      <ClientCredentials />
      <ServiceIntro />
      <MethodTimeline />
      <AudienceSplit />
      <FeaturedCases />
      <AboutSection />
      <FeaturedInsights />
      <ContactSection />
    </>
  );
}
