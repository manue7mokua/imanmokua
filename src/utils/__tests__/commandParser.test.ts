import { parseCommand } from "../commandParser";

describe("Command Parser", () => {
  const mockState = {
    commandOutput: [],
    commandHistory: [],
    historyIndex: 0,
    currentBranch: "main",
    branches: ["main", "dev"],
    files: {
      main: {
        "README.md": "Main branch readme",
      },
      dev: {
        "README.md": "Dev branch readme",
      },
    },
  };

  test("parses simple command", () => {
    const result = parseCommand("ls", mockState);
    expect(result).toEqual({
      output: ["README.md"],
      newState: {},
    });
  });

  test("parses command with arguments", () => {
    const result = parseCommand("git checkout dev", mockState);
    expect(result).toEqual({
      output: ["Switched to branch 'dev'"],
      newState: { currentBranch: "dev" },
    });
  });
});
