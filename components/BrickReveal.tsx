'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState, useCallback } from 'react';

const NUM_ROWS = 25;
const NUM_COLS = 40;
const BRICK_SIZE = 20;
const INTERACTION_RADIUS = 150;

const BrickReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const [hovered, setHovered] = useState(false);

  const getBrickAnimationProps = useCallback((rowIdx: number, colIdx: number) => {
    const x = colIdx * BRICK_SIZE + BRICK_SIZE / 2;
    const y = rowIdx * BRICK_SIZE + BRICK_SIZE / 2;

    const distanceX = x - mousePos.current.x;
    const distanceY = y - mousePos.current.y;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    const offset = Math.max(0, INTERACTION_RADIUS - distance);
    const opacity = offset / INTERACTION_RADIUS;

    return {
      x: hovered ? distanceX * 0.02 : 0,
      y: hovered ? distanceY * 0.02 : 0,
      opacity: hovered ? opacity : 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 18,
        mass: 0.5,
        opacity: { duration: 0.2 },
      },
    };
  }, [hovered]);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { left, top } = containerRef.current.getBoundingClientRect();
      const newMouseX = e.clientX - left;
      const newMouseY = e.clientY - top;

      mousePos.current = {
        x: newMouseX,
        y: newMouseY,
      };

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          animationFrameId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 pointer-events-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full h-full grid"
           style={{
             gridTemplateRows: `repeat(${NUM_ROWS}, 1fr)`,
             gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)`,
             opacity: 0.4,
           }}>
        {Array.from({ length: NUM_ROWS }).map((_, rowIdx) =>
          Array.from({ length: NUM_COLS }).map((_, colIdx) => {
            const animationProps = getBrickAnimationProps(rowIdx, colIdx);

            return (
              <motion.div
                key={`${rowIdx}-${colIdx}`}
                initial={{ opacity: 0 }}
                animate={animationProps}
                style={{
                  willChange: 'transform, opacity',
                  backgroundColor: 'rgb(236, 72, 153)',
                  width: `${BRICK_SIZE}px`,
                  height: `${BRICK_SIZE}px`,
                }}
                className="w-4 h-4"
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default BrickReveal;
