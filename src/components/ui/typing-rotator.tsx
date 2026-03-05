"use client";

import { useState, useEffect } from "react";

interface TypingRotatorProps {
  items: string[];
  className?: string;
  /** Milliseconds per character while typing (default: 60) */
  typeSpeed?: number;
  /** Milliseconds per character while erasing (default: 35) */
  eraseSpeed?: number;
  /** Milliseconds to hold the fully-typed word before erasing (default: 2000) */
  holdDuration?: number;
}

export default function TypingRotator({
  items,
  className,
  typeSpeed = 60,
  eraseSpeed = 35,
  holdDuration = 2000,
}: TypingRotatorProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">(
    "typing"
  );

  useEffect(() => {
    const current = items[index];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("holding"), holdDuration);
        return () => clearTimeout(t);
      }
    }

    if (phase === "holding") {
      setPhase("erasing");
      return;
    }

    if (phase === "erasing") {
      if (text.length > 0) {
        const t = setTimeout(
          () => setText(text.slice(0, -1)),
          eraseSpeed
        );
        return () => clearTimeout(t);
      } else {
        setIndex((i) => (i + 1) % items.length);
        setPhase("typing");
      }
    }
  }, [text, phase, index, items, typeSpeed, eraseSpeed, holdDuration]);

  return (
    <span className={className}>
      {text}
      {/* Blinking cursor */}
      <span
        aria-hidden="true"
        className="animate-blink ml-0.5 inline-block w-[2px] rounded-sm bg-current align-middle"
        style={{ height: "1.1em" }}
      />
    </span>
  );
}
