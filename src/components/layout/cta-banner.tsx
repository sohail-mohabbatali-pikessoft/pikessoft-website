import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/fade-in";
import ClipReveal from "@/components/animations/clip-reveal";
import Magnetic from "@/components/ui/magnetic";

export default function CTABanner() {
  return (
    <section className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 py-10 flex-col sm:flex-row">

          <FadeIn direction="left">
            <ClipReveal>
              <h3 className="text-xl font-semibold text-wrap-balance">
                Work with us, grow with us!
              </h3>
            </ClipReveal>
          </FadeIn>

          <FadeIn delay={0.2} direction="up" distance={14}>
            <Magnetic strength={0.28}>
              <Button variant="outline" asChild className="group">
                <Link href="/careers">
                  View Open Positions
                  <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </Magnetic>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
