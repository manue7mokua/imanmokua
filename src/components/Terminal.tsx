import React, { useEffect, useRef, useState } from "react";
import { Terminal as Xterm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import styled from "styled-components";
import { TerminalProps } from "../types";

const TerminalContainer = styled.div`
  width: 100%;
  height: 60vh;
  background-color: #252526;
  padding: 10px;
`;

const Terminal: React.FC<TerminalProps> = ({
  onCommand,
  history = [],
  historyIndex = -1,
  setHistoryIndex = () => {},
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Xterm | null>(null);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const [currentLine, setCurrentLine] = useState<string>("");

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm.js
    const term = new Xterm({
      cursorBlink: true,
      theme: {
        background: "#252526",
        foreground: "#FFFFFF",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // Mount terminal
    term.open(terminalRef.current);
    fitAddon.fit();

    // Store reference
    xtermRef.current = term;

    // Welcome message
    term.writeln("Karibu from Iman!");
    term.writeln('Type "help" to see available commands.');
    term.writeln("");

    // Set up prompt
    writePrompt(term);

    // Handle user input
    term.onKey(({ key, domEvent }) => {
      const code = domEvent.code;

      // Handle Enter key
      if (code === "Enter") {
        term.writeln("");
        if (currentCommand.trim()) {
          onCommand(currentCommand.trim());
          setCurrentCommand("");
          setCurrentLine("");
        }
        writePrompt(term);
      }
      // Handle UP Arrow (history navigation)
      else if (code === "ArrowUp") {
        if (history.length > 0 && historyIndex < history.length - 1) {
          // Clear current line
          for (let i = 0; i < currentLine.length; i++) {
            term.write("\b \b");
          }

          const newIndex = historyIndex + 1;
          const historicalCommand = history[history.length - 1 - newIndex];

          setHistoryIndex(newIndex);
          setCurrentCommand(historicalCommand);
          setCurrentLine(historicalCommand);
          term.write(historicalCommand);
        }
      }
      // Handle DOWN Arrow (history navigation)
      else if (code === "ArrowDown") {
        // Clear current line
        for (let i = 0; i < currentLine.length; i++) {
          term.write("\b \b");
        }

        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          const historicalCommand = history[history.length - 1 - newIndex];

          setHistoryIndex(newIndex);
          setCurrentCommand(historicalCommand);
          setCurrentLine(historicalCommand);
          term.write(historicalCommand);
        } else {
          setHistoryIndex(-1);
          setCurrentCommand("");
          setCurrentLine("");
        }
      }
      // Handle backspace
      else if (code === "Backspace") {
        if (currentLine.length > 0) {
          setCurrentCommand(currentCommand.slice(0, -1));
          setCurrentLine(currentLine.slice(0, -1));
          term.write("\b \b");
        }
      }
      // Handle normal input
      else {
        setCurrentCommand(currentCommand + key);
        setCurrentLine(currentLine + key);
        term.write(key);
      }
    });

    // Cleanup
    return () => {
      term.dispose();
    };
  }, [
    onCommand,
    history,
    historyIndex,
    setHistoryIndex,
    currentCommand,
    currentLine,
  ]);

  const writePrompt = (term: Xterm) => {
    term.write("\r\n$ ");
  };

  return <TerminalContainer ref={terminalRef} />;
};

export default Terminal;