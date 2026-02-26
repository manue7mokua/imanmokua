"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Bookshelf } from "@/components/bookshelf";
import { AppHeader } from "@/components/AppHeader";
import { ARTIFACTS, BOOKS_DATA } from "@/components/bookshelf/types";
import { useTheme } from "next-themes";

export default function RecsPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [showContent, setShowContent] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const assetsLoadedRef = useRef(false);
  const recsAssets = useMemo(
    () =>
      Array.from(
        new Set([
          ...BOOKS_DATA.map((book) => book.coverImage),
          ...ARTIFACTS.map((artifact) => artifact.imagePath),
        ])
      ),
    []
  );

  useEffect(() => {
    let isCancelled = false;
    const totalAssets = recsAssets.length;

    if (!totalAssets) {
      assetsLoadedRef.current = true;
      return;
    }

    const loadedIndexes = new Set<number>();
    const preloadedImages: HTMLImageElement[] = [];

    const markLoaded = (index: number) => {
      if (isCancelled || loadedIndexes.has(index)) {
        return;
      }

      loadedIndexes.add(index);

      if (loadedIndexes.size === totalAssets) {
        assetsLoadedRef.current = true;
      }
    };

    recsAssets.forEach((asset, index) => {
      const image = new window.Image();
      const settle = () => markLoaded(index);

      image.onload = settle;
      image.onerror = settle;
      image.decoding = "async";
      image.src = asset;

      if (image.complete) {
        markLoaded(index);
      }

      preloadedImages.push(image);
    });

    return () => {
      isCancelled = true;
      preloadedImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [recsAssets]);

  useEffect(() => {
    let isCancelled = false;
    let rafId: number | null = null;
    const MIN_LOADER_DURATION_MS = 2300;
    const FINAL_JUMP_DURATION_MS = 200;
    const FINAL_SETTLE_MS = 60;
    const startTime = performance.now();

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });

    const animateSegment = (from: number, to: number, durationMs: number) =>
      new Promise<void>((resolve) => {
        const segmentStart = performance.now();

        const tick = (now: number) => {
          if (isCancelled) {
            resolve();
            return;
          }

          const elapsed = now - segmentStart;
          const t = Math.min(elapsed / durationMs, 1);
          const next = Math.round(from + (to - from) * t);
          setLoadProgress(next);

          if (t >= 1) {
            resolve();
            return;
          }

          rafId = window.requestAnimationFrame(tick);
        };

        rafId = window.requestAnimationFrame(tick);
      });

    const runLoader = async () => {
      await animateSegment(0, 17, 180);
      await animateSegment(17, 41, 220);
      await animateSegment(41, 86, 1400);

      const elapsed = performance.now() - startTime;
      if (elapsed < MIN_LOADER_DURATION_MS) {
        await wait(MIN_LOADER_DURATION_MS - elapsed);
      }

      while (!assetsLoadedRef.current && !isCancelled) {
        await wait(40);
      }

      if (isCancelled) return;

      await animateSegment(86, 100, FINAL_JUMP_DURATION_MS);
      await wait(FINAL_SETTLE_MS);

      if (!isCancelled) {
        setShowContent(true);
      }
    };

    runLoader();

    return () => {
      isCancelled = true;
      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <main className="bg-background h-dvh overflow-hidden">
      <AppHeader barClassName="h-14 items-center" />

      <div
        className="fixed left-0 right-0 z-[45] bg-background/65 backdrop-blur-md"
        style={{ top: "calc(env(safe-area-inset-top) + 3.5rem)" }}
      >
        <div className="relative mx-auto flex h-12 w-full max-w-5xl items-center px-6">
          <Link
            href="/"
            className="font-mono text-sm text-foreground underline hover:opacity-70 transition-opacity"
          >
            ← Back to home
          </Link>
          <h1
            className="absolute left-1/2 -translate-x-1/2 font-cinzel text-xs tracking-[0.3em] uppercase"
            style={{ color: isDark ? "rgb(245 158 11 / 0.8)" : "#000000" }}
          >
            LIBRARY
          </h1>
        </div>
      </div>

      {showContent ? (
        <div className="h-full pt-[calc(env(safe-area-inset-top)+6.5rem)]">
          <Bookshelf />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center px-6">
          <div className="w-full max-w-[340px] text-center">
            <p className="font-sans text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl">
              {loadProgress}%
            </p>
            <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full transition-[width] duration-200 ease-out"
                style={{
                  width: `${loadProgress}%`,
                  backgroundColor: isDark
                    ? "rgb(180 83 9 / 0.95)"
                    : "rgb(146 64 14 / 0.85)",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
