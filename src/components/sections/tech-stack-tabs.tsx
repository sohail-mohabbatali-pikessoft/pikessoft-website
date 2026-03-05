"use client";

import { useEffect, useRef } from "react";
import { Brain, Code2, Smartphone, Cloud, Database } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/animations/fade-in";
import SectionHeading from "@/components/sections/section-heading";

import {
  // AI & ML
  siAnthropic, siHuggingface, siLangchain, siOllama, siOnnx,
  siOpencv, siScikitlearn, siTensorflow, siPytorch, siPandas, siApachespark,
  // Frontend
  siReact, siNextdotjs, siVuedotjs, siAngular, siSvelte,
  siTypescript, siTailwindcss, siThreedotjs, siVite, siGraphql,
  // Backend & Data
  siNodedotjs, siPython, siFastapi, siDjango, siGo, siRust, siDotnet,
  siPostgresql, siMongodb, siRedis, siElasticsearch, siFirebase,
  // Mobile
  siFlutter, siSwift, siKotlin, siExpo, siAndroid, siApple,
  // Cloud & DevOps
  siGooglecloud, siDocker, siKubernetes, siTerraform, siGithubactions,
  siJenkins, siDatadog, siCircleci,
} from "simple-icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface SimpleIcon {
  title: string;
  slug: string;
  hex: string;
  path: string;
}

type TechItem =
  | { type: "icon";     name: string; icon: SimpleIcon }
  | { type: "fallback"; name: string; abbr: string; hex: string };

interface Category {
  key:   string;
  label: string;
  Icon:  React.ComponentType<{ className?: string }>;
  color: string;
  items: TechItem[];
}

/* -------------------------------------------------------------------------- */
/*  Tech data                                                                  */
/* -------------------------------------------------------------------------- */

const AI_TOOLS: TechItem[] = [
  { type: "fallback", name: "OpenAI",        abbr: "OAI",  hex: "412991" },
  { type: "icon",     name: "Anthropic",     icon: siAnthropic },
  { type: "icon",     name: "Hugging Face",  icon: siHuggingface },
  { type: "icon",     name: "LangChain",     icon: siLangchain },
  { type: "icon",     name: "Ollama",        icon: siOllama },
  { type: "icon",     name: "TensorFlow",    icon: siTensorflow },
  { type: "icon",     name: "PyTorch",       icon: siPytorch },
  { type: "icon",     name: "scikit-learn",  icon: siScikitlearn },
  { type: "icon",     name: "OpenCV",        icon: siOpencv },
  { type: "icon",     name: "Pandas",        icon: siPandas },
  { type: "icon",     name: "ONNX",          icon: siOnnx },
  { type: "icon",     name: "Apache Spark",  icon: siApachespark },
];

