import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "wazza",
    name: "wazza",
    description: "Tireless repo improvement agents.",
    layout: "featured",
    links: [
      {
        href: "https://github.com/manue7mokua/wazza",
        label: "open project",
        type: "project",
      },
      {
        href: "https://github.com/manue7mokua/wazza#readme",
        label: "view notes",
        type: "notes",
      },
    ],
    media: {
      kind: "video",
      src: process.env.NEXT_PUBLIC_WAZZA_DEMO_URL,
      poster: "/projects/posters/wazza.png",
      alt: "Wazza interview copilot interface",
    },
  },
  {
    id: "cruyffchess",
    name: "cruyffchess",
    description: "Tactics board for small-sided games.",
    layout: "tall",
    media: {
      kind: "image",
      poster: "/projects/posters/cruyffchess.png",
      alt: "Cruyffchess football tactics board",
    },
  },
  {
    id: "datagolf",
    name: "datagolf",
    description:
      "Coding golf for analyzing data using prompts instead of SQL statements.",
    layout: "landscape",
    media: {
      kind: "image",
      poster: "/projects/posters/datagolf.png",
      alt: "Datagolf code challenge interface",
    },
  },
  {
    id: "baby-fathom",
    name: "baby-fathom",
    description:
      "A small, fast version of Fathom for exploring voice-first code intelligence.",
    layout: "tall",
    media: {
      kind: "image",
      poster: "/projects/posters/baby-fathom.png",
      alt: "Baby Fathom voice intelligence flow",
    },
  },
  {
    id: "incourseai",
    name: "incourseai",
    description:
      "General AI agents that help college students learn and complete coursework more effectively.",
    layout: "tall",
    media: {
      kind: "image",
      poster: "/projects/posters/incourseai.png",
      alt: "InCourse AI coursework workflow",
    },
  },
  {
    id: "mem-arctec",
    name: "mem_arctec",
    description: "Verilog implementation of a two-level CPU cache system.",
    layout: "compact",
    media: {
      kind: "image",
      poster: "/projects/posters/mem-arctec.png",
      alt: "Memory architecture diagram",
    },
  },
];
