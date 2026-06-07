import React, { useState, useEffect } from 'react';
import { SplashLoader } from './components/SplashLoader';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { Play, Info, Star, Clock, Flame, ChevronRight, MessageSquare, Terminal, User, Send, Radio } from 'lucide-react';

interface TmdbMovie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setTab] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Live Cinema Data Pools fetched straight from network endpoints
  const [heroMovie, setHeroMovie] = useState<any>(null);
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [sportsShows, setSportsShows] = useState<any[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(true);

  // AI Chat Workspace states
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<any[]>([
    { sender: 'oracle', text: 'Greetings, user. I am your cinematic companion. Ask me anything about our library records.' }
  ]);

  useEffect(() => {
    const token = localStorage.getItem('neroxa_token');
    if (token) {
      setIsLoggedIn(true);
      try {
        setUserData(JSON.parse(localStorage.getItem('neroxa_user') || '{}'));
      } catch {
        setUserData({ name: "System User", username: "node" });
      }
    }
    fetchRealCinemaEcosystem();
  }, []);

  const fetchRealCinemaEcosystem = async () => {
    const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;
    
    if (!tmdbToken) {
      // Fallback architecture to maintain visibility if deployment key is syncing
      setHeroMovie({
        title: "Spider-Man Noir (Syncing Token)",
        overview: "Connect your production TMDB Token inside the Vercel variables terminal to see automatic infinite updates across components.",
        backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600",
        posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=600",
        rating: "9.0", year: "2026", duration: "Live Stream"
      });
      setLoadingMedia(false);
      return;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbToken}`
      }
    };

    try {
      // Pull dynamic trending films across the web network directly
      const trendingRes = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options);
      const trendingData = await trendingRes.json();
      const rawList: TmdbMovie[] = trendingData.results || [];

      const cleanList = rawList.map(m => ({
        id: m.id.toString(),
        title: m.title || m.name || "Untitled Production",
        overview: m.overview || "No dataset brief compiled for this runtime package.",
        backdropUrl: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600",
        posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600",
        rating: (m.vote_average || 0).toFixed(1),
        year: (m.release_date || m.first_air_date || "2026").split('-')[0],
        duration: "2h 12m"
      }));

      if (cleanList.length > 0) {
        setHeroMovie(cleanList[0]);
        setTrendingMovies(cleanList.slice(1, 11));
        setSportsShows(cleanList.slice(5, 11));
      }
    } catch (err) {
      console.error("TMDB Core failed to respond:", err);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('neroxa_token');
    localStorage.removeItem('neroxa_user');
    setIsLoggedIn(false);
    setUserData(null);
    setTab('home');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatLog(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setChatLog(prev => [...prev, { 
        sender: 'oracle', 
        text: `Analysis complete. Core system indexed request: "${userMsg}". Media assets matched within metadata archives.` 
      }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {showSplash && <SplashLoader onComplete={() => setShowSplash(false)} />}

      <Header 
        onAuthClick={() => setIsAuthOpen(true)} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout}
        currentTab={currentTab}
        setTab={setTab}
      />

      {/* RENDER VIEWPORT SWITCH BLOCK */}
      <main className="transition-all duration-300">
        
        {/* VIEW TAB A: MOVIE DASHBOARD HOMEPAGE */}
        {currentTab === 'home' && (
          <div className="animate-fade-in">
            {heroMovie && (
              <section className="relative w-full h-[85vh] md:h-[95vh] flex items-center justify-start overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img src={heroMovie.backdropUrl} alt="" className="w-full h-full object-cover object-center scale-102" />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40"></div>
                </div>

                <div className="relative z-10 max-w-4xl px-4 md:px-12 mt-16 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <span className="bg-cyan-500 text-black px-2.5 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider">
                      <Flame size={12} fill="currentColor" /> CINEMA EXCLUSIVE
                    </span>
                    <span className="bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">{heroMovie.year}</span>
                    <span className="bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800 flex items-center gap-1 text-yellow-400">
                      <Star size={12} fill="currentColor" /> {heroMovie.rating}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase line-clamp-2">{heroMovie.title}</h1>
                  <p className="text-sm md:text-base text-zinc-300 max-w-xl leading-relaxed line-clamp-3">{heroMovie.overview}</p>

                  <div className="flex items-center gap-3 pt-2">
                    <button onClick={() => !isLoggedIn ? setIsAuthOpen(true) : alert("Streaming Active")} className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl flex items-center gap-2 transition cursor-pointer text-sm">
                      <Play size={16} fill="currentColor" /> Stream System Matrix
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* MOVIE CONTENT CONSOLE METRICS RAILS */}
            <section className="px-4 md:px-12 pb-24 -mt-12 md:-mt-20 relative z-20 space-y-12">
              <div className="space-y-4">
                <h2 className="text-md md:text-lg font-black tracking-wider uppercase flex items-center gap-2 text-white">
                  <Radio size={18} className="text-cyan-400" /> Dynamic Live Additions (TMDB)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {loadingMedia ? (
                    Array(5).fill(0).map((_, i) => <div key={i} className="aspect-[2/3] bg-zinc-900 animate-pulse rounded-xl" />)
                  ) : trendingMovies.length === 0 ? (
                    <p className="text-xs text-zinc-500">Insert TMDB Token variable on Vercel terminal infrastructure to reveal automatic lists.</p>
                  ) : (
                    trendingMovies.map((movie) => (
                      <div key={movie.id} className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[2/3] transition transform hover:-translate-y-1 cursor-pointer">
                        <img src={movie.posterUrl} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex flex-col justify-end">
                          <h3 className="font-bold text-xs text-white truncate">{movie.title}</h3>
                          <span className="text-[10px] text-zinc-400 mt-1">★ {movie.rating} | {movie.year}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW TAB B: SYSTEM AI COGNITIVE INTERFACE */}
        {currentTab === 'ai-chat' && (
          <section className="pt-24 px-4 max-w-4xl mx-auto h-[90vh] flex flex-col animate-fade-in">
            <div className="p-4 bg-zinc-900/40 rounded-t-2xl border-t border-x border-zinc-800 flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>
              <h2 className="text-sm font-bold tracking-widest text-zinc-300 uppercase">NEROXA AI COGNITIVE ORACLE</h2>
            </div>
            <div className="flex-1 bg-zinc-950 border border-zinc-800 p-4 overflow-y-auto space-y-4">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-cyan-500 text-black font-medium' : 'bg-zinc-900 text-zinc-300 border border-zinc-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900/40 rounded-b-2xl border-b border-x border-zinc-800 flex gap-2">
              <input
                type="text"
                placeholder="Query system files..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 outline-none rounded-xl px-4 py-3 text-sm text-white"
              />
              <button type="submit" className="p-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition cursor-pointer">
                <Send size={18} />
              </button>
            </form>
          </section>
        )}

        {/* VIEW TAB C: PUBLIC HUB COMMUNITY NETWORK */}
        {currentTab === 'community' && (
          <section className="pt-24 px-4 max-w-5xl mx-auto space-y-6 animate-fade-in">
            <div className="border border-zinc-800 bg-zinc-900/20 rounded-2xl p-8 text-center space-y-3">
              <h1 className="text-2xl font-black text-white uppercase tracking-wider">Ecosystem Transmission Boards</h1>
              <p className="text-zinc-400 text-xs max-w-md mx-auto">Discuss streaming parameters, trending films, and channel updates live with global system nodes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['System Broadcasts', 'Cinematic Critique', 'WWE Wrestling Cage'].map((board) => (
                <div key={board} className="p-5 bg-zinc-900/40 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition">
                  <h3 className="font-bold text-sm text-cyan-400 mb-1">#{board}</h3>
                  <p className="text-xs text-zinc-500 mb-4">Active data feeds transmitting.</p>
                  <button onClick={() => !isLoggedIn ? setIsAuthOpen(true) : alert("Board Loaded")} className="text-xs font-bold text-white bg-zinc-800 px-3 py-1.5 rounded-md hover:bg-cyan-500 hover:text-black transition cursor-pointer">
                    Connect Channel
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VIEW TAB D: ATHLETE / SPORTS STREAM RAIL */}
        {currentTab === 'sports' && (
          <section className="pt-24 px-4 max-w-7xl mx-auto space-y-6 animate-fade-in pb-24">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-black tracking-widest text-white uppercase">Live Sports Network Channels</h1>
              <p className="text-xs text-zinc-400">High definition athletic transmissions routed instantly into target nodes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sportsShows.map((sport, idx) => (
                <div key={idx} className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[16/9] cursor-pointer">
                  <img src={sport.backdropUrl} alt="" className="w-full h-full object-cover group-hover:scale-102 transition duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">LIVE TRANSITIONAL NETWORKS</span>
                    <h3 className="font-black text-sm text-white mt-1 uppercase">{sport.title} Broadcast</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VIEW TAB E: SECURITY USER LOG ACCOUNT PANEL */}
        {currentTab === 'profile' && (
          <section className="pt-24 px-4 max-w-md mx-auto animate-fade-in">
            <div className="border border-zinc-800 bg-zinc-900/40 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500 text-black flex items-center justify-center font-black text-2xl uppercase shadow-lg shadow-cyan-500/20">
                  {(userData?.name || 'N')[0]}
                </div>
                <div>
                  <h2 className="text-lg font-black text-white uppercase tracking-tight">{userData?.name || 'Neroxa Identity'}</h2>
                  <p className="text-xs text-cyan-400">@{userData?.username || 'system_node'}</p>
                </div>
              </div>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-zinc-500 block mb-1">Registered System Email Address</label>
                  <div className="bg-zinc-950 p-3 rounded-xl text-zinc-300 border border-zinc-900 font-mono">{userData?.email || 'unlinked@neroxa.network'}</div>
                </div>
                <div>
                  <label className="text-zinc-500 block mb-1">Ecosystem Authorization Class</label>
                  <div className="bg-zinc-950 p-3 rounded-xl text-cyan-400 border border-zinc-900 font-bold uppercase tracking-widest">Premium Streaming Matrix Account</div>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition rounded-xl text-xs font-bold border border-red-500/20 cursor-pointer">
                Terminate Application Session
              </button>
            </div>
          </section>
        )}

      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={() => setIsLoggedIn(true)} />
    </div>
  );
            }
        
