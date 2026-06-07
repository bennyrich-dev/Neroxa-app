import React, { useState } from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  onAuthClick: () => void;
  isLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onAuthClick, isLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);

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
      <div className="flex items-center gap-4">
        <button className="text-zinc-400 hover:text-white transition cursor-pointer md:hidden">
          <Menu size={24} />
        </button>

        <a href="/" className="flex items-center gap-2 group">
          {/* Custom Cinematic Tape-Formed Letter N Logo */}
          <svg
            className="w-9 h-9 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.7)] group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,1)] transition-all duration-300"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* The Cinematic Tape Strip Path curving beautifully to shape out an N */}
            <path
              d="M25 75C25 75 20 50 25 25C27.5 12.5 45 20 45 35V65C45 80 52.5 87.5 65 75C75 65 75 25 75 25"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-cyan-500"
              strokeDasharray="120"
              strokeDashoffset="0"
            />
            {/* Film sprocket track holes along the tape strip */}
            <path
              d="M25 75C25 75 20 50 25 25C27.5 12.5 45 20 45 35V65C45 80 52.5 87.5 65 75C75 65 75 25 75 25"
              stroke="black"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="2 6"
              className="opacity-40"
            />
            {/* Core high-contrast inner ribbon accent line */}
            <path
              d="M27 70V30L63 70V30"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          <span className="text-xl font-black tracking-tighter text-white">
            NEROXA<span className="text-cyan-500 font-bold">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-zinc-400">
          <a href="/" className="text-white hover:text-white transition">Home</a>
          <a href="/movies" className="hover:text-white transition">Movies</a>
          <a href="/series" className="hover:text-white transition">Series</a>
          <a href="/sports" className="hover:text-white transition">Sports</a>
        </nav>
      </div>

      <div className="flex items-center gap-4 text-zinc-300">
        <button className="hover:text-white transition cursor-pointer">
          <Search size={20} />
        </button>
        <button className="hover:text-white transition cursor-pointer">
          <Bell size={20} />
        </button>
        
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
