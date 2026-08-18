"use client";

import { toolkitCategories, toolkitIntro } from "@/data/toolkit";
import { formatStack } from "@/lib/formatStack";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionLabel } from "./ui/SectionLabel";

export function Toolkit() {
  return (
    <section id="toolkit" className="relative overflow-visible px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionLabel title="Toolkit" />
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {toolkitIntro}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {toolkitCategories.map((category, i) => (
            <ScrollReveal key={category.id} delay={i * 0.08}>
              <div className="h-full rounded-md border border-wireframe bg-surface/30 p-5 md:p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {category.label}
                </h3>
                <p className="mt-2 text-sm text-muted">{category.description}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted/90">
                  {formatStack(category.techSlugs)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
