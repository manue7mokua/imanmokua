export type ProjectLayout =
  | "featured"
  | "landscape"
  | "tall"
  | "compact";

interface ProjectMediaBase {
  alt: string;
  poster: string;
}

export interface ProjectStackImage {
  alt: string;
  src: string;
}

export type ProjectMedia =
  | (ProjectMediaBase & {
      kind: "image" | "video";
      src?: string;
    })
  | (ProjectMediaBase & {
      images: [ProjectStackImage, ProjectStackImage];
      kind: "image-stack";
    });

export interface ProjectLink {
  href: string;
  label: string;
  type: "project" | "notes";
}

export interface Project {
  description: string;
  id: string;
  layout: ProjectLayout;
  links?: ProjectLink[];
  media?: ProjectMedia;
  name: string;
}
