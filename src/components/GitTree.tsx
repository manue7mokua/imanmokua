// src/components/GitTree.tsx
"use client";

import React, { useState } from 'react';
import styled from 'styled-components';

interface GitTreeProps {
  currentBranch: string;
  branches: string[];
  onBranchClick?: (branch: string) => void;
}

const TreeContainer = styled.div`
  font-family: monospace;
  margin-top: 20px;
`;

const Branch = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  margin: 5px 0;
  color: ${props => props.$isActive ? '#27C93F' : 'white'};
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.4 ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
    transform: translateX(3px);
  }

  ${props => props.$isActive && `
    transform: translateX(5px);
  `}
`;

const Circle = styled.span<{ $isActive: boolean }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => props.$isActive ? '#27C93F' : '#4169E1'};
  transition: background-color 0.4s ease;

  ${props => props.$isActive && `
    box-shadow: 0 0 5px #27C93F;
    transform: scale(1.2);
  `}
`;

const Connector = styled.div<{ $isActive: boolean }>`
  width: 2px;
  height: 20px;
  background-color: ${props => props.$isActive ? '#27C93F' :  '#444'};
  margin-left: 4px;
  transition: background-color 0.4 ease;
`;

const GitTree: React.FC<GitTreeProps> = ({ 
  currentBranch, 
  branches, 
  onBranchClick = () => {} 
}) => {
  const [animatingBranch, setAnimatingBranch] = useState<string | null>(null);

  return (
    <TreeContainer>
      {branches.map((branch, index) => {
        const isActive = branch === currentBranch;
        const isLast = index === branches.length - 1;
        const isAnimating = animatingBranch === branch;
        
        return (
          <Branch 
            key={branch} 
            $isActive={isActive}
            $isAnimating={isAnimating}
            onClick={() => {
              setAnimatingBranch(branch);
              setTimeout(() => setAnimatingBranch(null), 500);
              onBranchClick(branch);
            }}
            title={`Switch to ${branch} branch`}
          > 
            {index > 0 && <span style={{ marginRight: '8px' }}>{isLast ? '└──' : '├──'}</span>}
            <Circle $isActive={isActive} $isAnimating={isAnimating}/>
            <span>{branch}</span>
            {isActive && <span> (active)</span>}
          </Branch>
        );
      })}
    </TreeContainer>
  );
};

export default GitTree;