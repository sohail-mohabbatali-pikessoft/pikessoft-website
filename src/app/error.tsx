"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="text-6xl font-bold text-muted-foreground/20">Oops</div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Something Went Wrong
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          An unexpected error occurred. Please try again or contact us if the
          problem persists.
        </p>
        <Button onClick={reset}>
          <RotateCcw className="mr-1.5 size-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
