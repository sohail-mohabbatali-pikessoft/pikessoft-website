"use client";

import { useEffect, useRef } from "react";
import {
  Heart,
  Landmark,
  ShoppingCart,
  GraduationCap,
  Building2,
  Truck,
  Film,
  Zap,
  Globe,
  Stethoscope,
  Cpu,
  Package,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/sections/section-heading";
import FadeIn from "@/components/animations/fade-in";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface SanityIndustry {
  _id: string;
  name: string;
  slug?: { current: string };
  icon?: string;
  description?: string;
}

/* -------------------------------------------------------------------------- */
/*  Icon map                                                                   */
/* -------------------------------------------------------------------------- */

const ICON_MAP: Record<string, LucideIcon> = {
  Heart, Stethoscope, Landmark, ShoppingCart, GraduationCap,
  Building2, Truck, Film, Zap, Cpu, Globe, Package, Wifi,
};

function resolveIcon(name?: string): LucideIcon {
  return name && ICON_MAP[name] ? ICON_MAP[name] : Globe;
}

/* -------------------------------------------------------------------------- */
/*  Accent colors                                                              */
/* -------------------------------------------------------------------------- */

const COLORS = [
  "#f43f5e", // rose     — Healthcare
  "#3b82f6", // blue     — FinTech
  "#10b981", // emerald  — Retail
  "#8b5cf6", // violet   — Education
  "#f59e0b", // amber    — Real Estate
  "#06b6d4", // cyan     — Logistics
  "#ec4899", // pink     — Entertainment
  "#ca8a04", // yellow   — Energy
];

/* -------------------------------------------------------------------------- */
/*  Static fallback data                                                       */
/* -------------------------------------------------------------------------- */

const FALLBACK_INDUSTRIES: SanityIndustry[] = [
  {
    _id: "healthcare",
    name: "Healthcare",
    slug: { current: "healthcare" },
    icon: "Heart",
    description:
      "We build HIPAA-compliant telemedicine platforms, AI-powered diagnostics, patient data management systems, and remote monitoring apps. From EHR integrations to real-time video consultations, our solutions help healthcare providers deliver better care while keeping sensitive data secure and audit-ready.",
  },
  {
    _id: "fintech",
    name: "FinTech",
    slug: { current: "fintech" },
    icon: "Landmark",
    description:
      "We build AI-powered fraud detection engines, intelligent credit scoring models, and smart digital banking platforms. From real-time transaction monitoring and regulatory-compliant trading systems to Open Banking API integrations, we help fintechs move fast without compromising security or compliance.",
  },
  {
    _id: "retail",
    name: "Retail & E-Commerce",
    slug: { current: "retail" },
    icon: "ShoppingCart",
    description:
      "We build AI-driven recommendation engines, dynamic pricing models, and intelligent inventory systems that power modern commerce. Whether you're a D2C brand or a large marketplace, our solutions personalise the shopping experience, reduce churn, and scale from launch to enterprise.",
  },
  {
    _id: "education",
    name: "Education",
    slug: { current: "education" },
    icon: "GraduationCap",
    description:
      "Our EdTech solutions include LMS platforms, AI-powered tutors, adaptive learning paths, and immersive mobile apps that keep students engaged. We partner with schools, universities, and ed-startups to build products that improve learning outcomes, increase retention, and scale to millions of learners.",
  },
  {
    _id: "real-estate",
    name: "Real Estate",
    slug: { current: "real-estate" },
    icon: "Building2",
    description:
      "We develop property marketplace platforms, virtual tour experiences, AI-driven valuation tools, and agent CRM systems. Our real estate software gives brokers, developers, and buyers a data-driven edge: from smart search and lead scoring to automated document workflows and market analytics.",
  },
  {
    _id: "logistics",
    name: "Logistics",
    slug: { current: "logistics" },
    icon: "Truck",
    description:
      "We deliver end-to-end logistics technology including real-time fleet management, AI-powered route optimisation, warehouse automation, and supply chain visibility dashboards. Our platforms help logistics companies cut operational costs, reduce delivery times, and give customers live shipment transparency.",
  },
  {
    _id: "entertainment",
    name: "Entertainment",
    slug: { current: "entertainment" },
    icon: "Film",
    description:
      "We build AI-powered content recommendation engines, high-performance streaming platforms, and personalised fan engagement tools designed for massive concurrent audiences. From OTT video delivery with intelligent discovery to interactive AR experiences, we help media brands captivate audiences across every screen.",
  },
  {
    _id: "energy",
    name: "Energy",
    slug: { current: "energy" },
    icon: "Zap",
    description:
      "We engineer AI-driven smart grid management systems, predictive maintenance platforms, and sustainability analytics dashboards. Our ML models help utilities and clean-tech operators forecast demand, detect anomalies in real time, reduce carbon footprint, and comply with evolving energy regulations.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Single stacking card                                                       */
/* -------------------------------------------------------------------------- */

interface CardProps {
  industry: SanityIndustry;
  color: string;
}

function IndustryCard({ industry, color }: CardProps) {
  const Icon = resolveIcon(industry.icon);

  return (
    <div
      className="relative flex items-stretch rounded-2xl border border-border/60 bg-card overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
      style={{ willChange: "transform" }}
    >
      {/* ── Colored left panel ── */}
      <div
        className="w-28 md:w-36 shrink-0 flex flex-col items-center justify-center gap-3 py-8"
        style={{ backgroundColor: `${color}10` }}
      >
        <div
          className="size-12 md:size-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${color}22`, color }}
        >
          <Icon className="size-6 md:size-7" />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 py-7 px-7 md:px-10 flex flex-col justify-center">
        <h3 className="font-bold text-xl md:text-2xl leading-snug mb-2.5">
          {industry.name}
        </h3>
        <p className="text-sm md:text-[0.9375rem] text-muted-foreground leading-relaxed">
          {industry.description}
        </p>
      </div>

      {/* ── Left accent bar ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

// Approximate navbar height — cards stick below this
const NAV_OFFSET = 88; // px
// Trailing padding on the container (keeps the full stack sticky briefly before releasing)
const TRAILING_PX = 60; // px

interface IndustriesSectionProps {
  industries?: SanityIndustry[];
}

export default function IndustriesSection({ industries }: IndustriesSectionProps) {
  const activeIndustries =
    industries && industries.length > 0 ? industries : FALLBACK_INDUSTRIES;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const n = activeIndustries.length;

  /* ── Scroll-scrubbed scale-down animation ─────────────────────────────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      activeIndustries.forEach((_, i) => {
        // For each card except the last: scale it down as the next card arrives
        if (i >= n - 1) return;

        const card = cardRefs.current[i];
        const nextCard = cardRefs.current[i + 1];
        if (!card || !nextCard) return;

        // targetScale: computed by how many cards will eventually sit on top
        // Each buried card shrinks by 0.04 (matching the reference implementation)
        const finalDepth = n - 1 - i; // max cards on top of this one
        const targetScale = 1 - finalDepth * 0.04;

        gsap.to(card, {
          scale: Math.max(targetScale, 0.75), // floor at 0.75 so deep cards don't disappear
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 75%",                  // next card slides up from behind
            end: `top ${NAV_OFFSET}px`,        // next card fully settled on stack
            scrub: 0.8,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  return (
    <section className="bg-muted/30">

      {/* Heading — outside the stacking area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-10">
        <SectionHeading
          title="AI Solutions Across Industries"
          subtitle="Deploying AI-powered software across sectors, automating operations, unlocking deep insights, and transforming how businesses compete."
        />
      </div>

      {/* ── Stacking cards ──
           All sticky divs live directly inside ONE container so they share
           the same containing block. Each card is exactly card-height below
           the previous in normal flow — no spacers, no gap. The incoming card
           slides up from behind the stuck card and overlaps it (higher z-index).
           paddingBottom gives dwell time after the full stack is built. */}
      <div
        ref={containerRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingBottom: `${TRAILING_PX}px` }}
      >
        {activeIndustries.map((industry, i) => (
          <div
            key={industry._id}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{
              position: "sticky",
              top: `${NAV_OFFSET}px`,
              zIndex: i + 1,
              paddingBottom: i < n - 1 ? "10px" : 0,
            }}
          >
            <IndustryCard
              industry={industry}
              color={COLORS[i % COLORS.length]!}
            />
          </div>
        ))}
      </div>


    </section>
  );
}
