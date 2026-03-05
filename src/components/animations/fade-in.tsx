"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 40,
  className = "",
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !ref.current) return;

    const initialProps: gsap.TweenVars = { opacity: 0 };
    if (direction === "up") initialProps.y = distance;
    if (direction === "down") initialProps.y = -distance;
    if (direction === "left") initialProps.x = distance;
    if (direction === "right") initialProps.x = -distance;

    gsap.set(ref.current, initialProps);

    gsap.to(ref.current, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: once
          ? "play none none none"
          : "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [direction, delay, duration, distance, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
