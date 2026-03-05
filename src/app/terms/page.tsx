import type { Metadata } from "next";
import Link from "next/link";
import { ScrollText, ArrowLeft } from "lucide-react";
import FadeIn from "@/components/animations/fade-in";

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions governing your use of PikesSoft's website and services.",
};

/* -------------------------------------------------------------------------- */
/*  Policy sections                                                            */
/* -------------------------------------------------------------------------- */

const SECTIONS = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      {
        subtitle: null,
        body: "By accessing or using the PikesSoft website (pikessoft.com) or engaging our software development and consulting services, you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, please do not use our website or services.",
      },
      {
        subtitle: null,
        body: "These Terms apply to all visitors, clients, and others who access or use our website or services. PikesSoft reserves the right to update these Terms at any time. Continued use of our website or services after changes are posted constitutes your acceptance of the revised Terms.",
      },
    ],
  },
  {
    id: "services",
    title: "Our Services",
    content: [
      {
        subtitle: "Scope of services",
        body: "PikesSoft provides software development, AI and machine learning solutions, mobile and web application development, data science, blockchain development, and related technology consulting services. The specific scope, deliverables, timelines, and fees for any engagement are defined in a separate Statement of Work (SOW) or Service Agreement entered into between PikesSoft and the client.",
      },
      {
        subtitle: "Service modifications",
        body: "PikesSoft reserves the right to modify, suspend, or discontinue any part of its services at any time with reasonable notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of services.",
      },
      {
        subtitle: "Third-party services",
        body: "Our services may integrate with or rely upon third-party platforms, APIs, and tools. PikesSoft is not responsible for the availability, accuracy, or reliability of third-party services, and their use is subject to their respective terms and conditions.",
      },
    ],
  },
  {
    id: "client-obligations",
    title: "Client Obligations",
    content: [
      {
        subtitle: "Accurate information",
        body: "You agree to provide accurate, complete, and up-to-date information when engaging our services and to promptly notify us of any changes. Inaccurate or incomplete information may affect our ability to deliver services effectively.",
      },
      {
        subtitle: "Cooperation",
        body: "You agree to cooperate reasonably with PikesSoft during the course of an engagement, including providing timely feedback, required access, and necessary resources. Delays caused by lack of cooperation may affect delivery timelines and are not the responsibility of PikesSoft.",
      },
      {
        subtitle: "Lawful use",
        body: "You agree to use our services only for lawful purposes and in compliance with all applicable laws and regulations. You must not use our services to develop, support, or promote any product or service that is illegal, harmful, or violates the rights of others.",
      },
      {
        subtitle: "Account security",
        body: "Where account access is provided (e.g. project management tools, staging environments), you are responsible for maintaining the confidentiality of your credentials and for all activity under your account. You must notify PikesSoft immediately of any unauthorised access.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: [
      {
        subtitle: "Client-owned deliverables",
        body: "Upon receipt of full payment, PikesSoft assigns to the client all intellectual property rights in the custom deliverables created specifically for that client under the relevant SOW, including source code, designs, and documentation. This assignment is subject to the terms of the applicable Service Agreement.",
      },
      {
        subtitle: "PikesSoft IP and pre-existing materials",
        body: "PikesSoft retains all rights to its pre-existing intellectual property, internal frameworks, libraries, tools, methodologies, and know-how ('PikesSoft IP'). Where PikesSoft IP is incorporated into client deliverables, PikesSoft grants the client a non-exclusive, perpetual, royalty-free licence to use such IP as part of the deliverable.",
      },
      {
        subtitle: "Open-source components",
        body: "Our solutions may include open-source software components. Such components are provided under their respective open-source licences, which will be disclosed to the client. The client is responsible for compliance with those licences.",
      },
      {
        subtitle: "Website content",
        body: "All content on the PikesSoft website — including text, graphics, logos, images, and software — is the property of PikesSoft or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment Terms",
    content: [
      {
        subtitle: "Fees and invoicing",
        body: "Fees for services are as agreed in the relevant SOW or Service Agreement. Invoices are issued in accordance with the agreed payment schedule. All fees are exclusive of applicable taxes (including VAT) unless stated otherwise.",
      },
      {
        subtitle: "Payment due dates",
        body: "Invoices are due for payment within 14 days of the invoice date unless otherwise agreed in writing. PikesSoft reserves the right to suspend work on any project where payment is overdue.",
      },
      {
        subtitle: "Late payments",
        body: "Late payments may incur interest at a rate of 8% per annum above the Bank of England base rate, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998 (UK). PikesSoft also reserves the right to recover reasonable debt recovery costs.",
      },
      {
        subtitle: "Refunds",
        body: "Fees paid for completed work or milestones are non-refundable. Refund eligibility for other circumstances is assessed on a case-by-case basis and is at the sole discretion of PikesSoft.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: [
      {
        subtitle: null,
        body: "Each party agrees to keep confidential all non-public information disclosed by the other party in connection with the services ('Confidential Information'). Confidential Information may not be disclosed to third parties without prior written consent, except as required by law or court order.",
      },
      {
        subtitle: null,
        body: "This confidentiality obligation does not apply to information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was already known to the receiving party prior to disclosure; (c) is independently developed by the receiving party without use of the Confidential Information; or (d) is disclosed with prior written approval of the disclosing party.",
      },
      {
        subtitle: null,
        body: "Confidentiality obligations survive termination of any service engagement for a period of three (3) years.",
      },
    ],
  },
  {
    id: "warranties",
    title: "Warranties & Disclaimers",
    content: [
      {
        subtitle: "Service warranty",
        body: "PikesSoft warrants that services will be performed in a professional and workmanlike manner, consistent with industry standards. PikesSoft will use reasonable efforts to correct any material defects in deliverables reported within 30 days of delivery.",
      },
      {
        subtitle: "Website disclaimer",
        body: "The PikesSoft website is provided 'as is' without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.",
      },
      {
        subtitle: "No guarantee of results",
        body: "While we strive to deliver high-quality solutions, PikesSoft does not warrant that any particular business outcome, performance benchmark, or result will be achieved through the use of our services.",
      },
    ],
  },
  {
    id: "limitation-liability",
    title: "Limitation of Liability",
    content: [
      {
        subtitle: null,
        body: "To the maximum extent permitted by applicable law, PikesSoft's total liability to you for any claim arising out of or in connection with these Terms or our services shall not exceed the total fees paid by you to PikesSoft in the three (3) months preceding the event giving rise to the claim.",
      },
      {
        subtitle: null,
        body: "In no event shall PikesSoft be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, loss of data, loss of goodwill, or business interruption, even if PikesSoft has been advised of the possibility of such damages.",
      },
      {
        subtitle: null,
        body: "Nothing in these Terms shall limit or exclude PikesSoft's liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by applicable law.",
      },
    ],
  },
  {
    id: "termination",
    title: "Termination",
    content: [
      {
        subtitle: "Termination by either party",
        body: "Either party may terminate a service engagement by providing written notice as specified in the relevant Service Agreement. In the absence of a specified notice period, 30 days' written notice is required.",
      },
      {
        subtitle: "Termination for cause",
        body: "PikesSoft may suspend or terminate services immediately upon written notice if: (a) you materially breach these Terms or a Service Agreement and fail to remedy the breach within 14 days of notice; (b) you become insolvent or enter into bankruptcy proceedings; or (c) continued engagement would expose PikesSoft to legal or reputational risk.",
      },
      {
        subtitle: "Effect of termination",
        body: "Upon termination, you must pay for all services rendered up to the date of termination. PikesSoft will deliver any completed work product for which payment has been received. Provisions of these Terms that by their nature should survive termination shall do so, including confidentiality, intellectual property, payment, and limitation of liability.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law & Disputes",
    content: [
      {
        subtitle: "Governing law",
        body: "These Terms and any disputes arising out of or in connection with them are governed by the laws of England and Wales. Both parties submit to the exclusive jurisdiction of the courts of England and Wales.",
      },
      {
        subtitle: "Dispute resolution",
        body: "In the event of a dispute, both parties agree to first attempt to resolve it in good faith through direct negotiation. If the dispute cannot be resolved within 30 days of written notice, either party may refer the matter to formal legal proceedings.",
      },
    ],
  },
  {
    id: "general",
    title: "General Provisions",
    content: [
      {
        subtitle: "Entire agreement",
        body: "These Terms, together with any applicable Service Agreement or SOW, constitute the entire agreement between you and PikesSoft with respect to the subject matter herein and supersede all prior agreements, representations, and understandings.",
      },
      {
        subtitle: "Severability",
        body: "If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.",
      },
      {
        subtitle: "Waiver",
        body: "Failure by PikesSoft to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.",
      },
      {
        subtitle: "Assignment",
        body: "You may not assign or transfer any rights or obligations under these Terms without our prior written consent. PikesSoft may assign these Terms or any rights hereunder without restriction.",
      },
      {
        subtitle: "Force majeure",
        body: "PikesSoft shall not be liable for any failure or delay in performance resulting from causes beyond its reasonable control, including but not limited to acts of God, natural disasters, pandemics, war, government actions, or internet infrastructure failures.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      {
        subtitle: null,
        body: "If you have questions about these Terms of Service, please contact us:",
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

export default function TermsOfServicePage() {
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
                <ScrollText className="size-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Terms of Service
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Last updated: <span className="font-medium text-foreground">March 2025</span>
                </p>
                <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
                  These Terms of Service govern your use of the PikesSoft website and the
                  services we provide. Please read them carefully before engaging with us.
                  By using our website or services, you agree to be bound by these Terms.
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
                  These Terms of Service are governed by the laws of England and Wales.
                  PikesSoft Ltd is a company registered in the United Kingdom. For privacy-related
                  matters, please refer to our{" "}
                  <Link href="/privacy" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </main>
  );
}
