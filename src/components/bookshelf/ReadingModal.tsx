"use client";

import { BookData } from "./types";

interface ReadingModalProps {
  book: BookData | null;
  isVisible: boolean;
  onClose: () => void;
}

const getCategoryLabel = (category: BookData["category"]): string => {
  switch (category) {
    case "personalFavorites":
      return "Personal Favorite";
    case "passionStart":
      return "Where My Passion Started";
    case "general":
      return "General Reading";
  }
};

export function ReadingModal({ book, isVisible, onClose }: ReadingModalProps) {
  if (!book) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 pointer-events-none ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`text-neutral-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col md:flex-row transform origin-center pointer-events-auto ${
          isVisible ? "animate-modal-in" : "animate-modal-out"
        }`}
        style={{
          backgroundImage: "url('/paper_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="md:w-2/5 p-8 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div
            className="relative z-10 border-4 border-neutral-300/50 rounded-lg shadow-xl aspect-[2/3] max-h-full overflow-hidden"
          >
            <img
              src={book.coverImage}
              alt={`${book.title} by ${book.author}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          <div className="mt-8 flex gap-2">
            <span className="px-3 py-1 bg-neutral-700/60 rounded-full text-xs text-neutral-200 uppercase tracking-widest border border-neutral-500/30">
              {getCategoryLabel(book.category)}
            </span>
          </div>
        </div>

        <div className="md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar relative">
          <button
            onClick={onClose}
            title="Close"
            aria-label="Close modal"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-neutral-500"
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

          <div className="max-w-xl mx-auto">
            <header className="mb-10 border-b border-neutral-100 pb-8">
              <h2 className="font-serif text-4xl text-neutral-900 mb-2">
                {book.title}
              </h2>
              <p className="text-neutral-500 font-sans text-sm tracking-wide uppercase">
                By {book.author}
              </p>
            </header>

            <div className="space-y-8">
              <section>
                <h3 className="font-sans text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
                  Personal Reflection
                </h3>
                <p className="font-serif text-lg leading-relaxed text-neutral-700">
                  {book.description}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
