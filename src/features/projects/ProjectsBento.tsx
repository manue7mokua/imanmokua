import { projects } from "./project-data";
import { ProjectCard } from "./ProjectCard";
import styles from "./projects.module.css";

export function ProjectsBento() {
  return (
    <section aria-label="Selected projects" className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
