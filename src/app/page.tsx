import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/json-ld";
import HeroSection from "@/components/sections/hero";
import ServicesOverview from "@/components/sections/services-overview";
import StatsBar from "@/components/sections/stats-bar";
import IndustriesSection from "@/components/sections/industries";
import ContactFormSection from "@/components/sections/contact-form";

// Below-fold sections — code-split so their JS isn't parsed at initial load
const EngagementModels    = dynamic(() => import("@/components/sections/engagement-models"));
// const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials")); // hidden — re-enable when ready
const TechStackSection    = dynamic(() => import("@/components/sections/tech-stack-tabs"));
const ClientLogos         = dynamic(() => import("@/components/sections/client-logos"));

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PikesSoft",
  url: "https://pikessoft.com",
  description:
    "Software development & consulting company delivering mobile apps, web platforms, AI solutions, and digital transformation.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
  },
  sameAs: [
    "https://www.linkedin.com/company/pikessoft",
    "https://www.facebook.com/pikessoft",
  ],
};

/* -------------------------------------------------------------------------- */
/*                                    ISR                                     */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <HeroSection />
      <StatsBar />
      <ServicesOverview />
      <IndustriesSection />
      <EngagementModels />
      {/* <TestimonialsSection /> */}{/* hidden — re-enable when ready */}
      <TechStackSection />
      <ContactFormSection />
      <ClientLogos />
    </>
  );
}
