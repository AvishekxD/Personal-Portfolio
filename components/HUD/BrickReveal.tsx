"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const NUM_ROWS = 25;
const NUM_COLS = 40;

const BrickReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { left, top } = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - left,
        y: e.clientY - top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 pointer-events-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full h-full grid grid-rows-[repeat(25,_1fr)] grid-cols-[repeat(40,_1fr)] opacity-40">
        {Array.from({ length: NUM_ROWS }).map((_, rowIdx) =>
          Array.from({ length: NUM_COLS }).map((_, colIdx) => {
            const distanceX = colIdx * 20 - mousePos.x;
            const distanceY = rowIdx * 20 - mousePos.y;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            const offset = Math.max(0, 150 - distance);
            const opacity = offset / 150;

            return (
              <motion.div
                key={`${rowIdx}-${colIdx}`}
                initial={{ opacity: 0 }}
                animate={{
                  x: hovered ? distanceX * 0.02 : 0,
                  y: hovered ? distanceY * 0.02 : 0,
                  opacity: hovered ? opacity : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  mass: 0.5,
                }}
                style={{
                  willChange: "transform, opacity",
                }}
                className="w-4 h-4 bg-pink-500"
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default BrickReveal;
