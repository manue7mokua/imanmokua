import Link from "next/link";
import styles from "./projects.module.css";

const footerLinks = [
  { href: "/", label: "about" },
  { href: "/writing", label: "notes" },
  { href: "/recs", label: "uses" },
  { href: "mailto:hello@imanmokua.com", label: "contact" },
];

export function ProjectsFooter() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Iman Mokua</p>
      <nav aria-label="Footer navigation" className={styles.footerNav}>
        {footerLinks.map((link) => (
          <Link href={link.href} key={link.label}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
