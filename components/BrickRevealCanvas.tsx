'use client';

import { useEffect, useRef, useCallback } from 'react';

const BrickRevealCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const bricks = useRef<
    { x: number; y: number; alpha: number; wobbleOffset: number }[]
  >([]);
  const animationFrameId = useRef<number | null>(null);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const brickSize = 30;
    const cols = Math.ceil(width / brickSize);
    const rows = Math.ceil(height / brickSize);

    if (bricks.current.length !== cols * rows) {
      bricks.current = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          bricks.current.push({
            x: i * brickSize,
            y: j * brickSize,
            alpha: 0,
            wobbleOffset: Math.random() * Math.PI * 2,
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    initializeCanvas();

    const handleResize = () => {
      initializeCanvas();
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) {
        animationFrameId.current = null;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const brickSize = 30;
      const maxDist = 150;
      const now = Date.now();

      for (let brick of bricks.current) {
        const dx = brick.x - mouse.current.x;
        const dy = brick.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          brick.alpha = Math.min(brick.alpha + 0.08, 1);
        } else {
          brick.alpha = Math.max(brick.alpha - 0.03, 0); 
        }

        if (brick.alpha > 0) {
          // Optimize wobble calculation
          const wobbleIntensity = brick.alpha * 4; // Wobble more as alpha increases
          const wobbleX = Math.sin(dist * 0.05 + now * 0.005 + brick.wobbleOffset) * wobbleIntensity;
          const wobbleY = Math.cos(dist * 0.05 + now * 0.005 + brick.wobbleOffset) * wobbleIntensity;

          ctx.fillStyle = `rgba(255, 105, 180, ${brick.alpha * 0.7})`;
          ctx.fillRect(
            brick.x + wobbleX,
            brick.y + wobbleY,
            brickSize - 2,
            brickSize - 2
          );
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [initializeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none mix-blend-soft-light"
      style={{ willChange: 'transform, opacity' }}
    />
  );
};

export default BrickRevealCanvas;
