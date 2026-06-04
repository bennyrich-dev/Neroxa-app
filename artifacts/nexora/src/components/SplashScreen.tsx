import React, { useEffect, useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // The logo animation plays for 2.5 seconds before transitioning out
    const animationTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06070d] transition-opacity duration-500 ${
      isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
    }`}>
      
      {/* Cinematic Glow Background Effect */}
      <div className="absolute w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />

      {/* Futuristic Glowing N-Logo Construction */}
      <div className="relative z-10 transform scale-110 animate-[bounce_3s_infinite]">
        <svg width="140" height="180" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_35px_rgba(245,158,11,0.6)]">
          {/* Left Vertical Pillar - Film Strip Style */}
          <path d="M20 10V110" stroke="url(#goldGradient)" strokeWidth="12" strokeLinecap="round" strokeDasharray="1 4" />
          
          {/* Right Vertical Pillar - Film Strip Style */}
          <path d="M80 10V110" stroke="url(#goldGradient)" strokeWidth="12" strokeLinecap="round" strokeDasharray="1 4" />
          
          {/* Diagonal Cinematic Slash connecting them into an 'N' */}
          <path d="M22 14L78 106" stroke="url(#goldGradientPrimary)" strokeWidth="14" strokeLinecap="round" className="animate-[pulse_1.5s_infinite]" />

          {/* Gradients to match your gorgeous uploaded reference token */}
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="goldGradientPrimary" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Sleek Subtitle Text Typography */}
      <div className="mt-8 text-center relative z-10 tracking-[0.4em] font-black text-xs text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-700 uppercase animate-fade-in">
        NEROXA STREAMING
      </div>
      
    </div>
  );
}
