"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, ArrowRight } from "lucide-react";
import Logo from "@/components/ui/logo";
import gsap from "gsap";

const navLinks = [
  { title: "Home",    href: "/" },
  { title: "Company", href: "/company" },
  { title: "Careers", href: "/careers" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const sideNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Stagger nav items in when sidebar opens ── */
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      const items = sideNavRef.current?.querySelectorAll(".sb-item");
      if (items?.length) {
        gsap.fromTo(
          items,
          { x: 18, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.055,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }
    }, 280);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      {/* Skip-to-content — visually hidden, appears on keyboard focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <Logo className="h-10 w-auto text-foreground transition-opacity group-hover:opacity-80" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <a
              href="https://calendly.com/shahzaib-ede/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 group shrink-0",
                scrolled
                  ? "bg-foreground text-background hover:bg-foreground/85 shadow-sm"
                  : "bg-foreground/90 text-background hover:bg-foreground shadow-md"
              )}
            >
              Book a Meeting
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className={cn(
                  "w-[300px] sm:w-[340px] p-0 flex flex-col",
                  "bg-foreground border-l-0 shadow-2xl",
                  "[&>[data-slot=sheet-close]]:text-background/40",
                  "[&>[data-slot=sheet-close]]:hover:text-background",
                  "[&>[data-slot=sheet-close]]:hover:bg-background/[0.07]",
                  "[&>[data-slot=sheet-close]]:rounded-md",
                  "[&>[data-slot=sheet-close]]:top-[17px]",
                  "[&>[data-slot=sheet-close]]:right-5",
                )}
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                {/* ── Top bar — logo ── */}
                <div className="flex items-center px-6 h-[62px] border-b border-background/[0.07] shrink-0">
                  <Link href="/" onClick={() => setOpen(false)} className="group">
                    <Logo className="h-7 w-auto text-background opacity-90 transition-opacity group-hover:opacity-60" />
                  </Link>
                </div>

                {/* ── Navigation list ── */}
                <nav ref={sideNavRef} className="flex-1 overflow-y-auto px-5 py-3">
                  {navLinks.map((link, index) => {
                    const num = String(index + 1).padStart(2, "0");
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.title}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "sb-item flex items-center gap-4 py-[14px]",
                          "border-b border-background/[0.06] group",
                          isActive
                            ? "text-background"
                            : "text-background/65 hover:text-background"
                        )}
                      >
                        <span className="font-mono text-[10px] tracking-wider text-background/20 tabular-nums shrink-0 w-5">
                          {num}
                        </span>
                        <span
                          className={cn(
                            "flex-1 text-[1.05rem] font-medium transition-all duration-200 group-hover:translate-x-0.5",
                            isActive && "font-semibold"
                          )}
                        >
                          {link.title}
                        </span>
                        {isActive && (
                          <span className="size-1.5 rounded-full bg-primary shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* ── Footer — CTA + email ── */}
                <div className="px-5 pt-4 pb-7 border-t border-background/[0.07] shrink-0 space-y-3">
                  <Button
                    asChild
                    className="w-full h-11 bg-background text-foreground hover:bg-background/88 font-medium gap-2 rounded-lg"
                  >
                    <a
                      href="https://calendly.com/shahzaib-ede/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      Book a Meeting
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
