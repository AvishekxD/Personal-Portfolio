'use client';

import { useEffect, useRef } from 'react';

const MouseLight = () => {
  const lightRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(() => {
          const light = lightRef.current;
          if (light) {
            light.style.transform = `translate3d(${mousePos.current.x - 150}px, ${mousePos.current.y - 150}px, 0)`;
          }
          animationFrameId.current = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={lightRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-40 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(255,0,150,0.15), rgba(0,0,0,0.05))',
        mixBlendMode: 'multiply',
        filter: 'blur(100px)',
        willChange: 'transform',
      }}
    />
  );
};

export default MouseLight;
