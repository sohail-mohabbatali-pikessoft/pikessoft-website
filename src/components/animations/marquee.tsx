"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !innerRef.current || !containerRef.current)
      return;

    const inner = innerRef.current;
    const totalWidth = inner.scrollWidth / 2;
    const duration = totalWidth / speed;

    gsap.set(inner, { x: direction === "left" ? 0 : -totalWidth });

    const tween = gsap.to(inner, {
      x: direction === "left" ? -totalWidth : 0,
      duration,
      ease: "none",
      repeat: -1,
    });

    if (pauseOnHover) {
      const container = containerRef.current;
      const pause = () => tween.pause();
      const play = () => tween.play();
      container.addEventListener("mouseenter", pause);
      container.addEventListener("mouseleave", play);
      return () => {
        container.removeEventListener("mouseenter", pause);
        container.removeEventListener("mouseleave", play);
        tween.kill();
      };
    }

    return () => {
      tween.kill();
    };
  }, [speed, direction, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
    >
      <div ref={innerRef} className="flex w-max gap-8">
        {children}
        {children}
      </div>
    </div>
  );
}
