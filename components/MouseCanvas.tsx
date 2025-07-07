'use client';

import { useEffect, useRef, useCallback } from 'react';

const MouseCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef({ x: -1000, y: -1000 });

  const drawAura = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    const { x, y } = mousePosition.current;
    const radius = 150;

    if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) {
      return;
    }

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255,192,203,0.2)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = gradient;
    ctx.globalCompositeOperation = 'multiply';
    ctx.filter = 'blur(80px)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawAura(); 
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(() => {
          drawAura();
          animationFrameId.current = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasDimensions);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [drawAura]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
      style={{ willChange: 'contents' }}
    />
  );
};

export default MouseCanvas;
