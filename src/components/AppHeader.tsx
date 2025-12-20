"use client";

import Link from "next/link";
import Image from "next/image";
import { XPDownload } from "@/components/xp-download";
import { ThemeToggle } from "@/components/theme-toggle";

interface AppHeaderProps {
  centerHref?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  barClassName?: string;
}

export function AppHeader({
  centerHref = "/",
  avatarSrc = "https://api.dicebear.com/9.x/adventurer/svg?seed=Sara",
  avatarAlt = "Iman Mokua Avatar",
  barClassName = "h-12 items-center",
}: AppHeaderProps) {
  return (
    <header
      className="fixed top-4 left-0 right-0 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-background/70 backdrop-blur-md">
        <div className={`mx-auto px-4 flex justify-center ${barClassName}`}>
          <div className="w-full max-w-sm flex items-center justify-between translate-y-0.5">
            <XPDownload />

            <Link
              href={centerHref}
              className="flex items-center justify-center rounded-full hover:bg-accent/10 transition-colors duration-200"
              aria-label="Go to homepage"
            >
              <Image
                src={avatarSrc}
                alt={avatarAlt}
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
