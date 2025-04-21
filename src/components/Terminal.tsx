"use client";

import React from "react";
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
  position: relative;

  /* Media queries for responsiveness */
  @media (max-width: 768px) {
    padding: 0.5rem;
    height: calc(100vh - 80px); /* Leave space for mobile command bar */
  }

  @media (max-width: 480px) {
    padding: 0.25rem;
  }
`;

// Create a separate component for the actual terminal
const TerminalInstance = dynamic<TerminalInstanceProps>(
  () => import("@/components/TerminalInstance"),
  {
    ssr: false,
  }
);

// Import CommandHelp component
const CommandHelp = dynamic(() => import("@/components/CommandHelp"), {
  ssr: false,
});

// Import TouchCommandBar component for mobile
const TouchCommandBar = dynamic(() => import("@/components/TouchCommandBar"), {
  ssr: false,
});

const HelpButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1a1a1a;
  color: #27c93f;
  border: 1px solid #333;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background-color: #333;
    box-shadow: 0 0 10px rgba(39, 201, 63, 0.5);
  }

  @media (max-width: 480px) {
    top: 0.5rem;
    right: 0.5rem;
  }
`;

const Terminal = ({ onCommand, currentDirectory }: TerminalProps) => {
  const [showHelp, setShowHelp] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Check if device is mobile on component mount and window resize
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <TerminalContainer data-testid="terminal-container" className="Terminal">
      <HelpButton onClick={toggleHelp}>?</HelpButton>

      {showHelp && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "1rem",
            zIndex: 9,
            maxWidth: isMobile ? "calc(100vw - 2rem)" : "300px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          }}
        >
          <CommandHelp />
        </div>
      )}

      <TerminalInstance
        onCommand={onCommand}
        currentDirectory={currentDirectory}
      />

      {isMobile && (
        <TouchCommandBar
          onCommand={onCommand}
          currentDirectory={currentDirectory}
        />
      )}
    </TerminalContainer>
  );
};

export default Terminal;
