"use client";

import Image from "next/image";
import { FileDigit } from "lucide-react";

export function XPDownload() {
  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = "/documents/Iman Mokua Resume.pdf";
    link.download = "Iman Mokua Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative flex items-center">
      <button
        onClick={handleDownload}
        className="relative z-10 flex items-center space-x-2 cursor-pointer hover:text-accent focus:outline-none active:scale-110 transition-transform duration-150"
        aria-label="Download resume"
        type="button"
      >
        <FileDigit className="h-4 w-4 text-muted-foreground transition-transform duration-150" />
      </button>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-full z-30 mr-2 -mt-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <div className="resume-preview-card w-[clamp(30px,5.5vw,43px)]">
          <Image
            src="/documents/resume_preview.png"
            alt="Resume preview"
            width={360}
            height={510}
            className="h-auto w-full rounded-md border border-border/70 shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
