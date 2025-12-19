"use client";

import { Bookshelf } from "@/components/bookshelf";
import { AppHeader } from "@/components/AppHeader";

export default function RecsPage() {
  return (
    <main className="bg-background h-screen overflow-hidden">
      <AppHeader barClassName="h-14 items-end pb-2" />

      <div className="h-full pt-14 flex flex-col">
        <div className="shrink-0 pt-12 pb-0 text-center">
          <h1 className="font-cinzel text-amber-500/80 text-xs tracking-[0.3em] uppercase translate-y-1">
            A Dig Into My World
          </h1>
        </div>

        <div className="flex-1 overflow-hidden">
          <Bookshelf />
        </div>
      </div>
    </main>
  );
}
