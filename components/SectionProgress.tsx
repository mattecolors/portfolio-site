"use client";

import { useEffect, useState } from "react";
import { navLinks, sectionIds } from "@/data/site";

export function SectionProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLElement);
            if (index >= 0) setActive(index);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex motion-reduce:hidden"
      aria-label="Section progress"
    >
      {navLinks.map((link, i) => (
        <a
          key={sectionIds[i]}
          href={link.href}
          className="group flex items-center gap-2"
          aria-label={`Go to ${link.label}`}
          aria-current={active === i ? "true" : undefined}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              active === i
                ? "bg-selection"
                : "bg-wireframe group-hover:bg-muted"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
