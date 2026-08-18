import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageAmbient } from "@/components/PageAmbient";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Matthew Gervescu | Developer Portfolio",
  description:
    "Seven years building software: Roblox games (1B+ visits, 15K peak CCU) and civic tools like Provide, a food-access map for Charlotte.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${ibmPlexMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full overflow-x-clip bg-background text-foreground" suppressHydrationWarning>
        <PageAmbient />
        <div className="relative z-10">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
