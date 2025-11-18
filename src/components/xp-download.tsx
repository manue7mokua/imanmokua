"use client";

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
    <button
      onClick={handleDownload}
      className="flex items-center space-x-2 cursor-pointer hover:text-accent focus:outline-none active:scale-110 transition-transform duration-150"
      aria-label="Download resume"
      type="button"
    >
      <FileDigit className="h-4 w-4 text-muted-foreground transition-transform duration-150" />
    </button>
  );
}
