import { Hero } from "@/components/hero";
import { Timeline } from "@/components/timeline";
import { SkillsMatrix } from "@/components/skills-matrix";
import { ProjectGrid } from "@/components/project-grid";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Timeline />
      <SkillsMatrix />
      <ProjectGrid />
      <ContactSection />
    </>
  );
}
