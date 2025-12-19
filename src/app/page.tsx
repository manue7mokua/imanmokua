"use client";

import React from "react";
import Link from "next/link";
import { SocialIcons } from "@/components/social-icons";
import { AppHeader } from "@/components/AppHeader";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-6 text-foreground bg-background">
      <AppHeader barClassName="h-14 items-end pb-2" />

      {/* Main content container, centered, reduced max-width slightly */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center z-10">

        {/* Nav row: Name | About | Yaps - Reduced margin */}
        <div className="flex items-center justify-center space-x-5 mb-8 md:mb-10">
          {" "}
          {/* Reduced space & margin */}
          <Link
            href="/recs"
            className="text-base md:text-lg font-mono text-muted-foreground cursor-pointer hover:text-accent/70 transition-colors duration-200"
          >
            recs
          </Link>
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
            writing
            <span className="absolute left-full top-1 ml-2 hidden group-hover:block whitespace-nowrap px-1.5 py-0.5 bg-background/80 border border-accent/20 rounded text-[10px] font-mono text-accent/80 text-center z-10">
              coming December 1st, 2025
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
              Hey! I&apos;m Iman — student @Howard University, researcher, and
              building the best voice-first codebase comprehension agent @
              <Link href="https://www.heyfathom.com/" className="underline">
                hey fathom
              </Link>
            </p>
          </div>
          {/* Block 2: Calendar/List */}
          <div className="space-y-2">
            {" "}
            {/* Reduced space */}
            <p className="font-mono text-sm md:text-base">
              what i enjoy :)
            </p>{" "}
            {/* Reduced font size */}
            <ul className="list-disc list-inside space-y-1 inline-block text-center mx-auto font-mono text-sm md:text-base leading-relaxed">
              {" "}
              {/* Reduced font size & space */}
              <li>soccer</li>
              <li>product design</li>
              <li>hackathons</li>
              <li>philosophy</li>
              <li>travel</li>
            </ul>
          </div>
          {/* Block 3: "also:" */}
          <div className="space-y-1">
            <p className="font-mono text-sm md:text-base leading-relaxed">
              {" "}
              {/* Reduced font size */}
              <br />
              won 5 hackathons. always shipping & learning.
              <br />.
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
