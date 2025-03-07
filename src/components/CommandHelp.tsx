"use client";

import React from "react";
import styled from "styled-components";

const CommandHelpContainer = styled.div`
  margin-top: 10px;
  padding: 15px;
  background-color: #000000;
  border: 1px solid #1a1a1a;
  border-radius: 4px;
  color: #87ceeb;
  font-family: "Menlo", monospace;
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
  max-height: 65vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  &:hover {
    box-shadow: 0 0 15px rgba(135, 206, 235, 0.2);
    border-color: rgba(135, 206, 235, 0.4);
  }
`;

const Title = styled.h3`
  color: #27c93f;
  margin-bottom: 15px;
  font-size: 1.1em;
`;

const CommandGroup = styled.div`
  margin-bottom: 10px;
`;

const CommandItem = styled.div`
  margin-bottom: 6px;
  font-size: 0.9em;

  .command {
    color: #4169e1;
    font-weight: bold;
  }

  .description {
    color: #999;
    margin-left: 8px;
    font-size: 0.9em;
  }
`;

const CommandHelp: React.FC = () => {
  return (
    <CommandHelpContainer>
      <Title>Available Commands</Title>

      <CommandGroup>
        <CommandItem>
          <span className="command">help</span>
          <span className="description">Show this help menu</span>
        </CommandItem>

        <CommandItem>
          <span className="command">git branch</span>
          <span className="description">List all branches</span>
        </CommandItem>

        <CommandItem>
          <span className="command">git checkout [branch]</span>
          <span className="description">Switch to a branch</span>
        </CommandItem>

        <CommandItem>
          <span className="command">ls</span>
          <span className="description">List files in current branch</span>
        </CommandItem>

        <CommandItem>
          <span className="command">cat [file]</span>
          <span className="description">View file contents</span>
        </CommandItem>

        <CommandItem>
          <span className="command">social [platform]</span>
          <span className="description">Open social profile</span>
        </CommandItem>

        <CommandItem>
          <span className="command">open [project]</span>
          <span className="description">Open project repo</span>
        </CommandItem>

        <CommandItem>
          <span className="command">clear</span>
          <span className="description">Clear terminal</span>
        </CommandItem>
      </CommandGroup>

      <Title>Available Branches</Title>
      <CommandGroup>
        <CommandItem>
          <span className="command">main</span>
          <span className="description">About me & experience</span>
        </CommandItem>

        <CommandItem>
          <span className="command">projects</span>
          <span className="description">My GitHub projects</span>
        </CommandItem>

        <CommandItem>
          <span className="command">blog</span>
          <span className="description">(coming soon)</span>
        </CommandItem>

        <CommandItem>
          <span className="command">hackathons</span>
          <span className="description">Hackathon projects</span>
        </CommandItem>
      </CommandGroup>
    </CommandHelpContainer>
  );
};

export default CommandHelp;
