import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./section-header.module.css";

interface SectionHeaderProps {
  center?: ReactNode;
  marker?: ReactNode;
  section: string;
}

export function SectionHeader({ center, marker, section }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <Link className={styles.backLink} href="/">
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.6} />
        <span>back to home</span>
      </Link>

      {center ? <div className={styles.centerSlot}>{center}</div> : null}

      <div className={styles.sectionIdentity}>
        <h1 className={styles.sectionTitle}>{section}</h1>
        {marker ?? <span aria-hidden="true" className={styles.statusDot} />}
      </div>
    </header>
  );
}
