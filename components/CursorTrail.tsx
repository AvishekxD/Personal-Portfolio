"use client";

import { useEffect } from "react";

const CursorTrail = () => {
  useEffect(() => {
    const cursor = document.getElementById("cursor-trail");

    const move = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX - 75}px`;
        cursor.style.top = `${e.clientY - 75}px`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      id="cursor-trail"
      className="fixed w-[150px] h-[150px] z-[9999] pointer-events-none rounded-full
                 bg-pink/5 backdrop-invert blur-md mix-blend-difference transition-all duration-100 ease-out"
    />
  );
};

export default CursorTrail;
