"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { TerminalProps } from "@/types/terminal";
import { AVAILABLE_COMMANDS } from "@/types";

export default function TerminalInstance({
  onCommand,
  currentDirectory,
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const commandBufferRef = useRef("");
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const suggestionRef = useRef("");
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // First, set mounted to true when the component mounts
  useEffect(() => {
    setMounted(true);
    return () => {
      // Clean up terminal on unmount
      if (xtermRef.current) {
        xtermRef.current.dispose();
      }
    };
  }, []);

  // Check device type only after mounting
  useEffect(() => {
    if (!mounted) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [mounted]);

  const findMatchingCommands = (partial: string): string[] => {
    if (!partial) return [];
    return AVAILABLE_COMMANDS.filter((cmd) =>
      cmd.toLowerCase().startsWith(partial.toLowerCase())
    );
  };

  const writeHeader = useCallback((terminal: XTerm) => {
    // No big header, just a simple welcome line
    terminal.writeln("\x1B[1;34mWelcome to Iman's Terminal\x1B[0m\n");
  }, []);

  const clearLine = useCallback((terminal: XTerm) => {
    terminal.write("\x1b[2K"); // Clear entire line
    terminal.write("\r"); // Move cursor to beginning of line
    return terminal.buffer.active.cursorY;
  }, []);

  const writeSuggestion = useCallback(
    (terminal: XTerm, suggestion: string, currentInput: string) => {
      if (suggestion && suggestion.startsWith(currentInput)) {
        const remainingText = suggestion.slice(currentInput.length);
        terminal.write(`\x1B[90m${remainingText}\x1B[0m`); // Grey color for suggestion
        terminal.write("\x1b[" + remainingText.length + "D"); // Move cursor back
      }
    },
    []
  );

  const writePrompt = useCallback(
    (terminal: XTerm) => {
      // Format the prompt like a real terminal with username and current directory
      const prompt = isMobile
        ? `\x1B[1;32miman:\x1B[0m\x1B[1;34m${currentDirectory}\x1B[0m$ `
        : `\x1B[1;32miman@portfolio:\x1B[0m\x1B[1;34m${currentDirectory}\x1B[0m$ `;
      terminal.write("\r"); // Move to start of line
      terminal.write(prompt);
      return prompt;
    },
    [currentDirectory, isMobile]
  );

  // Handle touch gestures for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };

      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = touchEnd.y - touchStartRef.current.y;

      // Horizontal swipe - left to right (back to home)
      if (Math.abs(deltaX) > 100 && Math.abs(deltaY) < 50 && deltaX > 0) {
        onCommand("cd ~");
      }

      // Horizontal swipe - right to left (clear)
      if (Math.abs(deltaX) > 100 && Math.abs(deltaY) < 50 && deltaX < 0) {
        onCommand("clear");
      }

      touchStartRef.current = null;
    },
    [onCommand]
  );

  // Initialize terminal only after the component is mounted
  useEffect(() => {
    if (!mounted || !terminalRef.current) return;

    // Create a new terminal instance
    const terminal = new XTerm({
      cursorBlink: true,
      fontSize: isMobile ? 14 : 16, // Smaller font for mobile
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: "#000000",
        foreground: "#ffffff",
        cursor: "#87CEEB",
        selectionBackground: "#4169E1",
        black: "#000000",
        red: "#E06C75",
        green: "#98C379",
        yellow: "#E5C07B",
        blue: "#61AFEF",
        magenta: "#C678DD",
        cyan: "#56B6C2",
        white: "#ABB2BF",
        brightBlack: "#5C6370",
        brightRed: "#E06C75",
        brightGreen: "#98C379",
        brightYellow: "#E5C07B",
        brightBlue: "#61AFEF",
        brightMagenta: "#C678DD",
        brightCyan: "#56B6C2",
        brightWhite: "#FFFFFF",
      },
      lineHeight: 1.2,
      convertEol: true, // Add this to ensure consistent line endings
      cursorStyle: "block",
      scrollback: 1000, // Increase scrollback for better mobile experience
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    // Store references for later use
    xtermRef.current = terminal;
    fitAddonRef.current = fitAddon;

    // Try catch to handle any potential errors
    try {
      terminal.open(terminalRef.current);
      fitAddon.fit();

      // Write header
      writeHeader(terminal);

      // Display welcome message
      terminal.writeln(
        "Type 'help' to see available commands. Use 'ls' to list files and 'cd' to navigate directories.\n"
      );

      // Set prompt
      writePrompt(terminal);

      // Add touch event listeners for mobile gestures
      if (terminalRef.current) {
        terminalRef.current.addEventListener("touchstart", handleTouchStart);
        terminalRef.current.addEventListener("touchend", handleTouchEnd);
      }

      // Handle user input - only active on desktop, disabled on mobile
      if (!isMobile) {
        terminal.onData((data) => {
          const char = data;

          if (char === "\r") {
            // Enter
            const command =
              suggestionRef.current || commandBufferRef.current.trim();
            terminal.write("\r\n");

            if (command) {
              commandHistoryRef.current.push(command);
              historyIndexRef.current = commandHistoryRef.current.length;

              const result = onCommand(command);
              if (result && typeof result === "object") {
                if ("clear" in result && result.clear) {
                  terminal.clear();
                  writeHeader(terminal);
                } else if ("output" in result) {
                  terminal.write("\r"); // Move to start of line
                  terminal.writeln(result.output);
                }
              }
            }

            commandBufferRef.current = "";
            suggestionRef.current = "";
            writePrompt(terminal);
          } else if (char === "\u007F") {
            // Backspace
            if (commandBufferRef.current.length > 0) {
              commandBufferRef.current = commandBufferRef.current.slice(0, -1);
              clearLine(terminal);
              writePrompt(terminal);
              terminal.write(commandBufferRef.current);

              // Show suggestion after backspace
              const matches = findMatchingCommands(commandBufferRef.current);
              if (matches.length > 0) {
                suggestionRef.current = matches[0];
                writeSuggestion(
                  terminal,
                  suggestionRef.current,
                  commandBufferRef.current
                );
              } else {
                suggestionRef.current = "";
              }
            }
          } else if (char === "\t") {
            // Tab
            if (suggestionRef.current) {
              clearLine(terminal);
              writePrompt(terminal);
              commandBufferRef.current = suggestionRef.current;
              terminal.write(commandBufferRef.current);
            }
          } else if (data === "\u001b[A") {
            // Up arrow
            if (historyIndexRef.current > 0) {
              clearLine(terminal);
              writePrompt(terminal);
              historyIndexRef.current--;
              commandBufferRef.current =
                commandHistoryRef.current[historyIndexRef.current];
              terminal.write(commandBufferRef.current);
            }
          } else if (data === "\u001b[B") {
            // Down arrow
            clearLine(terminal);
            writePrompt(terminal);
            if (
              historyIndexRef.current <
              commandHistoryRef.current.length - 1
            ) {
              historyIndexRef.current++;
              commandBufferRef.current =
                commandHistoryRef.current[historyIndexRef.current];
              terminal.write(commandBufferRef.current);
            } else {
              historyIndexRef.current = commandHistoryRef.current.length;
              commandBufferRef.current = "";
            }
          } else if (char.length === 1 && char >= " ") {
            // Printable characters
            commandBufferRef.current += char;
            clearLine(terminal);
            writePrompt(terminal);
            terminal.write(commandBufferRef.current);

            // Show suggestion
            const matches = findMatchingCommands(commandBufferRef.current);
            if (matches.length > 0) {
              suggestionRef.current = matches[0];
              writeSuggestion(
                terminal,
                suggestionRef.current,
                commandBufferRef.current
              );
            } else {
              suggestionRef.current = "";
            }
          }
        });
      }

      // Add window resize listener to refit terminal
      const handleResize = () => {
        if (fitAddonRef.current) {
          fitAddonRef.current.fit();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        if (terminalRef.current) {
          terminalRef.current.removeEventListener(
            "touchstart",
            handleTouchStart
          );
          terminalRef.current.removeEventListener("touchend", handleTouchEnd);
        }
        window.removeEventListener("resize", handleResize);
        terminal.dispose();
      };
    } catch (error) {
      console.error("Error initializing terminal:", error);
      // Clean up if there's an error
      terminal.dispose();
    }
  }, [
    mounted,
    currentDirectory,
    onCommand,
    writePrompt,
    writeHeader,
    clearLine,
    writeSuggestion,
    isMobile,
    handleTouchEnd,
    handleTouchStart,
  ]);

  // Update terminal prompt when directory changes or terminal is remounted
  useEffect(() => {
    if (mounted && xtermRef.current && !isMobile) {
      xtermRef.current.focus();
      try {
        writePrompt(xtermRef.current);
      } catch (e) {
        console.error("Error updating prompt:", e);
      }
    }
  }, [writePrompt, isMobile, currentDirectory, mounted]);

  return (
    <div
      ref={terminalRef}
      style={{
        height: isMobile ? "calc(100% - 80px)" : "100%",
        overflowY: "auto",
        paddingBottom: isMobile ? "80px" : "0",
      }}
    />
  );
}
