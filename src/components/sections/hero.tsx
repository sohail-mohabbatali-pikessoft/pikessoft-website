"use client";

import { useRef, useState, useCallback } from "react";
import { Calendar, ChevronDown, Zap, Bot, Globe } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import TypingRotator from "@/components/ui/typing-rotator";
import Magnetic from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const featureChips = [
  { icon: Zap,  label: "4-week MVPs"  },
  { icon: Bot,  label: "AI-First Dev" },
  { icon: Globe,label: "200+ Clients" },
];

const recognizedBy = [
  { name: "Clutch",     rating: "4.9" },
  { name: "GoodFirms", rating: "4.8" },
  { name: "G2",        rating: "4.8" },
  { name: "Trustpilot",rating: "4.7" },
];

const TYPING_ITEMS = [
  "Generative AI & LLM Products",
  "AI Agents & Automation",
  "Intelligent Web Platforms",
  "AI-Powered Mobile Apps",
  "Data Science & ML Solutions",
];

// Headline split: regular words + gradient words animate independently
const HEADLINE_WORDS    = ["Where AI"];
const HEADLINE_GRADIENT = ["Meets Engineering"];

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafRef     = useRef<number | null>(null);
  const pendingRef = useRef({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Parallax blobs ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      pendingRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePos({ ...pendingRef.current });
          rafRef.current = null;
        });
      }
    },
    []
  );

  /* ── Entrance timeline ──
   *  delay: 1.3 s  → starts as the PageIntro curtain begins sliding up,
   *  so the first hero elements animate into view in sync with the reveal.
   */
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ delay: 1.3 });

      tl
        // Headline — each word rises from behind its clip mask
        .from(
          ".hero-word-inner",
          {
            y: "115%",
            duration: 1.05,
            stagger: 0.07,
            ease: "power4.out",
          },
          "-=0.3"
        )

        // Sub-line (typing rotator)
        .from(
          ".hero-subtitle",
          {
            y: 22,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55"
        )

        // Feature chips pop in with a subtle scale
        .from(
          ".hero-chip",
          {
            y: 20,
            opacity: 0,
            scale: 0.88,
            duration: 0.5,
            stagger: 0.09,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )

        // CTA buttons
        .from(
          ".hero-cta",
          {
            y: 22,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.35"
        )

        // Trust strip fades in last
        .from(
          ".hero-trust",
          {
            opacity: 0,
            y: 12,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.25"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
        "pt-24 pb-16 md:pt-32 md:pb-24"
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1.5px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Parallax blobs */}
      <div
        className="absolute top-1/4 -left-40 h-[520px] w-[520px] rounded-full bg-primary/6 blur-3xl animate-float will-change-transform"
        style={{ transform: `translate(${mousePos.x * 28}px, ${mousePos.y * 18}px)` }}
      />
      <div
        className="absolute bottom-1/4 -right-40 h-[420px] w-[420px] rounded-full bg-chart-1/6 blur-3xl animate-float-delay will-change-transform"
        style={{ transform: `translate(${mousePos.x * -18}px, ${mousePos.y * 14}px)` }}
      />

      {/* Ring decorations */}
      <div className="absolute top-24 right-[12%] h-40 w-40 rounded-full border border-border/40 opacity-25 animate-float-slow" />
      <div className="absolute bottom-28 left-[8%]  h-28 w-28 rounded-full border border-border/40 opacity-20 animate-float-delay" />

      {/* ── Content ── */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
        <div className="mx-auto max-w-4xl text-center w-full">

          {/* ── Headline — word-by-word reveal ──
           *  Each word lives inside a clip container (overflow-hidden).
           *  GSAP animates the inner span from y:"115%" to y:"0%" so the
           *  word slides up from behind the invisible baseline.
           */}
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-wrap-balance leading-[1.15]">
            {/* Regular words */}
            {HEADLINE_WORDS.map((word) => (
              <span
                key={word}
                className="inline-block overflow-hidden pb-[0.12em] mr-[0.22em] align-bottom"
              >
                <span className="hero-word-inner inline-block">{word}</span>
              </span>
            ))}

            {/* Gradient words — gradient applied directly on each word-inner */}
            {HEADLINE_GRADIENT.map((word) => (
              <span
                key={word}
                className="inline-block overflow-hidden pb-[0.12em] mr-[0.22em] last:mr-0 align-bottom"
              >
                <span className="hero-word-inner inline-block bg-gradient-to-r from-primary via-chart-2 to-chart-1 bg-clip-text text-transparent">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* ── Sub-line ── */}
          <p className="hero-subtitle mt-5 text-base font-medium text-muted-foreground sm:text-lg">
            Specializing in{" "}
            <TypingRotator
              items={TYPING_ITEMS}
              className="text-foreground font-semibold"
            />
          </p>

          {/* ── Feature chips ── */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {featureChips.map((chip) => (
              <div
                key={chip.label}
                className={cn(
                  "hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2",
                  "bg-card border border-border/70 text-sm font-medium shadow-sm"
                )}
              >
                <chip.icon className="size-3.5 text-primary shrink-0" />
                {chip.label}
              </div>
            ))}
          </div>

          {/* ── CTAs — wrapped in Magnetic for cursor pull ── */}
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Magnetic className="hero-cta">
              <Button
                size="lg"
                className="h-12 px-8 text-base gap-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                asChild
              >
                <a
                  href="https://calendly.com/shahzaib-ede/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="size-4" />
                  Book a Meeting
                </a>
              </Button>
            </Magnetic>

          </div>

          {/* ── Trust strip ── */}
          <div className="hero-trust mt-12 md:mt-14 flex flex-col items-center gap-4">
            <div className="h-px w-32 bg-border/60" />
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Recognized by
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {recognizedBy.map((platform) => (
                <div key={platform.name} className="flex items-center gap-1.5 text-sm">
                  <span className="font-semibold text-foreground">{platform.name}</span>
                  <span className="text-chart-4 font-medium">★ {platform.rating}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50 animate-bounce">
        <ChevronDown className="size-5" />
      </div>
    </section>
  );
}
