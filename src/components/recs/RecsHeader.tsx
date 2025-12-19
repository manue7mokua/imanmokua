"use client";

import Link from "next/link";
import Image from "next/image";
import { XPDownload } from "@/components/xp-download";
import { ThemeToggle } from "@/components/theme-toggle";

export function RecsHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-background/70 backdrop-blur-md">
        <div className="mx-auto h-12 px-4 flex items-center justify-center">
          <div className="w-full max-w-sm flex items-center justify-between">
            <XPDownload />

            <Link
              href="/"
              className="flex items-center justify-center rounded-full hover:bg-accent/10 transition-colors duration-200"
              aria-label="Go to homepage"
            >
              <Image
                src="https://api.dicebear.com/9.x/adventurer/svg?seed=Sara"
                alt="Iman Mokua Avatar"
                width={38}
                height={38}
                className="rounded-full object-cover h-9 w-9"
                unoptimized={true}
              />
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
