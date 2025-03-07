import { render, screen, waitFor, act } from "@testing-library/react";
import Terminal from "../components/Terminal";

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

describe("Terminal Component", () => {
  const mockOnCommand = jest.fn();
  const currentBranch = "main";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders terminal container", () => {
    render(
      <Terminal onCommand={mockOnCommand} currentBranch={currentBranch} />
    );
    expect(screen.getByTestId("terminal-container")).toBeInTheDocument();
    expect(screen.getByTestId("terminal-container")).toHaveClass("Terminal");
  });

  test("renders terminal instance", () => {
    render(
      <Terminal onCommand={mockOnCommand} currentBranch={currentBranch} />
    );
    expect(screen.getByTestId("terminal-instance")).toBeInTheDocument();
    expect(screen.getByText(/Branch: main/)).toBeInTheDocument();
  });
});
