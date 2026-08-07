"use client";

import Link from "next/link";
import { WritingHeader } from "@/features/writing/WritingHeader";
import styles from "@/features/writing/writing.module.css";

interface BlogPost {
  title: string;
  slug?: string;
  isExternal?: boolean;
  externalUrl?: string;
}

interface YearSection {
  year: string;
  posts: BlogPost[];
}

const blogPosts: YearSection[] = [
  {
    year: "2026",
    posts: [
      {
        title: "better-sibling",
        slug: "better-sibling",
      },
      {
        title: "the inner game of confidence",
        slug: "the-inner-game-of-confidence",
      },
      {
        title: "read highly technical blogs",
        slug: "read-highly-technical-blogs",
      },
      {
        title: "what we can learn from neymar",
        slug: "what-we-can-learn-from-neymar",
      },
      { title: "meaningful outcomes", 
        slug: "meaningful-outcomes" 
      },
      { title: "try, pray, try again", 
        slug: "try-pray-try-again" 
      },
    ],
  },
];

export default function WritingPage() {
  return (
    <main className="bg-background min-h-screen">
      <WritingHeader />

      <div className="mx-auto max-w-4xl px-6 pt-10 md:px-12 lg:px-24">
        {/* Blog posts by year */}
        <div className={`${styles.postList} space-y-1`}>
          {blogPosts.map((yearSection) => (
            <div key={yearSection.year} className="flex">
              {/* Year label */}
              <div className="w-16 shrink-0 text-sm text-foreground/60 md:w-20">
                {yearSection.year}
              </div>

              {/* Posts for this year */}
              <div className="flex-1 space-y-1">
                {yearSection.posts.map((post, index) => (
                  <div key={index}>
                    {post.isExternal && post.externalUrl ? (
                      <a
                        href={post.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="animated-link text-sm transition-opacity hover:opacity-70"
                      >
                        {post.title}
                      </a>
                    ) : (
                      <Link
                        href={`/writing/${post.slug}`}
                        className="animated-link text-sm transition-opacity hover:opacity-70"
                      >
                        {post.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
