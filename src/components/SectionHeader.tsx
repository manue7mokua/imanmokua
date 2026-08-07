import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./section-header.module.css";

interface SectionHeaderProps {
  section: string;
}

export function SectionHeader({ section }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <Link className={styles.backLink} href="/">
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.6} />
        <span>back to home</span>
      </Link>

      <div className={styles.sectionIdentity}>
        <h1 className={styles.sectionTitle}>{section}</h1>
        <span aria-hidden="true" className={styles.statusDot} />
      </div>
    </header>
  );
}
