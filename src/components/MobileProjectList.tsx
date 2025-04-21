"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AppState } from "@/types";
import { Github } from "lucide-react";
import { useTheme } from "next-themes";

const MobileContainer = styled.div`
  padding: 1.5rem 1rem;
  background: var(--background, #0a0a0a);
  color: var(--foreground, #ededed);
  min-height: 100vh;
  overflow-y: auto;
  font-family: var(--font-sans, "Inter", sans-serif);
`;

const Header = styled.h1`
  font-size: 1.75rem;
  color: var(--foreground, #ededed);
  margin-bottom: 1.8rem;
  text-align: center;
  font-weight: 500;
  font-family: var(--font-sans, "Inter", sans-serif);
`;

const BackButton = styled.button`
  display: block;
  margin: 0 auto 1.8rem;
  padding: 0.5rem 1.25rem;
  background-color: rgba(255, 255, 255, 0.05);
  color: #dd8833;
  border: 1px solid rgba(221, 136, 51, 0.3);
  border-radius: 6px;
  font-family: var(--font-mono, "Geist Mono", monospace);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(221, 136, 51, 0.1);
    border-color: rgba(221, 136, 51, 0.5);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #dd8833;
  margin: 2rem 0 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
  font-weight: 500;
  font-family: var(--font-mono, "Geist Mono", monospace);
`;

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--foreground, #ededed);
  margin-bottom: 0.75rem;
  font-weight: 500;
  font-family: var(--font-sans, "Inter", sans-serif);
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  line-height: 1.5;
  font-family: var(--font-sans, "Inter", sans-serif);
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

// Style for light mode
const LightModeTag = styled.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background-color: rgba(221, 136, 51, 0.1);
  color: rgba(176, 92, 29, 0.9);
  border-radius: 4px;
  transition: background-color 0.2s ease;
  font-family: var(--font-mono, "Geist Mono", monospace);

  &:hover {
    background-color: rgba(221, 136, 51, 0.15);
  }
`;

// Style for dark mode
const DarkModeTag = styled.span`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  transition: background-color 0.2s ease;
  font-family: var(--font-mono, "Geist Mono", monospace);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// Light and dark mode styles for ProjectCard
const LightModeProjectCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: var(--font-sans, "Inter", sans-serif);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(221, 136, 51, 0.3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
`;

const DarkModeProjectCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.02);
  transition: transform 0.2s ease, border-color 0.2s ease;
  font-family: var(--font-sans, "Inter", sans-serif);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(221, 136, 51, 0.3);
  }
`;

// Light and dark mode styles for ProjectLink
const LightModeProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.6rem;
  background-color: rgba(176, 92, 29, 0.1);
  color: rgba(176, 92, 29, 1);
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.75rem;
  margin-top: 0.75rem;
  transition: all 0.2s ease;
  font-family: var(--font-mono, "Geist Mono", monospace);

  &:hover {
    background-color: rgba(176, 92, 29, 0.15);
    transform: translateY(-1px);
  }
`;

const DarkModeProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.6rem;
  background-color: rgba(221, 136, 51, 0.15);
  color: #dd8833;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.75rem;
  margin-top: 0.75rem;
  transition: all 0.2s ease;
  font-family: var(--font-mono, "Geist Mono", monospace);

  &:hover {
    background-color: rgba(221, 136, 51, 0.25);
    transform: translateY(-1px);
  }
`;

interface MobileProjectListProps {
  state: AppState;
  onBackClick: () => void;
}

const MobileProjectList: React.FC<MobileProjectListProps> = ({
  state,
  onBackClick,
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true when component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to extract first paragraph from content as description
  const getDescription = (content: string): string => {
    const lines = content.split("\n");
    // Skip the title line and get next paragraph
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith("#") && !line.startsWith("-")) {
        return line;
      }
    }
    return "";
  };

  // Helper to extract tags/tech stack from content
  const getTags = (content: string): string[] => {
    const lines = content.split("\n");
    const tags: string[] = [];
    let inTechStack = false;

    for (const line of lines) {
      if (line.includes("Tech Stack")) {
        inTechStack = true;
        continue;
      }

      if (inTechStack && line.startsWith("-")) {
        const tag = line.replace("-", "").trim();
        if (tag) tags.push(tag);
      }
    }

    return tags;
  };

  // Get all pinned projects
  const projects = Object.entries(state.files["~/projects/pinned"] || {}).map(
    ([filename, content]) => {
      const title = content.split("\n")[0].replace("# ", "");
      return {
        filename,
        title,
        description: getDescription(content),
        tags: getTags(content),
        link: `https://github.com/manue7mokua/${filename.replace(".md", "")}`,
      };
    }
  );

  // Get all hackathon projects
  const hackathons = Object.entries(state.files["~/hackathons"] || {}).map(
    ([filename, content]) => {
      const title = content.split("\n")[0].replace("# ", "");
      return {
        filename,
        title,
        description: getDescription(content),
        tags: [],
        link: "",
      };
    }
  );

  return (
    <MobileContainer>
      <Header>Iman&apos;s Projects</Header>
      <BackButton onClick={onBackClick}>Back to Homepage</BackButton>

      <SectionTitle>Featured Projects</SectionTitle>
      {projects.map((project) => {
        const Card =
          mounted && theme === "light"
            ? LightModeProjectCard
            : DarkModeProjectCard;
        const Link =
          mounted && theme === "light"
            ? LightModeProjectLink
            : DarkModeProjectLink;

        return (
          <Card key={project.filename}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>

            {project.tags.length > 0 && (
              <TagList>
                {project.tags.map((tag, index) =>
                  mounted && theme === "light" ? (
                    <LightModeTag key={index}>{tag}</LightModeTag>
                  ) : (
                    <DarkModeTag key={index}>{tag}</DarkModeTag>
                  )
                )}
              </TagList>
            )}

            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                title="View on GitHub"
              >
                <Github size={16} />
              </Link>
            )}
          </Card>
        );
      })}

      <SectionTitle>Hackathon Projects</SectionTitle>
      {hackathons.map((hackathon) => {
        const Card =
          mounted && theme === "light"
            ? LightModeProjectCard
            : DarkModeProjectCard;

        return (
          <Card key={hackathon.filename}>
            <ProjectTitle>{hackathon.title}</ProjectTitle>
            <ProjectDescription>{hackathon.description}</ProjectDescription>
          </Card>
        );
      })}
    </MobileContainer>
  );
};

export default MobileProjectList;
