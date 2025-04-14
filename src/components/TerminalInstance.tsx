"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { TerminalProps } from "@/types/terminal";
import { AVAILABLE_COMMANDS } from "@/types";

export default function TerminalInstance({
  onCommand,
  currentBranch,
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const commandBufferRef = useRef("");
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const suggestionRef = useRef("");
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check device type
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const findMatchingCommands = (partial: string): string[] => {
    if (!partial) return [];
    return AVAILABLE_COMMANDS.filter((cmd) =>
      cmd.toLowerCase().startsWith(partial.toLowerCase())
    );
  };

  const writeHeader = (terminal: XTerm) => {
    // Smaller header for mobile
    if (isMobile) {
      terminal.writeln("\x1B[1;35m╔═════════════════════════════════╗");
      terminal.writeln("║       (: IMAN MOKUA :)        ║");
      terminal.writeln("╚═════════════════════════════════╝\x1B[0m\n");
    } else {
      terminal.writeln(
        "\x1B[1;35m╔════════════════════════════════════════════════════════════╗"
      );
      terminal.writeln(
        "║                  (: IMAN MOKUA PORTFOLIO :)                ║"
      );
      terminal.writeln(
        "╚════════════════════════════════════════════════════════════╝\x1B[0m\n"
      );
    }
  };

  const clearLine = (terminal: XTerm) => {
    const currentLine = terminal.buffer.active.cursorY;
    terminal.write("\x1b[2K"); // Clear entire line
    terminal.write("\r"); // Move cursor to beginning of line
    return currentLine;
  };

  const writeSuggestion = (
    terminal: XTerm,
    suggestion: string,
    currentInput: string
  ) => {
    if (suggestion && suggestion.startsWith(currentInput)) {
      const remainingText = suggestion.slice(currentInput.length);
      terminal.write(`\x1B[90m${remainingText}\x1B[0m`); // Grey color for suggestion
      terminal.write("\x1b[" + remainingText.length + "D"); // Move cursor back
    }
  };

  const writePrompt = useCallback(
    (terminal: XTerm) => {
      // Shorter prompt for mobile
      const prompt = isMobile
        ? `\x1B[1;32m$\x1B[0m `
        : `\x1B[1;32mimanmokua@portfolio:~/${currentBranch}$\x1B[0m `;
      terminal.write("\r"); // Move to start of line
      terminal.write(prompt);
      return prompt;
    },
    [currentBranch, isMobile]
  );

  // Handle touch gestures for mobile
  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchEnd.x - touchStartRef.current.x;
    const deltaY = touchEnd.y - touchStartRef.current.y;

    // Horizontal swipe - left to right (back to main)
    if (Math.abs(deltaX) > 100 && Math.abs(deltaY) < 50 && deltaX > 0) {
      onCommand("git checkout main");
    }

    // Horizontal swipe - right to left (clear)
    if (Math.abs(deltaX) > 100 && Math.abs(deltaY) < 50 && deltaX < 0) {
      onCommand("clear");
    }

    touchStartRef.current = null;
  };

  useEffect(() => {
    if (!terminalRef.current) return;

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

    terminal.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = terminal;

    // Write header
    writeHeader(terminal);

    // Display welcome message - smaller for mobile
    if (isMobile) {
      terminal.writeln("\x1B[1;34mIman Mokua | Portfolio\x1B[0m\n");
    } else {
      terminal.writeln(
        "\x1B[1;34m    ___                         __  __       _"
      );
      terminal.writeln(
        "   |_ _|_ __ ___   __ _ _ __   |  \\/  | ___ | | ___   _  __ _"
      );
      terminal.writeln(
        "    | || '_ ` _ \\ / _` | '_ \\  | |\\/| |/ _ \\| |/ / | | |/ _` |"
      );
      terminal.writeln(
        "    | || | | | | | (_| | | | | | |  | | (_) |   <| |_| | (_| |"
      );
      terminal.writeln(
        "   |___|_| |_| |_|\\__,_|_| |_| |_|  |_|\\___/|_|\\_\\\\__,_|\\__,_|\x1B[0m\n"
      );
    }
    terminal.writeln(
      "All Ye are welcome! Type 'help' to see available commands.\n"
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
          if (historyIndexRef.current < commandHistoryRef.current.length - 1) {
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
      fitAddon.fit();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (terminalRef.current) {
        terminalRef.current.removeEventListener("touchstart", handleTouchStart);
        terminalRef.current.removeEventListener("touchend", handleTouchEnd);
      }
      window.removeEventListener("resize", handleResize);
      terminal.dispose();
    };
  }, [currentBranch, onCommand, writePrompt, isMobile]);

  useEffect(() => {
    if (xtermRef.current && !isMobile) {
      xtermRef.current.focus();
      writePrompt(xtermRef.current);
    }
  }, [writePrompt, isMobile]);

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
