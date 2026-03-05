import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="text-8xl font-bold text-muted-foreground/20">404</div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Page Not Found
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-1.5 size-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-1.5 size-4" />
              Home Page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
