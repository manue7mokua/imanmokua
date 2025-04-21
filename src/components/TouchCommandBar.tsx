"use client";

import React from "react";
import styled from "styled-components";
import { TerminalProps } from "@/types/terminal";

const CommandBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #000000;
  border-top: 1px solid #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  z-index: 100;
`;

const CommandButton = styled.button<{ isActive?: boolean }>`
  background-color: ${(props) => (props.isActive ? "#27c93f22" : "#1a1a1a")};
  color: ${(props) => (props.isActive ? "#27c93f" : "#ccc")};
  border: 1px solid ${(props) => (props.isActive ? "#27c93f" : "#333")};
  border-radius: 4px;
  padding: 8px 12px;
  margin: 0 5px;
  font-family: "Menlo", monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #27c93f22;
    color: #27c93f;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TouchCommandBar: React.FC<TerminalProps> = ({
  onCommand,
  currentDirectory,
}) => {
  const commandGroups = {
    home: [
      { command: "cd ~", label: "Home", isActive: currentDirectory === "~" },
      { command: "pwd", label: "pwd" },
      { command: "ls", label: "ls" },
      { command: "clear", label: "clear" },
      { command: "go back home", label: "Exit Terminal" },
    ],
    navigation: [
      {
        command: "cd ~/projects",
        label: "Projects",
        isActive: currentDirectory === "~/projects",
      },
      {
        command: "cd ~/projects/pinned",
        label: "Pinned",
        isActive: currentDirectory === "~/projects/pinned",
      },
      {
        command: "cd ~/hackathons",
        label: "Hackathons",
        isActive: currentDirectory === "~/hackathons",
      },
      { command: "cd ..", label: "cd .." },
      { command: "go back home", label: "Exit Terminal" },
    ],
    social: [
      { command: "social github", label: "GitHub" },
      { command: "social linkedin", label: "LinkedIn" },
      { command: "social x", label: "X" },
      { command: "go back home", label: "Exit Terminal" },
    ],
  };

  // Get current command group based on current directory
  const getCurrentCommandGroup = () => {
    if (currentDirectory === "~") return commandGroups.home;
    if (currentDirectory.includes("projects")) return commandGroups.navigation;
    if (currentDirectory.includes("hackathons"))
      return commandGroups.navigation;
    return commandGroups.home;
  };

  return (
    <CommandBarContainer>
      <ScrollContainer>
        {getCurrentCommandGroup().map((btn) => (
          <CommandButton
            key={btn.command}
            isActive={btn.isActive}
            onClick={() => onCommand(btn.command)}
          >
            {btn.label}
          </CommandButton>
        ))}
      </ScrollContainer>
    </CommandBarContainer>
  );
};

export default TouchCommandBar;
