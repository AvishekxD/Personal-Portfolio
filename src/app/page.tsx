import Hero from "@/components/HUD/Hero";
import AboutSection from "../about";
import ProjectsSection from "../projects";
import Statspage from "../statspage";
import Contact from "../contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <Statspage />
      <Contact />
    </main>
  );
}
