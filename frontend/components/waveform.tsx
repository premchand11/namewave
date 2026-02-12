"use client";

import { motion } from "framer-motion";

interface WaveformProps {
  isPlaying: boolean;
}

export function Waveform({ isPlaying }: WaveformProps) {
  const bars = Array.from({ length: 15 });
  const centerIndex = Math.floor(bars.length / 2);

  return (
    <div className="relative w-full flex justify-center py-4">
      {/* Glass background */}
      <div className="absolute inset-0 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10" />

      <div className="relative flex items-end justify-center gap-[3px] sm:gap-1 h-14 sm:h-16 px-4 sm:px-6 overflow-hidden w-full max-w-full">
        {bars.map((_, i) => {
          const distanceFromCenter = Math.abs(i - centerIndex);
          const baseHeight = Math.max(8, 26 - distanceFromCenter * 2);

          return (
            <motion.div
              key={i}
              className="w-1.5 sm:w-2 rounded-full 
                         bg-gradient-to-t 
                         from-indigo-400 
                         via-purple-500 
                         to-blue-600
                         shadow-[0_0_15px_rgba(139,92,246,0.4)]"
              animate={
                isPlaying
                  ? {
                      height: [
                        baseHeight,
                        baseHeight + Math.random() * 24,
                        baseHeight,
                      ],
                    }
                  : {
                      height: baseHeight,
                    }
              }
              transition={{
                duration: 1.2,
                repeat: isPlaying ? Infinity : 0,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
              style={{ minHeight: 6 }}
            />
          );
        })}
      </div>
    </div>
  );
}
