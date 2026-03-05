"use client";

import { ThemeProvider } from "next-themes";
import GSAPProvider from "./animations/gsap-provider";
import LenisProvider from "./animations/lenis-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {/* LenisProvider drives smooth scroll and keeps GSAP ScrollTrigger in sync */}
      <LenisProvider>
        <GSAPProvider>{children}</GSAPProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}
