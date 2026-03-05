"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaggerChildren from "@/components/animations/stagger-children";
import FadeIn from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  techStack?: string[];
  isFeatured?: boolean;
}

interface PortfolioFilterProps {
  projects: SanityProject[];
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function PortfolioFilter({ projects }: PortfolioFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get("category") ?? "All";

  // Derive unique categories from project data, preserving insertion order
  const categories = ["All", ...Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean))
  )];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleCategoryChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "All") {
        params.delete("category");
      } else {
        params.set("category", value);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <>
      {/* Filter Tabs */}
      <FadeIn className="mb-12">
        <div className="flex justify-center">
          <Tabs
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <div className="flex justify-center">
              <TabsList className="flex-wrap h-auto gap-1 p-1">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="text-xs sm:text-sm"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>
      </FadeIn>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <StaggerChildren
          key={activeCategory}
          stagger={0.08}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => {
            const slug = project.slug?.current;
            const techStack = project.techStack ?? [];

            return (
              <Link
                key={project._id}
                href={`/portfolio/${slug}`}
                className="group block"
              >
                <Card
                  className={cn(
                    "h-full overflow-hidden transition-all duration-300",
                    "hover:shadow-lg hover:border-primary/20",
                    "group-focus-visible:ring-2 group-focus-visible:ring-ring"
                  )}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-chart-1/10">
                      <div className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm">
                        <p className="text-sm font-medium text-foreground/70">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {techStack.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs px-2 py-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {techStack.length > 4 && (
                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-0.5"
                        >
                          +{techStack.length - 4}
                        </Badge>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      View Case Study
                      <ArrowRight className="size-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </StaggerChildren>
      ) : (
        <FadeIn className="py-16 text-center">
          <p className="text-muted-foreground text-lg">
            No projects found in this category. Check back soon!
          </p>
        </FadeIn>
      )}
    </>
  );
}
