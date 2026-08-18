import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Toolkit } from "@/components/Toolkit";
import { Contact } from "@/components/Contact";
import { SectionProgress } from "@/components/SectionProgress";

export default function Home() {
  return (
    <>
      <SectionProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Toolkit />
        <Contact />
      </main>
    </>
  );
}
