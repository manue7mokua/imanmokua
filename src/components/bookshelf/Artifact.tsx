"use client";

interface ArtifactProps {
  type: "sculpture" | "notebook" | "camera" | "abstract";
  isDimmed: boolean;
}

export function Artifact({ type, isDimmed }: ArtifactProps) {
  const baseClass = `transition-all duration-500 ${isDimmed ? "brightness-[0.7] opacity-60 blur-[2px]" : "hover:brightness-110"}`;

  if (type === "sculpture") {
    return (
      <div className={`relative w-[40px] h-[85px] mx-auto mt-auto ${baseClass}`}>
        <div className="w-full h-full bg-gradient-to-br from-stone-400 via-stone-500 to-stone-600 rounded-[50%] transform rotate-12 shadow-lg"></div>
      </div>
    );
  }

  if (type === "notebook") {
    return (
      <div
        className={`relative w-[22px] h-[100px] ml-2 mr-2 mt-auto bg-amber-700 rounded-sm shadow-md ${baseClass}`}
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-yellow-600 rounded-full opacity-80"></div>
        <div className="w-full h-full border-l-2 border-amber-900/30"></div>
      </div>
    );
  }

  if (type === "camera") {
    return (
      <div
        className={`relative w-[60px] h-[55px] mx-auto mt-auto bg-slate-800 rounded-lg shadow-xl flex items-center justify-center ${baseClass}`}
      >
        <div className="w-12 h-12 rounded-full bg-slate-900 border-3 border-slate-700 shadow-inner flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-indigo-900/50 backdrop-blur-sm"></div>
        </div>
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-900 rounded-full"></div>
      </div>
    );
  }

  if (type === "abstract") {
    return (
      <div
        className={`relative w-[38px] h-[80px] mx-auto mt-auto flex flex-col gap-1.5 items-center justify-end ${baseClass}`}
      >
        <div className="w-6 h-6 border-2 border-amber-500/50 transform rotate-45"></div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-stone-800 to-stone-600 shadow-lg"></div>
      </div>
    );
  }

  return null;
}
