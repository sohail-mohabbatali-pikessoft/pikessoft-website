"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({
  end,
  suffix = "",
  duration = 2,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!ref.current || hasAnimated) return;

    if (prefersReducedMotion) {
      ref.current.textContent = `${end}${suffix}`;
      return;
    }

    const obj = { value: 0 };

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated) return;
        setHasAnimated(true);
        gsap.to(obj, {
          value: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = `${Math.round(obj.value)}${suffix}`;
            }
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill();
      });
    };
  }, [end, suffix, duration, hasAnimated]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      0{suffix}
    </span>
  );
}
