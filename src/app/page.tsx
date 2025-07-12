import Hero from "@/components/HUD/Hero";
import AboutSection from "../about";
import ProjectsSection from "../projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProjectsSection />
    </main>
  );
}
