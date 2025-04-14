"use client";

import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import type { TerminalProps } from "@/types/terminal";
import { AVAILABLE_COMMANDS } from "@/types";

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #111;
  border-top: 1px solid #1a1a1a;
  padding: 8px;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  background-color: #000;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 8px 12px;
  font-family: 'Menlo, Monaco, "Courier New", monospace';
  align-items: center;
  margin-bottom: 8px;
`;

const Prompt = styled.span`
  color: #27c93f;
  margin-right: 8px;
  font-size: 14px;
  user-select: none;
`;

const InputField = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Menlo, Monaco, "Courier New", monospace';
  font-size: 14px;
  flex: 1;
  outline: none;

  &:focus + .cursor {
    display: none;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: #87ceeb;
  animation: ${blink} 1s infinite;
  position: absolute;
  left: 70px;
`;

const ButtonRow = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding-bottom: 4px;

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CommandButton = styled.button`
  background-color: #1a1a1a;
  color: #4169e1;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 6px 12px;
  font-family: 'Menlo, Monaco, "Courier New", monospace';
  font-size: 12px;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:active {
    background-color: #333;
    transform: scale(0.95);
  }
`;

const TouchCommandBar: React.FC<TerminalProps> = ({
  onCommand,
  currentBranch,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Common commands for quick access buttons
  const quickCommands = [
    "help",
    "git checkout projects",
    "git checkout blog",
    "git checkout hackathons",
    "ls",
    "clear",
  ];

  // Update cursor position when input changes
  useEffect(() => {
    if (inputRef.current && cursorRef.current) {
      const textWidth = getTextWidth(
        inputValue.substring(0, inputRef.current.selectionStart || 0)
      );
      cursorRef.current.style.left = `${70 + textWidth}px`;
    }
  }, [inputValue, cursorPosition]);

  // Helper function to calculate text width
  const getTextWidth = (text: string) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = '14px Menlo, Monaco, "Courier New", monospace';
      return context.measureText(text).width;
    }
    return 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  const handleFocus = () => {
    if (cursorRef.current) {
      cursorRef.current.style.display = "none";
    }
  };

  const handleBlur = () => {
    if (cursorRef.current) {
      cursorRef.current.style.display = "block";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onCommand(inputValue.trim());
      setInputValue("");
    }
  };

  const handleQuickCommand = (command: string) => {
    onCommand(command);
  };

  return (
    <Container>
      <InputWrapper onClick={() => inputRef.current?.focus()}>
        <Prompt>{`$`}</Prompt>
        <InputField
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label="Command input"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <Cursor ref={cursorRef} className="cursor" />
      </InputWrapper>

      <ButtonRow>
        {quickCommands.map((cmd) => (
          <CommandButton key={cmd} onClick={() => handleQuickCommand(cmd)}>
            {cmd}
          </CommandButton>
        ))}
      </ButtonRow>
    </Container>
  );
};

export default TouchCommandBar;
