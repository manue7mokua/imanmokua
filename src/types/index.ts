export interface CommandResult {
  output: string;
  newBranch?: string;
  clear?: boolean;
}

export interface AppState {
  currentBranch: string;
  branches: string[];
  currentFiles: string[];
  commandHistory: string[];
  historyIndex: number;
  files: Record<string, Record<string, string>>;
}

export interface TerminalProps {
  onCommand: (command: string) => void;
  currentBranch: string;
}

export const AVAILABLE_COMMANDS = [
  "help",
  "ls",
  "clear",
  "git branch",
  "git checkout main",
  "git checkout projects",
  "git checkout projects/pinned",
  "git checkout projects/all-repos",
  "git checkout blog",
  "git checkout hackathons",
  "goback",
  "social github",
  "social linkedin",
  "social x",
  "social instagram",
  "open HDL_Alien_Shooter",
  "open roids",
  "open SSG",
  "open FinMe",
  "open imanmokua",
  "open Enclave",
  "open dabble",
  "cat google-hbcu.md",
  "cat HDL_Alien_Shooter.md",
  "cat roids.md",
  "cat SSG.md",
  "cat FinMe.md",
  "cat bison-bytes.md",
];
