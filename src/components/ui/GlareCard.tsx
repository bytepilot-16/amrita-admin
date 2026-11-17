import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltMax?: number;
}

export const GlareCard: React.FC<GlareCardProps> = ({
  children,
  className = '',
  onClick,
  tiltMax = 3.5,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / rect.width) * 100;
    const yPct = (mouseY / rect.height) * 100;

    // Calculate rotation (-tiltMax to +tiltMax)
    const rotX = ((mouseY / rect.height) - 0.5) * -tiltMax * 2;
    const rotY = ((mouseX / rect.width) - 0.5) * tiltMax * 2;

    setRotate({ x: rotX, y: rotY });
    setGlarePos({ x: xPct, y: yPct, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 25,
        }}
        className={`relative overflow-hidden rounded-xl border border-tuscan-hairline bg-surface/50 transition-shadow duration-300 hover:shadow-paper ${className}`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Specular warm terracotta glare overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(227, 83, 54, 0.08) 0%, rgba(255, 211, 172, 0.15) 35%, transparent 70%)`,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
};

