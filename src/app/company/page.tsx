import type { Metadata } from "next";
import Image from "next/image";
import {
  Handshake,
  TrendingUp,
  ShieldCheck,
  Settings,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import FadeIn from "@/components/animations/fade-in";
import StaggerChildren from "@/components/animations/stagger-children";
import TextReveal from "@/components/animations/text-reveal";
import SectionHeading from "@/components/sections/section-heading";
import ContactFormSection from "@/components/sections/contact-form";
import StatsBar from "@/components/sections/stats-bar";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Company | PikesSoft",
  description:
    "PikesSoft is an AI-first engineering company. We design and build LLM-powered products, autonomous agents, and intelligent platforms that help businesses automate, scale, and lead.",
  openGraph: {
    title: "Company | PikesSoft",
    description:
      "Learn about PikesSoft's AI-first mission, vision, leadership team, and the values that drive our engineering culture.",
  },
};

/* -------------------------------------------------------------------------- */
/*                                Static Data                                 */
/* -------------------------------------------------------------------------- */


// Fallback team members used if Sanity returns none
const fallbackLeadership = [
  { _id: "mya", name: "Muhammad Yasir Aziz", role: "CEO",                       photo: "/company/yasir-pic.jpg"    },
  { _id: "fn",  name: "Fawad Naeem",         role: "Technology Director",       photo: "/company/fawad.jpg"    },
  { _id: "ss",  name: "Shahzaib Saleem",     role: "Innovation Advisor",        photo: "/company/shahzaib.jpg" },
  { _id: "sma", name: "Sohail Mohabbat Ali", role: "Engineering Manager",       photo: "/company/sohail-pic.png"   },
];

const values = [
  {
    icon: Handshake,
    title: "Virtuous Partnerships",
    description:
      "We build long-term relationships grounded in transparency and shared success, treating your AI transformation goals as our own.",
  },
  {
    icon: TrendingUp,
    title: "Exceeding Expectations",
    description:
      "We go beyond deliverables to create measurable impact by shipping AI-powered products that move metrics, not just milestones.",
  },
  {
    icon: ShieldCheck,
    title: "Assured Quality",
    description:
      "Every model, pipeline, and integration is rigorously tested for accuracy, reliability, and safety before it reaches production.",
  },
  {
    icon: Settings,
    title: "Customization",
    description:
      "No two businesses are alike. We architect every AI solution around your unique data, workflows, and competitive landscape.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: string; // static fallback photo path
  bio?: string;
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function CompanyPage() {
  const leadership: TeamMember[] = fallbackLeadership;

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  Hero                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          "pt-24 pb-16 md:pt-32 md:pb-24"
        )}
      >
        {/* Background decoration */}
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
          <div className="mx-auto max-w-4xl text-center">
            <TextReveal
              text="We Engineer AI-Powered Products Built to Scale"
              as="h1"
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-wrap-balance"
              delay={0.2}
            />

            <FadeIn delay={0.6} className="mt-6 md:mt-8">
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl text-wrap-balance">
                PikesSoft is an AI-first engineering company. We design and
                build LLM-powered applications, autonomous agents, and
                intelligent platforms that help businesses automate operations,
                unlock insights, and compete at a higher level.
              </p>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Stats Bar                                                         */}
      {/* ------------------------------------------------------------------ */}
      <StatsBar />

      {/* ------------------------------------------------------------------ */}
      {/*  Mission                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <FadeIn direction="left">
              <Badge variant="outline" className="mb-4">
                Our Mission
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-wrap-balance">
                Accelerating Business Growth Through AI Engineering
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                At PikesSoft, our mission is to put the power of artificial
                intelligence to work for every business we partner with. We
                design and build AI-first digital products: from GenAI
                assistants and RAG knowledge bases to autonomous agents and
                intelligent automation platforms that turn operational
                complexity into competitive advantage.
              </p>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                We believe AI is not a future technology. It is today&apos;s
                decisive edge. Every engagement we take on is an opportunity to
                help our clients move faster, decide smarter, and operate with
                a level of intelligence that compounds over time.
              </p>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/company/mission.png"
                  alt="Our Mission at PikesSoft: team at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Vision                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <FadeIn direction="left" className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/company/vision.jpg"
                  alt="Our Vision at PikesSoft: building the future"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </FadeIn>

            <FadeIn direction="right" className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-4">
                Our Vision
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-wrap-balance">
                A World Where Every Business Runs on Intelligent Software
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Our vision is to be the most trusted AI engineering partner for
                forward-thinking businesses worldwide. We are building toward a
                future where every product we ship makes our clients smarter,
                faster, and more autonomous, powered by AI that learns,
                adapts, and scales alongside their growth.
              </p>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                We envision a world where businesses of every size can harness
                enterprise-grade AI capabilities, and we are committed to
                being the team that makes that vision a reality, one intelligent
                product at a time.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Leadership Team                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Leadership Team"
            subtitle="Meet the AI engineers and technology leaders building the next generation of intelligent software products."
          />

          <StaggerChildren
            stagger={0.12}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8"
          >
            {leadership.map((member) => {
              const initials = member.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 3);
              return (
                <Card
                  key={member._id}
                  className={cn(
                    "group text-center transition-all duration-300 cursor-default",
                    "hover:shadow-lg hover:border-primary/40 hover:ring-2 hover:ring-primary/20 hover:-translate-y-1"
                  )}
                >
                  <CardHeader className="items-center text-center">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="mb-3 size-28 rounded-full object-cover mx-auto grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    ) : (
                      <div className="mb-3 mx-auto flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-chart-1/10 text-primary transition-all duration-300 group-hover:from-primary/20 group-hover:to-chart-1/20 group-hover:scale-105">
                        <span className="text-2xl font-bold">{initials}</span>
                      </div>
                    )}
                    <CardTitle className="text-base">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Why PikesSoft                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why PikesSoft"
            subtitle="The principles that guide how we build AI products, engage with clients, and deliver outcomes that last."
          />

          <StaggerChildren
            stagger={0.1}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8"
          >
            {values.map((value) => (
              <Card
                key={value.title}
                className={cn(
                  "group h-full transition-all duration-300 cursor-default",
                  "hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 hover:ring-2 hover:ring-primary/20"
                )}
              >
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                    <value.icon className="size-5" />
                  </div>
                  <CardTitle className="text-base">{value.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Contact Form & CTA Banner                                         */}
      {/* ------------------------------------------------------------------ */}
      <ContactFormSection />
    </>
  );
}
