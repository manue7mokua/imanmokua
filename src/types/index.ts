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