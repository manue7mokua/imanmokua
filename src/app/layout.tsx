// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          {children}
          <Analytics />
          <SpeedInsights />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
