import type { Metadata } from "next";
import { Suspense } from "react";
import { Star, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "200+ projects delivered across healthcare, fintech, logistics, and retail. See how PikesSoft builds digital products that drive measurable business results.",
  openGraph: {
    title: "Our Portfolio | PikesSoft",
    description:
      "200+ projects delivered across healthcare, fintech, logistics, and retail. See how PikesSoft builds digital products that drive measurable business results.",
  },
};

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";
import SectionHeading from "@/components/sections/section-heading";
import ContactFormSection from "@/components/sections/contact-form";
import PortfolioFilter from "./_components/portfolio-filter";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorImage?: unknown;
  company?: string;
  rating?: number;
}

/* -------------------------------------------------------------------------- */
/*  Page Component                                                             */
/* -------------------------------------------------------------------------- */

export default function PortfolioPage() {
  const projects: never[] = [];
  const testimonials: never[] = [];

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  Hero                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-[400px] w-[400px] rounded-full bg-chart-1/5 blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn delay={0.1}>
              <Badge
                variant="outline"
                className="mb-6 px-4 py-1.5 text-sm font-medium"
              >
                200+ Projects Delivered
              </Badge>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-wrap-balance">
                Our Portfolio
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed sm:text-xl text-wrap-balance">
                Explore our work across industries. From healthcare platforms to
                fintech solutions, we deliver digital products that drive real
                business results.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Filter Tabs & Project Grid                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Projects"
            subtitle="A selection of our most impactful projects across diverse industries."
          />

          {/*
            Wrap PortfolioFilter in Suspense because it uses useSearchParams()
            which requires a suspense boundary in Next.js App Router.
          */}
          <Suspense
            fallback={
              <div className="py-16 text-center text-muted-foreground">
                Loading projects...
              </div>
            }
          >
            <PortfolioFilter projects={projects} />
          </Suspense>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Client Reviews                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Client Reviews"
            subtitle="What our clients have to say about working with PikesSoft."
          />

          <StaggerChildren
            stagger={0.08}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {(testimonials as Testimonial[]).map((review) => (
              <Card
                key={review._id}
                className="h-full transition-all duration-300 hover:shadow-md"
              >
                <CardHeader>
                  <Quote className="size-8 text-muted-foreground/30 mb-2" />
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating ?? 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-chart-4 text-chart-4"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-foreground/80 leading-relaxed text-sm">
                    &ldquo;{review.quote}&rdquo;
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                      {review.authorName?.charAt(0) ?? "?"}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{review.authorName}</p>
                      <p className="text-xs text-muted-foreground">
                        {review.authorRole}
                        {review.company ? `, ${review.company}` : ""}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Contact Form                                                        */}
      {/* ------------------------------------------------------------------ */}
      <ContactFormSection />

      {/* ------------------------------------------------------------------ */}
      {/*  CTA Banner                                                          */}
      {/* ------------------------------------------------------------------ */}
    </>
  );
}
