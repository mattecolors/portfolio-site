import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "devfolio",
    title: "DevFolio",
    image: "/images/devfolio-hero.png",
    imageLink: "https://devfolio.lol",
    description:
      "Portfolio site for Roblox developers. Next.js, TypeScript, Roblox OAuth, and PostgreSQL. Profile pages, game stats from the Roblox API, and contribution checks.",
    techSlugs: [
      "nextdotjs",
      "typescript",
      "tailwindcss",
      "framer",
      "postgresql",
      "prisma",
      "supabase",
      "vercel",
      "anthropic",
    ],
    links: [
      { label: "devfolio.lol", href: "https://devfolio.lol", live: true },
      {
        label: "GitHub",
        href: "https://github.com/mattecolors/devfolio",
      },
    ],
  },
  {
    id: "provide",
    title: "Provide",
    layout: "provide",
    description:
      "Food-access map for Charlotte. Congressional App Challenge (NC-12) with Alan Cai (NCSSM '27) and Sohum Vajaria (NCSSM '28). HTML, JavaScript, Leaflet, and GA4. provide-nc.org.",
    techSlugs: ["javascript", "leaflet", "googleanalytics", "html5", "css3"],
    links: [
      { label: "provide-nc.org", href: "https://provide-nc.org", live: true },
      {
        label: "GitHub",
        href: "https://github.com/sohumvajaria/Provide",
      },
    ],
    provideImages: {
      heroSvg: "https://provide-nc.org/assets/hero-us-map.svg",
      dashboardPreview: "https://provide-nc.org/assets/explorer-preview.png",
      siteUrl: "https://provide-nc.org",
    },
  },
  {
    id: "zump-portfolio",
    title: "Builds & VFX Portfolio",
    image: "/images/zump-portfolio-hero.png",
    imageLink: "https://zump.ju.mp",
    description:
      "Builds, VFX, and games. 1B+ visits over seven years. zump.ju.mp.",
    techSlugs: ["luau", "roblox"],
    links: [
      { label: "zump.ju.mp", href: "https://zump.ju.mp", live: true },
      {
        label: "Roblox profile",
        href: "https://www.roblox.com/users/565338066/profile",
        live: true,
      },
    ],
  },
  {
    id: "roblox-portfolio",
    title: "Roblox Development",
    layout: "roblox",
    description:
      "Games and systems on Roblox. 1B+ visits, 15K peak CCU, $1M+ lifetime revenue. Luau, Studio, and Blender.",
    techSlugs: ["luau", "roblox"],
    links: [
      {
        label: "Roblox profile",
        href: "https://www.roblox.com/users/565338066/profile",
        live: true,
      },
    ],
    robloxImages: {
      hero: "/images/roblox/roblox-hero.jpg",
      features: [
        "/images/roblox/roblox-feature-1.jpg",
        "/images/roblox/roblox-feature-2.jpg",
        "/images/roblox/roblox-feature-3.jpg",
      ],
      detail: "/images/roblox/roblox-detail.jpg",
    },
  },
  {
    id: "luau-toolchain",
    title: "Luau Toolchain",
    badge: "open-source",
    description:
      "Three Luau packages: Signal (events), Promise, and Net (typed remotes). MIT. Install with Wally.",
    techSlugs: ["luau", "wally"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mattecolors/luau-toolchain",
      },
    ],
  },
];
