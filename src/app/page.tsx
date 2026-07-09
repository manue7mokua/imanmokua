"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  const sentTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canSend = message.trim().length > 0;
  const isActive = isFocused || message.length > 0 || isSubmitting;

  useEffect(() => {
    return () => {
      if (sentTimeoutRef.current) {
        clearTimeout(sentTimeoutRef.current);
      }
    };
  }, []);

  async function runSubmit() {
    if (!canSend || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      setIsSent(true);
      setMessage("");
      setWebsite("");

      if (sentTimeoutRef.current) {
        clearTimeout(sentTimeoutRef.current);
      }

      sentTimeoutRef.current = setTimeout(() => {
        setIsSent(false);
      }, 1400);
    } catch {
      setError(":( try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSubmit();
  }

  function handleMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value.slice(0, 50));
    setError("");
    setIsSent(false);
  }

  function handleMessageKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    event.preventDefault();
    void runSubmit();
  }

  const statusText = isSubmitting
    ? "sending"
    : error || (isSent ? "sent" : `${message.length}/50`);

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 md:p-12 text-foreground bg-background">
      <AppHeader barClassName="h-14 items-center" showAvatar={false} />

      {/* Main content container, centered */}
      <div className="w-full max-w-2xl mx-auto z-10">
        {/* H1 Header */}
        <div className="flex items-center justify-start gap-3 mb-8 md:mb-10">
          <h1 className="text-2xl md:text-2xl font-bold cursor-default">
            hey, i'm Iman
          </h1>
          <Image
            src="https://api.dicebear.com/9.x/adventurer/svg?seed=Sara"
            alt=""
            width={42}
            height={42}
            className="h-10 w-10 rounded-full object-cover"
            aria-hidden="true"
            unoptimized={true}
          />
        </div>

        {/* Body copy - narrative style */}
        <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed">
          <p>currently work at meta.</p>

          <p>
            i care a lot about design; i think it&apos;s pretty cool how things are 
            structured can affect how we think. i like football ('Zonal Marking' is a great read). 
            i wanna build my own version of TARS someday :)
          </p>

          <div>
            you can read my{" "}
            <Link href="/writing" className="home-inline-link">
              writing
            </Link>
            , explore{" "}
            <Link href="/projects" className="home-inline-link">
              things i&apos;ve built
            </Link>
            , or{" "}
            <Link href="/recs" className="home-inline-link">
              see what i’m reading
            </Link>
            .
            <form
              className={`dotted-message-form ${
                isActive ? "is-active" : ""
              } ${isSent ? "is-sent" : ""} ${error ? "is-error" : ""}`}
              onSubmit={handleSubmit}
              aria-label="send a short note"
            >
              <label className="sr-only" htmlFor="home-message">
                name: what r u excited about
              </label>
              <input
                id="home-message"
                className="dotted-message-input"
                type="text"
                value={message}
                maxLength={50}
                placeholder="name: what r u excited about"
                autoComplete="off"
                spellCheck="true"
                onChange={handleMessageChange}
                onKeyDown={handleMessageKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <input
                aria-hidden="true"
                autoComplete="off"
                className="dotted-message-honeypot"
                name="website"
                tabIndex={-1}
                type="text"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
              <button
                className="dotted-message-button"
                type="submit"
                disabled={!canSend || isSubmitting}
                aria-label="send note"
              >
                <Send aria-hidden="true" size={14} strokeWidth={1.75} />
              </button>
              <span className="dotted-message-status" aria-live="polite">
                {statusText}
              </span>
            </form>
          </div>

          <p>
            i post sometimes on{" "}
            <Link
              href="https://x.com/imanmokua"
              className="animated-link social-arrow-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
