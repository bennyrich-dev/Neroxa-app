import React, { useState } from 'react';
import { Menu, Search, Bell, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onAuthClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  currentTab: string;
  setTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAuthClick, isLoggedIn, onLogout, currentTab, setTab }) => {
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ai-chat', label: 'AI Chat' },
    { id: 'community', label: 'Hub' },
    { id: 'sports', label: 'Sports' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-3.5 flex items-center justify-between ${
        scrolled ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-gradient-to-b from-black/90 to-transparent'
      }`}
    >
      <div className="flex items-center gap-4">
        <button onClick={() => setTab('home')} className="flex items-center gap-2 group bg-transparent border-none outline-none cursor-pointer p-0">
          <svg
            className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.7)] transform group-hover:scale-105 transition duration-300"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" stroke="#06b6d4" strokeWidth="6" strokeDasharray="6 6" />
            <path d="M25 75C25 75 20 50 25 25C27.5 12.5 45 20 45 35V65C45 80 52.5 87.5 65 75C75 65 75 25 75 25" stroke="#06b6d4" strokeWidth="8" strokeLinecap="round" />
            <path d="M27 70V30L63 70V30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xl font-black tracking-tighter text-white">
            NEROXA<span className="text-cyan-500 font-bold">.</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-6 ml-8 text-xs uppercase font-bold tracking-widest">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`transition bg-transparent border-none p-0 outline-none cursor-pointer tracking-wider ${
                currentTab === item.id ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4 text-zinc-300">
        <button className="hover:text-white transition cursor-pointer bg-transparent border-none p-0">
          <Search size={18} />
        </button>
        <button className="hover:text-white transition cursor-pointer bg-transparent border-none p-0">
          <Bell size={18} />
        </button>
        
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setTab('profile')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition border ${
                currentTab === 'profile' ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              <User size={14} />
            </button>
            <button 
              onClick={onLogout}
              className="hidden md:block text-zinc-500 hover:text-red-400 transition bg-transparent border-none cursor-pointer p-0"
              title="Terminate Connection Session"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={onAuthClick}
            className="px-4 py-1.5 text-xs font-bold bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition shadow-md shadow-cyan-500/10 cursor-pointer"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
