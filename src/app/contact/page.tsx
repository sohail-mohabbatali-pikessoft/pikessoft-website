import type { Metadata } from "next";
import ContactFormSection from "@/components/sections/contact-form";
import FadeIn from "@/components/animations/fade-in";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with PikesSoft. Book a free 30-minute product consultation or reach out to discuss your project needs.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Badge variant="secondary" className="mb-4">
              Get in Touch
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-wrap-balance">
              Let&apos;s Build Something Great Together
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you have a project in mind or just want to explore
              possibilities, we&apos;re here to help. Reach out and let&apos;s
              start a conversation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Office Cards */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FadeIn delay={0} className="rounded-xl border border-border p-6 bg-card">
              <MapPin className="size-5 text-primary mb-3" />
              <h3 className="font-semibold text-sm">Pakistan Office</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                46 Block B PCSIR 2, Johar Town, Lahore
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="rounded-xl border border-border p-6 bg-card">
              <MapPin className="size-5 text-primary mb-3" />
              <h3 className="font-semibold text-sm">UK Office</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                9 College Drive, Dunstable LU5 4 NB
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="rounded-xl border border-border p-6 bg-card">
              <Mail className="size-5 text-primary mb-3" />
              <h3 className="font-semibold text-sm">Email Us</h3>
              <a
                href="mailto:info@pikessoft.com"
                className="mt-1 text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                info@pikessoft.com
              </a>
            </FadeIn>
            <FadeIn delay={0.3} className="rounded-xl border border-border p-6 bg-card">
              <Clock className="size-5 text-primary mb-3" />
              <h3 className="font-semibold text-sm">Business Hours</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Mon-Fri: 9 AM - 6 PM (PKT)
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  );
}
