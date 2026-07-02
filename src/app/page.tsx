"use client";

import React from "react";
import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";

export default function HomePage() {
  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 md:p-12 text-foreground bg-background">
      <AppHeader barClassName="h-14 items-center" />

      {/* Main content container, centered */}
      <div className="w-full max-w-2xl mx-auto z-10">
        {/* H1 Header */}
        <div className="flex items-center justify-start mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold cursor-default">
            Iman Mokua
          </h1>
        </div>

        {/* Body copy - narrative style */}
        <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
          <p>currently work at meta.</p>

          <p>
            i care a lot about design; i think it's pretty cool how things are 
            structured can affect how we think. i like football (brazil will win the wc). 
            i wanna build my own version of TARS someday :)
          </p>

          <p>
            you can read my{" "}
            <Link href="/writing" className="underline">
              writing
            </Link>
            , explore{" "}
            <Link href="/projects" className="underline">
              things i&apos;ve built
            </Link>
            , or{" "}
            <Link href="/recs" className="underline">
              see what i’m reading
            </Link>
            . if you&apos;re building something interesting or have a good book rec, feel free to reach out.
          </p>

          <p>
            connect with me on{" "}
            <Link
              href="https://x.com/imanmokua"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              X (twitter)
            </Link>
            ,{" "}
            <Link
              href="https://github.com/manue7mokua"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </Link>
            ,{" "}
            <Link
              href="https://www.linkedin.com/in/mokua-emmanuel-43b798269/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
