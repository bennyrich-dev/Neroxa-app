import React, { useState } from 'react';
import { Menu, Search, Bell, User, MessageSquare, ShieldAlert, Layers, LogOut } from 'lucide-react';

interface HeaderProps {
  onAuthClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  currentTab: string;
  setTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAuthClick, isLoggedIn, onLogout, currentTab, setTab }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ai-chat', label: 'AI Oracle' },
    { id: 'community', label: 'Hub' },
    { id: 'sports', label: 'Sports' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-3 flex items-center justify-between ${
          scrolled ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="text-zinc-400 hover:text-white transition cursor-pointer md:hidden"
          >
            <Menu size={24} />
          </button>

          <button onClick={() => setTab('home')} className="flex items-center gap-2 group bg-transparent border-none outline-none cursor-pointer">
            <svg
              className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="40" stroke="#06b6d4" strokeWidth="6" strokeDasharray="6 6" />
              <path d="M25 75C25 75 20 50 25 25C27.5 12.5 45 20 45 35V65C45 80 52.5 87.5 65 75C75 65 75 25 75 25" stroke="#06b6d4" strokeWidth="8" strokeLinecap="round" />
              <path d="M27 70V30L63 70V30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xl font-black tracking-tighter text-white">
              NEROXA<span className="text-cyan-500">.</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`transition capitalize bg-transparent border-none outline-none cursor-pointer ${
                  currentTab === item.id ? 'text-cyan-400 font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 text-zinc-300">
          <button className="hover:text-white transition cursor-pointer bg-transparent border-none">
            <Search size={20} />
          </button>
          <button className="hover:text-white transition cursor-pointer bg-transparent border-none">
            <Bell size={20} />
          </button>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setTab('profile')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition border ${
                  currentTab === 'profile' ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                <User size={16} />
              </button>
              <button 
                onClick={onLogout}
                className="hidden md:flex p-2 text-zinc-500 hover:text-red-400 transition bg-transparent border-none cursor-pointer"
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="px-4 py-1.5 text-xs font-semibold bg-cyan-500 text-black rounded-md hover:bg-cyan-400 transition cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Slide-out Mobile Panel Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm md:hidden">
          <div className="w-64 bg-zinc-950 p-6 flex flex-col h-full border-r border-zinc-900">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-black tracking-wider text-white">NAVIGATION</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white text-sm bg-transparent border-none cursor-pointer">✕</button>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm py-2 px-3 rounded-lg transition ${
                    currentTab === item.id ? 'bg-cyan-950/40 text-cyan-400 border-l-2 border-cyan-500' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    setTab('profile');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm py-2 px-3 rounded-lg transition ${
                    currentTab === 'profile' ? 'bg-cyan-950/40 text-cyan-400' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  My Profile Settings
                </button>
              )}
            </div>
            {isLoggedIn && (
              <button 
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="w-full py-3 bg-red-950/20 text-red-400 hover:bg-red-900 hover:text-white text-xs font-bold rounded-xl transition border border-red-900/30 cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut size={14} /> Close Session
              </button>
            )}
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}
    </>
  );
};
            
