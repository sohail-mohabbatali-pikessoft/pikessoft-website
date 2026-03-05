"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  stagger = 0.03,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !ref.current) return;

    const words = ref.current.querySelectorAll(".word");

    gsap.set(words, { opacity: 0, y: 20 });

    gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger,
      delay,
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
  }, [text, delay, stagger]);

  const words = text.split(" ");

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word inline-block mr-[0.25em]">
          {word}
        </span>
      ))}
    </Tag>
  );
}
