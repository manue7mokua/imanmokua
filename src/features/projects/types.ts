export type ProjectLayout =
  | "featured"
  | "landscape"
  | "tall"
  | "compact"
  | "text";

export interface ProjectMedia {
  alt: string;
  kind: "image" | "video";
  poster: string;
  src?: string;
}

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
