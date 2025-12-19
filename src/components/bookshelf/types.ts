export type BookState = "pristine" | "worn" | "aged";
export type BookCategory = "personalFavorites" | "passionStart" | "general";

export interface BookData {
  id: number;
  title: string;
  author: string;
  description: string;
  category: BookCategory;
  height: number;
  thickness: number;
  color: string;
  state: BookState;
  row: number;
  slant?: number; // Rotation angle in degrees for natural leaning effect
}

export interface BookInfo {
  title: string;
  author: string;
  description: string;
  category: BookCategory;
}

export interface ArtifactData {
  row: number;
  section: number;
  type:
    | "sculpture"
    | "notebook"
    | "camera"
    | "abstract"
    | "f1car"
    | "champsball"
    | "mercurial"
    | "mug";
}

export interface ShelfSection {
  isEmpty: boolean;
  items: BookData[];
}

export interface ShelfRowConfig {
  id: number;
  sections: number;
  empty: number[];
  wideSections?: number[]; // indices of sections that should be 2x width
  customFlex?: { [sectionIndex: number]: string }; // e.g., { 2: "1.44" }
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

// Personal Favorites (6 books) - will go in top row's BIG section
const PERSONAL_FAVORITES: BookInfo[] = [
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoyevsky",
    description:
      "A profound exploration of faith, doubt, and the human condition that left me questioning everything I thought I knew about morality and existence.",
    category: "personalFavorites",
  },
  {
    title: "The Courage to Be Disliked",
    author: "Ichiro Kishimi & Fumitake Koga",
    description:
      "This book fundamentally shifted how I think about happiness and personal responsibility—freedom comes from accepting that not everyone will like you.",
    category: "personalFavorites",
  },
  {
    title: "Normal People",
    author: "Sally Rooney",
    description:
      "A beautifully intimate portrait of love and miscommunication that captures how small moments can shape entire relationships.",
    category: "personalFavorites",
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    description:
      "A story about creativity, friendship, and the games we play—both digital and emotional. It reminded me why I fell in love with building things.",
    category: "personalFavorites",
  },
  {
    title: "The Unlikely Spy",
    author: "Daniel Silva",
    description:
      "A masterfully crafted WWII thriller that kept me turning pages late into the night. The tension and historical detail are impeccable.",
    category: "personalFavorites",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "The most practical book on behavior change I've ever read. Small habits, compounded over time, have transformed how I approach goals.",
    category: "personalFavorites",
  },
];

// Where My Passion Started (13 books) - will go in bottom row
const PASSION_START: BookInfo[] = [
  {
    title: "The Ruins of Gorlan",
    author: "John Flanagan",
    description:
      "Where it all began. Will's journey from orphan to apprentice Ranger sparked my lifelong love of reading and adventure.",
    category: "passionStart",
  },
  {
    title: "The Burning Bridge",
    author: "John Flanagan",
    description:
      "The stakes got real here. This book taught me that heroes face impossible choices and growth comes from adversity.",
    category: "passionStart",
  },
  {
    title: "The Icebound Land",
    author: "John Flanagan",
    description:
      "The darkest entry in the series. Watching Will struggle and Halt's unwavering determination to find him was gripping.",
    category: "passionStart",
  },
  {
    title: "The Battle for Skandia",
    author: "John Flanagan",
    description:
      "Epic battles, strategic warfare, and the power of unlikely alliances. This book had everything young me could ask for.",
    category: "passionStart",
  },
  {
    title: "The Sorcerer in the North",
    author: "John Flanagan",
    description:
      "Will finally becoming a full Ranger and facing new mysteries. The growth from apprentice to master is so satisfying.",
    category: "passionStart",
  },
  {
    title: "The Siege of Macindaw",
    author: "John Flanagan",
    description:
      "Teamwork, infiltration, and clever tactics. This duology showed me how patience and planning beat brute force.",
    category: "passionStart",
  },
  {
    title: "Erak's Ransom",
    author: "John Flanagan",
    description:
      "Desert adventures and debt repayment between former enemies. A reminder that honor transcends nationality.",
    category: "passionStart",
  },
  {
    title: "The Kings of Clonmel",
    author: "John Flanagan",
    description:
      "Cult manipulation and the power of belief. Surprisingly mature themes woven into an adventure story.",
    category: "passionStart",
  },
  {
    title: "Halt's Peril",
    author: "John Flanagan",
    description:
      "The most emotional book in the series. Halt's vulnerability and Will's desperation had me genuinely worried.",
    category: "passionStart",
  },
  {
    title: "The Emperor of Nihon-Ja",
    author: "John Flanagan",
    description:
      "An empire far from home, warrior codes, and the bonds of friendship tested across cultures.",
    category: "passionStart",
  },
  {
    title: "The Lost Stories",
    author: "John Flanagan",
    description:
      "Short stories filling gaps in the timeline. Like catching up with old friends and learning secrets from their past.",
    category: "passionStart",
  },
  {
    title: "The Royal Ranger",
    author: "John Flanagan",
    description:
      "Full circle. Will becomes the mentor, and a new generation begins. Bittersweet but perfect.",
    category: "passionStart",
  },
  {
    title: "Theodore Boone",
    author: "John Grisham",
    description:
      "A kid lawyer solving crimes? This series made me believe young people could make a real difference.",
    category: "passionStart",
  },
];

