import Link from "next/link";
import { Linkedin, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/ui/logo";

/* -------------------------------------------------------------------------- */
/*  Static fallbacks                                                           */
/* -------------------------------------------------------------------------- */

const FALLBACK_TAGLINE =
  "We engineer AI-powered products that scale, from GenAI prototypes to enterprise intelligence platforms.";

const FALLBACK_SOCIAL = [
  { platform: "linkedin",  url: "https://linkedin.com/company/pikessoft" },
  { platform: "facebook",  url: "https://facebook.com/pikessoft" },
  { platform: "instagram", url: "https://instagram.com/pikessoft" },
];

const FALLBACK_CONTACT = {
  pakistanAddress: "46 Block B PCSIR 2, Johar Town Lahore",
  pakistanPhone:   "+92 42 35315822",
  ukAddress:       "9 College Drive, Dunstable LU5 4NB",
  ukPhone:         "+44 7468434033",
};

/* -------------------------------------------------------------------------- */
/*  Nav data                                                                   */
/* -------------------------------------------------------------------------- */


const companyLinks = [
  { title: "About Us", href: "/company" },
  { title: "Careers",  href: "/careers" },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin:  Linkedin,
  facebook:  Facebook,
  instagram: Instagram,
  twitter:   Twitter,
  youtube:   Youtube,
};

const SOCIAL_LABELS: Record<string, string> = {
  linkedin:  "LinkedIn",
  facebook:  "Facebook",
  instagram: "Instagram",
  twitter:   "Twitter / X",
  youtube:   "YouTube",
};

/* -------------------------------------------------------------------------- */
/*  Component (async Server Component)                                         */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  const tagline     = FALLBACK_TAGLINE;
  const socialLinks = FALLBACK_SOCIAL;
  const contactInfo = FALLBACK_CONTACT;

  return (
    <footer className="bg-foreground text-background">

      {/* ── Main columns ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.4fr]">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center group w-fit">
              <Logo className="h-9 w-auto text-background transition-opacity group-hover:opacity-80" />
            </Link>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              {tagline}
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5 mt-1">
              {socialLinks.map(({ platform, url }) => {
                const Icon  = SOCIAL_ICONS[platform.toLowerCase()] ?? Linkedin;
                const label = SOCIAL_LABELS[platform.toLowerCase()] ?? platform;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="size-9 rounded-lg bg-background/8 border border-background/10 flex items-center justify-center text-background/50 hover:text-background hover:bg-background/15 hover:border-background/20 transition-all duration-200"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/35 mb-5">
              Company
            </p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors duration-150"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/35 mb-5">
              Get in Touch
            </p>
            <ul className="space-y-4">

              {/* Email */}
              {contactInfo.email && (
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-start gap-3 group"
                  >
                    <Mail className="size-4 mt-0.5 text-background/35 shrink-0 group-hover:text-background/70 transition-colors" />
                    <span className="text-sm text-background/60 group-hover:text-background transition-colors">
                      {contactInfo.email}
                    </span>
                  </a>
                </li>
              )}

              {/* Pakistan */}
              <li className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 text-background/35 shrink-0" />
                <div className="text-sm text-background/60 leading-relaxed">
                  <p className="font-medium text-background/80 mb-0.5">Pakistan</p>
                  <p>{contactInfo.pakistanAddress}</p>
                  {contactInfo.pakistanPhone && (
                    <a
                      href={`tel:${contactInfo.pakistanPhone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-1.5 mt-1 text-background/50 hover:text-background transition-colors"
                    >
                      <Phone className="size-3" />
                      {contactInfo.pakistanPhone}
                    </a>
                  )}
                </div>
              </li>

              {/* UK */}
              <li className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 text-background/35 shrink-0" />
                <div className="text-sm text-background/60 leading-relaxed">
                  <p className="font-medium text-background/80 mb-0.5">United Kingdom</p>
                  <p>{contactInfo.ukAddress}</p>
                  {contactInfo.ukPhone && (
                    <a
                      href={`tel:${contactInfo.ukPhone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-1.5 mt-1 text-background/50 hover:text-background transition-colors"
                    >
                      <Phone className="size-3" />
                      {contactInfo.ukPhone}
                    </a>
                  )}
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div className="border-t border-background/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/35">
            &copy; {new Date().getFullYear()} PikesSoft Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-background/35 hover:text-background/70 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-background/15 text-xs">|</span>
            <Link href="/terms"   className="text-xs text-background/35 hover:text-background/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
