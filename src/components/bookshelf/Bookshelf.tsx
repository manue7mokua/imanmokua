"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  BookData,
  ArtifactData,
  SelectedItem,
  generateBooks,
  distributeBooks,
  ARTIFACTS,
  SHELF_CONFIG,
} from "./types";
import { Compartment } from "./Compartment";
import { ReadingModal } from "./ReadingModal";
import { MobileCoverFeed } from "./MobileCoverFeed";

type AnimationPhase = "idle" | "pulling" | "open" | "closing";

export function Bookshelf() {
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>("idle");
  const [showModal, setShowModal] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const books = useMemo(() => generateBooks(), []);
  const shelfLayout = useMemo(() => distributeBooks(books), [books]);

  const selectedBook = useMemo(
    () => books.find((b) => b.id === selectedBookId) || null,
    [books, selectedBookId]
  );

  const selectedArtifact = useMemo(
    () => ARTIFACTS.find((a) => a.id === selectedArtifactId) || null,
    [selectedArtifactId]
  );

  const selectedItem = useMemo<SelectedItem | null>(() => {
    if (selectedBook) {
      return {
        id: selectedBook.id,
        imagePath: selectedBook.coverImage,
        title: selectedBook.title,
      };
    }
    if (selectedArtifact) {
      return {
        id: selectedArtifact.id,
        imagePath: selectedArtifact.imagePath,
        title: selectedArtifact.title,
      };
    }
    return null;
  }, [selectedBook, selectedArtifact]);

  useEffect(() => {
    const evaluateLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const shortSide = Math.min(width, height);
      const isPhoneViewport = shortSide < 768;
      const isTabletPortrait = width <= 1024 && isPortrait;
      const shouldUseMobileLayout = isPhoneViewport || isTabletPortrait;

      setIsMobileLayout(shouldUseMobileLayout);
    };

    evaluateLayout();
    window.addEventListener("resize", evaluateLayout);
    window.addEventListener("orientationchange", evaluateLayout);

    return () => {
      window.removeEventListener("resize", evaluateLayout);
      window.removeEventListener("orientationchange", evaluateLayout);
    };
  }, []);

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleSelectBook = useCallback(
    (book: BookData | null) => {
      clearTimeouts();

      if (isMobileLayout && book) {
        if (showModal) return;
        setSelectedArtifactId(null);
        setSelectedBookId(book.id);
        setAnimationPhase("open");
        setShowModal(true);
        return;
      }

      if (book && animationPhase === "idle") {
        setSelectedArtifactId(null);
        setSelectedBookId(book.id);
        setAnimationPhase("pulling");

        timeoutRef.current = setTimeout(() => {
          setAnimationPhase("open");
          setShowModal(true);
        }, 700);
      }
    },
    [animationPhase, clearTimeouts, isMobileLayout, showModal]
  );

  const handleSelectArtifact = useCallback(
    (artifact: ArtifactData | null) => {
      clearTimeouts();

      if (artifact && animationPhase === "idle") {
        setSelectedBookId(null);
        setSelectedArtifactId(artifact.id);
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
    clearTimeouts();

    if (isMobileLayout) {
      setShowModal(false);
      setAnimationPhase("idle");
      setSelectedBookId(null);
      setSelectedArtifactId(null);
      return;
    }

    if (animationPhase !== "open") return;

    setShowModal(false);
    setAnimationPhase("closing");

    timeoutRef.current = setTimeout(() => {
      setAnimationPhase("idle");
      setSelectedBookId(null);
      setSelectedArtifactId(null);
    }, 700);
  }, [animationPhase, clearTimeouts, isMobileLayout]);

  const handleBgClick = () => {
    if (animationPhase === "open") {
      handleClose();
    }
  };

  const getBookAnimationClass = (bookId: number): string => {
    if (selectedBookId !== bookId) return "";
    if (animationPhase === "pulling" || animationPhase === "closing")
      return "pulling";
    if (animationPhase === "open") return "open";
    return "";
  };

  const getArtifactAnimationClass = (artifactId: string): string => {
    if (selectedArtifactId !== artifactId) return "";
    if (animationPhase === "pulling" || animationPhase === "closing")
      return "pulling";
    if (animationPhase === "open") return "open";
    return "";
  };

  const isAnySelected = animationPhase !== "idle";
  const shouldBlurBackground = animationPhase === "open";

  if (isMobileLayout) {
    return (
      <div className="h-full relative overflow-hidden">
        <MobileCoverFeed
          books={books}
          isPaused={showModal}
          onSelectBook={handleSelectBook}
        />
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-[3px] pointer-events-none z-40 transition-opacity duration-300 ${
            showModal ? "opacity-100" : "opacity-0"
          }`}
        />
        <ReadingModal
          item={selectedItem}
          isVisible={showModal}
          onClose={handleClose}
        />
      </div>
    );
  }

  return (
    <div
      className="h-full relative flex flex-col items-center justify-center overflow-hidden"
      onClick={handleBgClick}
    >
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-[3px] z-40 pointer-events-none transition-all duration-500 ease-out ${
          shouldBlurBackground ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <div className="w-full max-w-7xl px-4 md:px-8 relative z-30 scale-[0.85] origin-center">
        <div className="bg-neutral-900 shadow-2xl border-12 border-amber-950/50 rounded-lg overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none z-20 mix-blend-overlay blur-3xl"></div>

          {shelfLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col">
              <div className="flex bg-stone-900 relative">
                {row.map((section, sectionIndex) => {
                  const rowConfig = SHELF_CONFIG[rowIndex];
                  const isWide = rowConfig.wideSections?.includes(sectionIndex);
                  const customFlex = rowConfig.customFlex?.[sectionIndex];

                  const flexValue = customFlex
                    ? customFlex
                    : isWide
                    ? "2"
                    : "1.2";

                  return (
                    <div
                      key={sectionIndex}
                      style={{ minWidth: 0, flex: flexValue }}
                    >
                      <Compartment
                        items={section.items}
                        artifacts={ARTIFACTS.filter(
                          (a) =>
                            a.row === rowIndex && a.section === sectionIndex
                        )}
                        isAnySelected={isAnySelected}
                        selectedBookId={selectedBookId}
                        selectedArtifactId={selectedArtifactId}
                        onSelectBook={handleSelectBook}
                        onSelectArtifact={handleSelectArtifact}
                        getBookAnimationClass={getBookAnimationClass}
                        getArtifactAnimationClass={getArtifactAnimationClass}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="h-6 relative z-20">
                <div className="absolute inset-0 bg-stone-900"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-16 bg-gradient-to-b from-black/80 to-transparent mt-[-4px] relative z-0 mx-4 blur-xl opacity-60"></div>
      </div>

      <ReadingModal
        item={selectedItem}
        isVisible={showModal}
        onClose={handleClose}
      />
    </div>
  );
}
