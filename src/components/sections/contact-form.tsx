"use client";

import Image from "next/image";
import { Calendar, Clock, Video, ArrowRight, Zap, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/fade-in";

// ─── Replace with your Calendly booking URL ───────────────────────────────────
const CALENDLY_URL = "https://calendly.com/shahzaib-ede/30min";
// ──────────────────────────────────────────────────────────────────────────────

const MEETING_POINTS = [
  "30-minute free consultation call",
  "No commitment required",
  "Get a tailored project roadmap",
  "Meet the team building your product",
];

const STEPS = [
  {
    num: "01",
    title: "Tell us your idea",
    desc: "Share your vision, goals, and timeline. We listen before we strategise.",
  },
  {
    num: "02",
    title: "Get a free proposal",
    desc: "We map out the tech stack, team size, and a realistic cost breakdown.",
  },
  {
    num: "03",
    title: "Start building together",
    desc: "First sprint kicks off within days of your sign-off. Zero red tape.",
  },
];

const TRUST_STATS = [
  { icon: Zap,   value: "48 h",  label: "Avg. response" },
  { icon: Users, value: "120+",  label: "Projects shipped" },
  { icon: Star,  value: "4.9",   label: "Client rating" },
];

export default function ContactFormSection() {
  return (
    <section className="relative py-24 bg-muted/40 overflow-hidden">

      {/* Subtle dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.55,
        }}
      />
      {/* Fade-out edges so dot grid softens near borders */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, hsl(var(--muted)/0.4) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-[11px] font-bold tracking-[0.18em] uppercase text-primary mb-5">
              <Zap className="size-3" />
              Free Strategy Call
            </span>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-wrap-balance">
              Ready to build your{" "}
              <span className="relative inline-block">
                next big thing?
                {/* Underline squiggle */}
                <svg
                  aria-hidden
                  viewBox="0 0 220 10"
                  className="absolute -bottom-1 left-0 w-full text-primary/40"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 7 Q20 2 40 7 Q60 12 80 7 Q100 2 120 7 Q140 12 160 7 Q180 2 200 7 Q212 10 218 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              Book a free 30-minute strategy call with our team. Walk away with a clear roadmap, no pressure, no commitment.
            </p>
          </div>
        </FadeIn>

        {/* ── Two columns ─────────────────────────────────────────────────── */}
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left — Process + Trust + Advisor */}
          <FadeIn direction="left" className="h-full">
            <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-8 sm:p-10 shadow-sm h-full flex flex-col justify-between gap-10">

              {/* Step-by-step process */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                  How it works
                </p>
                <div className="space-y-0">
                  {STEPS.map((step, i) => (
                    <div key={step.num} className="flex gap-5">
                      {/* Number circle + connecting line */}
                      <div className="flex flex-col items-center">
                        <div className="size-9 rounded-full bg-foreground text-background flex items-center justify-center text-[11px] font-bold shrink-0 tabular-nums">
                          {step.num}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className="w-px flex-1 bg-border my-2 min-h-[28px]" />
                        )}
                      </div>
                      {/* Text */}
                      <div className="pb-7">
                        <p className="font-semibold text-[0.95rem]">{step.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust stats row */}
              <div className="grid grid-cols-3 gap-3">
                {TRUST_STATS.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center rounded-xl bg-muted/60 border border-border px-3 py-4 gap-1 transition-all duration-200 hover:bg-primary/8 hover:border-primary/40 hover:shadow-sm cursor-default"
                  >
                    <Icon className="size-4 text-primary mb-1" />
                    <span className="text-xl font-bold tracking-tight">{value}</span>
                    <span className="text-[10px] text-muted-foreground leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              {/* Advisor */}
              <div className="flex items-center gap-4 pt-1 border-t border-border">
                <div className="size-12 rounded-full bg-muted overflow-hidden shrink-0">
                  <Image
                    src="/shahzaibbg.png"
                    alt="Shahzaib Saleem"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">Shahzaib Saleem</p>
                  <p className="text-xs text-muted-foreground">Innovation Advisor</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-muted-foreground">Usually replies within 48 h</span>
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>

          {/* Right — Booking Card */}
          <FadeIn direction="right" className="h-full">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm flex flex-col items-center text-center h-full">

              {/* Icon */}
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Calendar className="size-8 text-primary" />
              </div>

              <h3 className="text-2xl font-bold tracking-tight">
                Schedule a Free Consultation
              </h3>
              <p className="mt-2 text-muted-foreground text-sm max-w-xs">
                Pick a time that works for you, no strings attached.
              </p>

              {/* Meta pills */}
              <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  <Clock className="size-3.5" />
                  30 minutes
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  <Video className="size-3.5" />
                  Video or Phone
                </span>
              </div>

              {/* Checklist */}
              <ul className="mt-7 space-y-2.5 text-left w-full max-w-xs">
                {MEETING_POINTS.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 16 16"
                        className="size-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="2 8 6 12 14 4" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                size="lg"
                className="mt-8 w-full max-w-xs group"
              >
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a Meeting
                  <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>

              <p className="mt-4 text-xs text-muted-foreground/60">
                Free · No credit card required
              </p>

            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
