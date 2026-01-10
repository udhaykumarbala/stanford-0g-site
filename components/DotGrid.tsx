"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";
import { gsap } from "gsap";

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
}

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  returnDuration?: number;
  className?: string;
}

export default function DotGrid({
  dotSize = 1.5,
  gap = 35,
  baseColor = "rgba(146, 0, 225, 0.12)",
  activeColor = "rgba(146, 0, 225, 0.4)",
  proximity = 150,
  shockRadius = 200,
  shockStrength = 3,
  returnDuration = 1.2,
  className = "",
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: -1000,
    y: -1000,
    lastX: -1000,
    lastY: -1000,
    vx: 0,
    vy: 0,
    lastTime: 0,
  });
  const animationRef = useRef<number>();

  const hexToRgb = useCallback((color: string) => {
    if (color.startsWith("rgba") || color.startsWith("rgb")) {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
      }
    }
    const hex = color.replace("#", "");
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };
  }, []);

  const getAlpha = useCallback((color: string) => {
    if (color.startsWith("rgba")) {
      const match = color.match(/rgba?\([^)]+,\s*([\d.]+)\)/);
      if (match) return parseFloat(match[1]);
    }
    return 1;
  }, []);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor, hexToRgb]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor, hexToRgb]);
  const baseAlpha = useMemo(() => getAlpha(baseColor), [baseColor, getAlpha]);
  const activeAlpha = useMemo(() => getAlpha(activeColor), [activeColor, getAlpha]);

  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const cols = Math.ceil(canvas.width / gap) + 1;
    const rows = Math.ceil(canvas.height / gap) + 1;

    const dots: Dot[] = [];
    const startX = (canvas.width - (cols - 1) * gap) / 2;
    const startY = (canvas.height - (rows - 1) * gap) / 2;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          cx: startX + x * gap,
          cy: startY + y * gap,
          xOffset: 0,
          yOffset: 0,
        });
      }
    }
    dotsRef.current = dots;
  }, [gap]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pr = pointerRef.current;
    const proxSq = proximity * proximity;

    dotsRef.current.forEach((dot) => {
      const ox = dot.cx + dot.xOffset;
      const oy = dot.cy + dot.yOffset;

      const dx = pr.x - ox;
      const dy = pr.y - oy;
      const distSq = dx * dx + dy * dy;

      let style = baseColor;
      if (distSq < proxSq) {
        const dist = Math.sqrt(distSq);
        const t = 1 - dist / proximity;
        const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
        const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
        const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        const alpha = baseAlpha + (activeAlpha - baseAlpha) * t;
        style = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      ctx.beginPath();
      ctx.arc(ox, oy, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = style;
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(draw);
  }, [dotSize, proximity, baseColor, baseRgb, activeRgb, baseAlpha, activeAlpha]);

  useEffect(() => {
    buildGrid();
    draw();

    const handleResize = () => {
      buildGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;

      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      // Calculate velocity
      const vx = ((newX - pr.lastX) / dt) * 1000;
      const vy = ((newY - pr.lastY) / dt) * 1000;
      const speed = Math.hypot(vx, vy);

      pr.x = newX;
      pr.y = newY;
      pr.vx = vx;
      pr.vy = vy;
      pr.lastX = newX;
      pr.lastY = newY;
      pr.lastTime = now;

      // Apply shock/push effect to nearby dots
      if (speed > 50) {
        dotsRef.current.forEach((dot) => {
          const dx = dot.cx + dot.xOffset - newX;
          const dy = dot.cy + dot.yOffset - newY;
          const dist = Math.hypot(dx, dy);

          if (dist < shockRadius && dist > 0) {
            const falloff = Math.max(0, 1 - dist / shockRadius);
            const pushX = (dx / dist) * shockStrength * falloff * (speed / 500);
            const pushY = (dy / dist) * shockStrength * falloff * (speed / 500);

            // Kill any existing animation on this dot
            gsap.killTweensOf(dot);

            // Push the dot
            dot.xOffset += pushX;
            dot.yOffset += pushY;

            // Animate back to original position with elastic easing
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: returnDuration,
              ease: "elastic.out(1, 0.5)",
            });
          }
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(pointerRef.current, {
        x: -1000,
        y: -1000,
        duration: 0.5,
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [buildGrid, draw, shockRadius, shockStrength, returnDuration]);

  return (
    <div ref={wrapperRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
