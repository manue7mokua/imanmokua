const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@xterm/xterm$": "<rootDir>/src/__mocks__/@xterm/xterm.ts",
    "^@xterm/addon-fit$": "<rootDir>/src/__mocks__/@xterm/xterm.ts",
  },
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

module.exports = createJestConfig(customJestConfig);
