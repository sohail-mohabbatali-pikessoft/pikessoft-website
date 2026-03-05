"use client";

import Link from "next/link";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import FadeIn from "@/components/animations/fade-in";

// ---------------------------------------------------------------------------
// Types (matches Sanity job schema)
// ---------------------------------------------------------------------------

export interface JobOpening {
  _id: string;
  title: string;
  department?: string;
  location: string;
  type: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
}

// ---------------------------------------------------------------------------
// Fallback data shown when Sanity has no active jobs
// ---------------------------------------------------------------------------

const FALLBACK_JOBS: JobOpening[] = [
  {
    _id: "ai-engineer",
    title: "AI Engineer",
    department: "AI & Machine Learning",
    location: "Lahore",
    type: "Full-time",
    description:
      "We are looking for an AI Engineer to join our GenAI team. You will design and build LLM-powered applications, RAG pipelines, autonomous agents, and ML systems that power our clients' most ambitious AI products.",
    requirements: [
      "3+ years of experience with Python and machine learning frameworks (PyTorch, TensorFlow, or JAX)",
      "Hands-on experience with LLMs, prompt engineering, and fine-tuning (GPT-4, Claude, Llama)",
      "Experience building RAG systems with vector databases (Pinecone, Weaviate, or pgvector)",
      "Familiarity with AI orchestration frameworks (LangChain, LlamaIndex, or Haystack)",
      "Strong understanding of NLP, embeddings, and model evaluation techniques",
    ],
    responsibilities: [
      "Design and implement LLM-powered features, agents, and pipelines for client projects",
      "Build and optimize RAG systems using vector search and knowledge bases",
      "Fine-tune and evaluate language models for domain-specific tasks",
      "Collaborate with product and engineering teams to integrate AI capabilities",
      "Stay current with the fast-moving AI research landscape and apply relevant advances",
    ],
  },
  {
    _id: "senior-react-developer",
    title: "Senior React Developer",
    location: "Lahore",
    type: "Full-time",
    description:
      "We are looking for a Senior React Developer to join our frontend guild. You will architect and build performant web applications using React, Next.js, and TypeScript while mentoring junior engineers and contributing to our component library.",
    requirements: [
      "5+ years of experience with React and modern JavaScript / TypeScript",
      "Strong understanding of server-side rendering and the Next.js App Router",
      "Experience with state management solutions (Zustand, Redux, Jotai)",
      "Familiarity with testing frameworks (Jest, Playwright, Vitest)",
      "Excellent communication and collaboration skills",
    ],
    responsibilities: [
      "Lead the technical design of frontend features end-to-end",
      "Write clean, tested, and well-documented code",
      "Participate in code reviews and architecture discussions",
      "Mentor junior developers and foster a culture of continuous learning",
      "Collaborate closely with designers and backend engineers",
    ],
  },
  {
    _id: "backend-engineer",
    title: "Backend Engineer",
    location: "Lahore",
    type: "Full-time",
    description:
      "Join our backend team to design and implement scalable APIs and services. You will work with Node.js, Go, or Python to build systems that handle millions of requests per day while maintaining high availability and low latency.",
    requirements: [
      "3+ years of backend development experience (Node.js, Go, or Python)",
      "Solid understanding of relational and NoSQL databases",
      "Experience designing RESTful and/or GraphQL APIs",
      "Familiarity with containerization (Docker) and orchestration (Kubernetes)",
      "Knowledge of event-driven architectures and message queues",
    ],
    responsibilities: [
      "Design, implement, and maintain backend services and APIs",
      "Ensure high availability, scalability, and security of services",
      "Write comprehensive unit and integration tests",
      "Collaborate with frontend and DevOps teams on system design",
      "Participate in on-call rotations and incident response",
    ],
  },
  {
    _id: "ui-ux-designer",
    title: "UI/UX Designer",
    location: "Lahore",
    type: "Full-time",
    description:
      "We need a talented UI/UX Designer to craft intuitive, beautiful interfaces for our clients. You will own the design process from research and wireframing through to high-fidelity prototypes and handoff to engineering.",
    requirements: [
      "3+ years of UI/UX design experience for web and mobile products",
      "Proficiency in Figma and modern design tooling",
      "Strong portfolio demonstrating a user-centered design process",
      "Understanding of accessibility standards (WCAG 2.1)",
      "Experience collaborating with engineering teams in agile environments",
    ],
    responsibilities: [
      "Conduct user research, interviews, and usability testing",
      "Create wireframes, user flows, and high-fidelity prototypes",
      "Develop and maintain a design system with reusable components",
      "Work closely with developers to ensure pixel-perfect implementation",
      "Present design decisions to stakeholders with clear rationale",
    ],
  },
  {
    _id: "devops-engineer",
    title: "DevOps Engineer",
    location: "Lahore",
    type: "Full-time",
    description:
      "Help us build and maintain robust CI/CD pipelines and cloud infrastructure. You will automate deployments, manage Kubernetes clusters, and improve observability across all of our production systems.",
    requirements: [
      "4+ years of DevOps / SRE experience",
      "Deep expertise with AWS or GCP cloud services",
      "Hands-on experience with Kubernetes, Terraform, and Helm",
      "Strong scripting skills (Bash, Python, or Go)",
      "Experience with monitoring tools (Prometheus, Grafana, Datadog)",
    ],
    responsibilities: [
      "Design and maintain CI/CD pipelines for multiple projects",
      "Manage and optimize Kubernetes clusters in production",
      "Implement infrastructure-as-code using Terraform",
      "Set up monitoring, alerting, and incident response workflows",
      "Collaborate with engineering teams to improve developer experience",
    ],
  },
  {
    _id: "qa-analyst",
    title: "QA Analyst",
    location: "Lahore",
    type: "Full-time",
    description:
      "Ensure the highest quality of our software products by designing comprehensive test strategies, writing automated test suites, and collaborating with engineers to catch issues before they reach production.",
    requirements: [
      "2+ years of QA experience in software development",
      "Experience with automated testing tools (Playwright, Cypress, Selenium)",
      "Understanding of API testing and tools (Postman, REST Client)",
      "Familiarity with agile methodologies and test management tools",
      "Strong attention to detail and analytical thinking",
    ],
    responsibilities: [
      "Create and execute test plans, test cases, and test scripts",
      "Build and maintain automated regression test suites",
      "Identify, document, and track bugs through resolution",
      "Collaborate with developers to understand features and edge cases",
      "Contribute to improving QA processes and best practices",
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface JobOpeningsProps {
  jobs?: JobOpening[];
}

export default function JobOpenings({ jobs }: JobOpeningsProps) {
  const openings = jobs && jobs.length > 0 ? jobs : FALLBACK_JOBS;

  return (
    <section id="openings" className="py-20 md:py-28 bg-muted/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-wrap-balance">
            Current Openings
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl text-lg mx-auto leading-relaxed">
            Find the role that matches your skills and ambitions. We are always
            looking for talented individuals to join our growing team.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {openings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No open positions at the moment.</p>
              <p className="mt-2 text-sm">
                Check back soon or{" "}
                <Link href="#apply" className="text-primary underline">
                  apply directly
                </Link>{" "}
                with your CV.
              </p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {openings.map((job) => (
                <AccordionItem
                  key={job._id}
                  value={job._id}
                  className="rounded-xl border bg-card px-6 last:border-b"
                >
                  <AccordionTrigger className="py-5 hover:no-underline">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-left pr-4">
                      <span className="font-semibold text-base">
                        {job.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" />
                          {job.location}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          <Briefcase className="size-3 mr-1" />
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="space-y-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {job.description}
                      </p>

                      {job.requirements && job.requirements.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold mb-2">
                            Requirements
                          </h4>
                          <ul className="space-y-1.5">
                            {job.requirements.map((req, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {job.responsibilities &&
                        job.responsibilities.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold mb-2">
                              Responsibilities
                            </h4>
                            <ul className="space-y-1.5">
                              {job.responsibilities.map((resp, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      <Button asChild className="group">
                        <Link href="#apply">
                          Apply Now
                          <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
