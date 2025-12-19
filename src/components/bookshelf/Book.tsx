"use client";

import { BookData } from "./types";

interface BookProps {
  data: BookData;
  isSelected: boolean;
  animationClass: string;
  onSelect: (book: BookData | null) => void;
  isDimmed: boolean;
  isFirstInSection?: boolean;
}

export function Book({
  data,
  isSelected,
  animationClass,
  onSelect,
  isDimmed,
  isFirstInSection = false,
}: BookProps) {
  const wearClass =
    data.state === "worn"
      ? "opacity-95"
      : data.state === "aged"
      ? "opacity-90 saturate-[0.75]"
      : "";
  const spineTitleSize =
    data.thickness < 30 ? "text-[0.5rem]" : "text-[0.55rem]";

  // Only apply slant if book has one and is not the first in section (has a book to lean against)
  const shouldSlant = data.slant && !isFirstInSection;

  // Calculate horizontal offset to prevent slanted books from overlapping into adjacent books
  let horizontalOffset = 0;
  if (shouldSlant && data.slant) {
    const slantRadians = (Math.abs(data.slant) * Math.PI) / 180;
    horizontalOffset = data.height * Math.sin(slantRadians);
  }

  return (
    <div
      className={`book-container group relative mx-[1px] ${animationClass}`}
      style={{
        height: `${data.height}px`,
        width: `${data.thickness}px`,
        zIndex: isSelected ? 50 : 10,
        transform: shouldSlant
          ? `translateX(${horizontalOffset}px) rotate(${data.slant}deg)`
          : undefined,
        transformOrigin: shouldSlant ? "bottom center" : undefined,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isSelected) {
          onSelect(data);
        }
      }}
    >
      <div
        className={`book-spine ${
          data.color
        } ${wearClass} shadow-inner flex flex-col items-center justify-center border-l border-white/5 border-r border-black/20 overflow-hidden transition-all duration-700 ease-out ${
          isDimmed ? "brightness-[0.6] opacity-50 blur-[3px]" : ""
        }`}
      >
        <div className="absolute inset-0 book-texture opacity-20 pointer-events-none"></div>

        {data.state === "aged" && (
          <>
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent"></div>
          </>
        )}

        <div
          className={`vertical-text font-serif uppercase tracking-wider text-amber-100/90 mix-blend-overlay ${spineTitleSize} line-clamp-2 px-1 text-center select-none`}
        >
          {data.title}
        </div>
      </div>

      <div
        className={`book-cover ${data.color} rounded-r-sm shadow-2xl flex flex-col items-center justify-center p-4 border border-white/10`}
      >
        <div className="absolute inset-0 book-texture opacity-10 pointer-events-none"></div>
        <div className="w-full h-full border border-amber-100/10 p-2 flex flex-col items-center justify-center text-center">
          <h3 className="font-serif text-xl text-amber-50 mb-2 leading-tight">
            {data.title}
          </h3>
          <div className="w-8 h-[1px] bg-amber-200/50 mb-2"></div>
          <p className="font-serif italic text-amber-100/70 text-sm">
            {data.author}
          </p>
        </div>
      </div>
    </div>
  );
}
