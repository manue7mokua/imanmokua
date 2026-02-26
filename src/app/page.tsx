"use client";

import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppHeader } from "@/components/AppHeader";

export default function HomePage() {
  const [showFlag, setShowFlag] = useState(false);
  const flagTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNameHover = useCallback(() => {
    if (flagTimeoutRef.current) clearTimeout(flagTimeoutRef.current);
    setShowFlag(true);
    flagTimeoutRef.current = setTimeout(() => {
      setShowFlag(false);
    }, 2000);
  }, []);

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 md:p-12 text-foreground bg-background">
      <AppHeader barClassName="h-14 items-center" />

      {/* Main content container, centered */}
      <div className="w-full max-w-2xl mx-auto z-10">
        {/* H1 Header with Profile Photo */}
        <div className="flex items-center justify-start gap-4 md:gap-6 mb-8 md:mb-10">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-transparent">
              <Image
                src="/imanmokua_profile.jpeg"
                alt="Iman Mokua"
                width={80}
                height={80}
                className="w-full h-full rounded-full object-cover"
                priority
              />
            </div>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold cursor-default"
            onMouseEnter={handleNameHover}
          >
            Iman Mokua
          </h1>
          {showFlag && (
            <img
              src={`/Kenya-xl.gif?t=${Date.now()}`}
              alt="Kenya flag"
              width={64}
              height={64}
              className="flag-gif -ml-3"
            />
          )}
        </div>

        {/* Body copy - narrative style */}
        <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
          <p>
            currently, i&apos;m building {" "}
            <span className="relative inline-flex items-center group">
              <Link
                href="https://www.heyfathom.com/"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @hey_fathom
              </Link>
              <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-0 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <Image
                  src="/Iron Man Icon.svg"
                  alt="Iron Man Icon"
                  width={28}
                  height={28}
                  className="icon-shake"
                />
              </span>
            </span>
            , so i can talk to my VMs in swahili.
          </p>

          <p>
            i care deeply about design; specifically, how product design shapes
            the way we use tools and the results we get, and building small
            autonomous systems (rn:{" "}
            <Link
              href="https://github.com/Xplorer07/Bison_Vision"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              drone mission software
            </Link>
            ) that operate with
            minimal human-in-the-loop intervention.
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
