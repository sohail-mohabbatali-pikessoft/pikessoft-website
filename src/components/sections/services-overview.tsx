"use client";

import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Smartphone,
  Code2,
  Database,
  Cloud,
  ArrowRight,
  Check,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const CALENDLY_URL = "https://calendly.com/shahzaib-ede/30min";
import SectionHeading from "@/components/sections/section-heading";
import FadeIn from "@/components/animations/fade-in";

/* -------------------------------------------------------------------------- */
/*  Types & data                                                                */
/* -------------------------------------------------------------------------- */

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  description: string;
  features: string[];
  useCases?: string[];
  href: string;
  color: string;
  isAI?: boolean;
}

const SERVICES: ServiceItem[] = [
  {
    icon: Brain,
    title: "Generative AI & Machine Learning",
    shortTitle: "AI & GenAI",
    description:
      "We build production-grade GenAI products: from custom GPT-powered assistants and RAG knowledge bases to autonomous AI agents. Our ML expertise turns your data into competitive intelligence that compounds over time.",
    features: [
      "Custom GPT & Claude fine-tuning",
      "RAG pipelines & AI knowledge bases",
      "Autonomous AI agents & orchestration",
      "Computer vision & NLP solutions",
    ],
    useCases: [
      "AI copilots for internal ops & support",
      "Intelligent sales & lead qualification bots",
    ],
    href: "/services/ai-ml",
    color: "#818cf8",
    isAI: true,
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    shortTitle: "Mobile",
    description:
      "Craft high-performance native and cross-platform mobile apps that users love. From iOS to Android, we deliver polished experiences with buttery-smooth interactions.",
    features: [
      "React Native & Flutter cross-platform apps",
      "Native iOS (Swift) & Android (Kotlin)",
      "Offline-first architecture & sync",
      "App Store & Play Store submission",
    ],
    href: "/services/mobile-development",
    color: "#fb923c",
  },
  {
    icon: Code2,
    title: "Web Development",
    shortTitle: "Web Dev",
    description:
      "Full-stack web platforms built for scale, speed, and reliability. From SaaS dashboards to enterprise portals, we ship production-ready code that performs under pressure.",
    features: [
      "Next.js, React, TypeScript frontends",
      "Node.js, Python, Go backends",
      "REST & GraphQL APIs",
      "Real-time features & WebSockets",
    ],
    href: "/services/web-development",
    color: "#34d399",
  },
  {
    icon: Database,
    title: "Data Science",
    shortTitle: "Data Science",
    description:
      "Transform raw data into competitive advantage. We build end-to-end data pipelines, predictive models, and interactive dashboards your team will actually use.",
    features: [
      "Data warehouse & ETL pipeline design",
      "Predictive modelling & ML models",
      "Business intelligence dashboards",
      "Real-time streaming analytics",
    ],
    href: "/services/data-science",
    color: "#22d3ee",
  },
  {
    icon: Cloud,
    title: "Cloud Migration",
    shortTitle: "Cloud",
    description:
      "Zero-downtime migrations and infrastructure modernization on AWS, Azure, and GCP. We optimize for cost, reliability, and developer velocity from day one.",
    features: [
      "Lift-and-shift & re-architecting strategies",
      "Kubernetes & containerization",
      "CI/CD pipeline automation",
      "Cost optimization & observability",
    ],
    href: "/services/cloud-migration",
    color: "#60a5fa",
  },
];

/* -------------------------------------------------------------------------- */
/*  Timer ring SVG                                                              */
/* -------------------------------------------------------------------------- */

const RING_R = 8;
const RING_CIRC = 2 * Math.PI * RING_R;

