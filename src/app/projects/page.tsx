import { ProjectsBento } from "@/features/projects/ProjectsBento";
import { ProjectsHeader } from "@/features/projects/ProjectsHeader";
import styles from "@/features/projects/projects.module.css";

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <ProjectsHeader />
        <p className={styles.intro}>
          this sprung from some late-night frolicking.
        </p>
        <ProjectsBento />
      </div>
    </main>
  );
}
