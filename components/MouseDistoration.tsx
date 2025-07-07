'use client';

import { useEffect, useRef } from 'react';

const MouseDistortion = () => {
  const maskCircleRef = useRef<SVGCircleElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(() => {
          if (maskCircleRef.current) {
            maskCircleRef.current.setAttribute('cx', mousePosition.current.x.toString());
            maskCircleRef.current.setAttribute('cy', mousePosition.current.y.toString());
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
    <svg
      className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none mix-blend-multiply"
      style={{ willChange: 'filter' }}
    >
      <defs>
        <filter id="distortionFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01"
            numOctaves="3"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <mask id="mask">
          <rect width="100%" height="100%" fill="black" />
          <circle ref={maskCircleRef} r="150" fill="white" />
        </mask>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="white"
        filter="url(#distortionFilter)"
        mask="url(#mask)"
        opacity="0.2"
        style={{ willChange: 'filter' }}
      />
    </svg>
  );
};

export default MouseDistortion;
