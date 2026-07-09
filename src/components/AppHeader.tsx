"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

interface AppHeaderProps {
  centerHref?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  barClassName?: string;
  showAvatar?: boolean;
}

export function AppHeader({
  centerHref = "/",
  avatarSrc = "https://api.dicebear.com/9.x/adventurer/svg?seed=Sara",
  avatarAlt = "Iman Mokua Avatar",
  barClassName = "h-12 items-center",
  showAvatar = true,
}: AppHeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-background/70 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className={`mx-auto px-4 flex justify-center ${barClassName}`}>
          <div className="grid w-full max-w-sm grid-cols-3 items-center">
            <div aria-hidden="true" />

            {showAvatar ? (
              <Link
                href={centerHref}
                className="flex items-center justify-center justify-self-center rounded-full hover:bg-accent/10 transition-colors duration-200"
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
            ) : (
              <div aria-hidden="true" />
            )}

            <div className="justify-self-end">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
