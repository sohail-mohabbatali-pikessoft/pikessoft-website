"use client";

import Image from "next/image";
import Marquee from "@/components/animations/marquee";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface SanityClient {
  _id: string;
  name: string;
  logoUrl?: string;
  website?: string;
}

/* -------------------------------------------------------------------------- */
/*  Real client logos                                                          */
/* -------------------------------------------------------------------------- */

const CLIENTS = [
  { id: "sendoso",  src: "/clients/sendoso.svg",           label: "Sendoso",  w: 153, h: 35  },
  { id: "almana",   src: "/clients/almana.png",            label: "Almana",   w: 550, h: 225 },
  { id: "wajda",    src: "/clients/wajda.svg",             label: "Wajda",    w: 229, h: 96  },
  { id: "frame148", src: "/clients/frame148.png",          label: "Client",   w: 293, h: 153 },
  { id: "clip",     src: "/clients/clip-path-group.svg",   label: "Client",   w: 153, h: 35  },
  { id: "client5",  src: "/clients/client-screenshot.svg", label: "Client",   w: 176, h: 54  },
];

/* -------------------------------------------------------------------------- */
/*  Single logo item                                                           */
/* -------------------------------------------------------------------------- */

function LogoItem({ src, label, w, h }: { src: string; label: string; w: number; h: number }) {
  return (
    <div className="group mx-10 flex items-center justify-center select-none shrink-0">
      <Image
        src={src}
        alt={label}
        width={w}
        height={h}
        className="h-10 w-auto max-w-[140px] object-contain grayscale opacity-40 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-90"
        unoptimized
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

interface ClientLogosProps {
  clients?: SanityClient[];
}

export default function ClientLogos({ clients: _clients }: ClientLogosProps) {
  return (
    <section className="py-16 md:py-20 overflow-hidden">

      {/* Heading */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px flex-1 max-w-28 bg-border/50 rounded-full" />
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground/40">
            Trusted by companies worldwide
          </p>
          <div className="h-px flex-1 max-w-28 bg-border/50 rounded-full" />
        </div>
      </div>

      {/* Marquee rows — faded edges */}
      <div
        className="relative space-y-8"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        {/* Row 1 — scrolls left */}
        <Marquee speed={28} direction="left">
          {CLIENTS.map(({ id, src, label, w, h }) => (
            <LogoItem key={id} src={src} label={label} w={w} h={h} />
          ))}
        </Marquee>

        {/* Row 2 — scrolls right */}
        <Marquee speed={22} direction="right">
          {[...CLIENTS].reverse().map(({ id, src, label, w, h }) => (
            <LogoItem key={id} src={src} label={label} w={w} h={h} />
          ))}
        </Marquee>
      </div>

    </section>
  );
}
