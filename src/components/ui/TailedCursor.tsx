import React, { useEffect, useRef } from 'react';

interface TailedCursorProps {
  enabled: boolean;
}

interface TrailNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const TailedCursor: React.FC<TailedCursorProps> = ({ enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const isTouchRef = useRef(false);
  const isHoveringWindowRef = useRef(false);

  useEffect(() => {
    // Detect touch device
    if (typeof window !== 'undefined') {
      isTouchRef.current = window.matchMedia('(pointer: coarse)').matches;
    }
  }, []);

  useEffect(() => {
    if (!enabled || isTouchRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize 18 trail nodes
    const NODE_COUNT = 18;
    const nodes: TrailNode[] = Array.from({ length: NODE_COUNT }, () => ({
      x: targetPos.current.x,
      y: targetPos.current.y,
      vx: 0,
      vy: 0,
    }));

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      isHoveringWindowRef.current = true;
    };

    const onMouseLeave = () => {
      isHoveringWindowRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const SPRING = 0.32;
    const DAMPING = 0.58;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isHoveringWindowRef.current && targetPos.current.x > 0 && targetPos.current.y > 0) {
        // Update head
        nodes[0].x += (targetPos.current.x - nodes[0].x) * 0.75;
        nodes[0].y += (targetPos.current.y - nodes[0].y) * 0.75;

        // Update body chain with spring physics
        for (let i = 1; i < NODE_COUNT; i++) {
          const prev = nodes[i - 1];
          const curr = nodes[i];

          const dx = prev.x - curr.x;
          const dy = prev.y - curr.y;

          curr.vx = (curr.vx + dx * SPRING) * DAMPING;
          curr.vy = (curr.vy + dy * SPRING) * DAMPING;

          curr.x += curr.vx;
          curr.y += curr.vy;
        }

        // Draw ribbon trail
        for (let i = 0; i < NODE_COUNT - 1; i++) {
          const p1 = nodes[i];
          const p2 = nodes[i + 1];

          const progress = 1 - i / NODE_COUNT;
          const lineWidth = Math.max(1, progress * 8.5);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Amrita Crimson with tapering alpha
          ctx.strokeStyle = `rgba(164, 18, 63, ${progress * 0.38})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

        // Crisp Amrita Crimson center dot with subtle outer ring
        const head = nodes[0];
        
        // Outer halo
        ctx.beginPath();
        ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(164, 18, 63, 0.12)';
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#A4123F';
        ctx.fill();

        // Inner specular point
        ctx.beginPath();
        ctx.arc(head.x - 1, head.y - 1, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

