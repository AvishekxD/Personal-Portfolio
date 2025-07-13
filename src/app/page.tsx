import Hero from "@/components/HUD/Hero";
import AboutSection from "../about";
import ProjectsSection from "../projects";
import StatsSection from "../statsSection";
import Contact from "../contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <StatsSection />
      <Contact />
    </main>
  );
}
