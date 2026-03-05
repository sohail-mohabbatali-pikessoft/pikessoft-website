"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollProgress
 * A 2 px line pinned to the very top of the viewport that fills
 * left-to-right as the user scrolls the page.
 * Uses GSAP ScrollTrigger scrub for silky-smooth updates.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const st = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress, overwrite: "auto" });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[100] origin-left"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
