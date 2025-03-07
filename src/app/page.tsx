"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Terminal from "@/components/Terminal";
import GitTree from "@/components/GitTree";
import CommandHelp from "@/components/CommandHelp";
import { AppState } from "@/types";
import commandHandler from "@/utils/commandHandler";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #000000;
  overflow: hidden;
`;

const SidebarContainer = styled.div`
  width: 25vw;
  padding: 1rem;
  background: #000000;
  border-right: 1px solid #1a1a1a;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MainContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 1rem;
  background: #000000;
  overflow: hidden;
`;

export default function Home() {
  const [state, setState] = useState<AppState>({
    currentBranch: "main",
    branches: [
      "main",
      "projects",
      "projects/pinned",
      "projects/all-repos",
      "blog",
      "hackathons",
    ],
    currentFiles: ["about.md", "experience.md", "education.md"],
    commandHistory: [],
    historyIndex: -1,
    files: {
      main: {
        "about.md": `# About Me
Hi, I'm Iman Mokua!
I study Computer Engineering at Howard University with a minor in Computer Science.
I build web apps, small ML models, and low-level system infra.
I work with Python, Go, JavaScript/TypeScript, React, and anything CI/CD.`,
        "experience.md": `# Experience
## Meta Platforms, Inc. | Menlo Park, CA

\x1B[36mSoftware Engineering Intern | June 2024 - August 2024\x1B[0m
- Improved classification accuracy by 47% using logistic regression and gradient descent optimization
- Achieved 1.5x server speed-up through database denormalization and query caching
- Implemented model persistence with local storage checkpointing for seamless page reloads

## Howard University | Washington, D.C

\x1B[36mUndergraduate Research Assistant | October 2023 - January 2025\x1B[0m
- Developed MIMO network simulations supporting 500+ Mbps throughput for high-capacity scenarios
- Enhanced RF signal processing with 90% improved fidelity using advanced modulation schemes`,
        "education.md": `# Education

## Howard University | Washington, DC
**Bachelor of Science in Computer Engineering, Minor in Computer Science** | Aug. 2022 - May 2026`,
      },
      projects: {},
      "projects/pinned": {
        "HDL_Alien_Shooter.md": `# HDL Alien Shooter - VHDL Game

## Overview
- Retro-style shooting game implemented in VHDL
- Hardware-accelerated graphics and collision detection
- Built for FPGA development board
- Real-time sprite rendering and movement

## Features
- Custom sprite rendering engine
- Real-time collision detection
- Score tracking system
- Multiple difficulty levels
- Hardware-optimized game logic
- VGA display output

## Tech Stack
- VHDL
- Xilinx Vivado
- FPGA Development Board`,

        "roids.md": `# Roids - Asteroid Shooter

## Overview
- Classic asteroid shooting game built with Python
- Object-oriented design with inheritance
- Smooth physics-based movement
- Dynamic difficulty scaling

## Features
- Multiple asteroid types and behaviors
- Power-up system
- High score tracking
- Progressive difficulty
- Particle effects system
- Sound effects and background music

## Tech Stack
- Python
- Pygame
- Object-Oriented Programming
- Vector Mathematics`,

        "SSG.md": `# SSG - Static Site Generator

## Overview
- Custom static site generator written in Python
- Markdown to HTML conversion
- Template-based page generation
- Asset management system

## Features
- Markdown support with custom extensions
- Customizable HTML templates
- Asset pipeline for CSS/JS
- Blog post management
- Tag and category system
- RSS feed generation

## Tech Stack
- Python
- Jinja2 Templates
- Markdown Parser
- YAML Front Matter
- CSS/SCSS Processing`,

        "FinMe.md": `# FinMe - Student Finance Tracker

## Overview
- Financial management tool for students
- Budget tracking and planning
- Expense categorization
- Financial insights and analytics

## Features
- Expense tracking and categorization
- Budget planning tools
- Bill payment reminders
- Spending analytics
- Savings goals tracking
- Export financial reports

## Tech Stack
- Python
- Flask
- SQLAlchemy
- PostgreSQL
- Chart.js
- Bootstrap`,
      },
      "projects/all-repos": {
        "repositories.md": `# All GitHub Repositories

## Active Projects
* SSG (python-based static site generator with markdown support)

* imanmokua (interactive terminal-based portfolio website)

* Enclave (real-time event attendance tracking using QR codes)

* dabble (p2p randomized college video chat)

## Future Projects
* iTems (find stuff super fast)

* SigLight (ML Voice-Controlled LED Lighting)`,
      },
      blog: {
        "coming-soon.md": `# Blog Coming Soon!

Stay tuned for articles on:
- Random thoughts
- Backend Development
- ML Engineering
- Design (cause no one likes shitty UIs like Microsoft Outlook)`,
      },
      hackathons: {
        "bison-hacks.md": `# BisonHacks 2024 - Autonomy

## Project Overview
- Developed a real-time knowledge graph system for local community awareness
- Implemented hourly data scraping pipeline with distributed crawlers
- Built transformer-based NLP models for semantic understanding
- Deployed a conversational AI interface for intuitive information retrieval
- Enabled local communities to query and understand real-time events in their area`,
        "bison-bytes.md": `# Bison Bytes 2024 - Roblox Obstacle Course

## Project Overview
- Developed a physics-based obstacle course game in Roblox Studio
- Implemented advanced game mechanics and real-time multiplayer functionality
- Created procedurally generated obstacles with difficulty scaling
- Built dynamic leaderboard system for competitive gameplay
- Designed engaging player progression system`,
        "black-blockchain.md": `# Black Blockchain Summit - DeFi Community Lending

## Project Overview
- Developed a decentralized peer-to-peer lending platform for community microfinance
- Implemented smart contracts for loan management and crowdfunding
- Created a transparent voting system for loan approval
- Built a community-driven risk assessment system
- Enabled secure and transparent loan transactions
- Won 1st Place for Technical Innovation and Impact`,
        "google-hbcu.md": `# Google HBCU Hackathon - Beatz

## Project Overview
- Developed an AI-powered music recommendation platform
- Built mood-based playlist generation using OpenAI API
- Implemented cross-cultural music discovery algorithm
- Created personalized music recommendations using NLP
- Designed intuitive mood-based user interface
- Won 1st Place for Innovation in AI/ML`,
      },
    },
  });

  const handleCommand = (command: string) => {
    const result = commandHandler(command, state);

    if (result.newBranch) {
      setState((prev) => ({
        ...prev,
        currentBranch: result.newBranch as string,
        currentFiles: Object.keys(prev.files[result.newBranch as string] || {}),
      }));
    }

    return result;
  };

  return (
    <AppContainer>
      <SidebarContainer>
        <GitTree
          currentBranch={state.currentBranch}
          branches={state.branches}
          onBranchClick={(branch) => handleCommand(`git checkout ${branch}`)}
        />
        <CommandHelp />
      </SidebarContainer>
      <MainContainer>
        <Terminal
          onCommand={handleCommand}
          currentBranch={state.currentBranch}
        />
      </MainContainer>
    </AppContainer>
  );
}
