export interface CommandResult {
    clear?: boolean;
    output?: string;
}

export interface AppState {
    currentBranch: string;
    branches: string[];
}

export interface TerminalProps {
    onCommand: (command: string) => void;
    history?: string[];
    historyIndex?: number;
    setHistoryIndex?: (index: number) => void;
    commandOutput?: string[];
}

export const AVAILABLE_COMMANDS = [
    'help',
    'git branch',
    'git checkout main',
    'git checkout projects',
    'git checkout blog',
    'git checkout awards',
    'ls',
    'cat',
    'social linkedin',
    'social github',
    'social instagram',
    'social x',
    'open',
    'clear'
];