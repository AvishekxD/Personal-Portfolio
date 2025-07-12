"use client";

import { motion, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  textColor?: string;
}

const ScanlineRevealText: React.FC<Props> = ({
  text,
  className = "",
  delay = 0.99,
  duration = 1,
  textColor = "#000",
}) => {
  const letters = text.split("");
  const [showScanline, setShowScanline] = useState(false);
  const [hideScanline, setHideScanline] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => setShowScanline(true), delay * 1000);
    const hideTimeout = setTimeout(() => setHideScanline(true), (delay + duration) * 1000);
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [delay, duration]);

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * 0.01,
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1],
      },
    }),
  };

  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      <motion.div
        className="relative z-10"
        initial="hidden"
        animate="visible"
      >
        {letters.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            className="inline-block"
            style={{ color: textColor }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      {showScanline && !hideScanline && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration,
            ease: "easeInOut",
          }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <div className="w-full h-full bg-black" />
        </motion.div>
      )}
    </div>
  );
};

export default ScanlineRevealText;
