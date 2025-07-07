import Hero from "@/components/HUD/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="about" className="min-h-screen flex items-center justify-center bg-white/70 text-black px-6">
        <h2 className="text-4xl font-bold font-mono">About Section</h2>
      </section>
      
    </main>
  );
}
