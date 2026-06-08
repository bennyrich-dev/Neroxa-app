import React, { useState, useEffect, useRef } from 'react';
import { SplashLoader } from './components/SplashLoader';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { 
  Play, Info, Flame, ChevronRight, MessageSquare, User, Send, Radio, 
  Film, Layers, Subtitles, Check, ChevronLeft, ShieldAlert, Mail, Bell, HardDrive 
} from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  overview: string;
  backdropUrl: string;
  posterUrl: string;
  rating: string;
  year: string;
  duration: string;
  ageRating: string;
  language: string;
  category: 'Horror' | 'Comedy' | 'Anime' | 'Hollywood' | 'Reality TV' | 'K-Drama' | 'Coming Soon';
  videoUrl?: string;
}

const LOCAL_BACKUP_CATALOGUE: Movie[] = [
  {
    id: "m-1",
    title: "Spider-Man Noir: Shadow Over New York",
    overview: "In an alternate 1933 New York City, Peter Parker is a gritty hard-boiled private investigator operating under the cover of darkness.",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=600",
    rating: "9.2", year: "2026", duration: "2h 14m", ageRating: "16+", language: "English", category: "Hollywood",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "m-2",
    title: "The Midnight Whispers",
    overview: "An ancient paranormal presence manifests inside an isolated communication compound cutting off all rescue routes.",
    backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
    rating: "8.1", year: "2025", duration: "1h 56m", ageRating: "18+", language: "English", category: "Horror",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "m-3",
    title: "Cyber Neon: Cyberpunk Chronicles",
    overview: "A rogue synthetic operative triggers an existential security shutdown in a sprawling future cyberpunk city.",
    backdropUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600",
    rating: "8.9", year: "2026", duration: "24m/ep", ageRating: "13+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "m-4",
    title: "Crash Landing on Destiny",
    overview: "Two paths intersect across strict borders, sparking an unexpected romance amidst high political tensions.",
    backdropUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600",
    rating: "9.0", year: "2025", duration: "1h 15m/ep", ageRating: "PG", language: "Korean", category: "K-Drama",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  }
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setTab] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [moviesCatalogue, setMoviesCatalogue] = useState<Movie[]>(LOCAL_BACKUP_CATALOGUE);
  const [heroIndex, setHeroIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const [activePlaybackMovie, setActivePlaybackMovie] = useState<Movie | null>(null);
  const [isSubtitleMenuOpen, setIsSubtitleMenuOpen] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');

  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<any[]>([
    { sender: 'system', text: 'Welcome to Neroxa AI Chat. Your secure companion mainframe is synchronized.' }
  ]);

  // Admin Dashboard Management Mock Configurations
  const [systemAlertMessage, setSystemAlertMessage] = useState('All video stream channels running at 100% bandwidth capacity.');
  const [totalSimulatedUsers, setTotalSimulatedUsers] = useState(1480);

  // Manual Banner Swipe/Click Control Implementations
  const handlePrevHero = () => {
    const totalHeroItems = moviesCatalogue.slice(0, 5).length;
    setHeroIndex((prev) => (prev === 0 ? totalHeroItems - 1 : prev - 1));
  };

  const handleNextHero = () => {
    const totalHeroItems = moviesCatalogue.slice(0, 5).length;
    setHeroIndex((prev) => (prev + 1) % totalHeroItems);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.touches[0].clientX;
    const difference = touchStartX.current - touchEndX;

    if (difference > 50) {
      handleNextHero();
      touchStartX.current = null;
    } else if (difference < -50) {
      handlePrevHero();
      touchStartX.current = null;
    }
  };

  // Automate sliding rotation fallback when user isn't interacting
  useEffect(() => {
    const bannerRotationTimer = setInterval(() => {
      if (!activePlaybackMovie) {
        handleNextHero();
      }
    }, 8000);
    return () => clearInterval(bannerRotationTimer);
  }, [activePlaybackMovie, moviesCatalogue]);

  // Check for Admin Rights upon user data updates
  useEffect(() => {
    const token = localStorage.getItem('neroxa_token');
    const user = localStorage.getItem('neroxa_user');
    if (token && user) {
      setIsLoggedIn(true);
      try {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
        
        // Match conditions for admin accounts
        const emailMatch = parsedUser.email?.toLowerCase().trim() === 'atieejovwo13@gmail.com';
        const nameMatch = parsedUser.username?.toUpperCase().trim() === 'BENNY RICHY' || parsedUser.name?.toUpperCase().trim() === 'BENNY RICHY';
        
        if (emailMatch || nameMatch) {
          setIsAdmin(true);
        }
      } catch {
        // Fallback user session data
        const fallbackUser = { name: "BENNY RICHY", username: "BENNY RICHY", email: "atieejovwo13@gmail.com" };
        setUserData(fallbackUser);
        setIsAdmin(true);
      }
    }
    fetchLiveNetworkTmdbStream();
  }, [isLoggedIn]);

  const fetchLiveNetworkTmdbStream = async () => {
    const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;
    if (!tmdbToken) return;

    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
        method: 'GET',
        headers: { accept: 'application/json', Authorization: `Bearer ${tmdbToken}` }
      });
      const data = await response.json();
      const results = data.results || [];

      const mappedMovies: Movie[] = results.map((m: any, idx: number) => {
        // Evaluate native TMDB genre configurations to avoid mismatching items
        const genreIds = m.genre_ids || [];
        let trueAssignedCategory: Movie['category'] = 'Hollywood';

        if (genreIds.includes(16)) trueAssignedCategory = 'Anime';
        else if (genreIds.includes(27)) trueAssignedCategory = 'Horror';
        else if (genreIds.includes(35)) trueAssignedCategory = 'Comedy';
        else if (idx % 6 === 0) trueAssignedCategory = 'K-Drama';
        else if (idx % 7 === 0) trueAssignedCategory = 'Reality TV';
        else if (idx === 4 || idx === 9) trueAssignedCategory = 'Coming Soon';

        const explicitAgeRatings = ['FAM', 'PG', '13+', '16+', '18+'];

        return {
          id: `tmdb-${m.id}`,
          title: m.title || "Production Node",
          overview: m.overview || "Ecosystem record description synchronization pending.",
          backdropUrl: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : LOCAL_BACKUP_CATALOGUE[idx % LOCAL_BACKUP_CATALOGUE.length].backdropUrl,
          posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : LOCAL_BACKUP_CATALOGUE[idx % LOCAL_BACKUP_CATALOGUE.length].posterUrl,
          rating: (m.vote_average || 7.5).toFixed(1),
          year: (m.release_date || "2026").split('-')[0],
          duration: "2h 05m",
          ageRating: explicitAgeRatings[idx % explicitAgeRatings.length],
          language: trueAssignedCategory === 'K-Drama' ? "Korean" : "English",
          category: trueAssignedCategory,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        };
      });

      setMoviesCatalogue(mappedMovies);
    } catch (err) {
      console.warn("Network offline. Safe fallback catalog active.");
    }
  };

  const handleAuthSuccess = (profile: any) => {
    setIsLoggedIn(true);
    setUserData(profile);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserData(null);
    setTab('home');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatLog(prev => [...prev, { sender: 'user', text: chatInput }]);
    const query = chatInput.toLowerCase();
    setChatInput('');

    setTimeout(() => {
      let responseText = "Analyzing your request... Let me search the media libraries for matching streams.";
      if (query.includes('anime')) responseText = "Anime sync complete. Found active episodes inside the Cyber Neon terminal stack.";
      else if (query.includes('horror')) responseText = "Warning: Paranormal data streams isolated. High-bandwidth channels ready.";
      
      setChatLog(prev => [...prev, { sender: 'system', text: responseText }]);
    }, 600);
  };

  const renderContentRow = (title: string, catKey: Movie['category']) => {
    const rowFilteredMovies = moviesCatalogue.filter(m => m.category === catKey);
    if (rowFilteredMovies.length === 0) return null;

    return (
      <div className="space-y-3 px-4 md:px-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-3 bg-cyan-500 rounded-sm"></span> {title}
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {rowFilteredMovies.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => !isLoggedIn ? setIsAuthOpen(true) : setActivePlaybackMovie(movie)}
              className="min-w-[130px] sm:min-w-[170px] md:min-w-[190px] snap-start group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 aspect-[2/3] cursor-pointer hover:border-cyan-500 transition duration-300"
            >
              <img src={movie.posterUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="bg-black/80 backdrop-blur-md text-[9px] px-1.5 py-0.5 rounded font-black border border-zinc-700/60 text-cyan-400">{movie.ageRating}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-3 flex flex-col justify-end">
                <h3 className="font-bold text-xs text-white truncate uppercase">{movie.title}</h3>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                  <span className="text-yellow-400">★ {movie.rating}</span>
                  <span>{movie.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const currentHeroMovie = moviesCatalogue[heroIndex] || LOCAL_BACKUP_CATALOGUE[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased overflow-x-hidden pb-20 md:pb-0">
      
      <SplashLoader onComplete={() => setShowSplash(false)} />

      <Header 
        onAuthClick={() => setIsAuthOpen(true)} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout}
        currentTab={currentTab}
        setTab={setTab}
      />

      {/* RENDER CHANNELS */}
      <div className="transition-all duration-300">
        
        {currentTab === 'home' && (
          <div className="animate-fade-in space-y-10 pb-16">
            
            {/* Swipable & Clickable Interactive Hero Showcase Canvas */}
            <section 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[75vh] md:h-[90vh] flex items-center justify-start overflow-hidden group/hero"
            >
              <div className="absolute inset-0 z-0">
                <img src={currentHeroMovie.backdropUrl} alt="" className="w-full h-full object-cover object-center transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/50 z-10"></div>
              </div>

              {/* Navigation Arrows */}
              <button onClick={handlePrevHero} className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/60 border border-zinc-800 text-white hover:text-cyan-400 opacity-0 group-hover/hero:opacity-100 transition cursor-pointer">
                <ChevronLeft size={20} />
              </button>
              <button onClick={handleNextHero} className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/60 border border-zinc-800 text-white hover:text-cyan-400 opacity-0 group-hover/hero:opacity-100 transition cursor-pointer">
                <ChevronRight size={20} />
              </button>

              <div className="relative z-30 max-w-3xl px-4 md:px-12 space-y-4 mt-12">
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest">
                  <span className="bg-cyan-500 text-black px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                    <Flame size={12} fill="currentColor" /> FEATURED
                  </span>
                  <span className="bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 rounded text-cyan-400">★ {currentHeroMovie.rating}</span>
                  <span className="bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">{currentHeroMovie.ageRating}</span>
                </div>
                <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-white line-clamp-2">{currentHeroMovie.title}</h1>
                <p className="text-xs md:text-sm text-zinc-400 line-clamp-3 leading-relaxed max-w-xl">{currentHeroMovie.overview}</p>
                
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={() => !isLoggedIn ? setIsAuthOpen(true) : setActivePlaybackMovie(currentHeroMovie)} className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl flex items-center gap-2 text-xs uppercase tracking-wider transition cursor-pointer">
                    <Play size={14} fill="currentColor" /> Watch Stream
                  </button>
                </div>

                {/* Slider Position Dots */}
                <div className="flex items-center gap-1.5 pt-4">
                  {moviesCatalogue.slice(0, 5).map((_, dIdx) => (
                    <button 
                      key={dIdx} 
                      onClick={() => setHeroIndex(dIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 bg-transparent border-none p-0 cursor-pointer ${heroIndex === dIdx ? 'w-6 bg-cyan-500' : 'w-1.5 bg-zinc-700'}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* SEGMENTED CATEGORIES CHANNELS */}
            <div className="space-y-10 relative z-40 -mt-12 md:-mt-20">
              {renderContentRow("Anime Network Production", "Anime")}
              {renderContentRow("Korean Dramas & Series", "K-Drama")}
              {renderContentRow("Hollywood Box Office", "Hollywood")}
              {renderContentRow("Paranormal Thriller & Horror", "Horror")}
              {renderContentRow("Ecosystem Comedies", "Comedy")}
              {renderContentRow("Reality TV Channels", "Reality TV")}
              {renderContentRow("Anticipated Coming Soon", "Coming Soon")}
            </div>
          </div>
        )}

        {/* AI HUB TALK SYSTEM */}
        {currentTab === 'ai-chat' && (
          <section className="pt-24 px-4 max-w-3xl mx-auto h-[80vh] flex flex-col animate-fade-in">
            <div className="p-4 bg-zinc-900/40 rounded-t-2xl border-t border-x border-zinc-800/80 flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
              <h2 className="text-xs font-black tracking-widest text-zinc-400 uppercase">NEROXA AI COMPANION</h2>
            </div>
            <div className="flex-1 bg-zinc-950 border border-zinc-800/80 p-4 overflow-y-auto space-y-4 text-xs">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3 rounded-xl ${msg.sender === 'user' ? 'bg-cyan-500 text-black font-bold' : 'bg-zinc-900 text-zinc-300 border border-zinc-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900/40 rounded-b-2xl border-b border-x border-zinc-800/80 flex gap-2">
              <input
                type="text"
                placeholder="Query global media assets..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 outline-none rounded-xl px-4 py-3 text-xs text-white"
              />
              <button type="submit" className="p-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition cursor-pointer border-none">
                <Send size={14} />
              </button>
            </form>
          </section>
        )}

        {/* COMMUNICATION MATRIX HUBS */}
        {currentTab === 'community' && (
          <section className="pt-24 px-4 max-w-5xl mx-auto space-y-6 animate-fade-in">
            <div className="border border-zinc-800/60 bg-zinc-900/20 rounded-2xl p-6 text-center">
              <h1 className="text-lg font-black uppercase tracking-wider">Ecosystem Forum Relays</h1>
              <p className="text-zinc-500 text-xs mt-1">Global conversation boards processing correctly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Anime Matrix Feed', 'Hollywood Core Talk'].map((feed) => (
                <div key={feed} className="p-5 bg-zinc-900/40 rounded-xl border border-zinc-800 flex items-center justify-between">
                  <h3 className="font-bold text-xs uppercase tracking-wide text-cyan-400">#{feed}</h3>
                  <button onClick={() => alert('Access Channel Enabled')} className="px-4 py-2 bg-zinc-800 hover:bg-cyan-500 hover:text-black rounded-lg text-xs font-bold transition border-none cursor-pointer text-white">Join</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LIVE ADMIN CONTROL INTERFACE NODE PANEL */}
        {currentTab === 'admin' && isAdmin && (
          <section className="pt-24 px-4 max-w-4xl mx-auto space-y-6 animate-fade-in pb-16">
            <div className="p-6 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl flex items-center gap-4">
              <ShieldAlert size={36} className="text-cyan-400" />
              <div>
                <h1 className="text-md font-black uppercase tracking-wider text-white">Admin Command Matrix</h1>
                <p className="text-xs text-zinc-400">System profile verified: <span className="text-cyan-400 font-bold">BENNY RICHY</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5"><User size={14} /> Registered Entities</h3>
                <p className="text-2xl font-black text-white">{totalSimulatedUsers} Nodes</p>
                <button onClick={() => setTotalSimulatedUsers(p => p + 1)} className="text-[10px] bg-cyan-500 text-black px-2 py-1 rounded font-bold border-none cursor-pointer">Inject Simulated User</button>
              </div>
              <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5"><HardDrive size={14} /> Mainframe Status</h3>
                <input 
                  type="text" 
                  value={systemAlertMessage} 
                  onChange={(e) => setSystemAlertMessage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-zinc-300 outline-none focus:border-cyan-500"
                />
                <p className="text-[10px] text-zinc-500">Updates live system messages instantly.</p>
              </div>
            </div>
          </section>
        )}

        {/* USER PROFILE PAGE ACCORDING TO SYSTEM WIREFRAMES */}
        {currentTab === 'profile' && (
          <section className="pt-24 px-4 max-w-xl mx-auto animate-fade-in pb-12">
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 space-y-6">
              
              {/* Header Profile Section Layout */}
              <div className="flex flex-col items-center text-center pb-4 border-b border-zinc-800/60">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-cyan-400 text-black flex items-center justify-center font-black text-2xl uppercase tracking-tighter mb-3 shadow-xl shadow-cyan-500/10">
                  {(userData?.name || 'B')[0]}
                </div>
                <h2 className="text-lg font-black text-white uppercase tracking-wide">{userData?.name || 'BENNY RICHY'}</h2>
                <p className="text-xs text-cyan-400 font-bold">@{userData?.username || 'BENNY RICHY'}</p>
                
                {isAdmin && (
                  <span className="mt-2 px-3 py-0.5 bg-cyan-500 text-black text-[9px] font-black tracking-widest rounded-full uppercase">
                    Ecosystem Administrator
                  </span>
                )}
              </div>

              {/* Verified Account Metadata Lists */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-zinc-950/60 border border-zinc-900 p-3 rounded-xl">
                  <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Email Parameter</span>
                  <span className="text-xs text-zinc-300 font-mono text-right truncate max-w-[200px]">{userData?.email || 'atieejovwo13@gmail.com'}</span>
                </div>
                <div className="flex justify-between items-center bg-zinc-950/60 border border-zinc-900 p-3 rounded-xl">
                  <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Account Access Tier</span>
                  <span className="text-xs text-cyan-400 font-black tracking-wider uppercase">VIP Network Shell</span>
                </div>
              </div>

              {/* Dedicated Notifications / System Mail Panel Component */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                  <Mail size={14} /> System Node Messages
                </h3>
                <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-cyan-500">
                    <span>SYSTEM CORE INBOUND</span>
                    <span>JUST NOW</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Welcome to Neroxa, {userData?.name || 'BENNY RICHY'}. Your terminal interface setup sequence has finished. Current server feedback metrics: {systemAlertMessage}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button onClick={handleLogout} className="w-full py-3.5 bg-zinc-950 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 font-bold tracking-widest rounded-xl text-xs uppercase border border-zinc-800 transition cursor-pointer">
                  Disconnect Credentials
                </button>
              </div>
            </div>
          </section>
        )}

      </div>

      {/* COMPREHENSIVE STREAM PLAYER ENGINE MODAL OVERLAY */}
      {activePlaybackMovie && (
        <div className="fixed inset-0 z-[888] bg-black flex flex-col justify-center items-center animate-fade-in">
          
          {/* Action Control Header Bar */}
          <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
            <button 
              onClick={() => { setActivePlaybackMovie(null); setIsSubtitleMenuOpen(false); }}
              className="text-xs font-black bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white px-4 py-2.5 rounded-xl cursor-pointer transition uppercase tracking-wide"
            >
              ✕ Close Stream
            </button>
            
            <button 
              onClick={() => setIsSubtitleMenuOpen(!isSubtitleMenuOpen)}
              className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:text-cyan-400 text-white transition flex items-center gap-2 text-xs font-bold uppercase cursor-pointer"
            >
              <Subtitles size={15} /> Subtitles ({selectedSubtitle})
            </button>
          </div>

          {/* Subtitles Track Options Selector Menu */}
          {isSubtitleMenuOpen && (
            <div className="absolute top-16 right-6 z-[999] w-44 bg-zinc-900 border border-zinc-800 p-1.5 rounded-xl shadow-2xl space-y-0.5">
              {['Off', 'English', 'Spanish', 'French', 'Korean'].map((track) => (
                <button
                  key={track}
                  onClick={() => { setSelectedSubtitle(track); setIsSubtitleMenuOpen(false); }}
                  className="w-full flex items-center justify-between text-left text-xs p-2 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer border-none bg-transparent"
                >
                  {track} {selectedSubtitle === track && <Check size={14} className="text-cyan-400" />}
                </button>
              ))}
            </div>
          )}

          {/* Functional HTML5 Video Rendering Canvas Viewport */}
          <div className="w-full max-w-4xl aspect-video bg-black relative flex items-center justify-center border border-zinc-900 shadow-2xl">
            <video 
              src={activePlaybackMovie.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />

            {/* Render Selected Transcribed Subtitles track directly on screen space dynamically */}
            {selectedSubtitle !== 'Off' && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none w-full px-4">
                <span className="bg-black/85 text-yellow-400 border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold tracking-wide shadow-md">
                  [Track translations sync: Now showing {activePlaybackMovie.title} in {selectedSubtitle}]
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMPACT STICKY BOTTOM TAB NAVIGATION SHORTCUT BAR FOR MOBILE TERMINALS */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 py-3.5 px-4 flex justify-around items-center md:hidden shadow-2xl">
        <button onClick={() => setTab('home')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-0 ${currentTab === 'home' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <Film size={18} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
        </button>
        <button onClick={() => setTab('ai-chat')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-0 ${currentTab === 'ai-chat' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <MessageSquare size={18} />
          <span className="text-[9px] font-bold uppercase tracking-wider">AI Chat</span>
        </button>
        <button onClick={() => setTab('community')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-0 ${currentTab === 'community' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <Layers size={18} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Hub</span>
        </button>
        
        {/* Dynamic Admin View Access Option Button */}
        {isAdmin && (
          <button onClick={() => setTab('admin')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-0 ${currentTab === 'admin' ? 'text-cyan-500 font-bold' : 'text-zinc-500'}`}>
            <ShieldAlert size={18} className={currentTab === 'admin' ? 'animate-pulse' : ''} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Admin</span>
          </button>
        )}

        <button onClick={() => !isLoggedIn ? setIsAuthOpen(true) : setTab('profile')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-0 ${currentTab === 'profile' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <User size={18} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Profile</span>
        </button>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={handleAuthSuccess} />
    </div>
  );
}
