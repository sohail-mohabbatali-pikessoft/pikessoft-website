"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * LenisProvider
 * Initialises buttery-smooth scroll (Lenis) and synchronises it with
 * GSAP's ScrollTrigger so scroll-triggered animations remain accurate.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Respect user accessibility preference – native scroll only
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Exponential ease-out: quick start, smooth landing
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker for frame-perfect sync
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // prevent large jumps after tab switch

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
