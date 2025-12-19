"use client";

import { BookData, ArtifactData } from "./types";
import { Book } from "./Book";
import { Artifact } from "./Artifact";

interface CompartmentProps {
  items: BookData[];
  artifacts: ArtifactData[];
  isAnySelected: boolean;
  selectedBookId: number | null;
  onSelectBook: (book: BookData | null) => void;
  getBookAnimationClass: (bookId: number) => string;
}

export function Compartment({
  items,
  artifacts,
  isAnySelected,
  selectedBookId,
  onSelectBook,
  getBookAnimationClass,
}: CompartmentProps) {
  return (
    <div className="relative h-52 bg-neutral-900 border-x-8 border-stone-900 overflow-visible group">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/40 pointer-events-none z-0"></div>
      <div className="absolute inset-x-0 top-0 h-4 bg-black/60 blur-sm z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 opacity-80 z-0"></div>

      <div
        className="absolute bottom-0 inset-x-0 px-2 flex items-end justify-start z-10 perspective-1000"
        style={{ paddingBottom: 0 }}
      >
        {artifacts.map((art, i) => (
          <Artifact key={`art-${i}`} type={art.type} isDimmed={isAnySelected} />
        ))}

        {items.map((book, index) => (
          <Book
            key={book.id}
            data={book}
            isSelected={selectedBookId === book.id}
            animationClass={getBookAnimationClass(book.id)}
            onSelect={onSelectBook}
            isDimmed={isAnySelected && selectedBookId !== book.id}
            isFirstInSection={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
