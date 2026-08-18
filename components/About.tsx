import {
  aboutBio,
  aboutHeadline,
  robloxDetailImage,
  stats,
} from "@/data/site";
import { experience } from "@/data/experience";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionLabel } from "./ui/SectionLabel";
import { PropertyPanel } from "./ui/PropertyPanel";
import { ImageFrame } from "./ui/ImageFrame";

export function About() {
  return (
    <section id="about" className="relative overflow-visible px-6 py-24 md:py-32">
      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionLabel title="About" />
          <p className="mt-4 max-w-2xl text-balance font-display text-2xl font-medium leading-snug tracking-tight text-foreground md:text-3xl">
            {aboutHeadline}
          </p>
        </ScrollReveal>

        <div className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-muted md:text-lg">
          {aboutBio.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <p>{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12">
          <ScrollReveal delay={0.1}>
            <PropertyPanel rows={stats} />
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="hidden lg:block">
            <ImageFrame
              src={robloxDetailImage}
              alt="Roblox build detail"
              aspectRatio="aspect-[3/4]"
              className="w-48"
            />
          </ScrollReveal>
        </div>

        <ExperienceTimeline entries={experience} />
      </div>
    </section>
  );
}
