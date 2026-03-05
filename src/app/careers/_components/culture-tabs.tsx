"use client";

import { useState } from "react";
import {
  BookOpen,
  Heart,
  Users,
  Smile,
  Trophy,
} from "lucide-react";
import FadeIn from "@/components/animations/fade-in";

interface CultureValue {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  initials: string;
  quote: string;
  person: string;
  role: string;
}

const cultureValues: CultureValue[] = [
  {
    value: "knowledge",
    label: "Knowledge",
    icon: BookOpen,
    color: "#818cf8",
    initials: "UR",
    quote:
      "The learning culture here is incredible. Every week we have knowledge-sharing sessions, and I have grown more in two years at PikesSoft than in five years anywhere else.",
    person: "Usama Riaz",
    role: "Backend Lead",
  },
  {
    value: "friendship",
    label: "Friendship",
    icon: Heart,
    color: "#fb923c",
    initials: "MS",
    quote:
      "My colleagues are my friends. We celebrate each other's wins, support each other through challenges, and genuinely enjoy spending time together both inside and outside of work.",
    person: "Muhammad Saad",
    role: "Frontend Lead",
  },
  {
    value: "smiles",
    label: "Smiles",
    icon: Smile,
    color: "#34d399",
    initials: "SA",
    quote:
      "Work should not drain you. Here, there is always laughter in the office, creative freedom in our projects, and leadership that genuinely cares about our wellbeing.",
    person: "Saqib Aziz",
    role: "Mobile Engineer",
  },
  {
    value: "inclusivity",
    label: "Inclusivity",
    icon: Users,
    color: "#22d3ee",
    initials: "TR",
    quote:
      "From day one I felt like I belonged. PikesSoft values diverse perspectives, and everyone's voice is heard regardless of title or tenure. It makes for better products and a better workplace.",
    person: "Tameem Rafay",
    role: "AI Lead",
  },
  {
    value: "table-tennis",
    label: "Table Tennis",
    icon: Trophy,
    color: "#60a5fa",
    initials: "AM",
    quote:
      "Our table tennis matches are legendary. Win or lose, it is how we build trust, break silos, and recharge for the week ahead. I have returned far more smashes than bugs.",
    person: "Abdul Mattee",
    role: "Backend Engineer",
  },
];

export default function CultureTabs() {
  const [activeValue, setActiveValue] = useState("knowledge");
  const active = cultureValues.find((c) => c.value === activeValue)!;
  const ActiveIcon = active.icon;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-wrap-balance">
            What We&apos;re Made Of
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl text-lg mx-auto leading-relaxed">
            Our culture is built on shared values that make PikesSoft a place
            where people do their best work.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto rounded-2xl border bg-card overflow-hidden">

            {/* ── Tab header row ── */}
            <div className="grid grid-cols-5 border-b" role="tablist">
              {cultureValues.map((item) => {
                const Icon = item.icon;
                const isActive = item.value === activeValue;
                return (
                  <button
                    key={item.value}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveValue(item.value)}
                    className="relative flex flex-col items-center gap-2 py-5 px-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ring"
                    style={
                      isActive
                        ? { color: item.color, backgroundColor: `${item.color}08` }
                        : { color: "var(--muted-foreground)" }
                    }
                  >
                    {/* Colored bottom indicator on active */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? item.color : "transparent",
                      }}
                    />

                    {/* Icon badge */}
                    <div
                      className="size-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                      style={
                        isActive
                          ? { backgroundColor: `${item.color}18` }
                          : { backgroundColor: "transparent" }
                      }
                    >
                      <Icon className="size-4" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wide leading-tight text-center">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Content area ── */}
            <div className="p-8 sm:p-10 relative overflow-hidden">
              {/* Decorative large quote mark */}
              <div
                className="absolute -top-3 -left-1 text-[9rem] font-serif leading-none select-none pointer-events-none transition-colors duration-300"
                style={{ color: `${active.color}10` }}
                aria-hidden
              >
                &ldquo;
              </div>

              <blockquote className="relative z-10">
                <p className="text-lg sm:text-xl leading-relaxed text-foreground/90 italic">
                  &ldquo;{active.quote}&rdquo;
                </p>
              </blockquote>

              <div className="relative z-10 mt-8 flex items-center gap-4">
                {/* Avatar with initials */}
                <div
                  className="size-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm transition-colors duration-300"
                  style={{ backgroundColor: active.color }}
                >
                  {active.initials}
                </div>
                <div>
                  <p className="font-bold leading-tight">{active.person}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {active.role}
                  </p>
                </div>
                <div className="ml-auto opacity-15">
                  <ActiveIcon
                    className="size-8 transition-colors duration-300"
                    style={{ color: active.color }}
                  />
                </div>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
