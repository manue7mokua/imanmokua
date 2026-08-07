"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function NotFound() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="aspect-[5/4] w-[calc(100vw-32px)] max-w-[500px]" />
      </div>
    );
  }

  const imageSrc = resolvedTheme === "dark" ? "/404_light.png" : "/404_dark.png";
  const isDarkMode = resolvedTheme === "dark";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="fixed inset-x-0 top-0 z-20 flex h-[60px] items-center justify-center pt-[env(safe-area-inset-top)]">
        <ThemeToggle />
      </div>

      {/* 404 Image */}
      <div className="ghost-animation relative aspect-[5/4] w-[calc(100vw-32px)] max-w-[500px] overflow-hidden">
        <Image
          src={imageSrc}
          alt="404 - Page Not Found"
          fill
          sizes="500px"
          className="object-contain"
          style={{ transform: isDarkMode ? "scale(1)" : "scale(2.5)" }}
          priority
        />
      </div>

      {/* Text and Link */}
      <div className="mt-8 text-center relative z-10">
        <p className="mb-6 text-[12px] font-normal leading-[18px] opacity-70 [font-family:var(--font-ui-mono)]">
          Oops, still scrunching!
        </p>
        <Link
          href="/writing"
          className="px-6 py-3 text-[13px] font-normal no-underline transition-opacity hover:opacity-70 [font-family:var(--font-ui-mono)]"
        >
          ← go back
        </Link>
      </div>
    </div>
  );
}
