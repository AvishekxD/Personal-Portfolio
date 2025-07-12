"use client";

import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const isOverImageRef = useRef(false);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const updateCursorPosition = () => {
      if (cursorRef.current && !isOverImageRef.current) {
        const currentWidth = cursorRef.current.offsetWidth;
        const currentHeight = cursorRef.current.offsetHeight;

        const offsetX = currentWidth / 1.5;
        const offsetY = currentHeight / 2.5;

        cursorRef.current.style.transform = `translate(${targetX - offsetX}px, ${targetY - offsetY}px)`;
        cursorRef.current.style.opacity = '1';
      }
      animationFrameId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentTargetIsImage = e.target && (e.target as HTMLElement).tagName === 'IMG';

      if (currentTargetIsImage) {
        isOverImageRef.current = true;
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '0';
        }
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        isOverImageRef.current = false;
        targetX = e.clientX;
        targetY = e.clientY;

        if (animationFrameId === null) {
          animationFrameId = requestAnimationFrame(updateCursorPosition);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="cursor-trail"
      className="fixed w-[75px] h-[75px] z-[9999] pointer-events-none rounded-full
                 bg-black backdrop-invert shadow-xl/30 mix-blend-difference transition-opacity duration-300 ease-out"
      style={{ willChange: 'transform', opacity: 0,  boxShadow: '0 0 20px 0.5px #a1a1a1'}}
    />
  );
};

export default CursorTrail;
