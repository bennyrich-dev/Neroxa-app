import React, { useState } from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  onAuthClick: () => void;
  isLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onAuthClick, isLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);

  // Monitor scrolling to turn header background pitch black when moving down
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-3 flex items-center justify-between ${
        scrolled ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      {/* Left Section: Menu Burger & Glowing Film-Tape Logo */}
      <div className="flex items-center gap-4">
        <button className="text-zinc-400 hover:text-white transition cursor-pointer md:hidden">
          <Menu size={24} />
        </button>

        <a href="/" className="flex items-center gap-2 group">
          {/* Custom Cinema Tape SVG Logo */}
          <svg
            className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] group-hover:drop-shadow-[0_0_14px_rgba(6,182,212,1)] transition-all duration-300"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Cinema Tape Loop (The Circle Shape) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              className="text-cyan-500"
              strokeDasharray="4 4" // This makes it look like the sprocket holes on a film tape strip!
            />
            {/* Inner Neon Ribbon folding into an 'N' */}
            <path
              d="M35 70V30L65 70V30"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            />
          </svg>
          
          {/* Brand Name Text */}
          <span className="text-xl font-black tracking-tighter text-white">
            NEROXA<span className="text-cyan-500 font-bold">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-zinc-400">
          <a href="/" className="text-white hover:text-white transition">Home</a>
          <a href="/movies" className="hover:text-white transition">Movies</a>
          <a href="/series" className="hover:text-white transition">Series</a>
          <a href="/sports" className="hover:text-white transition">Sports</a>
        </nav>
      </div>

      {/* Right Section: System Actions */}
      <div className="flex items-center gap-4 text-zinc-300">
        <button className="hover:text-white transition cursor-pointer">
          <Search size={20} />
        </button>
        <button className="hover:text-white transition cursor-pointer">
          <Bell size={20} />
        </button>
        
        {/* Auth Interaction Trigger */}
        {isLoggedIn ? (
          <a 
            href="/profile" 
            className="w-8 h-8 rounded-full bg-cyan-600/30 border border-cyan-500 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-white transition"
          >
            <User size={16} />
          </a>
        ) : (
          <button
            onClick={onAuthClick}
            className="px-4 py-1.5 text-xs font-semibold bg-cyan-500 text-black rounded-md hover:bg-cyan-400 transition transform active:scale-95 cursor-pointer shadow-md shadow-cyan-500/20"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
          
