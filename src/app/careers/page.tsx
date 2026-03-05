import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Users,
  ShieldCheck,
  FileText,
  Code2,
  MessageSquare,
  Gift,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";
import CultureTabs from "./_components/culture-tabs";
import JobOpenings from "./_components/job-openings";
import type { JobOpening } from "./_components/job-openings";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join PikesSoft's AI-first engineering team. Explore open positions and help us build the next generation of intelligent software products.",
  openGraph: {
    title: "Careers | PikesSoft",
    description:
      "Join PikesSoft's AI-first engineering team. Explore open positions and help us build the next generation of intelligent software products.",
  },
};

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const coreValues = [
  {
    icon: Star,
    title: "Deliver Real Impact",
    description:
      "We build AI-powered products that move metrics, not just milestones. Every engagement is a chance to create outcomes our clients could not achieve alone.",
  },
  {
    icon: Users,
    title: "Collaborate Openly",
    description:
      "Great products emerge from honest conversation. We break silos, share knowledge freely, and treat every team member's perspective as signal worth hearing.",
  },
  {
    icon: ShieldCheck,
    title: "Own It End to End",
    description:
      "From kickoff to production, we own our commitments. Proactive communication, rigorous quality, and full accountability at every step.",
  },
];

const hiringSteps = [
  {
    step: "01",
    icon: FileText,
    title: "Apply",
    description:
      "Submit your application and resume. We read every submission carefully, no automated rejections.",
    color: "#a78bfa", // violet
  },
  {
    step: "02",
    icon: Code2,
    title: "Assessment",
    description:
      "A short take-home challenge relevant to your role. We value clean thinking over clever tricks.",
    color: "#fb923c", // orange
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Interview",
    description:
      "A conversational session with your future team. We explore experience, problem-solving, and culture fit.",
    color: "#22d3ee", // cyan
  },
  {
    step: "04",
    icon: Gift,
    title: "Welcome",
    description:
      "A competitive offer and a warm welcome aboard. Your first sprint kicks off within days of signing.",
    color: "#34d399", // emerald
  },
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function CareersPage() {
  const jobs: JobOpening[] = [];

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 size-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 size-64 rounded-full bg-primary/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-wrap-balance max-w-4xl mx-auto leading-tight">
              Build AI Products That Actually Matter
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join an AI-first engineering team that ships LLM-powered products,
              autonomous agents, and intelligent platforms. We invest in your
              growth as much as we invest in our clients.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild className="group">
                <Link href="#openings">
                  See Openings
                  <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:hr@pikessoft.com">Apply Directly</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Core Values                                                       */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-wrap-balance">
              Our Core Values
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl text-lg mx-auto leading-relaxed">
              The principles that guide every product decision, every line of
              code, and every client conversation.
            </p>
          </FadeIn>

          <StaggerChildren stagger={0.12} className="grid gap-6 md:grid-cols-3">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group relative rounded-2xl border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 overflow-hidden cursor-default"
                >
                  {/* Animated accent bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="mb-6">
                    <div className="size-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                      <Icon className="size-5 text-primary" aria-hidden />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Culture Section (Client)                                          */}
      {/* ----------------------------------------------------------------- */}
      <CultureTabs />

      {/* ----------------------------------------------------------------- */}
      {/* Current Job Openings (Client)                                     */}
      {/* ----------------------------------------------------------------- */}
      <JobOpenings jobs={jobs} />

      {/* ----------------------------------------------------------------- */}
      {/* Hiring Process                                                    */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-wrap-balance">
              Our Hiring Process
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl text-lg mx-auto leading-relaxed">
              Straightforward, transparent, and respectful of your time. We
              move fast.
            </p>
          </FadeIn>

          <div className="relative max-w-4xl mx-auto">
            {/* ── Timeline track (desktop) ── */}
            <div className="hidden md:block absolute top-11 left-[12.5%] right-[12.5%] h-px">
              {/* Base line */}
              <div className="absolute inset-0 bg-gradient-to-r from-border via-primary/50 to-border rounded-full" />
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full animate-shimmer bg-[length:200%_100%]" />
            </div>

            <StaggerChildren
              stagger={0.15}
              className="grid gap-12 sm:grid-cols-2 md:grid-cols-4"
            >
              {hiringSteps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="group flex flex-col items-center text-center cursor-default"
                    style={{
                      "--c":       item.color,
                      "--c-ring":  item.color + "50",  // 31% alpha
                      "--c-glow":  item.color + "30",  // 19% alpha
                      "--c-inner": item.color + "28",  // 16% alpha
                    } as React.CSSProperties}
                  >
                    {/* ── Timeline node ── */}
                    <div className="relative mb-8 z-10">

                      {/* Slow-pulse outer ring — unique color per step on hover */}
                      <div
                        className="absolute -inset-3 rounded-full border border-primary/25 animate-pulse transition-colors duration-300 group-hover:border-[var(--c-ring)]"
                        style={{ animationDelay: `${index * 0.6}s` }}
                      />

                      {/* Main circle */}
                      <div className="size-[88px] rounded-full bg-gradient-to-br from-primary/8 via-background to-primary/12 border-2 border-primary/20 flex items-center justify-center shadow-md transition-all duration-500 group-hover:border-[var(--c)] group-hover:shadow-[0_8px_32px_var(--c-glow)] group-hover:scale-110">
                        {/* Inner icon circle */}
                        <div className="size-12 rounded-full bg-primary/8 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--c-inner)] group-hover:scale-105">
                          <Icon
                            className="size-6 text-primary/50 transition-colors duration-300 group-hover:text-[var(--c)]"
                            aria-hidden
                          />
                        </div>
                      </div>

                      {/* Step badge — takes on step color on hover */}
                      <span className="absolute -top-1 -right-1 inline-flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30 ring-2 ring-background transition-colors duration-300 group-hover:bg-[var(--c)] group-hover:shadow-[var(--c-ring)]">
                        {index + 1}
                      </span>
                    </div>

                    <h3 className="font-bold mb-2 text-base transition-colors duration-300 group-hover:text-[var(--c)]">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </StaggerChildren>
          </div>

          {/* ── Apply CTA ── */}
          <FadeIn className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-5">
              Ready to join the team?
            </p>
            <a
              href="mailto:hr@pikessoft.com"
              className="group inline-flex items-center gap-2.5 rounded-full border-2 border-foreground bg-transparent px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-foreground hover:text-background"
            >
              <Mail className="size-4" />
              Apply Now
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              hr@pikessoft.com · We respond within 48 hours
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
