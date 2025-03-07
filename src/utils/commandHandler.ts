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
  ls                     - List files in current branch
  cat [filename]         - View the contents of a file
  git branch            - Show all available branches
  git checkout [branch] - Switch to a different branch
  goback                - Return to parent branch (from nested branches)
  clear                 - Clear the terminal screen

\x1B[1;36mBranch Structure:\x1B[0m
  main/                 - About me, education, and experience
  projects/            - My GitHub projects
    ├── pinned/       - Featured projects with details
    └── all-repos/    - Complete list of repositories
  blog/                - Tech blog posts (coming soon)
  hackathons/          - Hackathon projects and achievements

\x1B[1;36mSocial & Links:\x1B[0m
  social [platform]     - Open my social media profiles
    Available platforms: github, linkedin, x, instagram
  
  open [project]       - Open project repository
    Available projects: portfolio, alien-shooter, voxgen

\x1B[1;36mTips:\x1B[0m
  - Use Tab for command autocomplete
  - Use Up/Down arrows to navigate command history
  - Type 'clear' to clean the terminal screen`,
      };

    case "git":
      return handleGitCommand(args, state);

    case "ls":
      if (state.currentBranch === "projects") {
        return {
          output: "\x1B[1;36mBranches:\x1B[0m\n  pinned/\n  all-repos/",
        };
      }

      // Get max filename length for padding
      const maxLength = Math.max(
        ...state.currentFiles.map((file) => file.length)
      );

      return {
        output: state.currentFiles
          .map((file) => {
            const content = state.files[state.currentBranch]?.[file];
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

    case "goback":
      if (state.currentBranch.includes("/")) {
        const parentBranch = state.currentBranch.split("/")[0];
        return {
          output: `\x1B[1;32mReturned to ${parentBranch} branch\x1B[0m`,
          newBranch: parentBranch,
        };
      }
      return {
        output: "\x1B[1;33mAlready at root branch\x1B[0m",
      };

    case "social":
      return handleSocialCommand(args);

    case "open":
      return handleOpenCommand(args);

    case "branch":
      const branchList = state.branches.map((branch) =>
        branch === state.currentBranch
          ? `* \x1B[1;32m${branch}\x1B[0m`
          : `  ${branch}`
      );

      if (state.currentBranch === "projects") {
        branchList.push("  pinned/");
        branchList.push("  all-repos/");
      }

      return {
        output: branchList.join("\n"),
      };

    default:
      return {
        output: `\x1B[1;31mCommand not found: ${command}. Type 'help' for available commands.\x1B[0m`,
      };
  }
};

const handleGitCommand = (args: string[], state: AppState): CommandResult => {
  if (!args.length) return { output: "Usage: git [command]" };

  switch (args[0]) {
    case "checkout":
      if (!args[1]) return { output: "Usage: git checkout [branch]" };
      const targetBranch = args[1].toLowerCase();

      // Handle nested branches in projects
      if (targetBranch.startsWith("projects/")) {
        const nestedBranch = targetBranch.split("/")[1];
        if (nestedBranch === "pinned" || nestedBranch === "all-repos") {
          if (state.currentBranch !== "projects") {
            return {
              output: `\x1B[1;31mMust be in 'projects' branch to access ${nestedBranch}\x1B[0m`,
            };
          }
          return {
            output: `\x1B[1;32mSwitched to branch '${targetBranch}'\x1B[0m`,
            newBranch: targetBranch,
          };
        }
      } else if (targetBranch === "pinned" || targetBranch === "all-repos") {
        if (state.currentBranch !== "projects") {
          return {
            output: `\x1B[1;31mMust be in 'projects' branch to access ${targetBranch}\x1B[0m`,
          };
        }
        const fullBranch = `projects/${targetBranch}`;
        return {
          output: `\x1B[1;32mSwitched to branch '${fullBranch}'\x1B[0m`,
          newBranch: fullBranch,
        };
      }

      if (!state.branches.includes(targetBranch)) {
        return {
          output: `\x1B[1;31mBranch '${targetBranch}' not found.\x1B[0m`,
        };
      }

      return {
        output: `\x1B[1;32mSwitched to branch '${targetBranch}'\x1B[0m`,
        newBranch: targetBranch,
      };

    case "branch":
      const branchList = state.branches.map((branch) =>
        branch === state.currentBranch
          ? `* \x1B[1;32m${branch}\x1B[0m`
          : `  ${branch}`
      );

      if (state.currentBranch === "projects") {
        branchList.push("  pinned/");
        branchList.push("  all-repos/");
      }

      return {
        output: branchList.join("\n"),
      };

    default:
      return {
        output: `\x1B[1;31mGit command not supported: ${args[0]}\x1B[0m`,
      };
  }
};

const handleCatCommand = (args: string[], state: AppState): CommandResult => {
  if (!args.length) return { output: "Usage: cat [filename]" };

  const fileName = args[0];
  const fileContent = state.files[state.currentBranch]?.[fileName];

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
    const nextLine = (lines[i + 1] || "").trim();

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
  \x1B[1;36mHDL_Alien_Shooter\x1B[0m - VHDL-based retro shooting game
  \x1B[1;36mroids\x1B[0m           - Python asteroid shooter game
  \x1B[1;36mSSG\x1B[0m             - Static site generator
  \x1B[1;36mFinMe\x1B[0m           - Student finance tracker
  \x1B[1;36mimanmokua\x1B[0m       - CLI Portfolio
  \x1B[1;36mEnclave\x1B[0m         - Event QR code tracking
  \x1B[1;36mdabble\x1B[0m          - P2P college video chat
\x1B[0mUsage: open [project]`,
    };
  }

  const project = args.join("-");
  const projects: Record<string, string> = {
    HDL_Alien_Shooter: "https://github.com/manue7mokua/HDL_Alien_Shooter",
    roids: "https://github.com/manue7mokua/roids",
    SSG: "https://github.com/manue7mokua/SSG",
    FinMe: "https://github.com/manue7mokua/FinMe",
    imanmokua: "https://github.com/manue7mokua/imanmokua",
    Enclave: "https://github.com/Mikito-Coder/Enclave",
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
    return { output: `\x1B[1;32mOpening ${projectKey} project in new tab...\x1B[0m` };
  }

  return { output: `\x1B[1;31mProject '${project}' not found.\x1B[0m` };
};

export default commandHandler;
