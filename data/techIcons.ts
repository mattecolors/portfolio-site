import type { TechIcon } from "./types";

export const techIcons: Record<string, TechIcon> = {
  typescript: { slug: "typescript", name: "TypeScript", brandColor: "3178C6" },
  javascript: { slug: "javascript", name: "JavaScript", brandColor: "F7DF1E" },
  luau: {
    slug: "roblox",
    name: "Luau",
    brandColor: "00A2FF",
    variant: "text",
    textLabel: "Luau",
  },
  python: { slug: "python", name: "Python", brandColor: "3776AB" },
  html5: { slug: "html5", name: "HTML", brandColor: "E34F26" },
  css3: { slug: "css", name: "CSS", brandColor: "1572B6" },
  nextdotjs: { slug: "nextdotjs", name: "Next.js", brandColor: "FFFFFF" },
  react: { slug: "react", name: "React", brandColor: "61DAFB" },
  tailwindcss: { slug: "tailwindcss", name: "Tailwind CSS", brandColor: "06B6D4" },
  framer: { slug: "framer", name: "Framer Motion", brandColor: "0055FF" },
  postgresql: { slug: "postgresql", name: "PostgreSQL", brandColor: "4169E1" },
  prisma: { slug: "prisma", name: "Prisma", brandColor: "2D3748" },
  supabase: { slug: "supabase", name: "Supabase", brandColor: "3FCF8E" },
  vercel: { slug: "vercel", name: "Vercel", brandColor: "FFFFFF" },
  roblox: { slug: "roblox", name: "Roblox Studio", brandColor: "00A2FF" },
  wally: {
    slug: "roblox",
    name: "Wally",
    brandColor: "00A2FF",
    variant: "text",
    textLabel: "Wally",
  },
  git: { slug: "git", name: "Git", brandColor: "F05032" },
  github: { slug: "github", name: "GitHub", brandColor: "FFFFFF" },
  cursor: { slug: "cursor", name: "Cursor", brandColor: "FFFFFF" },
  anthropic: { slug: "anthropic", name: "Claude", brandColor: "D4A574" },
  figma: { slug: "figma", name: "Figma", brandColor: "F24E1E" },
  leaflet: { slug: "leaflet", name: "Leaflet", brandColor: "199900" },
  googleanalytics: { slug: "googleanalytics", name: "Google Analytics", brandColor: "E37400" },
};

export function getTechIcon(slug: string): TechIcon | undefined {
  return techIcons[slug];
}
