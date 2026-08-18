import type { ToolkitCategory } from "./types";

export const toolkitIntro =
  "TypeScript for websites. Luau for games.";

export const toolkitCategories: ToolkitCategory[] = [
  {
    id: "languages",
    label: "Languages",
    description: "What I write in.",
    techSlugs: [
      "typescript",
      "javascript",
      "luau",
      "python",
      "html5",
      "css3",
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    description: "Front end.",
    techSlugs: ["nextdotjs", "react", "tailwindcss", "framer"],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    description: "Data and hosting.",
    techSlugs: ["postgresql", "prisma", "supabase", "vercel", "roblox"],
  },
  {
    id: "tools",
    label: "Tools",
    description: "Git and editors.",
    techSlugs: ["git", "github", "cursor", "anthropic", "figma"],
  },
];
