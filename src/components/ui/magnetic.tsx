"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  /** How far the element moves toward the cursor (0 = none, 1 = full cursor delta) */
  strength?: number;
  className?: string;
}

/**
 * Magnetic
 * Wraps any element and gives it a subtle cursor-tracking pull effect.
 * On hover the element moves slightly toward the cursor; on leave it
 * springs back with a satisfying elastic bounce.
 *
 * Respects prefers-reduced-motion — passes through without effect.
 */
export default function Magnetic({
  children,
  strength = 0.38,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseEnter = useCallback(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;
    // Refresh rect so it's accurate after any layout shifts
    ref.current?.getBoundingClientRect(); // warm-up only
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      gsap.to(el, {
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.75,
      ease: "elastic.out(1, 0.45)",
      overwrite: "auto",
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </div>
  );
}
