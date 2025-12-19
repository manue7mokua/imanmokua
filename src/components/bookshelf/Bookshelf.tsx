"use client";

import { useMemo, useState, useCallback, useRef } from "react";
import { BookData, generateBooks, distributeBooks, ARTIFACTS } from "./types";
import { Compartment } from "./Compartment";
import { ReadingModal } from "./ReadingModal";

type AnimationPhase = "idle" | "pulling" | "open" | "closing";

export function Bookshelf() {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>("idle");
  const [showModal, setShowModal] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const books = useMemo(() => generateBooks(), []);
  const shelfLayout = useMemo(() => distributeBooks(books), [books]);

  const selectedBook = useMemo(
    () => books.find((b) => b.id === selectedBookId) || null,
    [books, selectedBookId]
  );

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleSelectBook = useCallback(
    (book: BookData | null) => {
      clearTimeouts();

      if (book && animationPhase === "idle") {
        setSelectedBookId(book.id);
        setAnimationPhase("pulling");

        timeoutRef.current = setTimeout(() => {
          setAnimationPhase("open");
          setShowModal(true);
        }, 700);
      }
    },
    [animationPhase, clearTimeouts]
  );

  const handleClose = useCallback(() => {
    if (animationPhase !== "open") return;
    clearTimeouts();

    setShowModal(false);
    setAnimationPhase("closing");

    timeoutRef.current = setTimeout(() => {
      setAnimationPhase("idle");
      setSelectedBookId(null);
    }, 700);
  }, [animationPhase, clearTimeouts]);

  const handleBgClick = () => {
    if (animationPhase === "open") {
      handleClose();
    }
  };

  const getBookAnimationClass = (bookId: number): string => {
    if (selectedBookId !== bookId) return "";
    if (animationPhase === "pulling" || animationPhase === "closing") return "pulling";
    if (animationPhase === "open") return "open";
    return "";
  };

  const isAnySelected = animationPhase !== "idle";
  const shouldBlurBackground = animationPhase === "open";

  return (
    <div
      className="h-full relative flex flex-col items-center justify-center overflow-hidden"
      onClick={handleBgClick}
    >
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-[3px] z-40 pointer-events-none transition-all duration-500 ease-out ${shouldBlurBackground ? "opacity-100" : "opacity-0"}`}
      ></div>

      <div className="w-full max-w-7xl px-4 md:px-8 relative z-30 scale-[0.85] origin-center">
        <div className="bg-neutral-900 shadow-2xl border-4 border-amber-950/50 rounded-lg overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none z-20 mix-blend-overlay blur-3xl"></div>

          {shelfLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col">
              <div className="flex bg-stone-900 relative">
                {row.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="flex-1" style={{ minWidth: 0 }}>
                    <Compartment
                      items={section.items}
                      artifacts={ARTIFACTS.filter(
                        (a) => a.row === rowIndex && a.section === sectionIndex
                      )}
                      isAnySelected={isAnySelected}
                      selectedBookId={selectedBookId}
                      onSelectBook={handleSelectBook}
                      getBookAnimationClass={getBookAnimationClass}
                    />
                  </div>
                ))}
              </div>

              <div className="h-3 relative z-20">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-900 to-stone-950 wood-grain shadow-lg"></div>
                <div className="absolute bottom-[-8px] left-0 right-0 h-3 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-16 bg-gradient-to-b from-black/80 to-transparent mt-[-4px] relative z-0 mx-4 blur-xl opacity-60"></div>
      </div>

      <ReadingModal book={selectedBook} isVisible={showModal} onClose={handleClose} />
    </div>
  );
}
