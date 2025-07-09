"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import LineTick from "@/components/PrintSVGs/LineTick";
import Reticle from "@/components/PrintSVGs/Reticle";
import SquareOutline from "@/components/PrintSVGs/SquareOutline";
import XMark from "@/components/PrintSVGs/XMark";

import ConnectionLines from "../PrintSVGs/ConnectionLines";
import DataGridDots from "../PrintSVGs/DataGridDots";
import CrosshairPlus from "../PrintSVGs/CrosshairPlus";
import DataBlock from "../PrintSVGs/DataBlock";
import SchematicDisplay from "../PrintSVGs/SchematicDisplay";
import TechnicalDrawing from "../PrintSVGs/TechnicalDrawing";


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
    <section className="w-full min-h-screen flex items-center justify-center relative z-10 ">
      <div className="overflow-x-auto flex justify-center items-start "> 
          <SchematicDisplay className="w-full sm:max-w-[380px] max-w-[320px] md:max-w-[520px] will-change-transform"/>
          
      </div>
      <div className="overflow-x-auto flex justify-center items-start ">
        <TechnicalDrawing className="w-full sm:max-w-[380px] max-w-[320px] md:max-w-[520px] will-change-transform" />
      </div>
        
      {/* <div
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
        
      </div> */}
          <div className="w-full max-w-6xl flex flex-col justify-center items-start text-start px-8">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 dark:text-white flex flex-row items-center"
          >
            Code. Deploy. Repeat.<p className="text-[18px] ">🎈</p>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[16px] sm:text-xl max-w-xl text-gray-600 dark:text-gray-300"
          >
            Hi, I’m Abhishek — I specialize in MERN stack apps and have a strong foundation in DSA, system design, and real-world projects.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <button className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-base sm:text-lg font-medium shadow-md hover:scale-105 transition-transform duration-300">
              View My Work
            </button>
          </motion.div>
        </div>
    </section>
  );
};

export default Hero;
