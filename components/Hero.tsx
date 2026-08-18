"use client";

import { motion } from "framer-motion";
import { heroBio, heroSubtitle, siteConfig, socialLinks } from "@/data/site";
import { IconLink } from "./ui/IconLink";
import { HeroOrbit } from "./HeroOrbit";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-16 pt-16">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.85fr)] md:gap-12 lg:gap-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.h1
            variants={item}
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {siteConfig.firstName} {siteConfig.lastName}
          </motion.h1>

          <motion.p variants={item} className="mt-4 font-mono text-sm text-muted">
            {heroSubtitle}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg"
          >
            {heroBio}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            {socialLinks.map((link) => (
              <IconLink
                key={link.id}
                label={link.label}
                href={link.href}
                icon={link.icon}
                copyable={link.copyable}
                copyText={link.copyText}
                copyOnly={link.copyOnly}
              />
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center rounded-md border border-wireframe bg-surface/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-selection/50 hover:text-selection"
            >
              View work
            </a>
            <a
              href="#contact"
              className="text-sm text-link transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </motion.div>
        </motion.div>

        <div className="relative z-0 flex justify-center md:justify-end">
          <HeroOrbit />
        </div>
      </div>
    </section>
  );
}
