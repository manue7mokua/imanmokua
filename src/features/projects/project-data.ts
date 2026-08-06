import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "wazza",
    name: "wazza",
    description: "Tireless repo improvement agents.",
    layout: "featured",
    url: "https://github.com/manue7mokua/wazza",
    links: [
      {
        href: "https://github.com/manue7mokua/wazza",
        label: "open project",
        type: "project",
      },
      {
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
    url: "https://github.com/manue7mokua/cruyffchess",
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
      "Coding golf for analyzing data using prompts (built to make tutoring interactive).",
    layout: "tall",
    url: "https://github.com/manue7mokua/datagolf",
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
    id: "fathom",
    name: "fathom",
    description:
      "Multilingual voice AI for understanding and operating complex codebases",
    emphasis: "(winner at the Codex GPT-5 Hackathon)",
    layout: "tall",
    url: "https://www.heyfathom.com/",
    links: [
      {
        href: "https://www.linkedin.com/posts/200-startup-teams-were-able-to-ship-fast-ugcPost-7379229907295293441-dY8b/",
        label: "see post",
        type: "project",
      },
    ],
    media: {
      kind: "image-stack",
      poster: "/projects/fathom/team.webp",
      alt: "Fathom team at the Codex GPT-5 Hackathon",
      images: [
        {
          src: "/projects/fathom/team.webp",
          alt: "Fathom team at the Codex GPT-5 Hackathon",
        },
        {
          src: "/projects/fathom/result.webp",
          alt: "Fathom listed among the hackathon winners",
        },
      ],
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
    url: "https://github.com/manue7mokua/mem_arctec",
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
