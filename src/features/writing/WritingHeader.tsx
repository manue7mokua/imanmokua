"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { ThemeToggle } from "@/components/theme-toggle";

export function WritingHeader() {
  return (
    <SectionHeader
      center={<ThemeToggle />}
      marker={
        <Link
          aria-label="Iman Mokua, home"
          className="rounded-full transition-opacity hover:opacity-70"
          href="/"
        >
          <Image
            alt="Iman Mokua"
            className="h-8 w-8 rounded-full object-cover"
            height={32}
            src="https://api.dicebear.com/9.x/adventurer/svg?seed=Sara"
            unoptimized
            width={32}
          />
        </Link>
      }
      section="writing"
    />
  );
}
