import React from "react";
import { render as rtlRender, waitFor, act } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeContext";

const customRender = (ui: React.ReactElement, options = {}) => {
  return rtlRender(ui, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    ...options,
  });
};

const waitForTerminalReady = async (container: HTMLElement) => {
  await waitFor(() => {
    expect(container.querySelector(".xterm")).toBeInTheDocument();
  });
};

const simulateTerminalInput = async (container: HTMLElement, input: string) => {
  await act(async () => {
    const terminal = container.querySelector(".xterm");
    for (const char of input) {
      const event = new KeyboardEvent("keydown", {
        key: char,
        code: `Key${char.toUpperCase()}`,
      });
      terminal?.dispatchEvent(event);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    // Send Enter key
    const enterEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
    });
    terminal?.dispatchEvent(enterEvent);

    // Wait for state updates
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

// Re-export everything
export * from "@testing-library/react";
export { customRender as render, waitForTerminalReady, simulateTerminalInput };
