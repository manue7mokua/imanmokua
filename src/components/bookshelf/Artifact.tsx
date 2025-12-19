"use client";

interface ArtifactProps {
  type:
    | "sculpture"
    | "notebook"
    | "camera"
    | "abstract"
    | "f1car"
    | "champsball"
    | "mercurial";
  isDimmed: boolean;
}

export function Artifact({ type, isDimmed }: ArtifactProps) {
  const baseClass = `transition-all duration-500 ${
    isDimmed ? "brightness-[0.7] opacity-60 blur-[2px]" : "hover:brightness-110"
  }`;

  if (type === "sculpture") {
    return (
      <div
        className={`relative w-[40px] h-[85px] mx-auto mt-auto ${baseClass}`}
      >
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
        className={`absolute left-1/2 -translate-x-1/2 w-[160px] h-[120px] ${baseClass}`}
        style={{
          bottom: "-32px",
          marginBottom: 0,
          paddingBottom: 0,
          lineHeight: 0,
        }}
      >
        <img
          src="/djiosmoaction.png"
          alt="DJI Osmo Action"
          className="w-full h-full object-contain"
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
        className={`relative w-[38px] h-[80px] mx-auto mt-auto flex flex-col gap-1.5 items-center justify-end ${baseClass}`}
      >
        <div className="w-6 h-6 border-2 border-amber-500/50 transform rotate-45"></div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-stone-800 to-stone-600 shadow-lg"></div>
      </div>
    );
  }

  if (type === "f1car") {
    return (
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-[400px] h-[160px] ${baseClass}`}
        style={{
          bottom: "-56px",
          marginBottom: 0,
          paddingBottom: 0,
          lineHeight: 0,
        }}
      >
        <img
          src="/rb16b_2021_transparent.png"
          alt="Red Bull RB16B F1 Car"
          className="w-full h-full object-contain"
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
        className={`absolute left-1/2 -translate-x-1/2 w-[210px] h-[210px] ${baseClass}`}
        style={{
          bottom: "-40px",
          marginBottom: 0,
          paddingBottom: 0,
          lineHeight: 0,
        }}
      >
        <img
          src="/champs_ball.png"
          alt="Championship Ball"
          className="w-full h-full object-contain"
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
        className={`absolute left-1/2 -translate-x-1/2 w-[140px] h-[140px] ${baseClass}`}
        style={{
          bottom: "-30px",
          marginBottom: 0,
          paddingBottom: 0,
          lineHeight: 0,
        }}
      >
        <img
          src="/neymar_mercurial.png"
          alt="Neymar Mercurial Boots"
          className="w-full h-full object-contain"
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
