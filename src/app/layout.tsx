// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "./registry";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Iman:_:Mokua",
  description: "Interactive terminal-based portfolio",
  icons: {
    icon: "/iman-mokua.png",
    shortcut: "/iman-mokua.png",
    apple: "/iman-mokua.png",
  },
  openGraph: {
    title: "Iman:_:Mokua",
    description: "Iman:_:Mokua",
    url: "https://imanmokua.me",
    siteName: "Iman:_:Mokua",
    images: [
      {
        url: "/iman-mokua.png",
        width: 500,
        height: 500,
        alt: "Iman:_:Mokua",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iman:_:Mokua",
    description: "Iman:_:Mokua",
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
