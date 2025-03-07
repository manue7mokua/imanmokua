interface AppState {
    commandOutput: string[];
    commandHistory: string[];
    historyIndex: number;
    currentBranch: string;
    branches: string[];
    files: Record<string, Record<string, string>>; // Files by branch
  }
  
  interface CommandResult {
    output: string[];
    newState: Partial<AppState>;
  }
  
  export const parseCommand = (
    command: string,
    state: AppState
  ): CommandResult => {
    const [cmd, ...args] = command.trim().split(/\s+/);
    
    // Default result with no state changes
    const result: CommandResult = {
      output: [],
      newState: {},
    };
  
    switch (cmd.toLowerCase()) {
      case 'help':
        result.output = [
          'Available commands:',
          '  git checkout [branch] - Switch to another branch',
          '  git branch - List all branches',
          '  ls - List files in current branch',
          '  cat [file.md] - View the content of a file',
          '  social [platform] - View social media links',
          '  open [project] - Open a project in a new tab',
          '  help - Show this help message',
          '  clear - Clear the terminal screen',
        ];
        break;
  
      case 'clear':
        result.newState = { commandOutput: [] };
        break;
  
      case 'ls':
        const files = state.files[state.currentBranch];
        if (files) {
          result.output = Object.keys(files).map(file => `${file}`);
        } else {
          result.output = ['No files found in this branch'];
        }
        break;
  
      case 'cat':
        if (args.length === 0) {
          result.output = ['Usage: cat [file.md]'];
        } else {
          const fileName = args[0];
          const files = state.files[state.currentBranch];
          if (files && files[fileName]) {
            result.output = files[fileName].split('\n');
          } else {
            result.output = [`Error: ${fileName} not found`];
          }
        }
        break;
  
      case 'git':
        if (args[0] === 'branch') {
          result.output = state.branches.map(branch => {
            return branch === state.currentBranch ? `* ${branch}` : `  ${branch}`;
          });
        } else if (args[0] === 'checkout' && args[1]) {
          const targetBranch = args[1];
          if (state.branches.includes(targetBranch)) {
            result.newState = { currentBranch: targetBranch };
            result.output = [`Switched to branch '${targetBranch}'`];
          } else {
            result.output = [`Error: Branch '${targetBranch}' does not exist`];
          }
        } else {
          result.output = [
            'Git commands:',
            '  git branch - List all branches',
            '  git checkout [branch] - Switch to another branch',
          ];
        }
        break;
  
      case 'social':
        if (args.length === 0) {
          result.output = [
            'Available social platforms:',
            '  github - View GitHub profile',
            '  linkedin - View LinkedIn profile',
            '  twitter - View Twitter profile',
            'Usage: social [platform]',
          ];
        } else {
          const platform = args[0].toLowerCase();
          switch (platform) {
            case 'github':
              result.output = ['GitHub: https://github.com/manue7mokua'];
              break;
            case 'linkedin':
              result.output = ['LinkedIn: https://linkedin.com/in/myprofile'];
              break;
            case 'twitter':
              result.output = ['Twitter: https://twitter.com/myhandle'];
              break;
            default:
              result.output = [`Unknown platform: ${platform}`];
          }
        }
        break;
  
      case 'open':
        if (args.length === 0) {
          result.output = [
            'Usage: open [project]',
            'Available projects:',
            '  portfolio - This portfolio website',
            '  project1 - My first project',
            '  project2 - My second project',
          ];
        } else {
          const project = args[0].toLowerCase();
          switch (project) {
            case 'portfolio':
              result.output = ['Opening portfolio project...'];
              break;
            case 'project1':
              result.output = ['Opening project1...'];
              break;
            case 'project2':
              result.output = ['Opening project2...'];
              break;
            default:
              result.output = [`Unknown project: ${project}`];
          }
        }
        break;
  
      default:
        result.output = [`Command not found: ${cmd}. Type 'help' for available commands.`];
    }
  
    return result;
  };