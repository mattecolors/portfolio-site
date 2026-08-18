import { getTechIcon } from "@/data/techIcons";

export function formatStack(slugs: string[]): string {
  return slugs
    .map((slug) => {
      const tech = getTechIcon(slug);
      return tech?.name ?? slug;
    })
    .join(", ");
}
