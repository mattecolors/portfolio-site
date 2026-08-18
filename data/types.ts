export interface TechIcon {
  slug: string;
  name: string;
  brandColor?: string;
  variant?: "icon" | "text";
  textLabel?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  live?: boolean;
}

export type ProjectLayout = "default" | "provide" | "roblox";

export interface RobloxImages {
  hero: string;
  features: [string, string, string];
  detail: string;
}

export interface ProvideImages {
  heroSvg: string;
  dashboardPreview: string;
  siteUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techSlugs: string[];
  links: ProjectLink[];
  layout?: ProjectLayout;
  image?: string;
  imageLink?: string;
  badge?: "library" | "open-source";
  robloxImages?: RobloxImages;
  provideImages?: ProvideImages;
}

export interface ExperienceEntry {
  id: string;
  dateRange: string;
  role: string;
  organization: string;
  organizationUrl?: string;
  description: string;
  techSlugs: string[];
}

export interface ToolkitCategory {
  id: string;
  label: string;
  description: string;
  techSlugs: string[];
}

export interface SocialLink {
  id: string;
  label: string;
  href?: string;
  icon: "github" | "linkedin" | "mail" | "discord" | "roblox";
  copyable?: boolean;
  copyText?: string;
  copyOnly?: boolean;
  description?: string;
}

export interface Stat {
  id: string;
  displayValue: number;
  suffix: string;
  prefix?: string;
  label: string;
}
