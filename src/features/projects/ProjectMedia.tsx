"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ProjectMedia as ProjectMediaData } from "./types";
import styles from "./projects.module.css";

interface ProjectMediaProps {
  media: ProjectMediaData;
  priority?: boolean;
}

export function ProjectMedia({ media, priority = false }: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (media.kind === "video" && media.src) {
    return (
      <video
        ref={videoRef}
        aria-label={media.alt}
        autoPlay
        className={styles.mediaAsset}
        loop
        muted
        playsInline
        poster={media.poster}
        preload="metadata"
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      alt={media.alt}
      className={styles.mediaAsset}
      fill
      priority={priority}
      sizes={priority ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 100vw, 33vw"}
      src={media.poster}
    />
  );
}
