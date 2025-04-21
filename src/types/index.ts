export interface CommandResult {
  output: string;
  newDirectory?: string;
  clear?: boolean;
}

export interface AppState {
  currentDirectory: string;
  directories: string[];
  currentFiles: string[];
  commandHistory: string[];
  historyIndex: number;
  files: Record<string, Record<string, string>>;
}

export interface TerminalProps {
  onCommand: (command: string) => CommandResult;
  currentDirectory: string;
}

export const AVAILABLE_COMMANDS = [
  "go back home",
  "help",
  "pwd",
  "ls",
  "cd ~",
  "cd ~/projects",
  "cd ~/projects/pinned",
  "cd ~/projects/all-repos",
  "cd ~/hackathons",
  "cd ..",
  "clear",
  "cat welcome.md",
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
  "cat bison-hacks.md",
  "cat black-blockchain.md",
  "cat google-hbcu.md",
  "cat bison-bytes.md",
  "cat HDL_Alien_Shooter.md",
  "cat roids.md",
  "cat SSG.md",
  "cat FinMe.md",
  "cat repositories.md",
];
