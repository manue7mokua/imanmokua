import { AppState, CommandResult } from "@/types";

const commandHandler = (input: string, state: AppState): CommandResult => {
  const [command, ...args] = input.trim().split(/\s+/);

  switch (command.toLowerCase()) {
    case "help":
      return {
        output: `\x1B[1;35m╔══════════════════════════════════════════════════════════════╗
║                      Available Commands                      ║
╚══════════════════════════════════════════════════════════════╝\x1B[0m

\x1B[1;36mNavigation Commands:\x1B[0m
  go back home          - Return to the homepage
  pwd                   - Show current directory
  ls                    - List files in current directory
  cd [path]             - Change directory (cd .. to go up one level)
  cat [filename]        - View the contents of a file
  clear                 - Clear the terminal screen

\x1B[1;36mDirectory Structure:\x1B[0m
  ~/                    - Home directory with welcome and info
  ~/projects/          - My GitHub projects
    ├── pinned/        - Featured projects with details
    └── all-repos/     - Complete list of repositories
  ~/hackathons/        - Hackathon projects and achievements

\x1B[1;36mSocial & Links:\x1B[0m
  social [platform]     - Open my social media profiles
    Available platforms: github, linkedin, x, instagram
  
  open [project]        - Open project repository
    Available projects: dogbed_db, HDL_Alien_Shooter, SSG, FinMe

\x1B[1;36mTips:\x1B[0m
  - Use Tab for command autocomplete
  - Use Up/Down arrows to navigate command history
  - Type 'clear' to clean the terminal screen`,
      };

    case "pwd":
      return {
        output: state.currentDirectory,
      };

    case "cd":
      return handleCdCommand(args, state);

    case "ls":
      if (state.currentDirectory === "~/projects") {
        return {
          output: "\x1B[1;36mDirectories:\x1B[0m\n  pinned/\n  all-repos/",
        };
      }

      // Get max filename length for padding
      const maxLength = Math.max(
        ...state.currentFiles.map((file) => file.length)
      );

      return {
        output: state.currentFiles
          .map((file) => {
            const content = state.files[state.currentDirectory]?.[file];
            const firstLine = content?.split("\n")[0] || "";
            const title = firstLine.replace("# ", "");
            // Pad the filename to align descriptions
            const paddedFile = file.padEnd(maxLength);
            return `\x1B[1;36m${paddedFile}\x1B[0m - ${title}`;
          })
          .join("\n"),
      };

    case "cat":
      return handleCatCommand(args, state);

    case "clear":
      return {
        output: "",
        clear: true,
      };

    case "go":
      if (args.join(" ") === "back home") {
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return {
          output: `\x1B[1;32mNavigating back to homepage...\x1B[0m`,
        };
      }
      return {
        output: `\x1B[1;31mUnknown command: go ${args.join(
          " "
        )}. Did you mean 'go back home'?\x1B[0m`,
      };

    case "social":
      return handleSocialCommand(args);

    case "open":
      return handleOpenCommand(args);

    default:
      return {
        output: `\x1B[1;31mCommand not found: ${command}. Type 'help' for available commands.\x1B[0m`,
      };
  }
};

const handleCdCommand = (args: string[], state: AppState): CommandResult => {
  if (!args.length) {
    // Default to home directory if no argument is provided
    return {
      output: `\x1B[1;32mChanged to home directory\x1B[0m`,
      newDirectory: "~",
    };
  }

  let targetDir = args[0];

  // Handle "cd .." (go up one directory)
  if (targetDir === "..") {
    if (state.currentDirectory === "~") {
      return {
        output: `\x1B[1;33mAlready at home directory\x1B[0m`,
      };
    }

    const dirs = state.currentDirectory.split("/");
    dirs.pop();
    targetDir = dirs.join("/") || "~";

    return {
      output: `\x1B[1;32mChanged to ${targetDir}\x1B[0m`,
      newDirectory: targetDir,
    };
  }

  // Handle absolute paths (starting with ~)
  if (!targetDir.startsWith("~")) {
    // Relative path - prepend current directory
    if (state.currentDirectory === "~") {
      targetDir = `~/${targetDir}`;
    } else {
      targetDir = `${state.currentDirectory}/${targetDir}`;
    }
  }

  // Clean up double slashes
  targetDir = targetDir.replace(/\/+/g, "/");

  // Check if the directory exists
  if (!state.directories.includes(targetDir)) {
    return {
      output: `\x1B[1;31mDirectory not found: ${targetDir}\x1B[0m`,
    };
  }

  return {
    output: `\x1B[1;32mChanged to ${targetDir}\x1B[0m`,
    newDirectory: targetDir,
  };
};

