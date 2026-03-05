"use client";

import { useState, useRef } from "react";
import { ArrowRight, Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FadeIn from "@/components/animations/fade-in";

const expertiseOptions = [
  "Frontend Development",
  "Backend Development",
  "Full-Stack Development",
  "Mobile Development",
  "UI/UX Design",
  "DevOps / Cloud",
  "QA / Testing",
  "AI / Machine Learning",
  "Project Management",
  "Other",
] as const;

export default function ApplicationForm() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    expertise: "",
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  }

  function clearFile() {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Job Application — ${formState.expertise}`
    );
    const body = encodeURIComponent(
      [
        `Full Name: ${formState.fullName}`,
        `Email: ${formState.email}`,
        `Area of Expertise: ${formState.expertise}`,
        ``,
        `Please find my CV/resume attached.`,
      ].join("\n")
    );

    window.location.href = `mailto:hr@pikessoft.com?subject=${subject}&body=${body}`;

    setStatus("success");
    setFormState({ fullName: "", email: "", expertise: "" });
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <section id="apply" className="py-20 md:py-28 bg-muted/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-wrap-balance">
              Apply Today
            </h2>
            <p className="mt-3 text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              Ready to join our team? Fill out the form below and we&apos;ll get
              back to you within 48 hours.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="apply-name"
                  className="text-sm font-medium block mb-1.5"
                >
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="apply-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, fullName: e.target.value }))
                  }
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="apply-email"
                  className="text-sm font-medium block mb-1.5"
                >
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="apply-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="apply-expertise"
                className="text-sm font-medium block mb-1.5"
              >
                Area of Expertise <span className="text-destructive">*</span>
              </label>
              <Select
                value={formState.expertise}
                onValueChange={(value) =>
                  setFormState((s) => ({ ...s, expertise: value }))
                }
                required
              >
                <SelectTrigger id="apply-expertise" className="w-full">
                  <SelectValue placeholder="Select your expertise" />
                </SelectTrigger>
                <SelectContent>
                  {expertiseOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1.5">
                Resume / CV
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  (attach in your email client)
                </span>
              </label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required={false}
                  className="sr-only"
                  id="apply-resume"
                />
                {fileName ? (
                  <div className="flex items-center gap-3 rounded-md border border-border bg-muted/50 px-4 py-3">
                    <FileText className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-sm truncate flex-1">{fileName}</span>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="apply-resume"
                    className="flex items-center justify-center gap-2 rounded-md border border-dashed border-border px-4 py-6 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Upload className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Upload your resume (PDF, DOC, DOCX)
                    </span>
                  </label>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full group" size="lg">
              Submit Application
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>

            {status === "success" && (
              <p className="text-sm text-green-600 text-center">
                Your email client should have opened. Please attach your CV and
                hit send!
              </p>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
