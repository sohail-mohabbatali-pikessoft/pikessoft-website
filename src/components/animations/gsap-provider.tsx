"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once at module level
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const main = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
      ScrollTrigger.defaults({ markers: false });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <div ref={main}>{children}</div>;
}
