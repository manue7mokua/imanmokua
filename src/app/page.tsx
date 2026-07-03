"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const sentTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canSend = message.trim().length > 0;
  const isActive = isFocused || message.length > 0;

  useEffect(() => {
    return () => {
      if (sentTimeoutRef.current) {
        clearTimeout(sentTimeoutRef.current);
      }
    };
  }, []);

  function runFakeSubmit() {
    if (!canSend) return;

    setIsSent(true);
    setMessage("");

    if (sentTimeoutRef.current) {
      clearTimeout(sentTimeoutRef.current);
    }

    sentTimeoutRef.current = setTimeout(() => {
      setIsSent(false);
    }, 1400);
  }

  function handleFakeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runFakeSubmit();
  }

  function handleMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value.slice(0, 50));
  }

  function handleMessageKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    event.preventDefault();
    runFakeSubmit();
  }

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
            i care a lot about design; i think it&apos;s pretty cool how things are 
            structured can affect how we think. i like football (brazil will win the wc). 
            i wanna build my own version of TARS someday :)
          </p>

          <div>
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
            .
            <form
              className={`dotted-message-form ${
                isActive ? "is-active" : ""
              } ${isSent ? "is-sent" : ""}`}
              onSubmit={handleFakeSubmit}
              aria-label="send a short note"
            >
              <label className="sr-only" htmlFor="home-message">
                book rec or thing you&apos;re building
              </label>
              <input
                id="home-message"
                className="dotted-message-input"
                type="text"
                value={message}
                maxLength={50}
                placeholder="book rec or thing you&apos;re building..."
                autoComplete="off"
                spellCheck="true"
                onChange={handleMessageChange}
                onKeyDown={handleMessageKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <button
                className="dotted-message-button"
                type="submit"
                disabled={!canSend}
                aria-label="fake send note"
              >
                <Send aria-hidden="true" size={14} strokeWidth={1.75} />
              </button>
              <span className="dotted-message-status" aria-live="polite">
                {isSent ? "sent" : `${message.length}/50`}
              </span>
            </form>
          </div>

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
