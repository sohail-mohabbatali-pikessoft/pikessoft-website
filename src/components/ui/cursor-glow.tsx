"use client";

import { useEffect, useRef } from "react";

/**
 * A smooth radial glow that follows the mouse cursor with a lerp-based
 * lag effect.  Only renders on non-touch devices (hidden on mobile).
 * Skipped entirely when the user prefers reduced motion.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let rafId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Lerp toward target for a smooth lagging effect
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        /* Subtle blue-teal glow — visible in both light & dark modes */
        background:
          "radial-gradient(circle, oklch(0.6 0.12 220 / 0.08) 0%, oklch(0.6 0.10 260 / 0.04) 40%, transparent 70%)",
      }}
    />
  );
}
