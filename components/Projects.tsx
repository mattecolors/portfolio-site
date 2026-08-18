"use client";

import { projects } from "@/data/projects";
import { projectsHeadline } from "@/data/site";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionLabel } from "./ui/SectionLabel";
import { ProjectCard } from "./projects/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="relative overflow-visible px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionLabel title="Projects" />
          <p className="mt-3 font-display text-xl font-medium text-muted md:text-2xl">
            {projectsHeadline}
          </p>
        </ScrollReveal>

        <div className="mt-16 space-y-16">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
