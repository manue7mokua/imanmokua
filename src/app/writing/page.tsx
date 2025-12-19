"use client";

import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";

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
      { title: "what we can learn from neymar", slug: "what-we-can-learn-from-neymar" },
    ],
  },
  {
    year: "2025",
    posts: [
      { title: "meaningful outcomes", slug: "meaningful-outcomes" },
      { title: "try, pray, try again", slug: "try-pray-try-again" },
    ],
  },
];

export default function WritingPage() {
  return (
    <main className="bg-background min-h-screen">
      <AppHeader barClassName="h-14 items-end pb-2" />

      <div className="pt-14 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        {/* Back to home link */}
        <div className="pt-6 pb-8">
          <Link 
            href="/" 
            className="font-mono text-sm text-foreground underline hover:opacity-70 transition-opacity"
          >
            ← Back to home
          </Link>
        </div>

        {/* Page title */}
        <h1 className="font-mono text-lg font-bold mb-10">
          Thoughts...
        </h1>

        {/* Blog posts by year */}
        <div className="space-y-1">
          {blogPosts.map((yearSection) => (
            <div key={yearSection.year} className="flex">
              {/* Year label */}
              <div className="w-16 md:w-20 shrink-0 font-mono text-sm text-foreground/60">
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
                        className="font-mono text-sm underline hover:opacity-70 transition-opacity inline-flex items-center gap-1"
                      >
                        {post.title}
                        <span className="text-xs">↗</span>
                      </a>
                    ) : (
                      <Link
                        href={`/writing/${post.slug}`}
                        className="font-mono text-sm underline hover:opacity-70 transition-opacity"
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
