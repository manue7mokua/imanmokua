import { CommandResult } from "./index";

export interface TerminalProps {
  onCommand: (command: string) => any;
  currentDirectory: string;
}

export interface TerminalInstanceProps extends TerminalProps {
  // Add any additional props specific to TerminalInstance
}
