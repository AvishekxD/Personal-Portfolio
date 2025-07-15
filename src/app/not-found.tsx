"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlitchRevealText from "@/components/HUD/GlitchRevealText";
import ScanlineTextOverlay from "@/components/HUD/ScanlineRevealText";
import { useEffect, useState } from "react";

const stickers = Array.from({ length: 10 }, (_, i) => `/api/image-proxy?img=HackerBoy${i + 1}.png`);

const NotFound = () => {
  const [randomSticker, setRandomSticker] = useState<string | null>(null);

  useEffect(() => {
    const selected = stickers[Math.floor(Math.random() * stickers.length)];
    setRandomSticker(selected);
  }, []);

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-8 sm:px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-3xl border-t-1 border-zinc-500/10 ring-zinc-500/50 flex flex-col rounded-2xl bg-[var(--secondary3)] text-center p-6 sm:p-12 md:p-20 xl:px-32 xl:py-24 shadow-lg border backdrop-blur-md"
      >
        <GlitchRevealText
          text="404"
          className="text-3xl sm:text-7xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent"
          glitchLayers={8}
          layerOffsetMax={15}
          staggerDelay={0.05}
          wordRevealDuration={1}
        />

        {randomSticker && (
          <motion.img
            key={randomSticker}
            src={randomSticker}
            width={120}
            height={120}
            alt="Random Hacker Sticker"
            className="mx-auto my-4 w-[120px] sm:w-[160px] h-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 10,
              duration: 0.6,
            }}
          />
        )}

        <ScanlineTextOverlay
          text="Oops, this page doesn’t exist."
          className="text-base sm:text-xl mt-6 max-w-md mx-auto text-black"
          delay={0.7}
          duration={0.6}
          textColor="black"
        />

        <Link href="/" passHref>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-6 py-2 bg-white text-black font-semibold rounded-full shadow-lg transition-all border-1 border-zinc-500/20 duration-300 hover:bg-zinc-100"
          >
            Go Back Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
