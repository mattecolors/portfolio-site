"use client";

import type { Project } from "@/data/types";
import { ProvideVisuals } from "./ProvideVisuals";
import { RobloxGallery } from "./RobloxGallery";
import { StackLine } from "../ui/StackLine";
import { ImageFrame } from "../ui/ImageFrame";

interface ProjectCardProps {
  project: Project;
}

function isExternal(href: string) {
  return href.startsWith("http");
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="border-t border-wireframe pt-10 first:border-t-0 first:pt-0">
      {project.image && (
        <div className="mb-6">
          <ImageFrame
            src={project.image}
            alt={`${project.title} preview`}
            aspectRatio="aspect-[16/9]"
            priority={project.id === "devfolio"}
            href={project.imageLink}
          />
        </div>
      )}

      {project.layout === "provide" && project.provideImages && (
        <div className="mb-6">
          <ProvideVisuals images={project.provideImages} />
        </div>
      )}

      {project.layout === "roblox" && project.robloxImages && (
        <div className="mb-6">
          <RobloxGallery images={project.robloxImages} />
        </div>
      )}

      <div className="flex flex-wrap items-baseline gap-3">
        <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
          {project.title}
        </h3>
        {project.badge && (
          <span className="font-mono text-xs text-terrain">
            {project.badge === "open-source" ? "Open source" : project.badge}
          </span>
        )}
      </div>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        {project.description}
      </p>

      <StackLine slugs={project.techSlugs} />

      {project.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={isExternal(link.href) ? "_blank" : undefined}
              rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
              className="text-sm text-link underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
