import { render, screen, act } from "@testing-library/react";
import TerminalInstance from "../TerminalInstance";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";

// Mock XTerm and FitAddon
const mockWrite = jest.fn();
const mockWriteln = jest.fn();
const mockOnData = jest.fn();
const mockLoadAddon = jest.fn();
const mockOpen = jest.fn();
const mockDispose = jest.fn();
const mockFit = jest.fn();

jest.mock("@xterm/xterm", () => ({
  Terminal: jest.fn().mockImplementation(() => ({
    write: mockWrite,
    writeln: mockWriteln,
    onData: mockOnData,
    dispose: mockDispose,
    loadAddon: mockLoadAddon,
    open: mockOpen,
  })),
}));

jest.mock("@xterm/addon-fit", () => ({
  FitAddon: jest.fn().mockImplementation(() => ({
    fit: mockFit,
    dispose: jest.fn(),
  })),
}));

describe("TerminalInstance Component", () => {
  const mockOnCommand = jest.fn();
  const currentBranch = "main";
  let dataCallback: (data: string) => void;

  beforeEach(() => {
    jest.clearAllMocks();
    // Store the callback function when onData is called
    mockOnData.mockImplementation((callback) => {
      dataCallback = callback;
      return { dispose: jest.fn() };
    });
  });

  test("initializes terminal", () => {
    render(
      <TerminalInstance
        onCommand={mockOnCommand}
        currentBranch={currentBranch}
      />
    );

    expect(mockOpen).toHaveBeenCalled();
    expect(mockLoadAddon).toHaveBeenCalled();
    expect(mockWrite).toHaveBeenCalledWith(
      expect.stringContaining(`${currentBranch}$`)
    );
  });

  test("displays welcome message and prompt", () => {
    render(
      <TerminalInstance
        onCommand={mockOnCommand}
        currentBranch={currentBranch}
      />
    );

    expect(mockWriteln).toHaveBeenCalledWith(
      expect.stringContaining("Welcome to my interactive CLI portfolio")
    );
    expect(mockWrite).toHaveBeenCalledWith(
      expect.stringContaining(`${currentBranch}$`)
    );
  });

  test("handles command input", () => {
    render(
      <TerminalInstance
        onCommand={mockOnCommand}
        currentBranch={currentBranch}
      />
    );

    expect(mockOnData).toHaveBeenCalled();
    expect(dataCallback).toBeDefined();

    // Simulate typing 'ls' and pressing enter
    act(() => {
      dataCallback("l");
      dataCallback("s");
      dataCallback("\r");
    });

    expect(mockOnCommand).toHaveBeenCalledWith("ls");
  });
});
