"use client";

import { BookData } from "./types";

interface ReadingModalProps {
  book: BookData | null;
  isVisible: boolean;
  onClose: () => void;
}

const SAMPLE_NOTES = [
  "The core argument rests on a counter-intuitive premise that proved resilient to scrutiny.",
  "Chapter 4 contains the most lucid explanation of the phenomenon I've encountered.",
  "Interesting parallel to early 20th-century systems thinking.",
  "A reminder that complexity is often just simplicity multiplied by time.",
];

export function ReadingModal({ book, isVisible, onClose }: ReadingModalProps) {
  if (!book) return null;

  const authorLastName = book.author.split(" ").pop() || book.author;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 pointer-events-none ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white text-neutral-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col md:flex-row transform origin-center pointer-events-auto ${isVisible ? "animate-modal-in" : "animate-modal-out"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`md:w-2/5 ${book.color} p-8 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/10 book-texture mix-blend-overlay"></div>
          <div className="relative z-10 border-4 border-white/20 p-6 md:p-8 rounded-lg shadow-xl aspect-[2/3] max-h-full flex flex-col justify-center bg-white/5 backdrop-blur-sm">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">
              {book.title}
            </h2>
            <p className="text-amber-100/80 font-serif italic text-xl">{book.author}</p>
          </div>

          <div className="mt-8 flex gap-2">
            <span className="px-3 py-1 bg-black/20 rounded-full text-xs text-white/70 uppercase tracking-widest backdrop-blur-md border border-white/10">
              {book.state} Condition
            </span>
          </div>
        </div>

        <div className="md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-white relative">
          <button
            onClick={onClose}
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
              <h2 className="font-serif text-4xl text-neutral-900 mb-2">{book.title}</h2>
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
                  This volume has earned its place on the shelf through sheer density of
                  insight. The way {authorLastName} approaches the subject matter reveals a
                  deep understanding of the interconnectedness of things. Reading it felt
                  like having a conversation with a mentor who respects your intelligence
                  but challenges your assumptions. The margins are filled with my own
                  scrawlings—arguments, agreements, and moments of sudden clarity.
                </p>
              </section>

              <section>
                <h3 className="font-sans text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
                  Key Notes & Marginalia
                </h3>
                <ul className="space-y-4">
                  {SAMPLE_NOTES.map((note, i) => (
                    <li
                      key={i}
                      className="pl-6 border-l-2 border-neutral-200 font-serif italic text-neutral-600 leading-relaxed"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
