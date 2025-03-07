import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Terminal from "../Terminal";
import { TerminalProps } from "../../types/terminal";

// Mock the dynamic import of TerminalInstance
jest.mock("next/dynamic", () => () => {
  const DynamicComponent = ({ onCommand, currentBranch }: TerminalProps) => (
    <div data-testid="terminal-instance">
      Mock Terminal Instance (Branch: {currentBranch})
    </div>
  );
  return DynamicComponent;
});

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={{}}>{component}</ThemeProvider>);
};

describe("Terminal Component", () => {
  const mockOnCommand = jest.fn();
  const currentBranch = "main";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders terminal container", () => {
    renderWithTheme(
      <Terminal onCommand={mockOnCommand} currentBranch={currentBranch} />
    );

    const container = screen.getByTestId("terminal-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("Terminal");
  });

  test("renders terminal instance", () => {
    renderWithTheme(
      <Terminal onCommand={mockOnCommand} currentBranch={currentBranch} />
    );

    const instance = screen.getByTestId("terminal-instance");
    expect(instance).toBeInTheDocument();
    expect(instance.textContent).toBe(
      `Mock Terminal Instance (Branch: ${currentBranch})`
    );
  });

  test("passes props to terminal instance", () => {
    const newBranch = "feature/test";
    renderWithTheme(
      <Terminal onCommand={mockOnCommand} currentBranch={newBranch} />
    );

    const instance = screen.getByTestId("terminal-instance");
    expect(instance.textContent).toBe(
      `Mock Terminal Instance (Branch: ${newBranch})`
    );
  });
});
