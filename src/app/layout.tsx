// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Iman Mokua",
  description: "Interactive terminal-based portfolio",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/iman-mokua.png", type: "image/png" }],
    shortcut: [{ url: "/iman-mokua.png", type: "image/png" }],
    apple: [{ url: "/iman-mokua.png", type: "image/png" }],
  },
  openGraph: {
    title: "Iman Mokua",
    description: "Interactive terminal-based portfolio",
    url: "https://imanmokua.me",
    siteName: "Iman Mokua",
    images: [
      {
        url: "/iman-mokua.png",
        width: 500,
        height: 500,
        alt: "Iman Mokua",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iman Mokua",
    description: "Interactive terminal-based portfolio",
    images: ["/iman-mokua.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="iman-mokua-theme"
          >
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
