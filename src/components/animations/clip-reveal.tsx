"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ClipRevealProps {
  children: React.ReactNode;
  /** Extra CSS classes on the outer (clip) wrapper */
  className?: string;
  /** Stagger delay in seconds before this element's reveal begins */
  delay?: number;
  /** Whether to fire once or reverse on scroll-back */
  once?: boolean;
}

/**
 * ClipReveal
 * A cinematic "slide-up from behind a mask" reveal used for section
 * headings, sub-headings, and any content that benefits from a more
 * editorial entrance than a simple fade.
 *
 * How it works
 * ─────────────
 * The outer div clips its overflow.  The inner div starts pushed 105 %
 * below the clip boundary.  When the outer element enters the viewport
 * GSAP eases the inner div to y=0, making it appear to rise up from
 * behind an invisible baseline.
 */
export default function ClipReveal({
  children,
  className,
  delay = 0,
  once = true,
}: ClipRevealProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (prefersReducedMotion || !outer || !inner) return;

    // Start below the clip boundary
    gsap.set(inner, { y: "105%" });

    const st = ScrollTrigger.create({
      trigger: outer,
      start: "top 88%",
      toggleActions: once ? "play none none none" : "play none none reverse",
      onEnter: () => {
        gsap.to(inner, {
          y: "0%",
          duration: 0.95,
          delay,
          ease: "power4.out",
        });
      },
      onLeaveBack: once
        ? undefined
        : () => {
            gsap.to(inner, { y: "105%", duration: 0.5, ease: "power3.in" });
          },
    });

    return () => st.kill();
  }, [delay, once]);

  return (
    /* overflow-hidden is the invisible mask that clips the rising content */
    <div ref={outerRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