// General (16 books) - will fill remaining spaces
const GENERAL: BookInfo[] = [
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    description:
      "A complex portrait of genius and obsession. Jobs' relentless pursuit of perfection is both inspiring and cautionary.",
    category: "general",
  },
  {
    title: "Design for How People Think",
    author: "John Whalen",
    description:
      "Understanding cognitive psychology transformed how I approach product design and user experience.",
    category: "general",
  },
  {
    title: "The Daily Stoic",
    author: "Ryan Holiday & Stephen Hanselman",
    description:
      "Daily wisdom that grounds me. Ancient philosophy made practical for modern challenges.",
    category: "general",
  },
  {
    title: "Forbes Greatest Business Stories",
    author: "Daniel Gross",
    description:
      "From Carnegie to Disney—patterns of ambition, innovation, and persistence that shaped industries.",
    category: "general",
  },
  {
    title: "Your Next Five Moves",
    author: "Patrick Bet-David",
    description:
      "Strategic thinking applied to business and life. Think ahead, plan backwards.",
    category: "general",
  },
  {
    title: "The Way of the Superior Man",
    author: "David Deida",
    description:
      "Challenging perspectives on purpose, relationships, and masculine energy that sparked deep reflection.",
    category: "general",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    description:
      "The book that first opened my eyes to financial literacy and the difference between assets and liabilities.",
    category: "general",
  },
  {
    title: "Invent and Wander",
    author: "Jeff Bezos",
    description:
      "Bezos' letters reveal a mind obsessed with long-term thinking and customer obsession. Day 1 mentality.",
    category: "general",
  },
  {
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    description:
      "A deep dive into what drives human behavior. Understanding others starts with understanding yourself.",
    category: "general",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description:
      "A sweeping history of humanity that reframes everything from agriculture to capitalism as shared fictions.",
    category: "general",
  },
  {
    title: "The Lords of Easy Money",
    author: "Christopher Leonard",
    description:
      "How the Fed's decisions ripple through the economy. Essential reading for understanding modern finance.",
    category: "general",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description:
      "System 1 and System 2 thinking explained. This book made me aware of my own cognitive biases.",
    category: "general",
  },
  {
    title: "Python Pocket Reference",
    author: "Mark Lutz",
    description:
      "My trusty companion during late-night coding sessions. Dog-eared and coffee-stained.",
    category: "general",
  },
  {
    title: "Search Patterns",
    author: "Peter Morville & Jeff Callender",
    description:
      "Information architecture and the art of findability. How we navigate digital spaces matters.",
    category: "general",
  },
  {
    title: "$100M Leads",
    author: "Alex Hormozi",
    description:
      "Tactical, no-nonsense guide to generating leads. Hormozi's frameworks are refreshingly actionable.",
    category: "general",
  },
  {
    title: "$100M Offers",
    author: "Alex Hormozi",
    description:
      "How to create offers so good people feel stupid saying no. Changed how I think about value.",
    category: "general",
  },
];

// Combined books data in the order they should appear
export const BOOKS_DATA: BookInfo[] = [
  ...PERSONAL_FAVORITES,
  ...PASSION_START,
  ...GENERAL,
];

export const SHELF_CONFIG: ShelfRowConfig[] = [
  {
    id: 0,
    sections: 5,
    empty: [2],
    wideSections: [3],
    customFlex: { 2: "1.44" },
  }, // Top row - Personal Favorites in BIG section 3, section 2 has champsball (empty of books)
  { id: 1, sections: 4, empty: [1, 3], wideSections: [1] }, // Middle row - section 1 has f1car, section 3 has mercurial
  { id: 2, sections: 5, empty: [1, 4], wideSections: [2] }, // Bottom row - Where My Passion Started
];

