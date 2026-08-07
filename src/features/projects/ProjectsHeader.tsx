import { SectionHeader } from "@/components/SectionHeader";
import { ThemeToggle } from "@/components/theme-toggle";

export function ProjectsHeader() {
  return <SectionHeader center={<ThemeToggle />} section="projects" />;
}
