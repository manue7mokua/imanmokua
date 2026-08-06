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
      src:
        process.env.NEXT_PUBLIC_WAZZA_DEMO_URL ??
        "/projects/demos/wazza-terminal-demo.mp4",
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
      kind: "video",
      src:
        process.env.NEXT_PUBLIC_CRUYFFCHESS_DEMO_URL ??
        "/projects/demos/cruyffchess-tactical-demo.mp4",
      poster: "/projects/posters/cruyffchess.png",
      alt: "Cruyffchess football tactics board",
    },
  },
  {
    id: "datagolf",
    name: "datagolf",
    description:
      "Coding golf for analyzing data using prompts instead of SQL statements.",
    layout: "tall",
    media: {
      kind: "video",
      src:
        process.env.NEXT_PUBLIC_DATAGOLF_DEMO_URL ??
        "/projects/demos/datagolf-data-flow-demo.mp4",
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
    id: "pathfinder",
    name: "pathfinder",
    description:
      "Autonomously guiding drones and UGVs for rescue missions.",
    layout: "landscape",
    media: {
      kind: "image-stack",
      poster: "/projects/pathfinder/ugv.webp",
      alt: "Pathfinder autonomous rescue vehicles",
      images: [
        {
          src: "/projects/pathfinder/ugv.webp",
          alt: "Pathfinder unmanned ground vehicle",
        },
        {
          src: "/projects/pathfinder/drone.webp",
          alt: "Pathfinder autonomous rescue drone",
        },
      ],
    },
  },
  {
    id: "mem-arctec",
    name: "mem_arctec",
    description: "Verilog implementation of a two-level CPU cache system.",
    layout: "compact",
    media: {
      kind: "video",
      src:
        process.env.NEXT_PUBLIC_MEM_ARCTEC_DEMO_URL ??
        "/projects/demos/mem-arctec-terminal-demo.mp4",
      poster: "/projects/posters/mem-arctec.png",
      alt: "Memory architecture diagram",
    },
  },
];
