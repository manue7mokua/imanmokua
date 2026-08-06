import { ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";
import { ProjectMedia } from "./ProjectMedia";
import type { Project } from "./types";
import styles from "./projects.module.css";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardClassName = [
    styles.card,
    styles[project.layout],
    styles[project.id],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClassName}>
      <div className={styles.cardInner}>
        <div className={styles.cardContent}>
          <div>
            <h2 className={styles.cardTitle}>
              {project.url ? (
                <Link
                  className={styles.cardTitleLink}
                  href={project.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {project.name}
                </Link>
              ) : (
                project.name
              )}
            </h2>
            <p className={styles.cardDescription}>{project.description}</p>
          </div>

          {project.links ? (
            <div className={styles.cardLinks}>
              {project.links.map((link) => {
                const Icon = link.type === "project" ? ArrowUpRight : FileText;

                return (
                  <Link
                    className={styles.cardLink}
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon aria-hidden="true" size={17} strokeWidth={1.6} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>

        {project.media ? (
          <div className={styles.mediaFrame}>
            <ProjectMedia
              media={project.media}
              priority={project.layout === "featured"}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
