import React from "react";
import { render, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../ThemeContext";

const TestComponent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme("light")}>Change Theme</button>
    </div>
  );
};

describe("Theme Context", () => {
  test("provides default theme", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByTestId("theme")).toHaveTextContent("dark");
  });

  test("updates theme", () => {
    const { getByTestId, getByRole } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      getByRole("button").click();
    });

    expect(getByTestId("theme")).toHaveTextContent("light");
  });
});
