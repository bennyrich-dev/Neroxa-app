import React, { useState, useEffect } from 'react';
import { SplashLoader } from './components/SplashLoader';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { Play, Info, Star, Clock, Flame, ChevronRight, MessageSquare, Terminal, User, Send, Radio, Film, Layers, Eye, Subtitles, Check } from 'lucide-react';

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
}

// Full mock data array mapped instantly if TMDB token key variable syncing takes time
const LOCAL_BACKUP_CATALOGUE: Movie[] = [
  {
    id: "m-1",
    title: "Spider-Man Noir: Shadow Over New York",
    overview: "In an alternate 1933 New York City, Peter Parker is a gritty hard-boiled private investigator who operating under the cover of darkness battling gangsters and corruption.",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=600",
    rating: "9.2", year: "2026", duration: "2h 14m", ageRating: "16+", language: "English", category: "Hollywood"
  },
  {
    id: "m-2",
    title: "The Midnight Whispers",
    overview: "An ancient paranormal presence manifests inside an isolated communication compound cutting off all rescue routes.",
    backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
    rating: "8.1", year: "2025", duration: "1h 56m", ageRating: "18+", language: "English", category: "Horror"
  },
  {
    id: "m-3",
    title: "Cyber Neon: Cyberpunk Chronicles",
    overview: "A rogue synthetic operative triggers an existential security shutdown in a sprawling future cyberpunk city.",
    backdropUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600",
    rating: "8.9", year: "2026", duration: "24m/ep", ageRating: "13+", language: "Japanese", category: "Anime"
  },
  {
    id: "m-4",
    title: "Crash Landing on Destiny",
    overview: "Two paths intersect across strict borders, sparking an unexpected romance amidst high political tensions.",
    backdropUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600",
    rating: "9.0", year: "2025", duration: "1h 15m/ep", ageRating: "PG", language: "Korean", category: "K-Drama"
  },
  {
    id: "m-5",
    title: "Laughtrack Live Standup",
    overview: "A series of raw, unfiltered comedic performances recorded live on stage in front of packed stadium audiences.",
    backdropUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600",
    rating: "7.6", year: "2024", duration: "1h 20m", ageRating: "16+", language: "English", category: "Comedy"
  },
  {
    id: "m-6",
    title: "Ecosystem Runways: Star Search",
    overview: "Aspiring global fashion visionaries design extreme conceptual wear while fighting for a premium corporate modeling contract.",
    backdropUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
    rating: "7.4", year: "2026", duration: "45m/ep", ageRating: "FAM", language: "English", category: "Reality TV"
  },
  {
    id: "m-7",
    title: "Chronicles of Neroxa (Project Core)",
    overview: "The grand cinematic documentation outlining the code genesis and implementation execution of the ultimate multi-media ecosystem.",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600",
    rating: "9.9", year: "2027", duration: "3h 10m", ageRating: "FAM", language: "English", category: "Coming Soon"
  }
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setTab] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Content state metrics rows
  const [moviesCatalogue, setMoviesCatalogue] = useState<Movie[]>(LOCAL_BACKUP_CATALOGUE);
  const [heroIndex, setHeroIndex] = useState(0);

  // Interactive Video Player & Subtitle selection state toggles
  const [activePlaybackMovie, setActivePlaybackMovie] = useState<Movie | null>(null);
  const [isSubtitleMenuOpen, setIsSubtitleMenuOpen] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');

  // AI Assistant states
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<any[]>([
    { sender: 'system', text: 'Welcome to Neroxa AI Chat. Deep query analysis protocols are actively synchronized with your browsing profile.' }
  ]);

  // Automated Hero sliding background billboard tracker
  useEffect(() => {
    const bannerRotationTimer = setInterval(() => {
      if (!activePlaybackMovie) {
        setHeroIndex((prevIndex) => (prevIndex + 1) % LOCAL_BACKUP_CATALOGUE.slice(0, 4).length);
      }
    }, 7000); // Swaps features cleanly every 7 seconds seamlessly
    return () => clearInterval(bannerRotationTimer);
  }, [activePlaybackMovie]);

  // Verify auth session records on application mount initialization
  useEffect(() => {
    const token = localStorage.getItem('neroxa_token');
    const user = localStorage.getItem('neroxa_user');
    if (token && user) {
      setIsLoggedIn(true);
      try {
        setUserData(JSON.parse(user));
      } catch {
        setUserData({ name: "Yahya Richy", username: "yahya_cinema" });
      }
    }
    fetchLiveNetworkTmdbStream();
  }, []);

  const fetchLiveNetworkTmdbStream = async () => {
    const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;
    if (!tmdbToken) return; // Keep high-fidelity local backup arrays instantly operational

    const options = {
      method: 'GET',
      headers: { accept: 'application/json', Authorization: `Bearer ${tmdbToken}` }
    };

    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
      const data = await response.json();
      const results = data.results || [];

      // Category assignment matrix
      const systemCategories: ('Horror' | 'Comedy' | 'Anime' | 'Hollywood' | 'Reality TV' | 'K-Drama' | 'Coming Soon')[] = 
        ['Hollywood', 'Horror', 'Anime', 'K-Drama', 'Comedy', 'Reality TV', 'Coming Soon'];
      const explicitAgeRatings = ['FAM', 'PG', '13+', '16+', '18+'];

      const mappedMovies: Movie[] = results.map((m: any, idx: number) => ({
        id: `tmdb-${m.id}`,
        title: m.title || "Untitled Cinematic Production",
        overview: m.overview || "Ecosystem record description compilation pending synchronization protocols.",
        backdropUrl: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : LOCAL_BACKUP_CATALOGUE[idx % LOCAL_BACKUP_CATALOGUE.length].backdropUrl,
        posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : LOCAL_BACKUP_CATALOGUE[idx % LOCAL_BACKUP_CATALOGUE.length].posterUrl,
        rating: (m.vote_average || 7.5).toFixed(1),
        year: (m.release_date || "2026").split('-')[0],
        duration: idx % 2 === 0 ? "2h 08m" : "1h 45m",
        ageRating: explicitAgeRatings[idx % explicitAgeRatings.length],
        language: idx === 3 ? "Korean" : idx === 2 ? "Japanese" : "English",
        category: systemCategories[idx % systemCategories.length]
      }));

      if (mappedMovies.length > 0) {
        setMoviesCatalogue(mappedMovies);
      }
    } catch (err) {
      console.warn("Network TMDB pipe timeout. Resolving content rails with safe offline datasets.");
    }
  };

  const handleAuthSuccess = (profile: any) => {
    setIsLoggedIn(true);
    setUserData(profile);
  };

  const handleLogout = () => {
    localStorage.removeItem('neroxa_token');
    localStorage.removeItem('neroxa_user');
    setIsLoggedIn(false);
    setUserData(null);
    setTab('home');
  };

  const initializeMediaStream = (movie: Movie) => {
    if (!isLoggedIn) {
      setIsAuthOpen(true);
    } else {
      setActivePlaybackMovie(movie);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const query = chatInput;
    setChatLog(prev => [...prev, { sender: 'user', text: query }]);
    setChatInput('');

    setTimeout(() => {
      setChatLog(prev => [...prev, { 
        sender: 'system', 
        text: `Ecosystem Node Search Complete: Mapped relevant results for your search "${query}". High bandwidth video blocks ready to transmit.` 
      }]);
    }, 700);
  };

  const renderContentRow = (title: string, catKey: 'Horror' | 'Comedy' | 'Anime' | 'Hollywood' | 'Reality TV' | 'K-Drama' | 'Coming Soon') => {
    const rowFilteredMovies = moviesCatalogue.filter(m => m.category === catKey);
    if (rowFilteredMovies.length === 0) return null;

    return (
      <div className="space-y-3 px-4 md:px-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-3 bg-cyan-500 rounded-sm"></span> {title}
          </h2>
          <button className="text-[10px] font-bold text-cyan-500 tracking-widest uppercase hover:text-cyan-400 flex items-center gap-0.5 bg-transparent border-none cursor-pointer">
            EXPAND <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x tracking-tight">
          {rowFilteredMovies.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => initializeMediaStream(movie)}
              className="min-w-[140px] sm:min-w-[180px] md:min-w-[200px] snap-start group relative rounded-xl overflow-hidden bg-zinc-900/60 border border-zinc-800/80 aspect-[2/3] cursor-pointer hover:border-cyan-500 transition duration-300 transform hover:-translate-y-1"
            >
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="bg-black/70 backdrop-blur-md text-[9px] px-1.5 py-0.5 rounded font-black border border-zinc-700/60 text-cyan-400">{movie.ageRating}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-3 flex flex-col justify-end">
                <h3 className="font-bold text-xs text-white truncate uppercase tracking-wide">{movie.title}</h3>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                  <span className="text-yellow-400 font-bold">★ {movie.rating}</span>
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
    <div className="min-h-screen bg-zinc-950 text-white antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black pb-20 md:pb-0">
      
      <SplashLoader onComplete={() => setShowSplash(false)} />

      <Header 
        onAuthClick={() => setIsAuthOpen(true)} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout}
        currentTab={currentTab}
        setTab={setTab}
      />

      {/* CORE DISPLAY WINDOW VIEWPORTS */}
      <div className="transition-all duration-300">
        
        {currentTab === 'home' && (
          <div className="animate-fade-in space-y-10 pb-16">
            {/* Automatic Rotating Banner Row Component */}
            <section className="relative w-full h-[80vh] md:h-[95vh] flex items-center justify-start overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-zinc-950/40 z-10"></div>
                <img src={currentHeroMovie.backdropUrl} alt="" className="w-full h-full object-cover object-center transition-all duration-1000 transform scale-102" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/50 to-transparent z-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/60 z-20"></div>
              </div>

              <div className="relative z-30 max-w-4xl px-4 md:px-12 mt-16 space-y-4">
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-black tracking-widest">
                  <span className="bg-cyan-500 text-black px-2.5 py-0.5 rounded flex items-center gap-1 uppercase">
                    <Flame size={12} fill="currentColor" /> POPULAR NOW
                  </span>
                  <span className="bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 rounded text-zinc-300">{currentHeroMovie.year}</span>
                  <span className="bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 rounded text-cyan-400 font-bold">★ {currentHeroMovie.rating}</span>
                  <span className="bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">{currentHeroMovie.ageRating}</span>
                </div>

                <h1 className="text-3xl md:text-6xl font-black tracking-tighter uppercase text-white line-clamp-2 drop-shadow-lg">{currentHeroMovie.title}</h1>
                <p className="text-xs md:text-sm text-zinc-400 max-w-xl leading-relaxed line-clamp-3 drop-shadow">{currentHeroMovie.overview}</p>

                <div className="flex items-center gap-3 pt-2">
                  <button onClick={() => initializeMediaStream(currentHeroMovie)} className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl flex items-center gap-2 text-xs uppercase tracking-wider transition transform active:scale-95 cursor-pointer shadow-lg shadow-cyan-500/20">
                    <Play size={16} fill="currentColor" /> Watch Live
                  </button>
                  <button onClick={() => initializeMediaStream(currentHeroMovie)} className="px-5 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur border border-zinc-800 text-white font-bold rounded-xl flex items-center gap-2 text-xs uppercase tracking-wider transition cursor-pointer">
                    <Info size={16} /> Data Records
                  </button>
                </div>
              </div>
            </section>

            {/* CATEGORIES GRID ROWS */}
            <div className="space-y-10 relative z-40 -mt-16 md:-mt-24">
              {renderContentRow("Hollywood Movies", "Hollywood")}
              {renderContentRow("Korean Dramas", "K-Drama")}
              {renderContentRow("Anime Network", "Anime")}
              {renderContentRow("Paranormal Horror Thrillers", "Horror")}
              {renderContentRow("Ecosystem Comedies", "Comedy")}
              {renderContentRow("Reality TV Channels", "Reality TV")}
              {renderContentRow("Anticipated Coming Soon Releases", "Coming Soon")}
            </div>
          </div>
        )}

        {/* AI WORKSPACE TAB VIEW */}
        {currentTab === 'ai-chat' && (
          <section className="pt-24 px-4 max-w-3xl mx-auto h-[82vh] flex flex-col animate-fade-in">
            <div className="p-4 bg-zinc-900/50 rounded-t-2xl border-t border-x border-zinc-800/80 flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
              <h2 className="text-xs font-black tracking-[0.2em] text-zinc-400 uppercase">NEROXA AI COMPANION</h2>
            </div>
            <div className="flex-1 bg-zinc-950 border border-zinc-800/80 p-4 overflow-y-auto space-y-4 font-sans text-sm">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3.5 rounded-xl ${msg.sender === 'user' ? 'bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/10' : 'bg-zinc-900/80 text-zinc-300 border border-zinc-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900/50 rounded-b-2xl border-b border-x border-zinc-800/80 flex gap-2">
              <input
                type="text"
                placeholder="Ask your companion about trending media pools..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 outline-none rounded-xl px-4 py-3 text-xs text-white"
              />
              <button type="submit" className="p-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition cursor-pointer border-none">
                <Send size={16} />
              </button>
            </form>
          </section>
        )}

        {/* COMMUNICATION BOARD HUB TAB VIEW */}
        {currentTab === 'community' && (
          <section className="pt-24 px-4 max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
            <div className="border border-zinc-800/60 bg-zinc-900/30 rounded-2xl p-6 text-center space-y-2">
              <h1 className="text-xl font-black text-white uppercase tracking-wider">Ecosystem Broadcast Sub-Nodes</h1>
              <p className="text-zinc-400 text-xs max-w-sm mx-auto">Discuss transmission grids with active global member clusters instantly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Global Chat Node', 'Cinema Discussion', 'WWE Wrestler Fanbase Ring'].map((board) => (
                <div key={board} className="p-5 bg-zinc-900/40 rounded-xl border border-zinc-800 hover:border-cyan-500/30 transition flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-black text-xs tracking-wider text-cyan-400 uppercase">#{board}</h3>
                    <p className="text-[11px] text-zinc-500 mt-1">Live data pipelines processing correctly.</p>
                  </div>
                  <button onClick={() => !isLoggedIn ? setIsAuthOpen(true) : alert(`Channel Linked: ${board}`)} className="w-full text-center text-xs font-bold text-white bg-zinc-800/80 py-2 rounded-lg hover:bg-cyan-500 hover:text-black transition cursor-pointer border-none">
                    Link Terminal Channel
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LIVE SPORTS RAIL VIEW */}
        {currentTab === 'sports' && (
          <section className="pt-24 px-4 max-w-7xl mx-auto space-y-6 animate-fade-in pb-24">
            <div className="flex flex-col gap-1 px-2">
              <h1 className="text-lg font-black tracking-widest text-white uppercase">Live Sports Matrix Channels</h1>
              <p className="text-xs text-zinc-500">High bandwidth sports streams linked straight to active profiles.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {moviesCatalogue.slice(0, 4).map((sport, idx) => (
                <div key={idx} onClick={() => initializeMediaStream(sport)} className="group relative rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-900 aspect-[16/9] cursor-pointer">
                  <img src={sport.backdropUrl} alt="" className="w-full h-full object-cover group-hover:scale-102 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span> TRANSITTING LIVE 4K
                    </span>
                    <h3 className="font-black text-sm text-white mt-1 uppercase tracking-wide">{sport.title} Broadcast Game</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECURITY PROFILE PREFERENCES TAB VIEW */}
        {currentTab === 'profile' && (
          <section className="pt-24 px-4 max-w-md mx-auto animate-fade-in pb-12">
            <div className="border border-zinc-800 bg-zinc-900/40 rounded-2xl p-5 space-y-6 shadow-xl">
              <div className="flex items-center gap-4 border-b border-zinc-800/80 pb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-black flex items-center justify-center font-black text-xl uppercase shadow-md shadow-cyan-500/10">
                  {(userData?.name || 'Y')[0]}
                </div>
                <div>
                  <h2 className="text-md font-black text-white uppercase tracking-wide">{userData?.name || 'Yahya Richy'}</h2>
                  <p className="text-xs text-cyan-400 font-medium">@{userData?.username || 'yahya_cinema'}</p>
                </div>
              </div>
              
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-zinc-500 block mb-1 font-bold uppercase tracking-wider">Linked Ecosystem Email</label>
                  <div className="bg-zinc-950 p-3 rounded-xl text-zinc-300 border border-zinc-900 font-mono text-[11px] truncate">{userData?.email || 'yahya@neroxa.network'}</div>
                </div>
                <div>
                  <label className="text-zinc-500 block mb-1 font-bold uppercase tracking-wider">Ecosystem Core Class</label>
                  <div className="bg-zinc-950 p-3 rounded-xl text-cyan-400 border border-zinc-900 font-black tracking-widest text-[10px] uppercase">PREMIUM CINEMA SUITE AGENT</div>
                </div>
              </div>

              <div className="pt-2">
                <button onClick={handleLogout} className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500 hover:text-black text-cyan-400 font-bold transition rounded-xl text-xs uppercase tracking-widest border border-cyan-500/20 cursor-pointer">
                  Disconnect Terminal Session
                </button>
              </div>
            </div>
          </section>
        )}

      </div>

      {/* DYNAMIC MEDIA STREAM OVERLAY PIPELINE (THE VIDEO CANVAS RENDERER) */}
      {activePlaybackMovie && (
        <div className="fixed inset-0 z-[888] bg-black flex flex-col justify-center items-center animate-fade-in">
          {/* Top Interface Status Bar */}
          <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center px-2">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { setActivePlaybackMovie(null); setIsSubtitleMenuOpen(false); }}
                className="text-xs font-black tracking-wider uppercase text-zinc-400 hover:text-white bg-zinc-900/80 backdrop-blur px-3 py-2 rounded-lg border border-zinc-800 cursor-pointer"
              >
                ✕ Close Stream
              </button>
              <h2 className="text-xs font-black tracking-widest text-zinc-300 uppercase hidden sm:block">{activePlaybackMovie.title}</h2>
            </div>
            
            {/* Interactive Subtitles Option Trigger */}
            <button 
              onClick={() => setIsSubtitleMenuOpen(!isSubtitleMenuOpen)}
              className="p-2.5 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-xl hover:text-cyan-400 text-white transition flex items-center gap-2 text-xs font-bold uppercase cursor-pointer"
            >
              <Subtitles size={16} /> Subtitles ({selectedSubtitle})
            </button>
          </div>

          {/* Subtitles Overlay Dropdown Panel Drawer */}
          {isSubtitleMenuOpen && (
            <div className="absolute top-16 right-6 z-[999] w-48 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 p-2 rounded-xl shadow-2xl space-y-1">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest p-1.5 border-b border-zinc-800">Choose Track</p>
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

          {/* Dynamic Video View Display Canvas */}
          <div className="relative w-full aspect-video max-w-5xl border border-zinc-800 bg-zinc-950 rounded-none md:rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-center items-center p-4 text-center">
            <img src={activePlaybackMovie.backdropUrl} className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none blur-sm" alt="" />
            
            <div className="relative z-10 space-y-4 max-w-md">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/30 animate-pulse">
                <Film size={22} />
              </div>
              <h3 className="text-md font-black uppercase tracking-wider text-white">Streaming Media Stream Active</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Ecosystem hardware processing active. High speed payload transmission securely routing target data files.</p>
              
              {/* Dynamic Live Subtitle Visual Presenter Box */}
              {selectedSubtitle !== 'Off' && (
                <div className="pt-10">
                  <span className="bg-black/80 backdrop-blur-md border border-zinc-800 text-yellow-400 font-bold px-4 py-2 rounded-lg text-xs tracking-wide shadow-lg">
                    [Subtitle Track Loaded ({selectedSubtitle}): Streaming synchronized translations...]
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STICKY BOTTOM NAVIGATION SHORTCUT BAR FOR MOBILE TERMINALS */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900/60 py-2.5 px-6 flex justify-between items-center md:hidden shadow-2xl">
        <button onClick={() => setTab('home')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-1 ${currentTab === 'home' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <Film size={18} />
          <span className="text-[9px] font-bold tracking-wider uppercase">Home</span>
        </button>
        <button onClick={() => setTab('ai-chat')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-1 ${currentTab === 'ai-chat' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <MessageSquare size={18} />
          <span className="text-[9px] font-bold tracking-wider uppercase">AI Chat</span>
        </button>
        <button onClick={() => setTab('community')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-1 ${currentTab === 'community' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <Layers size={18} />
          <span className="text-[9px] font-bold tracking-wider uppercase">Hub</span>
        </button>
        <button onClick={() => setTab('sports')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-1 ${currentTab === 'sports' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <Radio size={18} />
          <span className="text-[9px] font-bold tracking-wider uppercase">Sports</span>
        </button>
        <button onClick={() => !isLoggedIn ? setIsAuthOpen(true) : setTab('profile')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-1 ${currentTab === 'profile' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <User size={18} />
          <span className="text-[9px] font-bold tracking-wider uppercase">Profile</span>
        </button>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onSuccess={handleAuthSuccess} />
    </div>
  );
}
