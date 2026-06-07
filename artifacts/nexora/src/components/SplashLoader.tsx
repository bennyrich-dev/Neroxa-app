import React, { useEffect, useState } from 'react';

interface SplashLoaderProps {
  onComplete: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Keep splash visible for 2.2 seconds, then trigger 300ms fade-out animation
    const timer = setTimeout(() => setFadeOut(true), 2200);
    const completeTimer = setTimeout(() => onComplete(), 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-300 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center gap-4 animate-scale-up">
        {/* Glowing Film-Tape Cinematic Loop Vector */}
        <div className="relative w-24 h-24">
          <svg
            className="w-full h-full filter drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-pulse"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              className="text-cyan-500"
              strokeDasharray="10 6"
            />
            <path
              d="M25 75C25 75 20 50 25 25C27.5 12.5 45 20 45 35V65C45 80 52.5 87.5 65 75C75 65 75 25 75 25"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              className="text-cyan-400"
              strokeDasharray="120"
            />
            <path
              d="M27 70V30L63 70V30"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {/* Premium Brand Reveal Text */}
        <h1 className="text-3xl font-black tracking-[0.3em] text-white pl-[0.3em] animate-fade-in">
          NEROXA<span className="text-cyan-500">.</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 pl-[0.5em]">
          Cinema Ecosystem
        </p>
      </div>
    </div>
  );
};
