"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "@/components/animations/counter";
import FadeIn from "@/components/animations/fade-in";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   Viz 1 — Sparkline (Years of Growth)
   Upward-trending line chart: shows trajectory, not a target
───────────────────────────────────────────────────────────── */
const SPARK_PTS = [
  [0, 52], [12, 46], [24, 40], [36, 33], [48, 26],
  [60, 20], [72, 14], [84, 8], [96, 3],
];
const SPARK_LINE = (() => {
  let d = `M ${SPARK_PTS[0][0]} ${SPARK_PTS[0][1]}`;
  for (let i = 1; i < SPARK_PTS.length; i++) {
    const [px, py] = SPARK_PTS[i - 1];
    const [cx, cy] = SPARK_PTS[i];
    const mx = (px + cx) / 2;
    d += ` C ${mx} ${py} ${mx} ${cy} ${cx} ${cy}`;
  }
  return d;
})();
const SPARK_AREA = SPARK_LINE + " L 96 56 L 0 56 Z";

function SparklineViz({
  color,
  trigger,
}: {
  color: string;
  trigger: React.RefObject<HTMLDivElement | null>;
}) {
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line || !trigger.current) return;
    const len = line.getTotalLength();
    const tw = gsap.fromTo(
      line,
      { strokeDasharray: len, strokeDashoffset: len },
      {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: { trigger: trigger.current, start: "top 82%", once: true },
      }
    );
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [trigger]);

  return (
    <svg viewBox="0 0 96 56" width="100%" height="54" aria-hidden>
      <path d={SPARK_AREA} fill={color} opacity="0.12" />
      <path
        ref={lineRef}
        d={SPARK_LINE}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      {SPARK_PTS.map(([x, y], i) => (
        <circle
          key={i}
          cx={x} cy={y}
          r={i === SPARK_PTS.length - 1 ? 4 : 2}
          fill={color}
          opacity={i === SPARK_PTS.length - 1 ? 1 : 0.3}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Viz 2 — Dot Matrix (Industries Served)
   10 dots — one per industry — pop in with stagger
───────────────────────────────────────────────────────────── */
function DotMatrixViz({
  color,
  trigger,
}: {
  color: string;
  trigger: React.RefObject<HTMLDivElement | null>;
}) {
  const dotsRef = useRef<(SVGCircleElement | null)[]>([]);
  const positions = Array.from({ length: 10 }, (_, i) => ({
    cx: 10 + (i % 5) * 20,
    cy: 9 + Math.floor(i / 5) * 20,
  }));

  useEffect(() => {
    const dots = dotsRef.current.filter(Boolean) as SVGCircleElement[];
    if (!dots.length || !trigger.current) return;
    gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: "center" });
    const tw = gsap.to(dots, {
      opacity: 1,
      scale: 1,
      stagger: 0.07,
      duration: 0.45,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: trigger.current, start: "top 82%", once: true },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [trigger]);

  return (
    <svg viewBox="0 0 100 38" width="100%" height="46" aria-hidden>
      {positions.map(({ cx, cy }, i) => (
        <circle
          key={i}
          ref={(el) => { dotsRef.current[i] = el; }}
          cx={cx} cy={cy} r="7"
          fill={color}
          opacity={0}
          style={{ filter: `drop-shadow(0 0 4px ${color}90)` }}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Viz 3 — Bar Chart (Projects Delivered)
   Rising bars convey volume / scale, not a limit
───────────────────────────────────────────────────────────── */
function BarChartViz({
  color,
  trigger,
}: {
  color: string;
  trigger: React.RefObject<HTMLDivElement | null>;
}) {
  const barsRef = useRef<(SVGRectElement | null)[]>([]);
  const heights = [18, 28, 40, 52, 60];
  const W = 14; const GAP = 7; const H = 60;

  useEffect(() => {
    const bars = barsRef.current.filter(Boolean) as SVGRectElement[];
    if (!bars.length || !trigger.current) return;
    gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" });
    const tw = gsap.to(bars, {
      scaleY: 1,
      stagger: 0.1,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: trigger.current, start: "top 82%", once: true },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [trigger]);

  const totalW = heights.length * W + (heights.length - 1) * GAP;

  return (
    <svg
      viewBox={`0 0 ${totalW} ${H}`}
      width="100%" height="58"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {heights.map((h, i) => (
        <rect
          key={i}
          ref={(el) => { barsRef.current[i] = el; }}
          x={i * (W + GAP)} y={H - h}
          width={W} height={h} rx="3"
          fill={color}
          opacity={0.3 + (i / heights.length) * 0.7}
          style={
            i === heights.length - 1
              ? { filter: `drop-shadow(0 0 6px ${color})` }
              : undefined
          }
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Viz 4 — Half-Arc Gauge (Client Retention %)
   Semicircle is the right shape for an actual percentage metric
───────────────────────────────────────────────────────────── */
const GAUGE_R   = 42;
const GAUGE_ARC = Math.PI * GAUGE_R; // ≈ 131.9 — half-circle arc length

function GaugeViz({
  pct,
  color,
  trigger,
}: {
  pct: number;
  color: string;
  trigger: React.RefObject<HTMLDivElement | null>;
}) {
  const arcRef = useRef<SVGPathElement>(null);
  // Semicircle: center (58,50), r=42  →  left (16,50) → right (100,50)
  const d = `M 16 50 A ${GAUGE_R} ${GAUGE_R} 0 0 1 100 50`;

  useEffect(() => {
    const arc = arcRef.current;
    if (!arc || !trigger.current) return;

    // Animate stroke-dasharray "0 GAUGE_ARC" → "pct*GAUGE_ARC gap"
    // This fills the arc from the left endpoint (correct for a gauge)
    const proxy = { v: 0 };
    const target = pct * GAUGE_ARC;
    const tw = gsap.to(proxy, {
      v: target,
      duration: 1.8,
      ease: "power3.out",
      onUpdate() {
        arc.setAttribute("stroke-dasharray", `${proxy.v} ${GAUGE_ARC - proxy.v + 0.1}`);
      },
      scrollTrigger: { trigger: trigger.current, start: "top 82%", once: true },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [pct, trigger]);

  return (
    <svg viewBox="0 0 116 58" width="100%" height="54" aria-hidden>
      {/* Track */}
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Animated fill */}
      <path
        ref={arcRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="0 131.9"
        style={{ filter: `drop-shadow(0 0 7px ${color}cc)` }}
      />
      {/* Percentage tick marks */}
      {[0, 25, 50, 75, 100].map((tick) => {
        const angle = Math.PI * (tick / 100); // 0 = left, π = right
        const tx = 58 - GAUGE_R * Math.cos(angle);
        const ty = 50 - GAUGE_R * Math.sin(angle);
        return (
          <circle
            key={tick}
            cx={tx} cy={ty} r="1.5"
            fill="rgba(255,255,255,0.2)"
          />
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stat Card — wraps counter + appropriate viz
───────────────────────────────────────────────────────────── */
type StatDef =
  | { vizType: "sparkline" | "dots" | "bars"; value: number; suffix: string; label: string; color: string }
  | { vizType: "gauge"; value: number; suffix: string; label: string; color: string; pct: number };

function StatCard({ stat, index }: { stat: StatDef; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <FadeIn delay={index * 0.1} direction="up" distance={20}>
      <div
        ref={cardRef}
        className="relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 pt-6 pb-7 overflow-hidden"
      >
        {/* Per-card colour splash */}
        <div
          aria-hidden
          className="absolute inset-x-0 -top-8 h-28 blur-2xl opacity-[0.16] pointer-events-none"
          style={{ backgroundColor: stat.color }}
        />

        {/* Visualization */}
        <div className="w-full">
          {stat.vizType === "sparkline" && (
            <SparklineViz color={stat.color} trigger={cardRef} />
          )}
          {stat.vizType === "dots" && (
            <DotMatrixViz color={stat.color} trigger={cardRef} />
          )}
          {stat.vizType === "bars" && (
            <BarChartViz color={stat.color} trigger={cardRef} />
          )}
          {stat.vizType === "gauge" && (
            <GaugeViz pct={stat.pct} color={stat.color} trigger={cardRef} />
          )}
        </div>

        {/* Number */}
        <Counter
          end={stat.value}
          suffix={stat.suffix}
          duration={1.8}
          className="text-3xl sm:text-4xl font-bold tabular-nums text-background leading-none"
        />

        {/* Label */}
        <p className="text-xs sm:text-sm font-medium text-background/50 tracking-wide text-center leading-snug">
          {stat.label}
        </p>

        {/* Bottom accent */}
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-8 h-px opacity-40"
          style={{
            background: `linear-gradient(to right, transparent, ${stat.color}, transparent)`,
          }}
        />
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────── */
const stats: StatDef[] = [
  { vizType: "sparkline", value: 9,   suffix: "+", label: "Years of Growth",    color: "#818cf8" },
  { vizType: "dots",      value: 10,  suffix: "+", label: "Industries Served",  color: "#fb923c" },
  { vizType: "bars",      value: 500, suffix: "+", label: "Projects Delivered", color: "#34d399" },
  { vizType: "gauge",     value: 90,  suffix: "%", label: "Client Retention",   color: "#f472b6", pct: 0.90 },
];

export default function StatsBar() {
  return (
    <section className="relative bg-foreground text-background overflow-hidden">
      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glows */}
      <div aria-hidden className="absolute -left-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-500/[0.06] blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute -right-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-500/[0.06] blur-3xl pointer-events-none" />

      {/* Stats grid */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
