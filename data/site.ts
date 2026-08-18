import type { SocialLink, Stat } from "./types";

export const siteConfig = {
  firstName: "Matthew",
  lastName: "Gervescu",
  fullName: "Matthew Gervescu",
  initials: "MG",
  email: "matthewgervescu@gmail.com",
  discord: "zump4",
  robloxProfile: "https://www.roblox.com/users/565338066/profile",
  year: 2026,
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Contact", href: "#contact" },
] as const;

export const sectionIds = ["about", "projects", "toolkit", "contact"] as const;

export const heroSubtitle =
  "Full Stack Developer";

export const heroBio =
  "Seven years building software: Roblox games (1B+ visits, 15K peak CCU) and civic tools like Provide, a food-access map for Charlotte.";

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/mattecolors",
    icon: "github",
    description: "github.com/mattecolors",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matthew-gervescu-86874a39b/",
    icon: "linkedin",
    description: "Matthew Gervescu",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:matthewgervescu@gmail.com",
    icon: "mail",
    copyable: true,
    copyText: "matthewgervescu@gmail.com",
    description: "matthewgervescu@gmail.com",
  },
  {
    id: "discord",
    label: "Discord",
    icon: "discord",
    copyable: true,
    copyOnly: true,
    copyText: "zump4",
    description: "zump4",
  },
  {
    id: "roblox",
    label: "Roblox",
    href: "https://www.roblox.com/users/565338066/profile",
    icon: "roblox",
    description: "zump4",
  },
];

export const stats: Stat[] = [
  {
    id: "visits",
    displayValue: 1,
    suffix: "B+",
    label: "LifetimeVisits",
  },
  {
    id: "ccu",
    displayValue: 15,
    suffix: "K",
    label: "PeakCCU",
  },
  {
    id: "revenue",
    displayValue: 1,
    prefix: "$",
    suffix: "M+",
    label: "LifetimeRevenue",
  },
];

export const robloxDetailImage = "/images/roblox/roblox-detail.jpg";

export const aboutBio = [
  "High school student in Charlotte. IB Diploma at Ballantyne Ridge (4.0 unweighted, 4.45 weighted), NCSSM Online, and dual-enrolled in computer engineering at CPCC. TypeScript, Python, Java, JavaScript, and Luau.",
  "Provide is a food-access map for the Congressional App Challenge (NC-12), written in HTML, JavaScript, and Leaflet. I have seven years of Roblox games with 1B+ visits, 15K peak CCU, and over $1M in lifetime revenue. In 2026 I placed 7th overall (4th in high school) at scriptCTF.",
  "I teach taekwondo as a 3rd degree black belt at Karate Charlotte. I am TSA treasurer and lead the Robotics & Manufacturing Prototype team, and Senior Patrol Leader of Troop 490 (15+ scouts) on the Eagle Scout track. I volunteer with Mecklenburg County Teen Court, IOCC disaster relief after Hurricane Helene in Erwin, Tennessee, and Appalachia Service Project.",
];

export const aboutHeadline =
  "Websites, games, and local projects.";

export const projectsHeadline = "Sites, games, and packages.";

export const contactHeadline = "Email or Discord";

export const contactIntro =
  "Internships, research, and project work. Email or Discord.";
