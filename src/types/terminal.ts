import { CommandResult } from "./index";

export interface TerminalProps {
  onCommand: (command: string) => CommandResult;
  currentBranch: string;
}

export interface TerminalInstanceProps extends TerminalProps {
  // Add any additional props specific to TerminalInstance
}
