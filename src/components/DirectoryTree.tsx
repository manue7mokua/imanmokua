"use client";

import React from "react";
import styled from "styled-components";

const TreeContainer = styled.div`
  padding: 10px;
  background-color: #000000;
  border: 1px solid #1a1a1a;
  border-radius: 4px;
  color: #fff;
  font-family: "Menlo", monospace;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  color: #27c93f;
  margin-bottom: 15px;
  font-size: 1.1em;
`;

interface DirectoryItemProps {
  $active: boolean;
  $isSubDir?: boolean;
}

const DirectoryItem = styled.div<DirectoryItemProps>`
  padding: 5px 0;
  padding-left: ${(props) => (props.$isSubDir ? "20px" : "0")};
  color: ${(props) => (props.$active ? "#4169e1" : "#ccc")};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: #87ceeb;
  }

  .dir-icon {
    margin-right: 8px;
    font-size: 14px;
  }
`;

interface DirectoryTreeProps {
  currentDirectory: string;
  directories: string[];
  onDirectoryClick: (directory: string) => void;
}

const DirectoryTree: React.FC<DirectoryTreeProps> = ({
  currentDirectory,
  directories,
  onDirectoryClick,
}) => {
  // Function to get the parent directory
  const getParentDir = (path: string) => {
    if (path === "~") return null;
    const parts = path.split("/");
    return parts.slice(0, -1).join("/") || "~";
  };

  // Function to get directory name from path
  const getDirName = (path: string) => {
    if (path === "~") return "home";
    const parts = path.split("/");
    return parts[parts.length - 1];
  };

  // Organize directories into a tree structure
  const directoryTree: { [key: string]: string[] } = {};
  directories.forEach((dir) => {
    const parent = getParentDir(dir);
    if (parent) {
      if (!directoryTree[parent]) {
        directoryTree[parent] = [];
      }
      directoryTree[parent].push(dir);
    }
  });

  // Render directories recursively
  const renderDirectories = (directory: string, level = 0) => {
    const isActive = directory === currentDirectory;
    const children = directoryTree[directory] || [];

    return (
      <React.Fragment key={directory}>
        <DirectoryItem
          $active={isActive}
          $isSubDir={level > 0}
          onClick={() => onDirectoryClick(directory)}
        >
          <span className="dir-icon">📁</span>
          {getDirName(directory)}
        </DirectoryItem>
        {children.map((child) => renderDirectories(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <TreeContainer>
      <Title>Directory Tree</Title>
      {renderDirectories("~")}
    </TreeContainer>
  );
};

export default DirectoryTree;
