import { ProjectsBento } from "@/features/projects/ProjectsBento";
import { ProjectsHeader } from "@/features/projects/ProjectsHeader";
import styles from "@/features/projects/projects.module.css";

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <ProjectsHeader />
        <h1 className={styles.title}>/projects</h1>
        <ProjectsBento />
      </div>
    </main>
  );
}
