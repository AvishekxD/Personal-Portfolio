'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

const gridSize = 32;
const revealRadius = 100;
const transitionDuration = 0.2;
const resetTransitionDuration = 0.001;

const BrickHoverReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });
  const mousePosition = useRef({ x: -1000, y: -1000 });
  const animationFrameId = useRef<number | null>(null);

  const setupGrid = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cols = Math.ceil(w / gridSize);
    const rows = Math.ceil(h / gridSize);
    setDimensions({ cols, rows });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setupGrid();
      window.addEventListener('resize', setupGrid);
    }
    return () => window.removeEventListener('resize', setupGrid);
  }, [setupGrid]);

  useEffect(() => {
    const updateBricks = () => {
      if (!containerRef.current || !dimensions.cols || !dimensions.rows) {
        animationFrameId.current = null;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = mousePosition.current.x - rect.left;
      const mouseY = mousePosition.current.y - rect.top;

      controls.set((i: number) => {
        const col = i % dimensions.cols;
        const row = Math.floor(i / dimensions.cols);
        const x = col * gridSize + gridSize / 2;
        const y = row * gridSize + gridSize / 2;

        const dx = mouseX - x;
        const dy = mouseY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < revealRadius) {
          const angle = Math.atan2(dy, dx);
          const push = (revealRadius - dist) / 2;

          return {
            x: -Math.cos(angle) * push,
            y: -Math.sin(angle) * push,
            scale: 1.1,
            opacity: 0.2 + (1 - dist / revealRadius) * 0.4,
            rotate: (Math.sin(dx * 0.01) + Math.cos(dy * 0.01)) * 1,
            transition: { duration: transitionDuration, ease: 'easeOut' },
          };
        } else {
          return {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 0,
            rotate: 0,
            transition: { duration: resetTransitionDuration, ease: 'easeOut' }, 
          };
        }
      });

      animationFrameId.current = null; 
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(updateBricks);
      }
    };

    const handleMouseLeave = () => {
      mousePosition.current = { x: -10000, y: -10000 };
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(updateBricks);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    if (dimensions.cols && dimensions.rows && !animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(updateBricks);
    }


    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dimensions, controls]); 

  const total = dimensions.cols * dimensions.rows;

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full">
        {Array.from({ length: total }).map((_, i) => {
          const col = i % dimensions.cols;
          const row = Math.floor(i / dimensions.cols);
          return (
            <motion.div
              key={i}
              custom={i} 
              initial={{ opacity: 0, x: 0, y: 0, scale: 1, rotate: 0 }} 
              animate={controls} 
              className="absolute w-[32px] h-[32px] bg-pink-400/10 border border-pink-500/20 rounded-[4px]"
              style={{
                left: `${col * gridSize}px`,
                top: `${row * gridSize}px`,
                willChange: 'transform, opacity, rotate',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BrickHoverReveal;