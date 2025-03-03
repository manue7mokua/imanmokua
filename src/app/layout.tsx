// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import StyledComponentsRegistry from './registry';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata: Metadata = {
  title: 'Iman Mokua Portfolio',
  description: 'Interactive CLI-style developer portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
