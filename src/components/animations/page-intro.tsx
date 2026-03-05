"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "@/components/ui/logo";

/**
 * PageIntro
 * A branded curtain that covers the viewport on first paint and wipes
 * upward to reveal the page. Shows the PikesSoft logo centred on the
 * dark overlay, fades it in briefly, then slides the entire panel off.
 *
 * Total duration: ~2.1 s
 *   0.00 – 0.65  logo fades + rises in
 *   0.65 – 1.10  logo holds
 *   1.10 – 1.45  logo fades up out
 *   1.30 – 2.15  overlay slides up (overlaps last 0.15 s of logo fade)
 */
export default function PageIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    if (prefersReducedMotion) {
      overlay.style.display = "none";
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.display = "none";
      },
    });

    tl
      // 1 — Logo appears
      .fromTo(
        logo,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }
      )
      // 2 — Logo fades out
      .to(logo, { opacity: 0, y: -10, duration: 0.35, ease: "power2.in" }, "+=0.45")
      // 3 — Curtain slides up — starts 0.15 s before logo finishes fading
      .to(
        overlay,
        { yPercent: -100, duration: 0.85, ease: "expo.inOut" },
        "-=0.15"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      /* z-[9999] keeps the curtain above everything including header */
      className="fixed inset-0 z-[9999] bg-foreground flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Logo starts invisible; GSAP handles the reveal */}
      <div ref={logoRef} style={{ opacity: 0 }}>
        <Logo className="h-36 w-auto text-background" />
      </div>
    </div>
  );
}
