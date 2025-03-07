import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import Home from "../../app/page";
import { theme } from "../../styles/theme";
import Terminal from "../../components/Terminal";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { TerminalProps } from "../../types/terminal";

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

// Mock XTerm and FitAddon
jest.mock("@xterm/xterm", () => {
  const mockOnDataCallback = jest.fn();
  return {
    Terminal: jest.fn().mockImplementation(() => ({
      write: jest.fn(),
      writeln: jest.fn(),
      onData: jest.fn((callback) => {
        mockOnDataCallback.mockImplementation(callback);
        return { dispose: jest.fn() };
      }),
      dispose: jest.fn(),
      loadAddon: jest.fn(),
      open: jest.fn(),
      mockOnDataCallback, // Expose the callback for testing
    })),
  };
});

jest.mock("@xterm/addon-fit", () => ({
  FitAddon: jest.fn().mockImplementation(() => ({
    fit: jest.fn(),
    dispose: jest.fn(),
  })),
}));

// Mock the dynamic import of TerminalInstance
jest.mock("next/dynamic", () => () => {
  const DynamicComponent = ({ onCommand, currentBranch }: TerminalProps) => (
    <div data-testid="terminal-instance">
      Mock Terminal Instance (Branch: {currentBranch})
    </div>
  );
  return DynamicComponent;
});

describe("Branch Handling", () => {
  const mockOnCommand = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("terminal shows current branch", () => {
    const currentBranch = "main";
    render(
      <Terminal onCommand={mockOnCommand} currentBranch={currentBranch} />
    );

    const instance = screen.getByTestId("terminal-instance");
    expect(instance).toBeInTheDocument();
    expect(instance.textContent).toBe(
      `Mock Terminal Instance (Branch: ${currentBranch})`
    );
  });

  test("terminal updates branch display", () => {
    const currentBranch = "feature/new-branch";
    render(
      <Terminal onCommand={mockOnCommand} currentBranch={currentBranch} />
    );

    const instance = screen.getByTestId("terminal-instance");
    expect(instance).toBeInTheDocument();
    expect(instance.textContent).toBe(
      `Mock Terminal Instance (Branch: ${currentBranch})`
    );
  });
});
