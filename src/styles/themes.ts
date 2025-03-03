import { css } from 'styled-components';

export const themes = {
  dark: css`
    --bg-primary: #1E1E1E;
    --bg-secondary: #252526;
    --bg-tertiary: #333;
    --text-primary: #FFFFFF;
    --text-secondary: #CCCCCC;
    --accent-color: #27C93F;
    --accent-secondary: #4169E1;
    --border-color: #444;
  `,
  light: css`
    --bg-primary: #F5F5F5;
    --bg-secondary: #ECECEC;
    --bg-tertiary: #DDDDDD;
    --text-primary: #333333;
    --text-secondary: #555555;
    --accent-color: #2E7D32;
    --accent-secondary: #1976D2;
    --border-color: #CCCCCC;
  `,
  hacker: css`
    --bg-primary: #0D0208;
    --bg-secondary: #003B00;
    --bg-tertiary: #008F11;
    --text-primary: #00FF41;
    --text-secondary: #00BB31;
    --accent-color: #00FF41;
    --accent-secondary: #8BC34A;
    --border-color: #005F00;
  `,
  retro: css`
    --bg-primary: #2C3E50;
    --bg-secondary: #34495E;
    --bg-tertiary: #283747;
    --text-primary: #F39C12;
    --text-secondary: #F1C40F;
    --accent-color: #E74C3C;
    --accent-secondary: #9B59B6;
    --border-color: #1C2833;
  `
};