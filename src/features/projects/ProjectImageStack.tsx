"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectStackImage } from "./types";
import styles from "./projects.module.css";

interface ProjectImageStackProps {
  images: [ProjectStackImage, ProjectStackImage, ...ProjectStackImage[]];
  label: string;
}

export function ProjectImageStack({
  images,
  label,
}: ProjectImageStackProps) {
  const [frontIndex, setFrontIndex] = useState(0);

  return (
    <div aria-label={label} className={styles.photoStack} role="group">
      {images.map((image, index) => {
        const isFront = index === frontIndex;
        const depth = (index - frontIndex + images.length) % images.length;
        const depthClass =
          depth === 0
            ? styles.photoStackButtonFront
            : depth === 1
              ? styles.photoStackButtonBack
              : styles.photoStackButtonRear;

        return (
          <button
            aria-label={
              isFront
                ? `${image.alt}, currently in front`
                : `Bring ${image.alt.toLowerCase()} to the front`
            }
            aria-pressed={isFront}
            className={`${styles.photoStackButton} ${depthClass}`}
            key={image.src}
            onClick={() => setFrontIndex(index)}
            type="button"
          >
            <Image
              alt={image.alt}
              className={styles.photoStackImage}
              draggable={false}
              fill
              sizes="(max-width: 740px) 70vw, 240px"
              src={image.src}
            />
          </button>
        );
      })}

      <span aria-live="polite" className={styles.srOnly}>
        {images[frontIndex].alt} is in front
      </span>
    </div>
  );
}
