"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import next/image
import { SocialIcons } from "@/components/social-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { DotGrid } from "@/components/dot-grid";
import { LocationDisplay } from "@/components/location-display";
import { GlowingStarsBackground } from "@/components/ui/glowing-stars";
import { useTheme } from "next-themes";

export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show stars once component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-6 text-foreground bg-background">
      {/* Only show DotGrid in light mode */}
      {mounted && theme === "light" && <DotGrid />}

      {/* Only show GlowingStarsBackground in dark mode */}
      {mounted && theme === "dark" && <GlowingStarsBackground />}

      {/* Main content container, centered, reduced max-width slightly */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center z-10">
        {/* Top row: Location | Avatar | Theme Toggle - Reduced margin */}
        <div className="w-full flex items-center justify-between mb-8 md:mb-10">
          <LocationDisplay />
          {/* Centered User Image - Larger & Rounded */}
          <div className="flex items-center justify-center">
            <Image
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=Sara"
              alt="Iman Mokua Avatar"
              width={80}
              height={80}
              className="rounded-full object-cover h-20 w-20"
              unoptimized={true} // Important for external SVG URLs
            />
          </div>
          <ThemeToggle />
        </div>

        {/* Nav row: Name | About | Yaps - Reduced margin */}
        <div className="flex items-center justify-center space-x-5 mb-8 md:mb-10">
          {" "}
          {/* Reduced space & margin */}
          <span className="text-base md:text-lg font-mono text-muted-foreground cursor-pointer hover:text-accent/70 transition-colors duration-200 relative group">
            recs
            <span className="absolute -left-24 top-1 hidden group-hover:block w-20 px-1.5 py-0.5 bg-background/80 border border-accent/20 rounded text-[10px] font-mono text-accent/80 text-center z-10">
              coming soon...
            </span>
          </span>
          {/* Active "about" link */}
          <span
            className="text-base md:text-lg font-mono text-accent relative cursor-pointer
                       after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:h-[3px]
                       after:bg-[#dd8833] after:scale-x-100"
          >
            about
          </span>
          {/* Disabled "yaps" link - adding custom tooltip */}
          <span className="text-base md:text-lg font-mono text-muted-foreground cursor-pointer hover:text-accent/70 transition-colors duration-200 relative group">
            yaps
            <span className="absolute -right-24 top-1 hidden group-hover:block w-20 px-1.5 py-0.5 bg-background/80 border border-accent/20 rounded text-[10px] font-mono text-accent/80 text-center z-10">
              coming soon...
            </span>
          </span>
        </div>

        {/* Intro Text Section - Reduced margin & font size */}
        <div className="w-full text-center mb-10 md:mb-12 space-y-6">
          {" "}
          {/* Reduced margin & space */}
          {/* Block 1 */}
          <div className="space-y-1">
            <p className="font-mono text-sm md:text-base leading-relaxed">
              {" "}
              {/* Reduced font size */}
              hey! i&apos;m iman mokua — student, researcher, and builder.
              <br />
              incoming swe @ meta.
              <br />
              currently building @incourse and @fathom.
              <span className="animate-pulse">_</span>
            </p>
          </div>
          {/* Block 2: Calendar/List */}
          <div className="space-y-2">
            {" "}
            {/* Reduced space */}
            <p className="font-mono text-sm md:text-base">my calendar:</p>{" "}
            {/* Reduced font size */}
            <ul className="list-disc list-inside space-y-1 inline-block text-center mx-auto font-mono text-sm md:text-base leading-relaxed">
              {" "}
              {/* Reduced font size & space */}
              <li>
                local soccer league.
              </li>
              <li>
                DimABSA research @howardu.
              </li>
              <li>getting kickass at tennis.</li>
            </ul>
          </div>
          {/* Block 3: "also:" */}
          <div className="space-y-1">
            <p className="font-mono text-sm md:text-base leading-relaxed">
              {" "}
              {/* Reduced font size */}
              <br />
              won 4 hackathons. always shipping & learning.
              <br />
              feel free to hmu on X (most active there).
            </p>
          </div>
        </div>

        {/* CTA Link - Added cursor-pointer explicitly */}
        <Link
          href="/terminal" // Updated link to /terminal
          className="font-sans font-medium text-sm md:text-base text-accent relative pb-1
                     hover:text-foreground focus:outline-none focus:text-foreground cursor-pointer
                     after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full
                     after:bg-[#dd8833] after:transition-transform after:duration-300 after:ease-out
                     after:scale-x-100 hover:after:scale-x-0 focus:after:scale-x-0 mb-10 md:mb-12" // Reduced margin
        >
          what i&apos;ve built
        </Link>
      </div>
      {/* Footer - Reduced padding */}
      <footer className="w-full py-4 md:py-6 z-10">
        <SocialIcons />
      </footer>
    </div>
  );
}
