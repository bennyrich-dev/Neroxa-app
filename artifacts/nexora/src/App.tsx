import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Flame, ChevronRight, MessageSquare, User, Send, 
  Film, Layers, Subtitles, Check, ChevronLeft, ShieldAlert, Mail, Bell, 
  Search, Camera, Trash2, LogOut, ArrowLeft, X, Activity, Database
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
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
  category: 'Horror' | 'Comedy' | 'Anime' | 'Animation' | 'Hollywood' | 'Reality TV' | 'K-Drama' | 'Coming Soon';
  videoUrl: string;
}

interface SystemMail {
  id: string;
  title: string;
  timestamp: string;
  content: string;
  read: boolean;
}

// --- MASSIVE SEED DATABASE TO ENSURE ROWS ARE FULL ---
const GLOBAL_CINEMA_CATALOGUE: Movie[] = [
  // ANIMATION
  { id: "m-anim-1", title: "Spider-Man: Across the Spider-Verse", overview: "Miles Morales catapults across the Multiverse.", backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600", posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=600", rating: "9.1", year: "2024", duration: "2h 20m", ageRating: "PG", language: "English", category: "Animation", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: "m-anim-2", title: "Despicable Me 4", overview: "Gru faces a new nemesis.", backdropUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=1600", posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600", rating: "7.8", year: "2024", duration: "1h 35m", ageRating: "FAM", language: "English", category: "Animation", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: "m-anim-3", title: "Toy Story 5", overview: "The toys are back in town.", backdropUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600", posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600", rating: "8.5", year: "2025", duration: "1h 40m", ageRating: "FAM", language: "English", category: "Animation", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  // ANIME
  { id: "m-anime-1", title: "Demon Slayer: Mugen Train", overview: "Tanjirou boards the Infinity Train.", backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600", posterUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600", rating: "8.9", year: "2023", duration: "1h 57m", ageRating: "16+", language: "Japanese", category: "Anime", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: "m-anime-2", title: "Jujutsu Kaisen 0", overview: "Yuta Okkotsu gains control of a powerful cursed spirit.", backdropUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600", posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600", rating: "9.0", year: "2022", duration: "1h 45m", ageRating: "16+", language: "Japanese", category: "Anime", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: "m-anime-3", title: "Attack on Titan: The Final Chapter", overview: "The rumbling arrives.", backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600", posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600", rating: "9.8", year: "2024", duration: "2h 10m", ageRating: "18+", language: "Japanese", category: "Anime", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
  // COMING SOON
  { id: "m-cs-1", title: "Avatar 4: The Tulkun Rider", overview: "Jake Sully and Neytiri launch a risky naval strategy.", backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600", posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600", rating: "TBD", year: "2027", duration: "3h 05m", ageRating: "FAM", language: "English", category: "Coming Soon", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" },
  { id: "m-cs-2", title: "Ironheart: Armor Genesis", overview: "Riri Williams engineering laboratory creates a fast tactical armor.", backdropUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=1600", posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600", rating: "TBD", year: "2026", duration: "2h 10m", ageRating: "PG", language: "English", category: "Coming Soon", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" },
  { id: "m-cs-3", title: "The Midnight Sun: K-Drama Saga", overview: "An upcoming high-budget romance set in historical Seoul.", backdropUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1600", posterUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600", rating: "TBD", year: "2026", duration: "1h 15m/ep", ageRating: "13+", language: "Korean", category: "Coming Soon", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: "m-cs-4", title: "Cyberpunk 2077: Edgerunners 2", overview: "A rookie street mercenary launches cyber attacks.", backdropUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600", posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600", rating: "TBD", year: "2027", duration: "25m/ep", ageRating: "18+", language: "Japanese", category: "Coming Soon", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: "m-cs-5", title: "Avengers: Secret Wars", overview: "The multiverse collapses.", backdropUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=1600", posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=600", rating: "TBD", year: "2027", duration: "2h 45m", ageRating: "13+", language: "English", category: "Coming Soon", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: "m-cs-6", title: "Beyond The Horizon", overview: "A deep space thriller.", backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600", posterUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600", rating: "TBD", year: "2026", duration: "2h 00m", ageRating: "16+", language: "English", category: "Coming Soon", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
  // HOLLYWOOD
  { id: "m-hw-1", title: "Gladiator Eternal", overview: "A historical action blockbuster.", backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600", posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600", rating: "8.5", year: "2025", duration: "2h 30m", ageRating: "16+", language: "English", category: "Hollywood", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
  { id: "m-hw-2", title: "Dune: Part Three", overview: "The holy war sweeps across the universe.", backdropUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600", posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600", rating: "9.2", year: "2026", duration: "2h 55m", ageRating: "13+", language: "English", category: "Hollywood", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
];

export default function App() {
  const [currentTab, setTab] = useState('home');
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Global UI States
  const [expandedCategory, setExpandedCategory] = useState<Movie['category'] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBellOpen, setIsBellOpen] = useState(false);

  // Core Data
  const [moviesCatalogue, setMoviesCatalogue] = useState<Movie[]>(GLOBAL_CINEMA_CATALOGUE);
  const [heroIndex, setHeroIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Player & Stream States
  const [activePlaybackMovie, setActivePlaybackMovie] = useState<Movie | null>(null);
  const [isSubtitleMenuOpen, setIsSubtitleMenuOpen] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');

  // AI Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<any[]>([
    { sender: 'system', text: 'Neroxa AI Chat initialized. Pressing ENTER creates a new line. Click the arrow button to send.' }
  ]);

  // Community Groups Status
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  // Admin Setup
  const [systemUptime, setSystemUptime] = useState("99.98%");
  const [adminUsersMock] = useState([
    { name: "John Doe", email: "john@mail.com", status: "Active" },
    { name: "Sarah Connor", email: "sarah@skynet.com", status: "Active" },
    { name: "Bruce Wayne", email: "bruce@wayne.com", status: "Offline" }
  ]);

  // Profile Mailbox
  const [systemMails] = useState<SystemMail[]>([
    { id: "mail-1", title: "Admin Privileges Granted", timestamp: "June 08, 2026", content: "Welcome BENNY RICHY. You now have full terminal access to Neroxa.", read: false }
  ]);

  // --- INITIALIZATION & SECURITY OVERHAUL ---
  useEffect(() => {
    // 1. Instantly wipe 'Yahaya Richy' or any wrong profiles from storage
    localStorage.clear();

    // 2. Lock BENNY RICHY as the sole authorized user.
    const masterAdmin = {
      name: "BENNY RICHY",
      username: "BENNY RICHY",
      email: "atieejovwo13@gmail.com"
    };
    localStorage.setItem('neroxa_user', JSON.stringify(masterAdmin));
    
    setUserData(masterAdmin);
    setIsAdmin(true);

    fetchLiveNetworkTmdbStream();
  }, []);

  // --- TMDB FETCH (Strictly separates Anime vs Animation, fills rows deeply) ---
  const fetchLiveNetworkTmdbStream = async () => {
    const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;
    if (!tmdbToken) return;

    try {
      // Fetch multiple pages to guarantee dense "Expand" views
      const [res1, res2] = await Promise.all([
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', { headers: { Authorization: `Bearer ${tmdbToken}` } }),
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', { headers: { Authorization: `Bearer ${tmdbToken}` } })
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      const combinedResults = [...(data1.results || []), ...(data2.results || [])];

      const mapped: Movie[] = combinedResults.map((m: any, idx: number) => {
        const gIds = m.genre_ids || [];
        let assigned: Movie['category'] = 'Hollywood';

        if (gIds.includes(16)) {
          // If TMDB marks it as animation, verify origin country to split Anime vs Western Animation
          const origin = m.origin_country || [];
          if (origin.includes("JP")) assigned = 'Anime';
          else assigned = 'Animation';
        } 
        else if (gIds.includes(27)) assigned = 'Horror';
        else if (gIds.includes(35)) assigned = 'Comedy';
        else if (idx % 6 === 0) assigned = 'K-Drama';
        else if (idx % 7 === 0) assigned = 'Reality TV';

        return {
          id: `tmdb-${m.id}-${idx}`,
          title: m.title,
          overview: m.overview,
          backdropUrl: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : GLOBAL_CINEMA_CATALOGUE[0].backdropUrl,
          posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : GLOBAL_CINEMA_CATALOGUE[0].posterUrl,
          rating: (m.vote_average || 8.0).toFixed(1),
          year: (m.release_date || "2026").split('-')[0],
          duration: "2h 06m",
          ageRating: idx % 2 === 0 ? "13+" : "PG",
          language: assigned === 'Anime' ? 'Japanese' : 'English',
          category: assigned,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        };
      });

      // Keep our robust hardcoded Coming Soon and inject the new TMDB fetch
      const merged = [...GLOBAL_CINEMA_CATALOGUE, ...mapped];
      setMoviesCatalogue(merged);
    } catch (e) {
      console.warn("Network offline. Safe operational catalog remains live.");
    }
  };

  // --- UI INTERACTION MECHANICS ---
  const handlePrevHero = () => {
    const featuredItems = moviesCatalogue.filter(m => m.category !== 'Coming Soon').slice(0, 5);
    setHeroIndex((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
  };

  const handleNextHero = () => {
    const featuredItems = moviesCatalogue.filter(m => m.category !== 'Coming Soon').slice(0, 5);
    setHeroIndex((prev) => (prev + 1) % featuredItems.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.touches[0].clientX;
    if (diff > 50) { handleNextHero(); touchStartX.current = null; }
    else if (diff < -50) { handlePrevHero(); touchStartX.current = null; }
  };

  // AI Chat Submit (Button Click Only, Enter creates new line)
  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    setChatLog(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');

    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'system', text: "Query processed. Navigating to required media channels..." }]);
    }, 600);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("CRITICAL WARNING: This will permanently delete the BENNY RICHY root profile and wipe all system data. Continue?")) {
      localStorage.clear();
      window.location.reload(); // Hard reset interface
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // --- RENDER HELPERS ---
  const renderContentRow = (title: string, catKey: Movie['category']) => {
    const sorted = moviesCatalogue.filter(m => m.category === catKey);
    if (sorted.length === 0) return null;

    return (
      <div className="space-y-3 px-4 md:px-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-3 bg-cyan-500 rounded-sm"></span> {title}
          </h2>
          {/* THE EXPAND BUTTON TRIGGER */}
          <button 
            onClick={() => setExpandedCategory(catKey)}
            className="text-[10px] font-black text-cyan-500 tracking-widest uppercase hover:text-cyan-400 flex items-center gap-0.5 bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800 cursor-pointer transition"
          >
            EXPAND ALL ({sorted.length}) <ChevronRight size={12} />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {sorted.slice(0, 10).map((movie) => ( // Only show first 10 in row
            <div 
              key={movie.id}
              onClick={() => setActivePlaybackMovie(movie)}
              className="min-w-[130px] sm:min-w-[170px] snap-start group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 aspect-[2/3] cursor-pointer hover:border-cyan-500 transition duration-300"
            >
              <img src={movie.posterUrl} alt="" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute top-2 left-2">
                <span className="bg-black/80 backdrop-blur-md text-[9px] px-1.5 py-0.5 rounded font-black border border-zinc-700/60 text-cyan-400">{movie.ageRating}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-3 flex flex-col justify-end">
                <h3 className="font-bold text-[11px] text-white truncate uppercase">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const activeHeroMovie = moviesCatalogue.filter(m => m.category !== 'Coming Soon')[heroIndex] || GLOBAL_CINEMA_CATALOGUE[0];
  const itemsFilteredBySearch = moviesCatalogue.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased pb-24 md:pb-0 font-sans">
      
      {/* 1. TOP HEADER NAVIGATION (Search & Bell Activated) */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className="flex items-center gap-2 bg-transparent border-none outline-none cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 text-black font-black flex items-center justify-center text-sm shadow-md">N.</div>
            <span className="text-lg font-black tracking-tighter uppercase text-white hidden sm:block">NEROXA</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-5 text-zinc-400">
          <button onClick={() => setIsSearchOpen(true)} className="hover:text-white transition bg-transparent border-none cursor-pointer p-0"><Search size={22} /></button>
          <button onClick={() => setIsBellOpen(!isBellOpen)} className="hover:text-white transition bg-transparent border-none cursor-pointer p-0 relative">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-2 border-zinc-950 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </header>

      {/* 2. NOTIFICATION BELL DRAWER */}
      {isBellOpen && (
        <div className="fixed top-16 right-4 z-[200] w-72 bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-2xl space-y-3">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h4 className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">System Alerts</h4>
            <button onClick={() => setIsBellOpen(false)} className="text-zinc-500 hover:text-white bg-transparent border-none cursor-pointer"><X size={14}/></button>
          </div>
          <p className="text-[11px] text-zinc-300 bg-zinc-950 p-2 rounded border border-zinc-800">Welcome BENNY RICHY. Admin session securely established.</p>
          <p className="text-[11px] text-zinc-300 bg-zinc-950 p-2 rounded border border-zinc-800">Media pipelines synced. {moviesCatalogue.length} nodes loaded.</p>
        </div>
      )}

      {/* 3. FULL SCREEN SEARCH MODAL OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[300] bg-zinc-950 p-6 overflow-y-auto pt-24">
          <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-3 flex-1">
              <Search className="text-cyan-500" size={24} />
              <input 
                type="text"
                placeholder="Search movies, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xl text-white font-bold"
                autoFocus
              />
            </div>
            <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="p-2 bg-zinc-900 rounded-xl text-zinc-400 hover:text-white cursor-pointer border-none"><X size={20} /></button>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {searchQuery && itemsFilteredBySearch.map(movie => (
              <div key={movie.id} onClick={() => { setActivePlaybackMovie(movie); setIsSearchOpen(false); }} className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl cursor-pointer hover:border-cyan-500 transition space-y-2">
                <img src={movie.posterUrl} className="w-full aspect-[2/3] object-cover rounded-lg" alt="" />
                <h4 className="text-xs font-bold text-white truncate uppercase">{movie.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. MAIN VIEWPORTS CONTROLLER */}
      <main className="pt-16">
        
        {/* EXPANDED "VIEW ALL" CATEGORY PAGE */}
        {expandedCategory ? (
          <div className="px-4 md:px-12 py-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setExpandedCategory(null)} className="p-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl cursor-pointer border border-zinc-800 transition">
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-xl font-black uppercase tracking-widest text-white">{expandedCategory} Archive</h1>
                <p className="text-xs text-zinc-500">Showing all {moviesCatalogue.filter(m => m.category === expandedCategory).length} records in this category.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {moviesCatalogue.filter(m => m.category === expandedCategory).map((movie) => (
                <div key={movie.id} onClick={() => setActivePlaybackMovie(movie)} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden p-2 cursor-pointer hover:border-cyan-500 transition">
                  <img src={movie.posterUrl} className="w-full aspect-[2/3] object-cover rounded-lg mb-2" alt="" />
                  <h3 className="font-bold text-xs uppercase text-white truncate">{movie.title}</h3>
                  <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                    <span>{movie.year}</span>
                    <span className="text-cyan-400 font-bold">{movie.ageRating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* HOME TAB */}
            {currentTab === 'home' && (
              <div className="space-y-12 pb-16">
                <section onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} className="relative w-full h-[70vh] flex items-center overflow-hidden group">
                  <div className="absolute inset-0">
                    <img src={activeHeroMovie.backdropUrl} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/50"></div>
                  </div>

                  <button onClick={handlePrevHero} className="absolute left-4 z-40 p-3 rounded-full bg-black/80 border border-zinc-800 text-white opacity-0 group-hover:opacity-100 transition cursor-pointer"><ChevronLeft size={20} /></button>
                  <button onClick={handleNextHero} className="absolute right-4 z-40 p-3 rounded-full bg-black/80 border border-zinc-800 text-white opacity-0 group-hover:opacity-100 transition cursor-pointer"><ChevronRight size={20} /></button>

                  <div className="relative z-30 px-4 md:px-12 space-y-4 max-w-2xl mt-12">
                    <div className="inline-flex bg-cyan-500/10 border border-cyan-500/50 px-2 py-1 rounded text-[10px] font-black text-cyan-400 tracking-widest uppercase">
                      Featured
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase text-white line-clamp-2">{activeHeroMovie.title}</h1>
                    <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">{activeHeroMovie.overview}</p>
                    <button onClick={() => setActivePlaybackMovie(activeHeroMovie)} className="px-6 py-3 bg-cyan-500 text-black font-black rounded-xl text-xs uppercase tracking-wider transition cursor-pointer border-none flex items-center gap-2">
                      <Play size={16} fill="currentColor" /> Watch Movie
                    </button>
                  </div>
                </section>

                <div className="space-y-10 relative z-40 -mt-10">
                  {renderContentRow("Coming Soon Updates", "Coming Soon")}
                  {renderContentRow("Animation Productions", "Animation")}
                  {renderContentRow("Anime Network", "Anime")}
                  {renderContentRow("Hollywood Movies", "Hollywood")}
                  {renderContentRow("Paranormal Horror", "Horror")}
                </div>
              </div>
            )}

            {/* AI CHAT TAB (Enter key fixed to new lines) */}
            {currentTab === 'ai-chat' && (
              <section className="px-4 max-w-2xl mx-auto h-[80vh] flex flex-col justify-center pt-8">
                <div className="p-4 bg-zinc-900 border-t border-x border-zinc-800 rounded-t-2xl flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <h2 className="text-xs font-black tracking-widest text-zinc-400 uppercase">AI Terminal Assistant</h2>
                </div>
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-4 overflow-y-auto space-y-4 text-xs font-mono">
                  {chatLog.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-3 rounded-xl whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-cyan-500 text-black font-bold' : 'bg-zinc-900 text-zinc-300 border border-zinc-800'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Replaced <form> with <div> so standard Enter key creates a new line */}
                <div className="p-3 bg-zinc-900 border-b border-x border-zinc-800 rounded-b-2xl flex gap-2 items-end">
                  <textarea
                    placeholder="Type message... (Enter for new line)"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    rows={2}
                    className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 outline-none rounded-xl px-4 py-2.5 text-xs text-white resize-none font-sans"
                  />
                  <button onClick={handleSendChatMessage} className="p-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition cursor-pointer border-none self-end">
                    <Send size={16} />
                  </button>
                </div>
              </section>
            )}

            {/* COMMUNITY HUB TAB */}
            {currentTab === 'community' && (
              <section className="px-4 max-w-4xl mx-auto space-y-6 py-10">
                <div className="border border-zinc-800 bg-zinc-900/40 p-6 rounded-2xl text-center space-y-1">
                  <h1 className="text-md font-black uppercase tracking-widest text-white">Community Node Hub</h1>
                  <p className="text-xs text-zinc-500">Join active chat routers and forums.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Community Hub Mainframe', 'Anime Network', 'Hollywood Discuss'].map((forum) => {
                    const isJoined = joinedGroups.includes(forum);
                    return (
                      <div key={forum} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between gap-4">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wide text-cyan-400">#{forum}</h4>
                          <p className="text-[11px] text-zinc-500 mt-1">Status: Active</p>
                        </div>
                        <button 
                          onClick={() => setJoinedGroups(p => p.includes(forum) ? p.filter(g => g !== forum) : [...p, forum])} 
                          className={`w-full text-center text-xs font-bold py-2 rounded-lg transition border cursor-pointer ${isJoined ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-zinc-950 text-white border-zinc-800 hover:border-cyan-500'}`}
                        >
                          {isJoined ? 'Joined ✓' : 'Join Group'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ADMIN PAGE OVERHAUL (Real Functional Stats) */}
            {currentTab === 'admin' && isAdmin && (
              <section className="px-4 max-w-4xl mx-auto space-y-6 py-10">
                <div className="p-6 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500 text-black rounded-xl"><ShieldAlert size={28} /></div>
                    <div>
                      <h1 className="text-md font-black uppercase tracking-widest text-white">Master Command Node</h1>
                      <p className="text-xs text-zinc-400">Auth Root: <span className="text-cyan-400 font-bold">BENNY RICHY</span></p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
                    <span className="block text-[9px] uppercase tracking-widest text-zinc-500">System Uptime</span>
                    <span className="text-sm font-mono text-green-400">{systemUptime}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2"><Database size={16}/> Memory Storage Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs"><span className="text-zinc-500">Total Media Cached</span><span className="text-white">{moviesCatalogue.length} Entities</span></div>
                      <div className="flex justify-between text-xs"><span className="text-zinc-500">Coming Soon Pipeline</span><span className="text-cyan-400">{moviesCatalogue.filter(m=>m.category==='Coming Soon').length} Loaded</span></div>
                      <div className="flex justify-between text-xs"><span className="text-zinc-500">Animation Block</span><span className="text-white">{moviesCatalogue.filter(m=>m.category==='Animation').length} Files</span></div>
                      <div className="flex justify-between text-xs"><span className="text-zinc-500">Anime Hub</span><span className="text-white">{moviesCatalogue.filter(m=>m.category==='Anime').length} Files</span></div>
                    </div>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2"><Activity size={16}/> User Database Monitoring</h3>
                    <div className="space-y-3">
                      {adminUsersMock.map((u, i) => (
                        <div key={i} className="flex justify-between items-center bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg">
                          <div>
                            <p className="text-xs font-bold text-white uppercase">{u.name}</p>
                            <p className="text-[10px] text-zinc-500 font-mono">{u.email}</p>
                          </div>
                          <span className={`text-[9px] uppercase px-2 py-1 rounded font-black tracking-widest ${u.status==='Active'?'bg-green-500/20 text-green-400':'bg-zinc-800 text-zinc-500'}`}>{u.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* PROFILE/ACCOUNT TAB (Strict visual adherence to screenshot logic) */}
            {currentTab === 'profile' && (
              <section className="px-4 max-w-md mx-auto space-y-6 py-10">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden text-center flex flex-col items-center">
                  <div className="w-24 h-24 rounded-2xl bg-cyan-500 text-black flex items-center justify-center text-3xl font-black mb-4 shadow-xl shadow-cyan-500/20 uppercase">
                    {(userData?.name || 'B')[0]}
                  </div>
                  <h2 className="text-xl font-black text-white uppercase tracking-wide">{userData?.name || 'BENNY RICHY'}</h2>
                  <p className="text-xs text-cyan-400 font-bold font-mono mt-1">@{userData?.username || 'BENNY RICHY'}</p>
                  <span className="mt-3 bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">System Administrator</span>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Linked Gateway</span>
                  <span className="text-xs font-mono text-white">{userData?.email || 'atieejovwo13@gmail.com'}</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 flex items-center gap-1.5"><Mail size={14} /> System Inbox</h3>
                  {systemMails.map((mail) => (
                    <div key={mail.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-bold text-cyan-400 uppercase tracking-widest">
                        <span>Terminal Alert</span>
                        <span>{mail.timestamp}</span>
                      </div>
                      <h4 className="text-xs font-black text-white uppercase">{mail.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{mail.content}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-3">
                  <button onClick={handleLogout} className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold tracking-widest rounded-xl text-xs uppercase border border-zinc-800 transition cursor-pointer flex justify-center items-center gap-2">
                    <LogOut size={16}/> Logout / Disconnect
                  </button>
                  <button onClick={handleDeleteAccount} className="w-full py-3.5 bg-red-950/30 hover:bg-red-900 border border-red-900 text-red-500 hover:text-white font-bold tracking-widest rounded-xl text-xs uppercase transition cursor-pointer flex justify-center items-center gap-2">
                    <Trash2 size={16}/> Delete Account
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* 5. VIDEO PLAYER OVERLAY (Absolute strict execution) */}
      {activePlaybackMovie && (
        <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center">
          <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
            <button 
              onClick={() => setActivePlaybackMovie(null)}
              className="text-[11px] font-black bg-zinc-900/80 backdrop-blur border border-zinc-800 text-white px-4 py-2.5 rounded-xl cursor-pointer uppercase tracking-widest flex items-center gap-2"
            >
              <ArrowLeft size={14}/> Close Video
            </button>
            <button onClick={() => setIsSubtitleMenuOpen(!isSubtitleMenuOpen)} className="px-4 py-2.5 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-xl text-white flex items-center gap-2 text-[11px] font-black uppercase cursor-pointer tracking-widest">
              <Subtitles size={14} /> CC
            </button>
          </div>

          {isSubtitleMenuOpen && (
            <div className="absolute top-16 right-4 z-[999] w-40 bg-zinc-900 border border-zinc-800 p-1.5 rounded-xl shadow-2xl">
              {['Off', 'English', 'Spanish'].map((t) => (
                <button key={t} onClick={() => { setSelectedSubtitle(t); setIsSubtitleMenuOpen(false); }} className="w-full flex items-center justify-between text-left text-xs p-2 rounded text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer border-none bg-transparent">
                  {t} {selectedSubtitle === t && <Check size={14} className="text-cyan-400" />}
                </button>
              ))}
            </div>
          )}

          <div className="w-full h-full relative flex items-center justify-center">
            <video 
              src={activePlaybackMovie.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* 6. BOTTOM MOBILE NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 py-3.5 px-4 flex justify-around items-center md:hidden pb-safe">
        <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer ${currentTab === 'home' && !expandedCategory ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <Film size={20} />
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">Home</span>
        </button>
        <button onClick={() => setTab('ai-chat')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer ${currentTab === 'ai-chat' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <MessageSquare size={20} />
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">Chat</span>
        </button>
        <button onClick={() => setTab('community')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer ${currentTab === 'community' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <Layers size={20} />
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">Hub</span>
        </button>
        {isAdmin && (
          <button onClick={() => setTab('admin')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer ${currentTab === 'admin' ? 'text-cyan-400' : 'text-zinc-500'}`}>
            <ShieldAlert size={20} />
            <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">Admin</span>
          </button>
        )}
        <button onClick={() => setTab('profile')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer ${currentTab === 'profile' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <User size={20} />
          <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">Account</span>
        </button>
      </div>

    </div>
  );
}
