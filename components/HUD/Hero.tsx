"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import LineTick from "@/components/PrintSVGs/LineTick";
import Reticle from "@/components/PrintSVGs/Reticle";
import SquareOutline from "@/components/PrintSVGs/SquareOutline";
import XMark from "@/components/PrintSVGs/XMark";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      container.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="w-full min-h-screen flex items-center justify-center relative z-10">
      <div
        ref={containerRef}
        className="text-center px-6 max-w-3xl transition-transform duration-200 ease-out"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-mono font-bold text-black tracking-tight"
        >
          Håvard Nygaard
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl font-mono text-neutral-500"
        >
          HANDLE_WITH_CARE;
        </motion.p>
        <section className="p-8 hud-border rounded-xl md:col-span-2 flex flex-row">
          <XMark className="w-16 h-16 text-black hover:scale-125 transition-transform duration-300" />
          <SquareOutline className="w-20 h-20 text-black hover:rotate-12 transition-transform duration-300" />
          <LineTick className="w-32 h-10 text-black hover:opacity-75 transition-opacity duration-300" />
          <Reticle className="w-28 h-28 text-cs-green animate-spin-slow" />
        </section>
      </div>
    </section>
  );
};

export default Hero;
