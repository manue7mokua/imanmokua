"use client";

import React, { useEffect, useRef, useState } from "react";
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
  commandOutput = [], // Add new prop for command output
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<any>(null);
  const commandRef = useRef<string>("");
  const lineRef = useRef<string>("");
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastOutputLengthRef = useRef(0);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initial terminal setup
  useEffect(() => {
    if (!isClient || !terminalRef.current) return;
    if (isInitialized) return;

    // Dynamic import of xterm
    const loadXterm = async () => {
      const xtermModule = await import("@xterm/xterm");
      const fitAddonModule = await import("@xterm/addon-fit");
      
      await import("@xterm/xterm/css/xterm.css");

      const XTerm = xtermModule.Terminal;
      const FitAddon = fitAddonModule.FitAddon;

      // Initialize xterm.js
      const term = new XTerm({
        cursorBlink: true,
        theme: {
          background: "#252526",
          foreground: "#FFFFFF",
        },
        scrollback: 1000,
        // Improve performance with these options
        disableStdin: false,
        allowProposedApi: true,
        fastScrollModifier: "alt",
        allowTransparency: false,
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      // Mount terminal
      term.open(terminalRef.current!);
      fitAddon.fit();

      // Store reference
      xtermRef.current = term;

      // Welcome message
      term.writeln("Welcome to Iman's interactive portfolio!");
      term.writeln('Type "help" to see available commands.');
      term.writeln("");

      // Set up prompt
      writePrompt(term);

      // Handle user input - use refs instead of state for better performance
      term.onKey(({ key, domEvent }) => {
        const charCode = domEvent.keyCode;
        
        // Handle Enter key
        if (charCode === 13) {
          const command = commandRef.current.trim();
          term.writeln("");
          if (command) {
            // Don't write command output here, let the dedicated effect handle it
            onCommand(command);
            commandRef.current = "";
            lineRef.current = "";
          }
          // Don't write prompt here, let the command output handler do it
        }
        // Handle Up Arrow (history navigation)
        else if (charCode === 38) {
          if (history.length > 0 && historyIndex < history.length - 1) {
            // Clear current line
            for (let i = 0; i < lineRef.current.length; i++) {
              term.write("\b \b");
            }

            const newIndex = historyIndex + 1;
            const historicalCommand = history[history.length - 1 - newIndex];

            setHistoryIndex(newIndex);
            commandRef.current = historicalCommand;
            lineRef.current = historicalCommand;
            term.write(historicalCommand);
          }
        }
        // Handle Down Arrow (history navigation)
        else if (charCode === 40) {
          // Clear current line
          for (let i = 0; i < lineRef.current.length; i++) {
            term.write("\b \b");
          }

          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            const historicalCommand = history[history.length - 1 - newIndex];

            setHistoryIndex(newIndex);
            commandRef.current = historicalCommand;
            lineRef.current = historicalCommand;
            term.write(historicalCommand);
          } else {
            setHistoryIndex(-1);
            commandRef.current = "";
            lineRef.current = "";
          }
        }
        // Handle Backspace
        else if (charCode === 8) {
          if (lineRef.current.length > 0) {
            commandRef.current = commandRef.current.slice(0, -1);
            lineRef.current = lineRef.current.slice(0, -1);
            term.write("\b \b");
          }
        }
        // Handle Tab for command completion
        else if (charCode === 9) {
          domEvent.preventDefault();

          if (commandRef.current.length > 0) {
            const { AVAILABLE_COMMANDS } = require('../types');
            const matches = AVAILABLE_COMMANDS.filter(cmd => 
              cmd.startsWith(commandRef.current.toLowerCase())
            );

            if (matches.length === 1){
              // Clear current command
              for (let i = 0; i < lineRef.current.length; i++) {
                term.write('\b \b');
              }

              // Write the completed command
              commandRef.current = matches[0];
              lineRef.current = matches[0];
              term.write(matches[0]);
            } else if (matches.length > 1) {
              // Display possible completions
              term.writeln('');
              term.writeln(matches.join(' '));
              writePrompt(term);
              term.write(commandRef.current);
            }
          }
        }
        // Handle normal input
        else {
          commandRef.current += key;
          lineRef.current += key;
          term.write(key);
        }
      });

      // Resize handler
      const handleResize = () => {
        fitAddon.fit();
      };
      
      window.addEventListener('resize', handleResize);
      setIsInitialized(true);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        term.dispose();
      };
    };

    loadXterm();
  }, [onCommand, history, historyIndex, setHistoryIndex, isClient, isInitialized]);

  // Handle command output updates
  useEffect(() => {
    const term = xtermRef.current;
    if (!term || !isInitialized) return;

    // If commmandOutput was reset, clear the terminal too
    if (commandOutput.length <= 2 && lastOutputLengthRef.current > 2) {
      term.clear();
      term.writeln(commandOutput[0] || '');
      term.writeln(commandOutput[1] || '');
      writePrompt(term);
      lastOutputLengthRef.current = commandOutput.length;
      return;
    }

    // Only process new outputs
    if (commandOutput.length > lastOutputLengthRef.current) {
      const newOutputs = commandOutput.slice(lastOutputLengthRef.current);
      
      newOutputs.forEach(output => {
        term.writeln(output);
      });

      lastOutputLengthRef.current = commandOutput.length;
      
      // Add a new prompt after processing all new outputs
      writePrompt(term);
    }
  }, [commandOutput, isInitialized]);

  const writePrompt = (term: any) => {
    term.write("\r\n$ ");
  };

  return <TerminalContainer ref={terminalRef} />;
};

export default Terminal;