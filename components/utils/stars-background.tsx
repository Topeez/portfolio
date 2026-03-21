"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  direction: number;
}

interface StarsBackgroundProps {
  starDensity?: number;
  className?: string;
}

export function StarsBackground({
  starDensity = 0.00012,
  className,
}: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initStars = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.floor(canvas.width * canvas.height * starDensity);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.8 + 0.2,
        direction: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((star) => {
        star.opacity += star.speed * star.direction * 0.004;
        if (star.opacity >= 0.8 || star.opacity <= 0.1) {
          star.direction *= -1;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    initStars();
    animate();

    const handleResize = () => initStars();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [starDensity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 size-full pointer-events-none", className)}
    />
  );
}
