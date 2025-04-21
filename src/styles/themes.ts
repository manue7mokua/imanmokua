import { css } from "styled-components";

export const themes = {
  dark: css`
    --bg-primary: #1e1e1e;
    --bg-secondary: #252526;
    --bg-tertiary: #333;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --accent-color: #27c93f;
    --accent-secondary: #4169e1;
    --border-color: #444;
  `,
  light: css`
    --bg-primary: #fcfcfc;
    --bg-secondary: #f8f8f8;
    --bg-tertiary: #f0f0f0;
    --text-primary: #000000;
    --text-secondary: #333333;
    --accent-color: #dd8833;
    --accent-secondary: #b05c1d;
    --border-color: #e0e0e0;
  `,
  hacker: css`
    --bg-primary: #0d0208;
    --bg-secondary: #003b00;
    --bg-tertiary: #008f11;
    --text-primary: #00ff41;
    --text-secondary: #00bb31;
    --accent-color: #00ff41;
    --accent-secondary: #8bc34a;
    --border-color: #005f00;
  `,
  retro: css`
    --bg-primary: #2c3e50;
    --bg-secondary: #34495e;
    --bg-tertiary: #283747;
    --text-primary: #f39c12;
    --text-secondary: #f1c40f;
    --accent-color: #e74c3c;
    --accent-secondary: #9b59b6;
    --border-color: #1c2833;
  `,
};
