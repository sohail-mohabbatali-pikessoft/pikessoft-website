import { cn } from "@/lib/utils";
import ClipReveal from "@/components/animations/clip-reveal";
import FadeIn from "@/components/animations/fade-in";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * SectionHeading
 * Used by every below-fold section.  The h2 uses a ClipReveal (slide-up
 * from behind a mask) and the subtitle fades in 0.2 s later — giving every
 * section an editorial, award-quality entrance with a single component.
 */
export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Title rises from behind an invisible baseline */}
      <ClipReveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-wrap-balance">
          {title}
        </h2>
      </ClipReveal>

      {/* Subtitle fades in slightly after */}
      {subtitle && (
        <FadeIn delay={0.22} direction="up" distance={18} className="mt-3">
          <p
            className={cn(
              "text-muted-foreground text-lg leading-relaxed",
              align === "center" && "max-w-2xl mx-auto"
            )}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
