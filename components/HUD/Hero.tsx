"use client";

import Image from 'next/image';
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
import GlitchRevealText from "./GlitchRevealText";
import ScanlineTextOverlay from "./ScanlineRevealText";


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
        <SchematicDisplay className="w-full sm:max-w-[380px] max-w-[320px] md:max-w-[520px] will-change-transform" />

      </div>
      <div className="overflow-x-auto flex justify-center items-start ">
        <TechnicalDrawing className="w-full sm:max-w-[380px] max-w-[320px] md:max-w-[520px] will-change-transform" />
      </div>
      {/* <div className="w-full max-w-6xl flex flex-col justify-center items-start text-start px-8"> </div> */}

      {/* left-section */}
      <section className="w-full max-w-6xl flex flex-col-reverse md:flex-row justify-center items-start text-start pl-16 md:pl-28">
        <div
          ref={containerRef}
          className="z-30 relative px-4 py-12 max-w-5xl w-full flex flex-col items-start justify-start text-center"
        >
          {/* Title */}
          <GlitchRevealText
            text="FAZE s1mple"
            className="text-[2.7rem] sm:text-[3.5rem] md:text-[4.5rem] font-extrabold tracking-wide leading-tight"
            wordRevealDuration={2}
            glitchLayers={14}
            layerOffsetMax={18}
            staggerDelay={0.1}
            textColor="#000"
          />

          {/* Subtitle */}
          <GlitchRevealText
            text="Code. Deploy. Repeat."
            className="text-xl sm:text-2xl md:text-3xl font-semibold"
            wordRevealDuration={1.1}
            glitchLayers={13}
            layerOffsetMax={15}
            staggerDelay={0.03}
            textColor="#000"
          />
          
          {/* Tagline */}
          <ScanlineTextOverlay
            text="I’m a MERN stack developer with a strong grasp of"
            className="mt-2.5 text-base sm:text-lg max-w-xl text-gray-600 dark:text-gray-300"
            delay={0.69}
            duration={0.7}
            textColor="#000"
          />
          <ScanlineTextOverlay
            text="DSA, system design, and real-world applications that"
            className="text-base sm:text-lg max-w-xl text-gray-600 dark:text-gray-300"
            delay={0.79}
            duration={0.8}
            textColor="#000"
          />
          <ScanlineTextOverlay
            text="deliver impact."
            className="text-base sm:text-lg max-w-xl text-gray-600 dark:text-gray-300"
            delay={0.89}
            duration={0.9}
            textColor="#000"
          />

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-6"
          >
            <button className="group bg-black text-white cursor-pointer px-6 py-2 rounded-full text-base sm:text-lg font-semibold shadow-lg transition-transform duration-300 hover:scale-105 relative overflow-hidden">
              <span className="relative z-10 flex justify-center items-center">
                <ScanlineTextOverlay
                  text="Contact Me"
                  className="text-white flex justify-center items-center "
                  delay={0.89}
                  duration={0.9}
                  textColor="white"
                />
              </span>

              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-800 to-zinc-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>

          </motion.div>
        </div>

        {/* right-section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='relative md:ml-auto md:mr-35 mr-4 md:-mt-28 lg:-mt-36 
                    w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[405px] md:h-[440px] 
                    overflow-hidden rounded-full group shadow-lg'
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className='w-full h-full'
          >
            <Image
              src="/assets/me.jpg"
              // src="/assets/HackerBoy3.png"
              alt="avishekxd"
              width={1280}
              height={768}
              className='object-cover w-full h-full group-hover:scale-[1.03] transition-all duration-300 ease-in-out'
            />
          </motion.div>
        </motion.div>
      </section>
    </section>
  );
};

export default Hero;
