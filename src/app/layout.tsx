import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CursorGlow from "@/components/ui/cursor-glow";
import PreviewBanner from "@/components/ui/preview-banner";
import PageIntro from "@/components/animations/page-intro";
import ScrollProgress from "@/components/ui/scroll-progress";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PikesSoft: AI-Powered Software Solutions",
    template: "%s | PikesSoft",
  },
  description:
    "PikesSoft builds intelligent, AI-powered products and platforms that help businesses automate, scale, and lead in their industries. From LLM integrations to full-stack AI solutions.",
  metadataBase: new URL("https://pikessoft.com"),
  keywords: [
    "AI software development",
    "AI solutions company",
    "LLM integration",
    "AI product development",
    "machine learning development",
    "artificial intelligence consulting",
    "PikesSoft",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PikesSoft",
    title: "PikesSoft: AI-Powered Software Solutions",
    description:
      "PikesSoft builds intelligent, AI-powered products and platforms that help businesses automate, scale, and lead in their industries.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PikesSoft: AI-Powered Software Solutions",
    description:
      "PikesSoft builds intelligent, AI-powered products and platforms that help businesses automate, scale, and lead in their industries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <PreviewBanner />
        <Providers>
          {/* Branded curtain reveal on first paint */}
          <PageIntro />
          {/* Thin scroll-progress line pinned to top of viewport */}
          <ScrollProgress />
          <CursorGlow />
          <Header />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
