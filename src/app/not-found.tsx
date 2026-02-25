"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
        <div className="w-[500px] h-[400px]" />
      </div>
    );
  }

  const imageSrc = resolvedTheme === "dark" ? "/404_light.png" : "/404_dark.png";
  const isDarkMode = resolvedTheme === "dark";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      {/* 404 Image */}
      <div className="relative w-[500px] h-[400px] ghost-animation overflow-hidden">
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
        <p className="text-lg md:text-xl font-mono mb-6 opacity-70">
          Oops! This page doesn&apos;t exist yet.
        </p>
        <Link
          href="/writing"
          className="inline-block px-6 py-3 font-mono text-sm md:text-base underline hover:opacity-70 transition-opacity"
        >
          ← go back
        </Link>
      </div>
    </div>
  );
}
