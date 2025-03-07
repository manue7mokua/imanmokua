// src/components/GitTree.tsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";

interface GitTreeProps {
  currentBranch: string;
  branches: string[];
  onBranchClick?: (branch: string) => void;
}

const TreeContainer = styled.div.withConfig({
  displayName: "TreeContainer",
  componentId: "sc-tree",
})`
  font-family: monospace;
  margin-top: 10px;
  padding: 10px;
  background-color: #000000;
  border: 1px solid #1a1a1a;
  border-radius: 4px;
  transition: box-shadow 0.3s ease-in-out;
  max-height: 45vh;
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

const Branch = styled.div.withConfig({
  displayName: "Branch",
  componentId: "sc-branch",
})<{ $isActive: boolean; $isAnimating: boolean; $isNested?: boolean }>`
  display: flex;
  align-items: center;
  margin: 5px 0;
  color: ${(props) => (props.$isActive ? "#27C93F" : "white")};
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.4s ease;
  padding-left: ${(props) => (props.$isNested ? "20px" : "0")};

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
    transform: translateX(3px);
  }

  ${(props) =>
    props.$isActive &&
    `
    transform: translateX(5px);
  `}
`;

const Circle = styled.span.withConfig({
  displayName: "Circle",
  componentId: "sc-circle",
})<{ $isActive: boolean; $isAnimating: boolean }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) => (props.$isActive ? "#27C93F" : "#4169E1")};
  transition: background-color 0.4s ease;

  ${(props) =>
    props.$isActive &&
    `
    box-shadow: 0 0 5px #27C93F;
    transform: scale(1.2);
  `}
`;

const GitTree: React.FC<GitTreeProps> = ({
  currentBranch,
  branches,
  onBranchClick = () => {},
}) => {
  const [animatingBranch, setAnimatingBranch] = useState<string | null>(null);

  const handleBranchClick = (branch: string, isNested: boolean = false) => {
    setAnimatingBranch(branch);
    setTimeout(() => setAnimatingBranch(null), 500);

    // If it's a nested branch and we're not already in projects, first switch to projects
    if (isNested && !currentBranch.startsWith("projects")) {
      onBranchClick("projects");
      // Wait a bit before switching to the nested branch
      setTimeout(() => {
        onBranchClick(`projects/${branch}`);
      }, 100);
    } else if (isNested) {
      // If we're already in projects, just switch to the nested branch
      onBranchClick(`projects/${branch}`);
    } else {
      onBranchClick(branch);
    }
  };

  const renderBranch = (branch: string, isNested: boolean = false) => {
    const displayName = isNested ? branch.split("/")[1] : branch;
    const fullBranchName = isNested ? branch : displayName;
    const isActive = currentBranch === fullBranchName;
    const isAnimating = animatingBranch === fullBranchName;

    return (
      <Branch
        key={fullBranchName}
        $isActive={isActive}
        $isAnimating={isAnimating}
        $isNested={isNested}
        onClick={() => handleBranchClick(displayName, isNested)}
        title={`Switch to ${fullBranchName} branch`}
      >
        <Circle $isActive={isActive} $isAnimating={isAnimating} />
        <span>{displayName}</span>
        {isActive && <span> (active)</span>}
      </Branch>
    );
  };

  const mainBranches = branches.filter((branch) => !branch.includes("/"));
  const nestedBranches = branches.filter((branch) =>
    branch.startsWith("projects/")
  );

  return (
    <TreeContainer>
      {mainBranches.map((branch) => {
        if (branch === "projects") {
          return (
            <React.Fragment key={branch}>
              {renderBranch(branch)}
              {(currentBranch === "projects" ||
                currentBranch.startsWith("projects/")) && (
                <>
                  {nestedBranches.map((nestedBranch) =>
                    renderBranch(nestedBranch, true)
                  )}
                </>
              )}
            </React.Fragment>
          );
        }
        return renderBranch(branch);
      })}
    </TreeContainer>
  );
};

export default GitTree;