const CATEGORIES: Category[] = [
  {
    key: "frontend",
    label: "Frontend",
    Icon: Code2,
    color: "#34d399",
    items: [
      { type: "icon", name: "React",        icon: siReact },
      { type: "icon", name: "Next.js",      icon: siNextdotjs },
      { type: "icon", name: "TypeScript",   icon: siTypescript },
      { type: "icon", name: "Vue.js",       icon: siVuedotjs },
      { type: "icon", name: "Angular",      icon: siAngular },
      { type: "icon", name: "Svelte",       icon: siSvelte },
      { type: "icon", name: "Tailwind CSS", icon: siTailwindcss },
      { type: "icon", name: "Three.js",     icon: siThreedotjs },
      { type: "icon", name: "GraphQL",      icon: siGraphql },
      { type: "icon", name: "Vite",         icon: siVite },
    ],
  },
  {
    key: "backend",
    label: "Backend & Data",
    Icon: Database,
    color: "#60a5fa",
    items: [
      { type: "icon",     name: "Node.js",      icon: siNodedotjs },
      { type: "icon",     name: "Python",        icon: siPython },
      { type: "icon",     name: "FastAPI",       icon: siFastapi },
      { type: "icon",     name: "Django",        icon: siDjango },
      { type: "icon",     name: "Go",            icon: siGo },
      { type: "icon",     name: "Rust",          icon: siRust },
      { type: "icon",     name: ".NET",          icon: siDotnet },
      { type: "icon",     name: "PostgreSQL",    icon: siPostgresql },
      { type: "icon",     name: "MongoDB",       icon: siMongodb },
      { type: "icon",     name: "Redis",         icon: siRedis },
      { type: "icon",     name: "Elasticsearch", icon: siElasticsearch },
      { type: "icon",     name: "Firebase",      icon: siFirebase },
    ],
  },
  {
    key: "mobile",
    label: "Mobile",
    Icon: Smartphone,
    color: "#fb923c",
    items: [
      { type: "icon", name: "React Native", icon: siReact },
      { type: "icon", name: "Flutter",      icon: siFlutter },
      { type: "icon", name: "Swift",        icon: siSwift },
      { type: "icon", name: "Kotlin",       icon: siKotlin },
      { type: "icon", name: "Expo",         icon: siExpo },
      { type: "icon", name: "Android",      icon: siAndroid },
      { type: "icon", name: "iOS",          icon: siApple },
    ],
  },
  {
    key: "devops",
    label: "Cloud & DevOps",
    Icon: Cloud,
    color: "#a78bfa",
    items: [
      { type: "fallback", name: "AWS",            abbr: "AWS",  hex: "FF9900" },
      { type: "fallback", name: "Azure",          abbr: "Az",   hex: "0078D4" },
      { type: "icon",     name: "Google Cloud",   icon: siGooglecloud },
      { type: "icon",     name: "Docker",         icon: siDocker },
      { type: "icon",     name: "Kubernetes",     icon: siKubernetes },
      { type: "icon",     name: "Terraform",      icon: siTerraform },
      { type: "icon",     name: "GitHub Actions", icon: siGithubactions },
      { type: "icon",     name: "Jenkins",        icon: siJenkins },
      { type: "icon",     name: "Datadog",        icon: siDatadog },
      { type: "icon",     name: "CircleCI",       icon: siCircleci },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  SVG brand icon                                                             */
/* -------------------------------------------------------------------------- */

function BrandIcon({ icon, size = 28 }: { icon: SimpleIcon; size?: number }) {
  const isNearBlack = parseInt(icon.hex, 16) < 0x2a2a2a;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={isNearBlack ? "currentColor" : `#${icon.hex}`}
      aria-label={icon.title}
      className="shrink-0"
    >
      <path d={icon.path} />
    </svg>
  );
}

function FallbackBadge({
  abbr,
  hex,
  size = 28,
}: {
  abbr: string;
  hex: string;
  size?: number;
}) {
  const fs = abbr.length > 2 ? Math.round(size * 0.28) : Math.round(size * 0.38);
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-md"
      style={{
        width: size,
        height: size,
        backgroundColor: `#${hex}`,
        borderRadius: Math.round(size * 0.22),
      }}
    >
      <span
        style={{
          color: "#fff",
          fontSize: fs,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {abbr}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  AI card — larger, used in the featured section                            */
/* -------------------------------------------------------------------------- */

function AICard({ tech }: { tech: TechItem }) {
  return (
    <div
      className={cn(
        "group flex flex-col items-center gap-2.5 p-4 rounded-xl",
        "bg-background/80 border border-primary/10",
        "hover:border-primary/30 hover:shadow-md hover:shadow-primary/5",
        "hover:-translate-y-0.5 transition-all duration-200 cursor-default"
      )}
    >
      {tech.type === "icon" ? (
        <BrandIcon icon={tech.icon} size={32} />
      ) : (
        <FallbackBadge abbr={tech.abbr} hex={tech.hex} size={32} />
      )}
      <span className="text-[10px] font-medium text-foreground/70 text-center leading-snug">
        {tech.name}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tech pill — compact, used in the category cards                           */
/* -------------------------------------------------------------------------- */

function TechPill({ tech }: { tech: TechItem }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg",
        "bg-muted/60 border border-border/50",
        "hover:bg-muted hover:border-border transition-all duration-150 cursor-default"
      )}
    >
      {tech.type === "icon" ? (
        <BrandIcon icon={tech.icon} size={15} />
      ) : (
        <FallbackBadge abbr={tech.abbr} hex={tech.hex} size={16} />
      )}
      <span className="text-[11px] font-medium text-foreground/75 whitespace-nowrap leading-none">
        {tech.name}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Compact category card                                                      */
/* -------------------------------------------------------------------------- */

function CategoryCard({ cat }: { cat: Category }) {
  return (
    <div className="h-full rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div
          className="size-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
        >
          <cat.Icon className="size-4" />
        </div>
        <h3 className="text-sm font-bold tracking-tight">{cat.label}</h3>
        <div
          className="ml-auto h-px flex-1 rounded-full"
          style={{ backgroundColor: `${cat.color}30` }}
        />
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-1.5">
        {cat.items.map((tech) => (
          <TechPill key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main section                                                               */
/* -------------------------------------------------------------------------- */

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const blocks = el.querySelectorAll<HTMLElement>(".tech-block");
    const tween = gsap.fromTo(
      blocks,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 78%" },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn>
          <SectionHeading
            title="Our Technology Stack"
            subtitle="AI-first engineering across the full development spectrum, from intelligent backends to polished interfaces."
          />
        </FadeIn>

        <div ref={containerRef} className="mt-12 space-y-5">

          {/* ── Featured: AI & Machine Learning ── */}
          <div
            className="tech-block rounded-2xl border border-primary/25 p-8 md:p-10 overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.04) 0%, transparent 60%)" }}
          >
            {/* Ambient glow */}
            <div
              className="absolute -top-20 -right-20 size-72 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
              style={{ backgroundColor: "hsl(var(--primary))" }}
              aria-hidden="true"
            />

            {/* Section header */}
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Brain className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-none">AI & Machine Learning</h3>
                  <p className="text-xs text-muted-foreground mt-1">Core competency · Primary focus</p>
                </div>
              </div>
              <span
                className="w-fit flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border"
                style={{
                  backgroundColor: "hsl(var(--primary)/0.08)",
                  color: "hsl(var(--primary))",
                  borderColor: "hsl(var(--primary)/0.25)",
                }}
              >
                <span className="text-[10px]">✦</span>
                AI-First Focus
              </span>
            </div>

            {/* AI tools grid */}
            <div className="relative grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-12 gap-3">
              {AI_TOOLS.map((tech) => (
                <AICard key={tech.name} tech={tech} />
              ))}
            </div>
          </div>

          {/* ── 4 category cards ── */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="tech-block flex flex-col">
                <CategoryCard cat={cat} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
