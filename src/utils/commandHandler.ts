import parseCommand from "./commandParser";
import { AppState, CommandResult } from "@/types";

const commandHandler = (
    input: string,
    state: AppState,
    setState: React.Dispatch<React.SetStateAction<AppState>>
): string | CommandResult => {
    const { command, args } = parseCommand(input);

    switch (command) {
        case 'help':
            return getHelpText();
        case 'git':
            return handleGitCommand(args, state, setState);
        case 'ls':
            return handleLsCommand(state);
        case 'cat':
            return handleCatCommand(args, state);
        case 'clear':
            return { clear: true };
        default: 
            return `Command not found: ${command}. Type 'help' to see available commands.`;
    }
};

const getHelpText = (): string => {
    return `
    Available commands:
        help                    - Show this help menu
        git checkout [branch]   - Switch to a different branch
        git branch              - List all available branches
        ls                      - List files in current branch
        cat [filename]          - Display file contents
        clear                   - Clear the terminal
    `;
};

const handleGitCommand = (
    args: string[],
    state: AppState,
    setState: React.Dispatch<React.SetStateAction<AppState>>
): string => {
    if (!args.length) return "Usage: git [command]";

    switch (args[0]) {
        case 'branch':
            return `Available branches:
        *   ${state.currentBranch}
            ${state.branches.filter(b => b !== state.currentBranch).join('\n  ')}`;

        case 'checkout':
            if (!args[1]) return "Usage: git checkout [branch]";
            if (!state.branches.includes(args[1])) {
                return `Branch '${args[1]}' not found.`;
            }
            setState({...state, currentBranch: args[1]});
            return `Switched to branch '${args[1]}'`;

        default:
            return `Git command not supported: ${args[0]}`;
    }
};

interface FileMap {
    [key: string]: string[];
}

interface ContentMap {
    [key: string]: {
        [key: string]: string;
    };
}

const handleLsCommand = (state: AppState): string => {
    // Return different files based on current branch
    const files: FileMap = {
        main: ['about.md', 'contact.md', 'skills.md'],
        projects: ['project-list.md', 'featured.md'],
        blog: ['posts.md', 'topics.md'],
    };

    return files[state.currentBranch]?.join('\n') || 'No files found.';
};

const handleCatCommand = (args: string[], state: AppState): string => {
    if (!args.length) return "Usage: cat [filename]";

    // Simple content mapping
    const content: ContentMap = {
        'main': {
          'about.md': `# About Me\n\nHi, I'm [Your Name]!\n\nI'm a full-stack developer specialized in building interactive web applications.\nMy core technologies include JavaScript, React, Node.js, and Python.`,
          'skills.md': `# Skills\n\n- Frontend: React, Vue, Angular\n- Backend: Node.js, Express, Django\n- Database: MongoDB, PostgreSQL\n- DevOps: Docker, AWS`,
          'contact.md': `# Contact\n\nEmail: your.email@example.com\nLocation: Your City, Country`
        },
        'projects': {
          'project-list.md': `# Projects\n\n1. Project One\n2. Project Two\n3. Project Three`,
          'featured.md': `# Featured Project\n\nCLI Portfolio - An interactive command-line based portfolio`
        },
        'blog': {
          'posts.md': `# Recent Posts\n\n- Building a CLI Portfolio\n- React Best Practices\n- JavaScript Tips and Tricks`,
          'topics.md': `# Topics\n\n- Web Development\n- UI/UX Design\n- Programming Tips`
        }
    };

    return content[state.currentBranch]?.[args[0]] || `File '${args[0]}' not found.`;
};

export default commandHandler;