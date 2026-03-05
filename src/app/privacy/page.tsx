import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import FadeIn from "@/components/animations/fade-in";

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how PikesSoft collects, uses, and protects your personal information.",
};

/* -------------------------------------------------------------------------- */
/*  Policy sections                                                            */
/* -------------------------------------------------------------------------- */

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information you provide directly",
        body: "When you contact us, request a consultation, or submit a form on our website, we may collect your name, email address, phone number, company name, and any other information you choose to share.",
      },
      {
        subtitle: "Information collected automatically",
        body: "When you visit our website, we automatically collect certain information about your device and usage, including IP address, browser type and version, operating system, referring URLs, pages visited, and time spent on pages. This data is collected through cookies and similar tracking technologies.",
      },
      {
        subtitle: "Information from third parties",
        body: "We may receive information about you from third-party services such as analytics providers, advertising partners, and social media platforms when you interact with our content on those platforms.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: null,
        body: "We use the information we collect for the following purposes:",
      },
      {
        subtitle: "Providing our services",
        body: "To respond to your enquiries, provide project consultations, deliver software development services, and communicate with you about ongoing projects.",
      },
      {
        subtitle: "Improving our website and services",
        body: "To understand how visitors use our website, identify areas for improvement, and develop new features and services that better serve our clients.",
      },
      {
        subtitle: "Marketing and communications",
        body: "With your consent, to send you updates about our services, case studies, and industry insights. You may unsubscribe from marketing communications at any time.",
      },
      {
        subtitle: "Legal compliance",
        body: "To comply with applicable laws and regulations, respond to lawful requests from authorities, and protect our legal rights and interests.",
      },
    ],
  },
  {
    id: "how-we-share",
    title: "How We Share Your Information",
    content: [
      {
        subtitle: "Service providers",
        body: "We may share your information with trusted third-party service providers who assist us in operating our website and delivering our services, such as cloud hosting providers, email platforms, and analytics tools. These providers are contractually obligated to protect your information.",
      },
      {
        subtitle: "Business transfers",
        body: "In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you of any such change.",
      },
      {
        subtitle: "Legal requirements",
        body: "We may disclose your information when required by law, in response to legal process, or to protect the rights, property, or safety of PikesSoft, our clients, or others.",
      },
      {
        subtitle: "We do not sell your data",
        body: "PikesSoft does not sell, rent, or trade your personal information to third parties for their marketing purposes.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: [
      {
        subtitle: null,
        body: "We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including satisfying legal, accounting, and reporting requirements. Contact and enquiry data is typically retained for up to 3 years. Project-related data may be retained for up to 7 years in line with our contractual and legal obligations. You may request deletion of your data at any time (subject to legal retention requirements) by contacting us at the details below.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: [
      {
        subtitle: null,
        body: "Depending on your location, you may have the following rights regarding your personal data:",
      },
      {
        subtitle: "Right of access",
        body: "You have the right to request a copy of the personal data we hold about you.",
      },
      {
        subtitle: "Right to rectification",
        body: "You have the right to request correction of inaccurate or incomplete personal data.",
      },
      {
        subtitle: "Right to erasure",
        body: "You have the right to request deletion of your personal data, subject to certain legal obligations.",
      },
      {
        subtitle: "Right to restrict processing",
        body: "You have the right to request that we limit the processing of your data in certain circumstances.",
      },
      {
        subtitle: "Right to data portability",
        body: "You have the right to receive your personal data in a structured, machine-readable format.",
      },
      {
        subtitle: "Right to object",
        body: "You have the right to object to the processing of your personal data for direct marketing or where processing is based on legitimate interests.",
      },
      {
        subtitle: "How to exercise your rights",
        body: "To exercise any of these rights, please contact us via our website contact form. We will respond to your request within 30 days. If you are based in the UK or EU, you also have the right to lodge a complaint with your local data protection authority.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    content: [
      {
        subtitle: "What are cookies?",
        body: "Cookies are small text files stored on your device when you visit a website. They help us understand how you interact with our site and improve your experience.",
      },
      {
        subtitle: "Types of cookies we use",
        body: "Essential cookies are required for the website to function correctly. Analytics cookies (such as Google Analytics) help us understand visitor behaviour and improve our content. Preference cookies remember your settings and choices across visits.",
      },
      {
        subtitle: "Managing cookies",
        body: "You can control and delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. For more information on managing cookies, visit allaboutcookies.org.",
      },
    ],
  },
  {
    id: "security",
    title: "Data Security",
    content: [
      {
        subtitle: null,
        body: "We implement industry-standard technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, and destruction. These include encrypted data transmission (HTTPS/TLS), access controls and authentication, regular security assessments, and staff training on data protection. While we take every reasonable precaution, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we are committed to protecting your data to the highest standard.",
      },
    ],
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    content: [
      {
        subtitle: null,
        body: "PikesSoft operates with offices in Pakistan and the United Kingdom. Your data may be processed in either jurisdiction. Where we transfer data outside the UK or EEA, we ensure appropriate safeguards are in place in accordance with applicable data protection law, including standard contractual clauses approved by the relevant authorities.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: [
      {
        subtitle: null,
        body: "Our website and services are not directed at children under the age of 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately and we will take steps to delete such information.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: [
      {
        subtitle: null,
        body: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by updating the 'Last updated' date at the top of this page. We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      {
        subtitle: null,
        body: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
      },
      {
        subtitle: "PikesSoft Ltd",
        body: "Pakistan: 46 Block B PCSIR 2, Johar Town Lahore — +92 42 35315822\nUnited Kingdom: 9 College Drive, Dunstable LU5 4NB — +44 7468434033",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Table of contents                                                          */
/* -------------------------------------------------------------------------- */

const TOC = SECTIONS.map(({ id, title }) => ({ id, title }));

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                Back to Home
              </Link>
            </div>

            <div className="flex items-start gap-5">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <Shield className="size-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Privacy Policy
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Last updated: <span className="font-medium text-foreground">March 2025</span>
                </p>
                <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
                  At PikesSoft, we respect your privacy and are committed to protecting your personal
                  data. This policy explains how we collect, use, and safeguard your information when
                  you visit our website or engage our services.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Body: TOC + Content ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16 xl:gap-20">

          {/* ── Sticky table of contents (desktop) ──────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
                On this page
              </p>
              <nav>
                <ul className="space-y-1">
                  {TOC.map(({ id, title }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors duration-150 border-l-2 border-transparent hover:border-primary pl-3"
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* ── Main content ────────────────────────────────────────────── */}
          <div className="space-y-14">
            {SECTIONS.map((section, i) => (
              <FadeIn key={section.id} delay={i * 0.03}>
                <section id={section.id} className="scroll-mt-24">

                  {/* Section heading */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-bold tabular-nums text-muted-foreground/50 tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-bold tracking-tight">{section.title}</h2>
                  </div>

                  {/* Section body */}
                  <div className="space-y-5 pl-7">
                    {section.content.map((item, j) => (
                      <div key={j}>
                        {item.subtitle && (
                          <h3 className="text-sm font-semibold text-foreground mb-1.5">
                            {item.subtitle}
                          </h3>
                        )}
                        {item.body.split("\n").map((line, k) => (
                          <p key={k} className="text-sm text-muted-foreground leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Divider (not on last) */}
                  {i < SECTIONS.length - 1 && (
                    <div className="mt-14 h-px bg-border" />
                  )}

                </section>
              </FadeIn>
            ))}

            {/* Bottom note */}
            <FadeIn>
              <div className="rounded-xl bg-muted/50 border border-border p-6 text-sm text-muted-foreground leading-relaxed">
                <p>
                  This Privacy Policy is governed by the laws of England and Wales and, where
                  applicable, the UK General Data Protection Regulation (UK GDPR) and the Data
                  Protection Act 2018. PikesSoft Ltd is registered in the United Kingdom.
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </main>
  );
}
