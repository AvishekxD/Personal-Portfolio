"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState, useCallback } from "react";

const BrickReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [brickWidth, setBrickWidth] = useState(0);
  const [brickHeight, setBrickHeight] = useState(0);

  useEffect(() => {
    const calculateGridDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        const baseBrickSize = 20; 
        
        const newCols = Math.ceil(offsetWidth / baseBrickSize);
        const newRows = Math.ceil(offsetHeight / baseBrickSize);

        setNumCols(newCols);
        setNumRows(newRows);
        setBrickWidth(offsetWidth / newCols);
        setBrickHeight(offsetHeight / newRows);
      }
    };

    calculateGridDimensions();

    window.addEventListener("resize", calculateGridDimensions);
    return () => window.removeEventListener("resize", calculateGridDimensions);
  }, []);


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
    <div className="fixed inset-0 z-10"> 
      <div
        ref={containerRef}
        className="w-full h-full pointer-events-none"
      >
        {numRows > 0 && numCols > 0 && (
          <div
            className="w-full h-full opacity-40"
            style={{
              display: "grid",
              gridTemplateRows: `repeat(${numRows}, 1fr)`,
              gridTemplateColumns: `repeat(${numCols}, 1fr)`,
            }}
          >
            {Array.from({ length: numRows }).map((_, rowIdx) =>
              Array.from({ length: numCols }).map((_, colIdx) => {
                const brickCenterX = colIdx * brickWidth + brickWidth / 2;
                const brickCenterY = rowIdx * brickHeight + brickHeight / 2;

                const distanceX = brickCenterX - mousePos.x;
                const distanceY = brickCenterY - mousePos.y;
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
                      width: brickWidth,
                      height: brickHeight,
                      willChange: "transform, opacity",
                    }}
                    className="bg-pink-500 dark:bg-pink-700" 
                  />
                );
              })
            )}
          </div>
        )}
      </div>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  );
};

export default BrickReveal;