function TimerRing({ progress, color }: { progress: number; color: string }) {
  const filled = (progress / 100) * RING_CIRC;
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden className="shrink-0">
      <circle cx="11" cy="11" r={RING_R} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <circle
        cx="11" cy="11" r={RING_R}
        fill="none" stroke={color} strokeWidth="2"
        strokeDasharray={`${filled} ${RING_CIRC - filled}`}
        strokeLinecap="round"
        transform="rotate(-90 11 11)"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const TIMER_MS = 5000;
const TICK_MS = 50;

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function ServicesOverview() {
  const items = SERVICES;
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const activeRef   = useRef(0);
  const progressRef = useRef(0);
  const contentRef  = useRef<HTMLDivElement>(null);
  const tabsRef     = useRef<HTMLDivElement>(null);

  /* ── Auto-advance timer ─────────────────────────────────────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      progressRef.current += (TICK_MS / TIMER_MS) * 100;
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        const next = (activeRef.current + 1) % items.length;
        activeRef.current = next;
        setActiveIndex(next);
        setProgress(0);
      } else {
        setProgress(progressRef.current);
      }
    }, TICK_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  /* ── GSAP fade/slide on change ────────────────────────────────────── */
  useEffect(() => {
    if (!contentRef.current) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) return;
    gsap.killTweensOf(contentRef.current);
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [activeIndex]);

  /* ── Scroll active tab into view (tab bar only, no page scroll) ───── */
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.children[activeIndex] as HTMLElement | undefined;
    if (!btn) return;
    const target = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
    container.scrollTo({ left: target, behavior: "smooth" });
  }, [activeIndex]);

  const handleSelect = (i: number) => {
    if (i === activeRef.current) return;
    activeRef.current   = i;
    progressRef.current = 0;
    setActiveIndex(i);
    setProgress(0);
  };

  const active = items[activeIndex]!;

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn>
          <SectionHeading
            title="Software Development & Consulting Services"
            subtitle="From concept to deployment, end-to-end technology solutions that drive measurable business outcomes."
          />
        </FadeIn>

        <FadeIn delay={0.15} direction="up" distance={30}>

          {/* ── Tab carousel ─────────────────────────────────────────── */}
          <div
            ref={tabsRef}
            className="mt-10 flex gap-2.5 overflow-x-auto scrollbar-none py-0.5"
            role="tablist"
            aria-label="Services"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)",
            }}
          >
            {items.map((svc, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={svc.title}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    "relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap shrink-0",
                    "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "text-white shadow-lg"
                      : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  style={
                    isActive
                      ? {
                          backgroundColor: svc.color,
                          boxShadow: `0 4px 20px ${svc.color}55`,
                        }
                      : {}
                  }
                >
                  <svc.icon className="size-4 shrink-0" />
                  <span>{svc.shortTitle}</span>
                  {svc.isAI && !isActive && (
                    <Sparkles className="size-3 opacity-50" />
                  )}
                  {isActive && (
                    <TimerRing progress={progress} color="rgba(255,255,255,0.85)" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Immersive panel ──────────────────────────────────────── */}
          <div
            className="mt-4 rounded-3xl border overflow-hidden relative"
            style={{ borderColor: `${active.color}30` }}
          >
            {/* Dot-grid background pattern */}
            <div
              className="absolute inset-0 pointer-events-none transition-colors duration-700"
              style={{
                backgroundImage: `radial-gradient(${active.color}22 1.5px, transparent 1.5px)`,
                backgroundSize: "28px 28px",
              }}
              aria-hidden
            />

            {/* Gradient wash */}
            <div
              className="absolute inset-0 pointer-events-none transition-colors duration-700"
              style={{
                background: `linear-gradient(135deg, ${active.color}12 0%, ${active.color}06 40%, transparent 70%)`,
              }}
              aria-hidden
            />


            {/* Animated content */}
            <div
              ref={contentRef}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0"
            >
              {/* ── LEFT: hero text ───────────────────────────────── */}
              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">

                {/* Icon + AI badge */}
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="flex size-16 items-center justify-center rounded-2xl transition-all duration-500"
                    style={{
                      backgroundColor: `${active.color}1a`,
                      boxShadow: `0 0 0 1px ${active.color}30, 0 8px 40px ${active.color}40`,
                    }}
                  >
                    <active.icon className="size-8" style={{ color: active.color }} />
                  </div>
                  {active.isAI && (
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase border"
                      style={{
                        backgroundColor: `${active.color}18`,
                        color: active.color,
                        borderColor: `${active.color}40`,
                      }}
                    >
                      <Sparkles className="size-3" />
                      AI Powered
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl xl:text-[2.6rem] font-bold tracking-tight mb-4 leading-tight">
                  {active.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8 max-w-md">
                  {active.description}
                </p>

                {/* CTA */}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold w-fit transition-all duration-200 hover:gap-3 hover:brightness-110"
                  style={{
                    backgroundColor: active.color,
                    color: active.color === "#facc15" ? "#1a1a1a" : "#fff",
                    boxShadow: `0 4px 28px ${active.color}50`,
                  }}
                >
                  Start a Conversation
                  <ArrowRight className="size-4" />
                </a>

              </div>

              {/* ── RIGHT: feature cards grid ──────────────────────── */}
              <div
                className="p-8 md:p-10 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l transition-colors duration-700"
                style={{ borderColor: `${active.color}20` }}
              >
                <p
                  className="text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                  style={{ color: active.color }}
                >
                  What we deliver
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[...active.features, ...(active.useCases ?? [])].map((item, i) => (
                    <div
                      key={i}
                      className="group relative flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      style={{
                        backgroundColor: `${active.color}09`,
                        borderColor: `${active.color}25`,
                      }}
                    >
                      <div
                        className="size-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${active.color}25` }}
                      >
                        <Check className="size-3.5" style={{ color: active.color }} />
                      </div>
                      <p className="text-sm font-medium text-foreground/80 leading-snug">{item}</p>
                      <div
                        className="absolute bottom-0 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: active.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </FadeIn>
      </div>
    </section>
  );
}
