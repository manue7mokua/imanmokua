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
  "git branch",
  "git checkout main",
  "git checkout projects",
  "git checkout blog",
  "git checkout hackathons",
  "ls",
  "cat about.md",
  "cat experience.md",
  "cat education.md",
  "cat HDL_Alien_Shooter.md",
  "cat roids.md",
  "cat SSG.md",
  "cat FinMe.md",
  "cat repositories.md",
  "cat coming-soon.md",
  "cat bison-hacks.md",
  "cat bison-bytes.md",
  "cat black-blockchain.md",
  "cat google-hbcu.md",
  "social linkedin",
  "social github",
  "social instagram",
  "social x",
  "open HDL_Alien_Shooter",
  "open roids",
  "open SSG",
  "open FinMe",
  "open imanmokua",
  "open Enclave",
  "open dabble",
  "clear",
  "goback",
];
