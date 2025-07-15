import Hero from "@/components/HUD/Hero";
import AboutSection from "../about";
import ProjectsSection from "../projects";
import Statspage from "../statspage";
import Contact from "../contact";
import Footer from "@/components/HUD/Footer";
import DeviceWarningPopup from "@/components/DeviceWarningPopup";


export default function Home() {
  return (
    <main>
      <DeviceWarningPopup />
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <Statspage />
      <Contact />
      <Footer />
    </main>
  );
}
