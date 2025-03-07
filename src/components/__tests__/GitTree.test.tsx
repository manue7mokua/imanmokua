import { render, screen, fireEvent } from "@testing-library/react";
import GitTree from "../GitTree";

describe("GitTree Component", () => {
  const mockBranches = ["main", "develop", "feature/test"];
  const mockOnBranchClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders git tree with branches", () => {
    render(
      <GitTree
        currentBranch="main"
        branches={mockBranches}
        onBranchClick={mockOnBranchClick}
      />
    );

    mockBranches.forEach((branch) => {
      const branchElement = screen.getByText(branch);
      expect(branchElement).toBeInTheDocument();
    });
  });

  test("highlights active branch", () => {
    const currentBranch = "develop";
    render(
      <GitTree
        currentBranch={currentBranch}
        branches={mockBranches}
        onBranchClick={mockOnBranchClick}
      />
    );

    const branchElement = screen.getByText(currentBranch);
    expect(branchElement).toBeInTheDocument();

    const activeIndicator = screen.getByText("(active)");
    expect(activeIndicator).toBeInTheDocument();
    expect(activeIndicator.previousElementSibling).toBe(branchElement);
  });

  test("calls onBranchClick when branch is clicked", () => {
    render(
      <GitTree
        currentBranch="main"
        branches={mockBranches}
        onBranchClick={mockOnBranchClick}
      />
    );

    const branchToClick = "develop";
    const branchElement = screen.getByText(branchToClick);
    const branchContainer = branchElement.parentElement;
    expect(branchContainer).toBeInTheDocument();
    fireEvent.click(branchContainer!);

    expect(mockOnBranchClick).toHaveBeenCalledWith(branchToClick);
  });
});
