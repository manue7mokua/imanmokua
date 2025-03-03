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
        case 'social':
            return handleSocialCommand(args);
        case 'open':
            return handleOpenCommand(args);
        case 'theme':
            if (!args.length) return "Usage: theme [dark|light|hacker|retro]";

            switch (args[0].toLowerCase()) {
                case 'dark':
                case 'light':
                case 'hacker':
                case 'retro':
                    return { theme: args[0].toLowerCase() };
                default:
                    return `Theme '${args[0]}' not found. Available themes: dark, light, hacker, retro`;
            }
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
        social [platform]       - Open social media profile 
        open [project]          - Open project in a new tab
        clear                   - Clear the terminal

    Available branches:
        main                    - About me, skills, and contact info
        projects                - Portfolio of my technical projects
        blog                    - Blog posts and professional experience
        awards                  - Awards, hackathons, pitch competitions etc.
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
        main: ['about.md', 'skills.md', 'contact.md'],
        projects: ['project-list.md', 'voxgen.md', 'alien-shooter.md', 'beatz.md'],
        blog: ['posts.md', 'experience.md'],
        awards: ['awards.md']
    };

    return files[state.currentBranch]?.join('\n') || 'No files found.';
};

const handleCatCommand = (args: string[], state: AppState): string => {
    if (!args.length) return "Usage: cat [filename]";

    const content: ContentMap = {
        'main': {
          'about.md': `# About Me\n\nHi, I'm Emmanuel Mokua!\n\nI'm a Computer Engineering student at Howard University with a minor in Computer Science. I'm skilled in developing interactive web applications, machine learning models, and low-level system design.\n\nMy core technologies include Python, Go, JavaScript/TypeScript, React, and Cloud services.`,
          
          'skills.md': `# Skills\n\n## Languages\n- Python\n- Go\n- JavaScript/TypeScript\n- C++\n- SQL\n\n## Frameworks/Libraries\n- React\n- Flask\n- FastAPI\n- TensorFlow\n- Pandas\n\n## Tools\n- Git\n- Docker\n- AWS\n- Google Cloud Platform`,
          
          'contact.md': `# Contact\n\n- Email: emmanuel.mokua@bison.howard.edu\n- Phone: 919-349-1457\n- Location: Washington, DC`
        },
        'projects': {
          'project-list.md': `# Projects\n\n1. vOXgen - Carbon footprint prediction using ML\n2. Low-Level Alien Shooter - VHDL game implementation\n3. Beatz - Music recommendation with mood classification\n4. CLI Portfolio - Interactive command-line based portfolio`,
          
          'voxgen.md': `# vOXgen\n\n## November 2024\n\n- Leveraged OpenAI's GPT-4 for NLP to extract key regulatory phrases\n- Implemented a weighted scoring system with cosine similarity and semantic embeddings\n- Built a linear regression model to predict carbon footprint estimates\n- Mean prediction error under 5% using Climatiq API data\n\n**Technologies:** Python, Pandas, ScikitLearn, MongoDB, Git`,
          
          'alien-shooter.md': `# Low-Level Alien Shooter\n\n## March 2024 - April 2024\n\n- Designed Finite State Machines to control state-based behaviors\n- Utilized Vivado Design Suite for VHDL coding, simulation, and synthesis\n- Optimized resource allocation to reduce logic resource usage by 15%\n- Designed a VGA controller for 640x480 resolution visuals\n\n**Technologies:** VHDL, Vivado, Git`,
          
          'beatz.md': `# Beatz\n\n## January 2024\n\n- Enhanced mood classification accuracy by 25% with Gemini API\n- Refined sentiment parameters for improved emotional categorization\n- Implemented an LRU caching strategy for repeated song suggestions\n- Achieved consistent playlist creation times under 30 seconds\n\n**Technologies:** Python, Swift, TensorFlow\n**Award:** 1st Place at Google HBCU Hackathon`
        },
        'blog': {
          'posts.md': `# Recent Posts\n\n- My Internship Experience at Meta\n- Building Hardware Games with VHDL\n- Using Machine Learning for Environmental Impact`,
          'experience.md': `# Professional Experience\n\n## Meta Platforms, Inc.\n**Software Engineering Intern** | June 2024 – August 2024\n\n- Implemented dynamic logistic regression models using SGD\n- Improved data retrieval speed by 1.5x through schema optimization\n- Implemented model checkpointing for session persistence\n\n## Howard University\n**Undergraduate Research Assistant** | October 2023 - Current\n\n- Customized network settings for multi-carrier transmission and MIMO\n- Designed RF signal processing chains in GRC\n- Improved simulation fidelity by 30%`
        },
        'awards': {
          'awards.md': `# Awards & Leadership\n\n## Awards\n- 1st Place: Google HBCU Hackathon\n- 1st Place: Black Blockchain Summit Hackathon\n- 1st Place: PNC x Howard Pitch Competition\n\n## Scholarships\n- Amazon–Codepath Scholar (2x)\n- HU Capstone Scholarship\n\n## Organizations\n- ColorStack\n- PNC Prime Incubator Program\n- Howard University Robotics Organization\n- Howard University Entrepreneurial Society\n- National Society of Black Engineers`
        }
      };

    return content[state.currentBranch]?.[args[0]] || `File '${args[0]}' not found.`;
};

const handleSocialCommand = (args: string[]): string => {
    if (!args.length) return "Usage: social [platform] \n Available platforms: linkedin, github, instagram, twitter";

    switch (args[0].toLowerCase()) {
        case 'linkedin':
            if (typeof window !== 'undefined') {
                window.open('https://www.linkedin.com/in/mokua-emmanuel-43b798269/', '_blank');
            }
            return "Opening LinkedIn profile...";
        case 'github':
            if (typeof window !== 'undefined') {
                window.open('https://github.com/manue7mokua', '_blank');
            }
            return "Opening Github profile";
        case 'instagram':
            if (typeof window !== 'undefined') {
                window.open('https://www.instagram.com/imanmokua/', '_blank');
            }
            return "Opening Github profile";
        case 'x':
            if (typeof window !== 'undefined') {
                window.open('https://x.com/imanmokua', '_blank');
            }
            return "Opening Github profile";
        default:
            return `Platform '${args[0]}' not found. Available platforms: linkedin, github, instagram, twitter`;
    }
};

const handleOpenCommand = (args: string[]): string => {
    if (!args.length) return "Usage: open [project]";

    const projects: Record<string, string> = {
        'portfolio': 'https://github.com/manue7mokua/imanmokua',
        'alien-shooter': 'https://github.com/manue7mokua/Final_Project_AdvDigSys',
        'ssg': 'https://github.com/manue7mokua/SSG',
        'finme': 'https://github.com/manue7mokua/FinMe'
    };

    const projectKey = args.join('-').toLowerCase();

    if (projects[projectKey]) {
        if (typeof window !== 'undefined') {
            window.open(projects[projectKey], '_blank');    
        }
        return `Opening ${args.join(' ')} project on github...`;
    }

    return `Project '${args.join(' ')}' not found.`;
}

export default commandHandler;