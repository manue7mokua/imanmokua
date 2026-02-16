"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AppHeader } from "@/components/AppHeader";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 text-foreground bg-background">
      <AppHeader barClassName="h-14 items-end pb-2" />

      {/* Main content container, centered */}
      <div className="w-full max-w-2xl mx-auto z-10 mb-24 md:mb-32">
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
          <h1 className="text-3xl md:text-4xl font-bold">Iman Mokua</h1>
        </div>

        {/* Body copy - narrative style */}
        <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
          <p>
            currently, i'm building {" "}
            <Link
              href="https://www.heyfathom.com/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @hey_fathom
            </Link>
            , so i can talk to my VMs in swahili.{" "}
            <Image
              src="/Iron Man Icon.svg"
              alt="Iron Man Icon"
              width={28}
              height={28}
              className="inline-block align-middle icon-shake"
            />
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
            <Link href="/terminal" className="underline">
              things i've built
            </Link>
            , or{" "}
            <Link href="/recs" className="underline">
              see what i’m reading
            </Link>
            . if you're building something interesting or thinking deeply about
            de, feel free to reach out.
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
