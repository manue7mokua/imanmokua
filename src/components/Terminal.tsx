"use client";

import dynamic from "next/dynamic";
import styled from "styled-components";
import type { TerminalProps, TerminalInstanceProps } from "@/types/terminal";

const TerminalContainer = styled.div`
  height: 100vh;
  background-color: #000000;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

// Create a separate component for the actual terminal
const TerminalInstance = dynamic<TerminalInstanceProps>(
  () => import("@/components/TerminalInstance"),
  {
    ssr: false,
  }
);

const Terminal = ({ onCommand, currentBranch }: TerminalProps) => {
  return (
    <TerminalContainer data-testid="terminal-container" className="Terminal">
      <TerminalInstance onCommand={onCommand} currentBranch={currentBranch} />
    </TerminalContainer>
  );
};

export default Terminal;
