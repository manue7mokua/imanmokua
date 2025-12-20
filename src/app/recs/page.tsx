"use client";

import Link from "next/link";
import { Bookshelf } from "@/components/bookshelf";
import { AppHeader } from "@/components/AppHeader";
import { useTheme } from "next-themes";

export default function RecsPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <main className="bg-background h-screen overflow-hidden">
      <AppHeader barClassName="h-14 items-end pb-2" />

      <div className="h-full pt-14 flex flex-col">
        {/* Back to home link */}
        <div className="absolute top-18 left-6 z-10">
          <Link 
            href="/" 
            className="font-mono text-sm text-foreground underline hover:opacity-70 transition-opacity"
          >
            ← Back to home
          </Link>
        </div>
        <div className="shrink-0 pt-12 pb-2 text-center">
          <h1 
            className="font-cinzel text-xs tracking-[0.3em] uppercase translate-y-1"
            style={{ color: isDark ? "rgb(245 158 11 / 0.8)" : "#000000" }}
          >
            LIBRARY
          </h1>
        </div>

        <div className="flex-1 overflow-hidden">
          <Bookshelf />
        </div>
      </div>
    </main>
  );
}
