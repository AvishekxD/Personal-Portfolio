'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface GlitchRevealTextProps {
  text: string;
  className?: string;
  wordRevealDuration?: number;
  glitchLayers?: number;
  layerOffsetMax?: number;
  staggerDelay?: number;
  textColor?: string;
}

const glitchColors = ['red', 'green', 'blue', 'white', 'black', 'pink', 'cyan', 'gray'];

// 💡 Deterministic pseudo-random helper
const pseudoRandom = (seed: number, range: number, offset = 0) =>
  ((Math.sin(seed + offset) + 1) / 2) * range - range / 2;

const getGlitchColor = (i: number, layerIdx: number) => {
  const index = (i * 7 + layerIdx * 13) % glitchColors.length;
  return glitchColors[index];
};

const GlitchRevealText: React.FC<GlitchRevealTextProps> = ({
  text,
  className = '',
  wordRevealDuration = 0.5,
  glitchLayers = 3,
  layerOffsetMax = 8,
  staggerDelay = 0.1,
  textColor = 'black',
}) => {
  const safeText = text || '';
  const words = safeText.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const mainTextVariants: Variants = {
    hidden: {
      opacity: 0,
      clipPath: 'inset(0% 100% 0% 0%)',
    },
    visible: {
      opacity: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        duration: wordRevealDuration,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  const glitchLayerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: ({ i, layerIdx }: { i: number; layerIdx: number }) => {
      const seed = i * 10 + layerIdx;
      const xOffset = pseudoRandom(seed, layerOffsetMax, 1);
      const yOffset = pseudoRandom(seed, layerOffsetMax, 2);
      const rotateZ = pseudoRandom(seed, 5, 3);
      const skewX = pseudoRandom(seed, 10, 4);

      return {
        opacity: [0, 1, 0.5, 0.6, 0],
        x: xOffset,
        y: yOffset,
        rotateZ,
        skewX,
        clipPath: [
          'inset(0% 0% 90% 0%)',
          'inset(10% 0% 80% 0%)',
          'inset(20% 0% 70% 0%)',
          'inset(30% 0% 60% 0%)',
          'inset(40% 0% 50% 0%)',
          'inset(50% 0% 5% 0%)',
          'inset(70% 0% 30% 70%)',
          'inset(80% 0% 20% 20%)',
          'inset(90% 0% 50% 10%)',
          'inset(100% 0% 1% 0%)',
        ],
        transition: {
          duration: wordRevealDuration * 0.5,
          ease: 'linear',
          delay: i * staggerDelay + (layerIdx % 3) * 0.05,
          repeat: 0,
        },
      };
    },
  };

  return (
    <motion.div
      className={`inline-block relative whitespace-nowrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="relative inline-block overflow-hidden mr-2">
          {/* Glitch layers */}
          {Array.from({ length: glitchLayers }).map((_, layerIdx) => {
            const glitchColor = getGlitchColor(i, layerIdx);

            return (
              <motion.span
                key={`glitch-${i}-${layerIdx}`}
                className="absolute inset-0 select-none pointer-events-none"
                variants={glitchLayerVariants}
                custom={{ i, layerIdx }}
                initial="hidden"
                animate="visible"
                style={{
                  color: glitchColor,
                  mixBlendMode: 'lighten',
                  opacity: 0.5, // ✅ consistent number
                }}
              >
                {word === '&trade;' ? (
                  <sup className="text-sm md:text-base lg:text-lg">™</sup>
                ) : (
                  word
                )}
              </motion.span>
            );
          })}

          {/* Main clean layer */}
          <motion.span
            className="relative z-10 inline-block"
            variants={mainTextVariants}
            initial="hidden"
            animate="visible"
            style={{ color: textColor }}
          >
            {word === '&trade;' ? (
              <sup className="text-sm md:text-base lg:text-lg">™</sup>
            ) : (
              word
            )}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default GlitchRevealText;
