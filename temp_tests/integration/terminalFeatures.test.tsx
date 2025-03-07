import { render, screen } from "@testing-library/react";
import Terminal from "../../components/Terminal";
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

describe("Terminal Features", () => {
  const mockOnCommand = jest.fn();
  const currentBranch = "main";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("terminal initializes correctly", () => {
    render(
      <Terminal onCommand={mockOnCommand} currentBranch={currentBranch} />
    );

    const container = screen.getByTestId("terminal-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("Terminal");
  });

  test("terminal displays current branch", () => {
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
    const newBranch = "feature/test";
    render(<Terminal onCommand={mockOnCommand} currentBranch={newBranch} />);

    const instance = screen.getByTestId("terminal-instance");
    expect(instance).toBeInTheDocument();
    expect(instance.textContent).toBe(
      `Mock Terminal Instance (Branch: ${newBranch})`
    );
  });
});
