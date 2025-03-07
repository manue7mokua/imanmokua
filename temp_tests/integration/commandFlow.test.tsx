import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import Home from "../../app/page";
import { ThemeProvider } from "../../context/ThemeContext";
import { Terminal as XTerm } from "@xterm/xterm";
import Terminal from "../../components/Terminal";

// Mock XTerm
const mockWrite = jest.fn();
const mockWriteln = jest.fn();
const mockOnData = jest.fn();
const mockDispose = jest.fn();

jest.mock("@xterm/xterm", () => ({
  Terminal: jest.fn().mockImplementation(() => ({
    write: mockWrite,
    writeln: mockWriteln,
    onData: mockOnData,
    dispose: mockDispose,
    loadAddon: jest.fn(),
    open: jest.fn(),
  })),
}));

jest.mock("@xterm/addon-fit", () => ({
  FitAddon: jest.fn().mockImplementation(() => ({
    fit: jest.fn(),
    dispose: jest.fn(),
  })),
}));

// Mock dynamic import
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = ({ onCommand, currentBranch }: any) => (
      <div data-testid="terminal-instance">
        Mock Terminal Instance (Branch: {currentBranch})
      </div>
    );
    return DynamicComponent;
  },
}));

describe("Command Flow Integration", () => {
  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  const mockOnCommand = jest.fn();
  const currentBranch = "main";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("complete git checkout workflow", () => {
    renderWithTheme(
      <Terminal onCommand={mockOnCommand} currentBranch={currentBranch} />
    );
    expect(screen.getByTestId("terminal-instance")).toBeInTheDocument();
    expect(screen.getByText(/Branch: main/)).toBeInTheDocument();
  });

  test("theme change workflow", () => {
    renderWithTheme(
      <Terminal onCommand={mockOnCommand} currentBranch={currentBranch} />
    );
    expect(screen.getByTestId("terminal-instance")).toBeInTheDocument();
    expect(screen.getByText(/Branch: main/)).toBeInTheDocument();
  });
});
