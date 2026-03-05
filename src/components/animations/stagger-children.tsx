"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggerChildrenProps {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  className?: string;
}

export default function StaggerChildren({
  children,
  stagger = 0.1,
  duration = 0.6,
  className = "",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !ref.current) return;

    const items = Array.from(ref.current.children);

    gsap.set(items, { opacity: 0, y: 30 });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [stagger, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
