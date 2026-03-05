"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface SanityTestimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  rating?: number;
  avatarUrl?: string;
}

/* -------------------------------------------------------------------------- */
/*  Fallback data — avatars from pravatar.cc (seeded, always the same face)   */
/* -------------------------------------------------------------------------- */

const FALLBACK_TESTIMONIALS: SanityTestimonial[] = [
  {
    _id: "t1",
    quote:
      "PikesSoft transformed our legacy platform into a modern, scalable solution. Their expertise in AI and cloud architecture reduced our operational costs by 40%.",
    authorName: "Sarah Mitchell",
    authorRole: "CTO",
    company: "HealthBridge Inc.",
    rating: 4,
    avatarUrl: "https://i.pravatar.cc/150?img=47",
  },
  {
    _id: "t2",
    quote:
      "The dedicated team model was exactly what we needed. PikesSoft engineers integrated seamlessly and delivered a complex fintech platform ahead of schedule.",
    authorName: "James Rodriguez",
    authorRole: "VP of Engineering",
    company: "PayFlow Solutions",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    _id: "t3",
    quote:
      "Working with PikesSoft on our IoT platform was a game-changer. They brought deep technical knowledge and a true partnership mindset that exceeded our expectations.",
    authorName: "Emily Chen",
    authorRole: "Product Director",
    company: "SmartGrid Energy",
    rating: 4,
    avatarUrl: "https://i.pravatar.cc/150?img=38",
  },
  {
    _id: "t4",
    quote:
      "From MVP to full-scale launch, PikesSoft guided us through every step. Their agile approach and transparent communication gave us full confidence throughout.",
    authorName: "Michael Thompson",
    authorRole: "Founder & CEO",
    company: "EduLearn Platform",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=57",
  },
  {
    _id: "t5",
    quote:
      "PikesSoft's blockchain team built a secure, compliant supply chain solution in record time. Their understanding of both the technology and our business needs was remarkable.",
    authorName: "Priya Sharma",
    authorRole: "Head of Innovation",
    company: "LogiChain Global",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=44",
  },
  {
    _id: "t6",
    quote:
      "Exceptional quality, fast delivery, and a team that genuinely cares. PikesSoft rebuilt our entire e-commerce platform in under three months, on time and on budget.",
    authorName: "David Kim",
    authorRole: "Director of Technology",
    company: "RetailEdge Co.",
    rating: 5,
    avatarUrl: "https://i.pravatar.cc/150?img=33",
  },
];

/* -------------------------------------------------------------------------- */
/*  Stars                                                                      */
/* -------------------------------------------------------------------------- */

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Single testimonial card                                                    */
/* -------------------------------------------------------------------------- */

interface CardProps {
  item: SanityTestimonial;
  className?: string;
}

function TestimonialCard({ item, className }: CardProps) {
  const src = item.avatarUrl ?? `https://i.pravatar.cc/150?img=1`;

  return (
    <div className={cn("t-card flex flex-col", className)}>
      {/* Photo — floats above card */}
      <div className="flex justify-center">
        <div className="relative size-20 rounded-full border-4 border-background shadow-md z-10 -mb-10 bg-muted overflow-hidden">
          <Image
            src={src}
            alt={item.authorName}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 items-center text-center rounded-2xl bg-background border border-border/50 shadow-sm px-8 pt-14 pb-8 gap-4">

        {/* Stars */}
        <Stars count={item.rating ?? 5} />

        {/* Quote */}
        <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
          <span className="text-primary text-xl font-serif font-bold leading-none mr-0.5">
            &ldquo;
          </span>
          {item.quote}
          <span className="text-primary text-xl font-serif font-bold leading-none ml-0.5">
            &rdquo;
          </span>
        </blockquote>

        {/* Divider */}
        <div className="w-10 h-px bg-border" />

        {/* Author */}
        <div>
          <p className="font-bold text-foreground leading-tight">
            {item.authorName}
            {item.authorRole && (
              <span className="font-normal text-muted-foreground text-sm ml-1.5">
                {item.authorRole}
              </span>
            )}
          </p>
          {item.company && (
            <p className="text-xs text-muted-foreground/70 mt-0.5 uppercase tracking-wider">
              {item.company}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

interface TestimonialsSectionProps {
  testimonials?: SanityTestimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const activeData =
    testimonials && testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  const containerRef = useRef<HTMLDivElement>(null);

  /* GSAP stagger on scroll */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>(".t-card");
    if (!cards.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
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

  /* Show 3 in first row, 3 in second */
  const row1 = activeData.slice(0, 3);
  const row2 = activeData.slice(3, 6);

  return (
    <section className="py-20 md:py-28 bg-muted/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What Our Clients Say
          </h2>
          <div className="mt-3 mx-auto w-12 h-0.5 bg-primary rounded-full" />
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Hear from the companies that
            trust PikesSoft to deliver exceptional results.
          </p>
        </div>

        {/* Grid */}
        <div ref={containerRef} className="space-y-10">
          {/* Row 1 */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {row1.map((item) => (
              <TestimonialCard key={item._id} item={item} />
            ))}
          </div>

          {/* Row 2 */}
          {row2.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {row2.map((item) => (
                <TestimonialCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
