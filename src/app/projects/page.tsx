"use client";

import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";

interface Project {
  name: string;
  description: string;
}

const projects: Project[] = [
  {
    name: "datagolf",
    description:
      "Coding golf for analyzing data using prompts instead of SQL statements.",
  },
  {
    name: "baby-fathom",
    description:
      "A small, fast, and easily iterable version of Fathom for exploring voice-first code intelligence.",
  },
  {
    name: "dogbed_db",
    description: "Playground to explore internals of dogbed databases.",
  },
  {
    name: "ss-devices-proj",
    description:
      "Analysis of semiconductor carrier properties changes with doping levels and temperature.",
  },
  {
    name: "incourseai",
    description:
      "General AI agents to help college students learn and complete coursework more effectively.",
  },
  {
    name: "mini_cursorISH",
    description:
      "Mini Claude Code to automatically detect and fix small bugs in my portfolio site.",
  },
  {
    name: "mem_arctec",
    description: "Verilog implementation of a two-level CPU cache system.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <AppHeader barClassName="h-14 items-end pb-2" />

      <div className="mx-auto max-w-4xl px-6 pt-14 md:px-12 lg:px-24">
        <div
          className="sticky top-[calc(env(safe-area-inset-top)+3.5rem)] z-30 isolate pt-6 pb-5"
          style={{ backgroundColor: "var(--background)" }}
        >
          <Link
            href="/"
            className="font-mono text-sm text-foreground underline transition-opacity hover:opacity-70"
          >
            ← Back to home
          </Link>

          <h1 className="mt-8 font-mono text-lg font-bold">Projects...</h1>
        </div>

        <ul className="space-y-8 pb-12">
          {projects.map((project) => (
            <li key={project.name}>
              <h2 className="font-mono text-sm font-bold md:text-base">
                {project.name}
              </h2>

              <p className="mt-2 text-sm leading-relaxed md:text-base">
                {project.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
