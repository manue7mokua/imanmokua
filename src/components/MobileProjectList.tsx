"use client";

import React from "react";
import styled from "styled-components";
import { AppState } from "@/types";
import { Github } from "lucide-react";

const MobileContainer = styled.div`
  padding: 1rem;
  background: #000000;
  color: #fff;
  min-height: 100vh;
  overflow-y: auto;
  font-family: "Menlo", monospace;
`;

const Header = styled.h1`
  font-size: 1.5rem;
  color: #27c93f;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const BackButton = styled.button`
  display: block;
  margin: 0 auto 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #1a1a1a;
  color: #4169e1;
  border: 1px solid #333;
  border-radius: 4px;
  font-family: "Menlo", monospace;
  cursor: pointer;

  &:hover {
    background-color: #27c93f22;
    color: #27c93f;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #4169e1;
  margin: 1.5rem 0 1rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
`;

const ProjectCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #1a1a1a;
`;

const ProjectTitle = styled.h3`
  font-size: 1rem;
  color: #27c93f;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  font-size: 0.875rem;
  color: #ccc;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ProjectLink = styled.a`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #333;
  color: #87ceeb;
  border-radius: 3px;
  text-decoration: none;
  font-size: 0.75rem;
  margin-top: 0.5rem;

  &:hover {
    background-color: #444;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const Tag = styled.span`
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  background-color: #2a2a2a;
  color: #aaa;
  border-radius: 3px;
`;

interface MobileProjectListProps {
  state: AppState;
  onBackClick: () => void;
}

const MobileProjectList: React.FC<MobileProjectListProps> = ({
  state,
  onBackClick,
}) => {
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
      {projects.map((project) => (
        <ProjectCard key={project.filename}>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>

          {project.tags.length > 0 && (
            <TagList>
              {project.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagList>
          )}

          {project.link && (
            <ProjectLink
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <Github size={16} />
            </ProjectLink>
          )}
        </ProjectCard>
      ))}

      <SectionTitle>Hackathon Projects</SectionTitle>
      {hackathons.map((hackathon) => (
        <ProjectCard key={hackathon.filename}>
          <ProjectTitle>{hackathon.title}</ProjectTitle>
          <ProjectDescription>{hackathon.description}</ProjectDescription>
        </ProjectCard>
      ))}
    </MobileContainer>
  );
};

export default MobileProjectList;
