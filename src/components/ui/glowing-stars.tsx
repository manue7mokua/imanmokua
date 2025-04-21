"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlowingStarsBackground = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("fixed inset-0 z-[-1] overflow-hidden", className)}>
      <div className="absolute inset-0">
        <Illustration />
      </div>
      {children}
    </div>
  );
};

export const Illustration = () => {
  const stars = 150; // Increased number of stars for better effect

  const [glowingStars, setGlowingStars] = useState<number[]>([]);

  // Generate random positions for all stars once
  const starPositions = useRef<
    Array<{ x: string; y: string; size: number; opacity: number }>
  >([]);

  // Initialize star positions if empty
  if (starPositions.current.length === 0) {
    starPositions.current = Array.from({ length: stars }, () => ({
      // Random percentage positions across the viewport
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      // Vary star sizes slightly for depth effect
      size: Math.random() * 1.5 + 0.5,
      // Vary the base opacity
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }

  const highlightedStars = useRef<number[]>([]);

  useEffect(() => {
    // Randomly select stars to glow every 3 seconds
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [stars]);

  return (
    <div className="h-full w-full relative">
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 15) * 0.1;
        const position = starPositions.current[starIdx];

        return (
          <div
            key={`star-${starIdx}`}
            className="absolute"
            style={{
              left: position.x,
              top: position.y,
              opacity: position.opacity,
            }}
          >
            <Star isGlowing={isGlowing} delay={delay} size={position.size} />
            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} size={position.size * 3} />}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Add a few larger "highlight" stars for visual interest */}
      {[...Array(15)].map((_, idx) => {
        const position = {
          x: `${Math.random() * 100}%`,
          y: `${Math.random() * 100}%`,
        };
        return (
          <div
            key={`highlight-star-${idx}`}
            className="absolute"
            style={{ left: position.x, top: position.y }}
          >
            <motion.div
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              className="h-[2px] w-[2px] rounded-full bg-white"
            />
          </div>
        );
      })}
    </div>
  );
};

const Star = ({
  isGlowing,
  delay,
  size,
}: {
  isGlowing: boolean;
  delay: number;
  size: number;
}) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      className={cn("bg-[#666] rounded-full relative z-20")}
    ></motion.div>
  );
};

const Glow = ({ delay, size = 4 }: { delay: number; size?: number }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute left-1/2 -translate-x-1/2 z-10 rounded-full bg-blue-500 blur-[1px] shadow-2xl shadow-blue-400"
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    />
  );
};