export const ARTIFACTS: ArtifactData[] = [
  { row: 0, section: 2, type: "champsball" }, // Changed from sculpture
  { row: 1, section: 1, type: "f1car" }, // Big section of middle row
  { row: 1, section: 3, type: "mercurial" }, // Rightmost section of middle row
  { row: 2, section: 1, type: "mug" }, // Second section of bottom row - mom's gift mug
  { row: 2, section: 4, type: "camera" },
];

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export function generateBooks(): BookData[] {
  const random = seededRandom(42);

  return BOOKS_DATA.map((bookInfo, i) => {
    const height = 130 + random() * 45;
    const thickness = 24 + random() * 22;
    const color = BOOK_COLORS[Math.floor(random() * BOOK_COLORS.length)];
    const stateRand = random();
    const state: BookState =
      stateRand > 0.7 ? "aged" : stateRand > 0.4 ? "worn" : "pristine";

    // Assign row based on category
    let row: number;
    if (bookInfo.category === "personalFavorites") {
      row = 0; // Top row for personal favorites
    } else if (bookInfo.category === "passionStart") {
      row = 2; // Bottom row for passion books
    } else {
      row = 1; // Middle row for general (will also overflow to top row's non-big sections)
    }

    // Add random slant only to middle row books, leaning left against other books
    // Only apply to ~35% of middle row books for natural appearance
    let slant: number | undefined = undefined;
    if (row === 1) {
      const slantRand = random();
      if (slantRand < 0.35) {
        // Lean left (negative angle) so books rest against books to their left
        slant = -(8 + random() * 7); // -8 to -15 degrees (leftward lean)
      }
    }

    return {
      id: i,
      title: bookInfo.title,
      author: bookInfo.author,
      description: bookInfo.description,
      category: bookInfo.category,
      height,
      thickness,
      color,
      state,
      row,
      slant,
    };
  });
}

export function distributeBooks(books: BookData[]): ShelfSection[][] {
  const layout: ShelfSection[][] = [];

  // Separate books by category for special placement
  const personalFavorites = books.filter(
    (b) => b.category === "personalFavorites"
  );
  const passionBooks = books.filter((b) => b.category === "passionStart");
  const generalBooks = books.filter((b) => b.category === "general");

  // Row 0: Personal Favorites in BIG section (3), General in other sections
  const row0Sections: ShelfSection[] = [];
  const row0Config = SHELF_CONFIG[0];
  let generalIndex = 0;

  for (let s = 0; s < row0Config.sections; s++) {
    if (row0Config.empty.includes(s)) {
      row0Sections.push({ isEmpty: true, items: [] });
    } else if (s === 3) {
      // BIG section gets all personal favorites
      row0Sections.push({ isEmpty: false, items: personalFavorites });
    } else {
      // Other sections get general books (about 3-4 per section)
      const booksForSection = generalBooks.slice(
        generalIndex,
        generalIndex + 3
      );
      generalIndex += 3;
      row0Sections.push({ isEmpty: false, items: booksForSection });
    }
  }
  layout.push(row0Sections);

  // Row 1: General books in non-empty sections, BIG section is empty
  const row1Sections: ShelfSection[] = [];
  const row1Config = SHELF_CONFIG[1];

  for (let s = 0; s < row1Config.sections; s++) {
    if (row1Config.empty.includes(s)) {
      row1Sections.push({ isEmpty: true, items: [] });
    } else {
      // Remaining general books
      const booksForSection = generalBooks.slice(
        generalIndex,
        generalIndex + 4
      );
      generalIndex += 4;
      row1Sections.push({ isEmpty: false, items: booksForSection });
    }
  }
  layout.push(row1Sections);

  // Row 2: Passion books distributed across non-empty sections (in order)
  const row2Sections: ShelfSection[] = [];
  const row2Config = SHELF_CONFIG[2];
  const availableSections = row2Config.sections - row2Config.empty.length;
  const passionBooksPerSection = Math.ceil(
    passionBooks.length / availableSections
  );
  let passionIndex = 0;

  for (let s = 0; s < row2Config.sections; s++) {
    if (row2Config.empty.includes(s)) {
      row2Sections.push({ isEmpty: true, items: [] });
    } else {
      const booksForSection = passionBooks.slice(
        passionIndex,
        passionIndex + passionBooksPerSection
      );
      passionIndex += passionBooksPerSection;
      row2Sections.push({ isEmpty: false, items: booksForSection });
    }
  }
  layout.push(row2Sections);

  return layout;
}
