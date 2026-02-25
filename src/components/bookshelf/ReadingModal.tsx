"use client";

import { useEffect, useState } from "react";
import { SelectedItem } from "./types";

interface ReadingModalProps {
  item: SelectedItem | null;
  isVisible: boolean;
  onClose: () => void;
}

export function ReadingModal({ item, isVisible, onClose }: ReadingModalProps) {
  const [isTabletPortrait, setIsTabletPortrait] = useState(false);

  useEffect(() => {
    const evaluateViewport = () => {
      const width = window.innerWidth;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setIsTabletPortrait(width >= 768 && width <= 1024 && isPortrait);
    };

    evaluateViewport();
    window.addEventListener("resize", evaluateViewport);
    window.addEventListener("orientationchange", evaluateViewport);

    return () => {
      window.removeEventListener("resize", evaluateViewport);
      window.removeEventListener("orientationchange", evaluateViewport);
    };
  }, []);

  if (!item) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] h-dvh w-screen transition-opacity duration-300 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Close button - top right of viewport */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        title="Close"
        aria-label="Close modal"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-neutral-500 pointer-events-auto z-[70]"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </button>

      {/* Centered item display */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div
          className={`transform origin-center pointer-events-auto ${
            isVisible ? "animate-modal-in" : "animate-modal-out"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="relative w-auto max-w-[66vw] max-h-[56vh] sm:max-w-[70vw] sm:max-h-[62vh] md:max-w-[76vw] md:max-h-[70vh] lg:max-w-[84vw] lg:max-h-[78vh] xl:max-w-[90vw] xl:max-h-[85vh]"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.3)',
              ...(isTabletPortrait ? { maxWidth: "52vw", maxHeight: "54vh" } : {}),
            }}
          >
            <img
              src={item.imagePath}
              alt={item.title}
              className="w-auto h-auto max-w-full max-h-full object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