const handleCatCommand = (args: string[], state: AppState): CommandResult => {
  if (!args.length) return { output: "Usage: cat [filename]" };

  const fileName = args[0];
  const fileContent = state.files[state.currentDirectory]?.[fileName];

  if (!fileContent) {
    return { output: `\x1B[1;31mFile '${fileName}' not found.\x1B[0m` };
  }

  // Process markdown-style content
  const lines = fileContent.split("\n").filter((line) => line.trim() !== "");
  let formattedContent = "";
  let inList = false;
  let previousWasHeader = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("# ")) {
      // H1 headers
      formattedContent += `\x1B[1;35m${line.substring(2).trim()}\x1B[0m\n`;
      previousWasHeader = true;
    } else if (line.startsWith("## ")) {
      // H2 headers
      if (formattedContent !== "" && !previousWasHeader) {
        formattedContent += "\n";
      }
      formattedContent += `\x1B[1;36m${line.substring(3).trim()}\x1B[0m\n`;
      previousWasHeader = true;
    } else if (line.startsWith("- ")) {
      // List items
      if (!inList && !previousWasHeader) {
        formattedContent += "\n";
      }
      formattedContent += `  ${line}\n`;
      inList = true;
      previousWasHeader = false;
    } else if (line.includes("\x1B[36m")) {
      // Role and date line
      formattedContent += `${line}\n`;
      inList = false;
      previousWasHeader = false;
    } else {
      // Regular text
      if (!previousWasHeader) {
        formattedContent += "\n";
      }
      formattedContent += `${line}\n`;
      inList = false;
      previousWasHeader = false;
    }
  }

  return {
    output: formattedContent.trim(),
  };
};

const handleSocialCommand = (args: string[]): CommandResult => {
  if (!args.length) {
    return {
      output: `\x1B[1;35mAvailable platforms:\x1B[0m
  \x1B[1;36mgithub\x1B[0m    - View GitHub profile
  \x1B[1;36mlinkedin\x1B[0m  - View LinkedIn profile
  \x1B[1;36mx\x1B[0m        - View X/Twitter profile
  \x1B[1;36minstagram\x1B[0m - View Instagram profile
\x1B[0mUsage: social [platform]`,
    };
  }

  const platform = args[0].toLowerCase();
  const urls: Record<string, string> = {
    github: "https://github.com/manue7mokua",
    linkedin: "https://www.linkedin.com/in/mokua-emmanuel-43b798269/",
    x: "https://x.com/imanmokua",
    instagram: "https://www.instagram.com/imanmokua/",
  };

  if (urls[platform]) {
    if (typeof window !== "undefined") {
      window.open(urls[platform], "_blank");
    }
    return { output: `\x1B[1;32mOpening ${platform} profile...\x1B[0m` };
  }

  return { output: `\x1B[1;31mPlatform '${platform}' not found.\x1B[0m` };
};

const handleOpenCommand = (args: string[]): CommandResult => {
  if (!args.length) {
    return {
      output: `\x1B[1;35mAvailable projects:\x1B[0m
  \x1B[1;36mdogbed_db\x1B[0m       - A simple key-value database
  \x1B[1;36mHDL_Alien_Shooter\x1B[0m - Space Invaders in VHDL
  \x1B[1;36mSSG\x1B[0m             - Lightweight static site generator
  \x1B[1;36mFinMe\x1B[0m           - Automate DCA investing for students
  \x1B[1;36mimanmokua\x1B[0m       - CLI Portfolio
  \x1B[1;36mEnclave\x1B[0m         - Event QR code tracking
  \x1B[1;36mdabble\x1B[0m          - P2P college video chat
\x1B[0mUsage: open [project]`,
    };
  }

  const project = args.join("-");
  const projects: Record<string, string> = {
    dogbed_db: "https://github.com/manue7mokua/dogbed_db",
    HDL_Alien_Shooter: "https://github.com/manue7mokua/HDL_Alien_Shooter",
    SSG: "https://github.com/manue7mokua/SSG",
    FinMe: "https://github.com/manue7mokua/FinMe",
    imanmokua: "https://github.com/manue7mokua/imanmokua",
    dabble: "https://github.com/Mikito-Coder/bomegleclone",
  };

  // Case-insensitive matching
  const projectKey = Object.keys(projects).find(
    (key) => key.toLowerCase() === project.toLowerCase()
  );

  if (projectKey && projects[projectKey]) {
    if (typeof window !== "undefined") {
      window.open(projects[projectKey], "_blank");
    }
    return {
      output: `\x1B[1;32mOpening ${projectKey} project in new tab...\x1B[0m`,
    };
  }

  return { output: `\x1B[1;31mProject '${project}' not found.\x1B[0m` };
};

export default commandHandler;
