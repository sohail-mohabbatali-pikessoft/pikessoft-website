"use client";

import Link from "next/link";
import { Users, UserCheck, Rocket, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/sections/section-heading";
import StaggerChildren from "@/components/animations/stagger-children";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const MODELS = [
  {
    Icon: Users,
    title: "Full Augmented Team",
    description:
      "Extend your capabilities with a fully integrated team of engineers, designers, and QA specialists who work as a seamless extension of your organisation.",
    features: [
      "Flexible team scaling",
      "Shared management",
      "Quick onboarding",
      "Cost-effective",
    ],
    highlight: false,
  },
  {
    Icon: UserCheck,
    title: "Dedicated Team",
    description:
      "A cross-functional team exclusively focused on your project with full-time commitment, transparent communication, and predictable delivery.",
    features: [
      "Full-time commitment",
      "Direct communication",
      "Predictable costs",
      "Long-term partnership",
    ],
    highlight: true,
  },
  {
    Icon: Rocket,
    title: "Product Development",
    description:
      "From ideation to launch and beyond, we take full ownership of your product lifecycle with an agile, milestone-driven approach.",
    features: [
      "End-to-end ownership",
      "Agile methodology",
      "Milestone-based delivery",
      "Post-launch support",
    ],
    highlight: false,
  },
];

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function EngagementModels() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Engagement Models"
          subtitle="Flexible options designed to match your project scope, timeline, and budget. Choose the model that works best for you."
        />

        <StaggerChildren
          stagger={0.12}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {MODELS.map((model) => (
            <div
              key={model.title}
              className="group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300
                border-border/60 bg-card
                hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5
                hover:border-primary/30 hover:ring-1 hover:ring-primary/10"
            >
              {/* Top accent line */}
              <div className="h-[3px] w-full shrink-0 bg-border/60 group-hover:bg-primary transition-colors duration-300" />

              <div className="flex flex-col flex-1 p-7 gap-5">

                {/* Icon */}
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-200
                  bg-primary/10 text-primary
                  group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25"
                >
                  <model.Icon className="size-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight">
                  {model.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {model.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-border/50" />

                {/* Features */}
                <ul className="space-y-2.5 flex-1">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="size-2.5 text-primary" />
                      </span>
                      <span className="text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="mt-2 w-full gap-2 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground hover:!bg-foreground hover:!text-background hover:!border-foreground"
                >
                  <a
                    href="https://calendly.com/shahzaib-ede/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Meeting
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>

              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
