"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BookData } from "./types";

interface MobileCoverFeedProps {
  books: BookData[];
  isPaused: boolean;
  onSelectBook: (book: BookData | null) => void;
}

const AUTO_SCROLL_SPEED_PX_PER_SECOND = 26;

function getCoverPattern(index: number) {
  const rotation = ((index * 17) % 13) - 6;
  const verticalOffset = ((index * 23) % 4) * 10;
  const horizontalNudge = ((index * 29) % 3) - 1;

  return {
    rotation,
    verticalOffset,
    horizontalNudge,
  };
}

interface CoverSetProps {
  books: BookData[];
  setOffset: number;
  onSelectBook: (book: BookData | null) => void;
}

function CoverSet({ books, setOffset, onSelectBook }: CoverSetProps) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
        {books.map((book, index) => {
          const patternIndex = setOffset + index;
          const { rotation, verticalOffset, horizontalNudge } =
            getCoverPattern(patternIndex);

          return (
            <button
              key={`${book.id}-${setOffset}-${index}`}
              type="button"
              onClick={() => onSelectBook(book)}
              className="group relative w-[92%] justify-self-center md:w-[90%]"
              style={{
                transform: `translate(${horizontalNudge * 4}px, ${verticalOffset}px) rotate(${rotation}deg)`,
              }}
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-sm border border-black/5 bg-neutral-200 shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform duration-300 group-active:scale-[0.985]">
                <Image
                  src={book.coverImage}
                  alt={`${book.title} by ${book.author}`}
                  fill
                  sizes="(max-width: 767px) 48vw, (max-width: 1024px) 32vw, 220px"
                  className="object-cover"
                  draggable={false}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MobileCoverFeed({
  books,
  isPaused,
  onSelectBook,
}: MobileCoverFeedProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstSetRef = useRef<HTMLDivElement | null>(null);
  const loopHeightRef = useRef(0);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const pausedRef = useRef(isPaused);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (!firstSetRef.current) {
      return;
    }

    const updateHeight = () => {
      loopHeightRef.current = firstSetRef.current?.offsetHeight ?? 0;
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(firstSetRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [books.length]);

  useEffect(() => {
    offsetRef.current = 0;
    lastTimestampRef.current = null;

    if (trackRef.current) {
      trackRef.current.style.transform = "translateY(0px)";
    }
  }, [books.length]);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (lastTimestampRef.current == null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaSeconds = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      if (
        !pausedRef.current &&
        books.length > 0 &&
        loopHeightRef.current > 0 &&
        trackRef.current
      ) {
        offsetRef.current += AUTO_SCROLL_SPEED_PX_PER_SECOND * deltaSeconds;

        if (offsetRef.current >= loopHeightRef.current) {
          offsetRef.current -= loopHeightRef.current;
        }

        trackRef.current.style.transform = `translateY(-${offsetRef.current}px)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [books.length]);

  return (
    <div className="h-full overflow-hidden px-4 pb-10 pt-4">
      <div ref={trackRef} className="will-change-transform">
        <div ref={firstSetRef}>
          <CoverSet books={books} setOffset={0} onSelectBook={onSelectBook} />
        </div>
        <div aria-hidden="true">
          <CoverSet
            books={books}
            setOffset={books.length}
            onSelectBook={onSelectBook}
          />
        </div>
      </div>
    </div>
  );
}
