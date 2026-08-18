"use client";

import { useEffect, useRef, useState } from "react";
import type { ExperienceEntry } from "@/data/types";
import { formatStack } from "@/lib/formatStack";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    entryRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [entries.length]);

  const progress = entries.length > 1 ? activeIndex / (entries.length - 1) : 1;

  return (
    <div className="relative mt-20 pl-6 md:pl-8">
      <div className="absolute top-0 bottom-0 left-0 w-px bg-wireframe">
        <div
          className="absolute top-0 left-0 w-full origin-top bg-selection transition-transform duration-500 ease-out"
          style={{ transform: `scaleY(${progress})`, height: "100%" }}
        />
      </div>

      <div className="space-y-8">
        {entries.map((entry, i) => {
          const isActive = activeIndex === i;

          return (
            <div
              key={entry.id}
              ref={(el) => {
                entryRefs.current[i] = el;
              }}
              className="relative"
            >
              <article
                className={`relative border-l-2 py-2 pl-6 transition-[opacity,border-color] duration-300 md:pl-8 ${
                  isActive
                    ? "border-l-selection opacity-100"
                    : "border-l-wireframe opacity-50"
                }`}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="font-mono text-xs text-muted">
                    {entry.dateRange}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-xl font-semibold text-foreground md:text-2xl">
                  {entry.role}
                </h3>

                {entry.organizationUrl ? (
                  <a
                    href={entry.organizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm text-link transition-colors hover:text-foreground"
                  >
                    {entry.organization}
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-muted">{entry.organization}</p>
                )}

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  {entry.description}
                </p>

                {entry.techSlugs.length > 0 && (
                  <p className="mt-3 text-sm text-muted/80">
                    {formatStack(entry.techSlugs)}
                  </p>
                )}
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}
