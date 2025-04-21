"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Terminal from "@/components/Terminal";
import DirectoryTree from "@/components/DirectoryTree";
import CommandHelp from "@/components/CommandHelp";
import MobileProjectList from "@/components/MobileProjectList";
import { AppState } from "@/types";
import commandHandler from "@/utils/commandHandler";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #000000;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    height: 40vh;
    min-height: 200px;
    border-right: none;
    border-bottom: 1px solid #1a1a1a;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const MainContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 1rem;
  background: #000000;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 60vh;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export default function Home() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<AppState>({
    currentDirectory: "~",
    directories: [
      "~",
      "~/projects",
      "~/projects/pinned",
      "~/projects/all-repos",
      "~/hackathons",
    ],
    currentFiles: ["welcome.md"],
    commandHistory: [],
    historyIndex: -1,
    files: {
      "~": {
        "welcome.md": `# Welcome to Iman's Terminal
I'm Iman Mokua!
I study Computer Engineering at Howard University with a minor in Computer Science.
I build web apps, small ML models, and low-level system infra.
I work with Python, Go, JavaScript/TypeScript, React, and anything CI/CD.

## Experience
### Meta Platforms, Inc. | Menlo Park, CA

\x1B[36mSoftware Engineering Intern | June 2024 - August 2024\x1B[0m
- Improved classification accuracy by 47% using logistic regression and gradient descent optimization
- Achieved 1.5x server speed-up through database denormalization and query caching
- Implemented model persistence with local storage checkpointing for seamless page reloads

### Howard University | Washington, D.C

\x1B[36mUndergraduate Research Assistant | October 2023 - January 2025\x1B[0m
- Developed MIMO network simulations supporting 500+ Mbps throughput for high-capacity scenarios
- Enhanced RF signal processing with 90% improved fidelity using advanced modulation schemes`,
      },
      "~/projects": {},
      "~/projects/pinned": {
        "dogbed_db.md": `# Dogbed_DB - A Simple Key-Value Database

## Overview
- Lightweight, file-based key-value database implementation in Python
- Simple dictionary-like interface for storing and retrieving data
- Persistence across sessions

## Features
- Simple dictionary-like interface
- Persistent storage
- Binary tree-based indexing
- Transaction support (commit/rollback)
- Thread-safe operations
- Support for string values

## Tech Stack
- Python
- Binary Tree Data Structure
- File I/O Operations
- Unit Testing`,

        "HDL_Alien_Shooter.md": `# HDL Alien Shooter - Space Invaders in VHDL

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

        "SSG.md": `# SSG - Lightweight Static Site Generator

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

        "FinMe.md": `# FinMe - Automate DCA Investing for Students

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
      "~/projects/all-repos": {
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
      "~/hackathons": {
        "bison-hacks.md": `# BisonBytes 2025 - Interactive Real-time Knowledge Graph

## Project Overview
- Developed a real-time knowledge graph system for local community awareness
- Implemented hourly data scraping pipeline with distributed crawlers
- Built transformer-based NLP models for semantic understanding
- Deployed a conversational AI interface for intuitive information retrieval
- Enabled local communities to query and understand real-time events in their area`,
        "bison-bytes.md": `# Bison Bytes 2025 - Roblox Obstacle Course

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

  // First, set mounted to true on component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if device is mobile, but only after the component is mounted
  useEffect(() => {
    if (mounted) {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, [mounted]);

  const handleCommand = (command: string) => {
    const result = commandHandler(command, state);

    if (result.newDirectory) {
      setState((prev) => ({
        ...prev,
        currentDirectory: result.newDirectory as string,
        currentFiles: Object.keys(
          prev.files[result.newDirectory as string] || {}
        ),
      }));
    }

    return result;
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  // Only render the appropriate view after the component has mounted
  if (!mounted) {
    // Return a simple loading state or null when not mounted yet
    return <div style={{ background: "#000", height: "100vh" }}></div>;
  }

  // For mobile devices, show the simplified project list instead of the terminal
  if (isMobile) {
    return <MobileProjectList state={state} onBackClick={handleBackToHome} />;
  }

  // Regular terminal interface for larger screens
  return (
    <AppContainer>
      <SidebarContainer>
        <DirectoryTree
          currentDirectory={state.currentDirectory}
          directories={state.directories}
          onDirectoryClick={(directory) => handleCommand(`cd ${directory}`)}
        />
        <CommandHelp />
      </SidebarContainer>
      <MainContainer>
        <Terminal
          onCommand={handleCommand}
          currentDirectory={state.currentDirectory}
        />
      </MainContainer>
    </AppContainer>
  );
}
