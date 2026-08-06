import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./projects.module.css";

export function ProjectsHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.backLink} href="/">
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.6} />
        <span>back to home</span>
      </Link>

      <Link className={styles.identity} href="/" aria-label="Iman Mokua, home">
        <span>IMAN MOKUA</span>
        <span aria-hidden="true" className={styles.statusDot} />
      </Link>
    </header>
  );
}
