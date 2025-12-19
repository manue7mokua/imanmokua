export type BookState = "pristine" | "worn" | "aged";

export interface BookData {
  id: number;
  title: string;
  author: string;
  height: number;
  thickness: number;
  color: string;
  state: BookState;
  row: number;
}

export interface ArtifactData {
  row: number;
  section: number;
  type: "sculpture" | "notebook" | "camera" | "abstract";
}

export interface ShelfSection {
  isEmpty: boolean;
  items: BookData[];
}

export interface ShelfRowConfig {
  id: number;
  sections: number;
  empty: number[];
}

export const BOOK_COLORS = [
  "bg-amber-900",
  "bg-amber-800",
  "bg-stone-800",
  "bg-red-950",
  "bg-emerald-950",
  "bg-slate-900",
  "bg-orange-950",
  "bg-neutral-800",
];

export const BOOK_TITLES = [
  "Thinking in Systems",
  "The Nature of Order",
  "Godel, Escher, Bach",
  "The Design of Everyday Things",
  "How Buildings Learn",
  "Finite and Infinite Games",
  "The Society of Mind",
  "Cybernetics",
  "Ways of Seeing",
  "The Visual Display of Quantitative Info",
  "Understanding Media",
  "The Tao of Physics",
  "The Craftsman",
  "Shop Class as Soulcraft",
  "The Nature and Art of Workmanship",
  "Code as Creative Medium",
  "The Mythical Man-Month",
  "A Pattern Language",
  "The Pragmatic Programmer",
  "SICP",
  "Design Patterns",
  "The Timeless Way of Building",
  "The Elements of Typographic Style",
  "The Shape of Design",
  "Zen and the Art of Motorcycle Maintenance",
  "The Innovator's Dilemma",
  "Antifragile",
  "The Black Swan",
  "Metaphors We Live By",
  "The Structure of Scientific Revolutions",
  "Lateral Thinking",
  "Surely You're Joking",
  "The Beginning of Infinity",
  "The Righteous Mind",
  "Seeing Like a State",
  "The Quark and the Jaguar",
  "Where Good Ideas Come From",
  "I Am a Strange Loop",
  "Steve Jobs",
  "The Soul of a New Machine",
  "The Inevitable",
  "Team Human",
  "The Information",
  "The Master Switch",
  "Algorithms to Live By",
  "The Cathedral and the Bazaar",
  "Weapons of Math Destruction",
  "The Shallows",
  "The Second Machine Age",
  "Dealers of Lightning",
];

export const BOOK_AUTHORS = [
  "Donella Meadows",
  "Christopher Alexander",
  "Douglas Hofstadter",
  "Don Norman",
  "Stewart Brand",
  "James Carse",
  "Marvin Minsky",
  "Norbert Wiener",
  "John Berger",
  "Edward Tufte",
  "Marshall McLuhan",
  "Fritjof Capra",
  "Richard Sennett",
  "Matthew Crawford",
  "David Pye",
  "Golan Levin",
  "Fred Brooks",
  "Alexander et al",
  "Hunt & Thomas",
  "Abelson & Sussman",
  "Gamma et al",
  "Christopher Alexander",
  "Robert Bringhurst",
  "Frank Chimero",
  "Robert Pirsig",
  "Clayton Christensen",
  "Nassim Taleb",
  "Nassim Taleb",
  "Lakoff & Johnson",
  "Thomas Kuhn",
  "Edward de Bono",
  "Richard Feynman",
  "David Deutsch",
  "Jonathan Haidt",
  "James C. Scott",
  "Murray Gell-Mann",
  "Steven Johnson",
  "Douglas Hofstadter",
  "Walter Isaacson",
  "Tracy Kidder",
  "Kevin Kelly",
  "Douglas Rushkoff",
  "James Gleick",
  "Tim Wu",
  "Brian Christian",
  "Eric Raymond",
  "Cathy O'Neil",
  "Nicholas Carr",
  "Brynjolfsson",
  "Michael Hiltzik",
];

export const SHELF_CONFIG: ShelfRowConfig[] = [
  { id: 0, sections: 6, empty: [2] },
  { id: 1, sections: 5, empty: [3] },
  { id: 2, sections: 6, empty: [1, 4, 5] },
];

export const ARTIFACTS: ArtifactData[] = [
  { row: 0, section: 2, type: "sculpture" },
  { row: 1, section: 1, type: "notebook" },
  { row: 2, section: 4, type: "camera" },
  { row: 2, section: 5, type: "abstract" },
];

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export function generateBooks(): BookData[] {
  const random = seededRandom(42);

  return Array.from({ length: 50 }, (_, i) => {
    const height = 130 + random() * 45;
    const thickness = 24 + random() * 22;
    const color = BOOK_COLORS[Math.floor(random() * BOOK_COLORS.length)];
    const stateRand = random();
    const state: BookState =
      stateRand > 0.7 ? "aged" : stateRand > 0.4 ? "worn" : "pristine";

    return {
      id: i,
      title: BOOK_TITLES[i] || `Book Title ${i}`,
      author: BOOK_AUTHORS[i] || "Author Name",
      height,
      thickness,
      color,
      state,
      row: i < 18 ? 0 : i < 35 ? 1 : 2,
    };
  });
}

export function distributeBooks(books: BookData[]): ShelfSection[][] {
  const layout: ShelfSection[][] = [];

  SHELF_CONFIG.forEach((rowConfig, rowIndex) => {
    const rowSections: ShelfSection[] = [];
    const rowBooks = books.filter((b) => b.row === rowIndex);
    let rowBookIndex = 0;

    const availableSections = rowConfig.sections - rowConfig.empty.length;
    const booksPerSection = Math.ceil(rowBooks.length / availableSections);

    for (let s = 0; s < rowConfig.sections; s++) {
      if (rowConfig.empty.includes(s)) {
        rowSections.push({ isEmpty: true, items: [] });
      } else {
        const sectionBooks = rowBooks.slice(
          rowBookIndex,
          rowBookIndex + booksPerSection
        );
        rowBookIndex += booksPerSection;
        rowSections.push({ isEmpty: false, items: sectionBooks });
      }
    }
    layout.push(rowSections);
  });

  return layout;
}
