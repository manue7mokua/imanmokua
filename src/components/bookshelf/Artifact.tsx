"use client";

import { ArtifactData } from "./types";

interface ArtifactProps {
  artifact: ArtifactData;
  isSelected: boolean;
  animationClass: string;
  onSelect: (artifact: ArtifactData | null) => void;
  isDimmed: boolean;
}

export function Artifact({ artifact, isSelected, animationClass, onSelect, isDimmed }: ArtifactProps) {
  const { type } = artifact;
  
  const baseClass = `transition-all duration-500 ${
    isDimmed && !isSelected ? "brightness-[0.7] opacity-60 blur-[2px]" : "hover:brightness-110"
  }`;
  
  const containerClass = `artifact-container ${animationClass} ${
    isSelected ? "z-50" : "z-10"
  } cursor-pointer`;
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSelected) {
      onSelect(artifact);
    }
  };

  if (type === "sculpture") {
    return (
      <div
        className={`${containerClass} relative w-[40px] h-[85px] mx-auto mt-auto`}
        onClick={handleClick}
      >
        <div className={`w-full h-full bg-gradient-to-br from-stone-400 via-stone-500 to-stone-600 rounded-[50%] transform rotate-12 shadow-lg ${baseClass}`}></div>
      </div>
    );
  }

  if (type === "notebook") {
    return (
      <div
        className={`${containerClass} relative w-[22px] h-[100px] ml-2 mr-2 mt-auto`}
        onClick={handleClick}
      >
        <div className={`bg-amber-700 rounded-sm shadow-md w-full h-full ${baseClass}`}>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-yellow-600 rounded-full opacity-80"></div>
          <div className="w-full h-full border-l-2 border-amber-900/30"></div>
        </div>
      </div>
    );
  }

  if (type === "camera") {
    return (
      <div
        className={`${containerClass} absolute left-1/2 -translate-x-1/2 w-[160px] h-[120px]`}
        style={{
          bottom: "-32px",
          marginBottom: 0,
          paddingBottom: 0,
          lineHeight: 0,
        }}
        onClick={handleClick}
      >
        <img
          src={artifact.imagePath}
          alt={artifact.title}
          className={`w-full h-full object-contain ${baseClass}`}
          style={{
            display: "block",
            objectPosition: "center bottom",
            marginBottom: 0,
            paddingBottom: 0,
            verticalAlign: "bottom",
            lineHeight: 0,
          }}
        />
      </div>
    );
  }

  if (type === "abstract") {
    return (
      <div
        className={`${containerClass} relative w-[38px] h-[80px] mx-auto mt-auto flex flex-col gap-1.5 items-center justify-end`}
        onClick={handleClick}
      >
        <div className={`w-6 h-6 border-2 border-amber-500/50 transform rotate-45 ${baseClass}`}></div>
        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr from-stone-800 to-stone-600 shadow-lg ${baseClass}`}></div>
      </div>
    );
  }

  if (type === "f1car") {
    return (
      <div
        className={`${containerClass} absolute left-1/2 -translate-x-1/2 w-[400px] h-[160px]`}
        style={{
          bottom: "-56px",
          marginBottom: 0,
          paddingBottom: 0,
          lineHeight: 0,
        }}
        onClick={handleClick}
      >
        <img
          src={artifact.imagePath}
          alt={artifact.title}
          className={`w-full h-full object-contain ${baseClass}`}
          style={{
            display: "block",
            objectPosition: "center bottom",
            marginBottom: 0,
            paddingBottom: 0,
            verticalAlign: "bottom",
            lineHeight: 0,
          }}
        />
      </div>
    );
  }

  if (type === "champsball") {
    return (
      <div
        className={`${containerClass} absolute left-1/2 -translate-x-1/2 w-[210px] h-[210px]`}
        style={{
          bottom: "-40px",
          marginBottom: 0,
          paddingBottom: 0,
          lineHeight: 0,
        }}
        onClick={handleClick}
      >
        <img
          src={artifact.imagePath}
          alt={artifact.title}
          className={`w-full h-full object-contain ${baseClass}`}
          style={{
            display: "block",
            objectPosition: "center bottom",
            marginBottom: 0,
            paddingBottom: 0,
            verticalAlign: "bottom",
            lineHeight: 0,
          }}
        />
      </div>
    );
  }

  if (type === "mercurial") {
    return (
      <div
        className={`${containerClass} absolute left-1/2 -translate-x-1/2 w-[140px] h-[140px]`}
        style={{
          bottom: "-30px",
          marginBottom: 0,
          paddingBottom: 0,
          lineHeight: 0,
        }}
        onClick={handleClick}
      >
        <img
          src={artifact.imagePath}
          alt={artifact.title}
          className={`w-full h-full object-contain ${baseClass}`}
          style={{
            display: "block",
            objectPosition: "center bottom",
            marginBottom: 0,
            paddingBottom: 0,
            verticalAlign: "bottom",
            lineHeight: 0,
          }}
        />
      </div>
    );
  }

  if (type === "mug") {
    return (
      <div
        className={`${containerClass} absolute left-1/2 -translate-x-1/2 w-[200px] h-[200px]`}
        style={{
          bottom: "-44px",
          marginBottom: 0,
          paddingBottom: 0,
          lineHeight: 0,
        }}
        onClick={handleClick}
      >
        <img
          src={artifact.imagePath}
          alt={artifact.title}
          className={`w-full h-full object-contain ${baseClass}`}
          style={{
            display: "block",
            objectPosition: "center bottom",
            marginBottom: 0,
            paddingBottom: 0,
            verticalAlign: "bottom",
            lineHeight: 0,
          }}
        />
      </div>
    );
  }

  return null;
}
