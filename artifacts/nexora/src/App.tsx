import React, { useState, useEffect, useRef } from 'react';
import { SplashLoader } from './components/SplashLoader';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { 
  Play, Info, Flame, ChevronRight, MessageSquare, User, Send, Radio, 
  Film, Layers, Subtitles, Check, ChevronLeft, ShieldAlert, Mail, Bell, 
  HardDrive, Search, Camera, Trash2, LogOut, ArrowLeft, RefreshCw, X, Sliders
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

// Extensive seed data array providing functional depth across categories
const GLOBAL_CINEMA_CATALOGUE: Movie[] = [
  {
    id: "m-1",
    title: "Spider-Man: Across the Spider-Verse",
    overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=600",
    rating: "9.1", year: "2024", duration: "2h 20m", ageRating: "PG", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "m-anime-1",
    title: "Demon Slayer: Mugen Train",
    overview: "Tanjirou and the group accompany the Flame Hashira Kyojuro Rengoku aboard the Infinity Train to hunt down a demon terrorizing passengers.",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600",
    rating: "8.9", year: "2023", duration: "1h 57m", ageRating: "16+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "m-2",
    title: "The Conjuring: Paranormal Rifts",
    overview: "Paranormal investigators work to track down an ancient dark force that has integrated into an offline server mainframe grid.",
    backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
    rating: "7.9", year: "2025", duration: "1h 52m", ageRating: "18+", language: "English", category: "Horror",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "m-kd-1",
    title: "Descendants of the Sun",
    overview: "A love story between Captain Yoo Shi Jin of the Korean Special Warfare Command and Doctor Kang Mo Yeon, dealing with medical crises in volatile regions.",
    backdropUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600",
    rating: "9.3", year: "2024", duration: "1h 10m/ep", ageRating: "13+", language: "Korean", category: "K-Drama",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    id: "m-cs-1",
    title: "Avatar 4: The Tulkun Rider",
    overview: "Jake Sully and Neytiri launch a risky naval strategy to shield the deep ocean sectors of Pandora from sky people occupation fleets.",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600",
    rating: "TBD", year: "2027", duration: "3h 05m", ageRating: "FAM", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
  },
  {
    id: "m-cs-2",
    title: "Ironheart: Armor Genesis",
    overview: "Riri Williams engineering laboratory creates a fast, tactical armor model that pushes international technological frameworks to their absolute limits.",
    backdropUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600",
    rating: "TBD", year: "2026", duration: "2h 10m", ageRating: "PG", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
  },
  {
    id: "m-cs-3",
    title: "The Midnight Sun: K-Drama Saga",
    overview: "An upcoming high-budget romance set in historical Seoul tracking the hidden power paths of two corporate royalty groups.",
    backdropUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
    rating: "TBD", year: "2026", duration: "1h 15m/ep", ageRating: "13+", language: "Korean", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "m-cs-4",
    title: "Cyberpunk 2077: Edgerunners Season 2",
    overview: "An unknown rookie street mercenary launches tactical cybernetic data attacks against major corporate compounds in Night City.",
    backdropUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600",
    rating: "TBD", year: "2027", duration: "25m/ep", ageRating: "18+", language: "Japanese", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "m-com-1",
    title: "The Blockbuster Meltdown",
    overview: "A group of warehouse media workers try to balance intense retail environments alongside chaotic management teams.",
    backdropUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600",
    rating: "8.2", year: "2024", duration: "1h 45m", ageRating: "PG", language: "English", category: "Comedy",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "m-rtv-1",
    title: "Ultimate Chef Challenge",
    overview: "Elite industrial cooks go head-to-head in fast-paced cooking matchups under intense time restrictions.",
    backdropUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
    rating: "7.6", year: "2025", duration: "48m/ep", ageRating: "FAM", language: "English", category: "Reality TV",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    id: "m-hw-1",
    title: "Gladiator Eternal",
    overview: "A historical action blockbuster focused on tactical legion combat, family honor, and arena management dynamics.",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600",
    rating: "8.5", year: "2025", duration: "2h 30m", ageRating: "16+", language: "English", category: "Hollywood",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  }
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setTab] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Expanded Layout States
  const [expandedCategory, setExpandedCategory] = useState<Movie['category'] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBellOpen, setIsBellOpen] = useState(false);

  // Content Catalogs
  const [moviesCatalogue, setMoviesCatalogue] = useState<Movie[]>(GLOBAL_CINEMA_CATALOGUE);
  const [heroIndex, setHeroIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Playback & Subtitle States
  const [activePlaybackMovie, setActivePlaybackMovie] = useState<Movie | null>(null);
  const [isSubtitleMenuOpen, setIsSubtitleMenuOpen] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');

  // AI Assistant States
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<any[]>([
    { sender: 'system', text: 'Welcome to Neroxa AI Chat. How can I help you navigate the system data hubs today?' }
  ]);

  // System Notifications Log
  const [notifications, setNotifications] = useState<string[]>([
    "Welcome sequence processed successfully.",
    "Admin rights verified for account BENNY RICHY.",
    "Media stream pipeline status: Operational."
  ]);

  // Profile Settings States
  const [profileAvatar, setProfileAvatar] = useState<string>("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400");
  const [systemMails, setSystemMails] = useState<SystemMail[]>([
    {
      id: "mail-1",
      title: "Core Framework Setup Verified",
      timestamp: "June 08, 2026",
      content: "Hello BENNY RICHY, your administrative layout has cleared authorization checks. Secondary profile clusters have been wiped from the database as requested.",
      read: false
    }
  ]);

  // Admin Operational Settings
  const [globalSystemMessage, setGlobalSystemMessage] = useState('All media channels and network routers are running at peak capacity.');
  const [registeredNodesCount, setRegisteredNodesCount] = useState(2540);

  // Manual Banner Scrolling Implementations
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
    const difference = touchStartX.current - e.touches[0].clientX;
    if (difference > 60) { handleNextHero(); touchStartX.current = null; }
    else if (difference < -60) { handlePrevHero(); touchStartX.current = null; }
  };

  // Automatic Banner Interval Rotation
  useEffect(() => {
    const timer = setInterval(() => {
      if (!activePlaybackMovie && !isSearchOpen) {
        handleNextHero();
      }
    }, 7000);
    return () => clearInterval(timer);
  }, [activePlaybackMovie, isSearchOpen]);

  // Verification Pipeline for the Administrator
  useEffect(() => {
    // Clear out residual 'Yahya Richy' values if they exist in localStorage
    const storedUser = localStorage.getItem('neroxa_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.name === "Yahya Richy") {
          localStorage.clear(); // Wipe the duplicate account instantly
        }
      } catch (e) { localStorage.clear(); }
    }

    // Force-initialize BENNY RICHY as the master administration profile node
    const adminSessionProfile = {
      name: "BENNY RICHY",
      username: "BENNY RICHY",
      email: "atieejovwo13@gmail.com"
    };
    localStorage.setItem('neroxa_token', 'master_admin_session_token_prod_2026');
    localStorage.setItem('neroxa_user', JSON.stringify(adminSessionProfile));
    
    setUserData(adminSessionProfile);
    setIsLoggedIn(true);
    setIsAdmin(true);

    fetchLiveNetworkTmdbStream();
  }, []);

  const fetchLiveNetworkTmdbStream = async () => {
    const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;
    if (!tmdbToken) return;

    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
        headers: { accept: 'application/json', Authorization: `Bearer ${tmdbToken}` }
      });
      const data = await response.json();
      const results = data.results || [];

      const mapped: Movie[] = results.map((m: any, idx: number) => {
        const gIds = m.genre_ids || [];
        let assigned: Movie['category'] = 'Hollywood';

        if (gIds.includes(16)) assigned = 'Animation'; 
        else if (gIds.includes(27)) assigned = 'Horror';
        else if (gIds.includes(35)) assigned = 'Comedy';
        else if (idx % 5 === 0) assigned = 'Anime';
        else if (idx % 6 === 0) assigned = 'K-Drama';
        else if (idx % 7 === 0) assigned = 'Reality TV';
        
        if (idx >= 15) assigned = 'Coming Soon';

        return {
          id: `tmdb-${m.id}`,
          title: m.title,
          overview: m.overview,
          backdropUrl: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : GLOBAL_CINEMA_CATALOGUE[idx % GLOBAL_CINEMA_CATALOGUE.length].backdropUrl,
          posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : GLOBAL_CINEMA_CATALOGUE[idx % GLOBAL_CINEMA_CATALOGUE.length].posterUrl,
          rating: (m.vote_average || 8.0).toFixed(1),
          year: (m.release_date || "2026").split('-')[0],
          duration: "2h 06m",
          ageRating: idx % 3 === 0 ? "13+" : idx % 3 === 1 ? "16+" : "PG",
          language: assigned === 'Anime' ? 'Japanese' : assigned === 'K-Drama' ? 'Korean' : 'English',
          category: assigned,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        };
      });

      // Mix hardcoded local Coming Soon assets with TMDB files to keep listings full
      const consolidated = [...mapped, ...GLOBAL_CINEMA_CATALOGUE.filter(item => item.id.startsWith('m-cs-'))];
      setMoviesCatalogue(consolidated);
    } catch (e) {
      console.warn("Network offline. Safe operational catalog remains live.");
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatLog(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');

    setTimeout(() => {
      let botReply = "Database query search resolved. Processing related stream links for your request.";
      const cleanMsg = userMessage.toLowerCase();
      if (cleanMsg.includes('anime')) botReply = "Anime logs fetched. Check the Demon Slayer Mugen Train stream stack.";
      else if (cleanMsg.includes('animation')) botReply = "Animation data found: Spider-Man Across the Spider-Verse is fully playable.";
      else if (cleanMsg.includes('horror')) botReply = "Isolated 3 horror data matches inside the storage vault.";

      setChatLog(prev => [...prev, { sender: 'system', text: botReply }]);
    }, 600);
  };

  // Handle Enter key for textareas to insert line breaks cleanly
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Allow default behavior to create a new line link, do not submit form
      e.stopPropagation();
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("CRITICAL WARNING: This will completely delete account node BENNY RICHY and wipe all linked media records. Proceed?")) {
      localStorage.clear();
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserData(null);
      setTab('home');
      alert("Account records cleared from local database storage layers.");
    }
  };

  const renderContentRow = (title: string, catKey: Movie['category']) => {
    const sorted = moviesCatalogue.filter(m => m.category === catKey);
    if (sorted.length === 0) return null;

    return (
      <div className="space-y-3 px-4 md:px-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-3 bg-cyan-500 rounded-sm"></span> {title}
          </h2>
          <button 
            onClick={() => setExpandedCategory(catKey)}
            className="text-[10px] font-black text-cyan-500 tracking-widest uppercase hover:text-cyan-400 flex items-center gap-0.5 bg-transparent border-none cursor-pointer p-1"
          >
            EXPAND <ChevronRight size={12} />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {sorted.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => setActivePlaybackMovie(movie)}
              className="min-w-[130px] sm:min-w-[170px] md:min-w-[190px] snap-start group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 aspect-[2/3] cursor-pointer hover:border-cyan-500 transition duration-300"
            >
              <img src={movie.posterUrl} alt="" className="w-full h-full object-cover transition duration-500 group-hover:scale-102" />
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="bg-black/80 backdrop-blur-md text-[9px] px-1.5 py-0.5 rounded font-black border border-zinc-700/60 text-cyan-400">{movie.ageRating}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-3 flex flex-col justify-end">
                <h3 className="font-bold text-xs text-white truncate uppercase">{movie.title}</h3>
                <p className="text-[10px] text-yellow-400 font-bold mt-0.5">★ {movie.rating}</p>
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
    <div className="min-h-screen bg-zinc-950 text-white antialiased pb-24 md:pb-0 font-sans selection:bg-cyan-500 selection:text-black">
      
      <SplashLoader onComplete={() => setShowSplash(false)} />

      {/* FIXED APPLICATION HEADER MODULE */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900/60 px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className="flex items-center gap-2 bg-transparent border-none outline-none cursor-pointer p-0">
            <div className="w-7 h-7 rounded bg-cyan-500 text-black font-black flex items-center justify-center text-sm shadow-md shadow-cyan-500/20">N.</div>
            <span className="text-md font-black tracking-tighter uppercase text-white hidden sm:block">NEROXA</span>
          </button>
        </div>

        {/* Global Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-zinc-400">
          <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className={`cursor-pointer bg-transparent border-none ${currentTab === 'home' ? 'text-cyan-400' : 'hover:text-white'}`}>Home</button>
          <button onClick={() => setTab('ai-chat')} className={`cursor-pointer bg-transparent border-none ${currentTab === 'ai-chat' ? 'text-cyan-400' : 'hover:text-white'}`}>AI Chat</button>
          <button onClick={() => setTab('community')} className={`cursor-pointer bg-transparent border-none ${currentTab === 'community' ? 'text-cyan-400' : 'hover:text-white'}`}>Hub</button>
          {isAdmin && <button onClick={() => setTab('admin')} className={`cursor-pointer bg-transparent border-none ${currentTab === 'admin' ? 'text-cyan-400' : 'hover:text-white'}`}>Admin Matrix</button>}
          <button onClick={() => setTab('profile')} className={`cursor-pointer bg-transparent border-none ${currentTab === 'profile' ? 'text-cyan-400' : 'hover:text-white'}`}>Account</button>
        </nav>

        {/* Navigation Action Buttons Overlays */}
        <div className="flex items-center gap-4 text-zinc-400">
          <button onClick={() => setIsSearchOpen(true)} className="hover:text-white transition bg-transparent border-none cursor-pointer"><Search size={18} /></button>
          <button onClick={() => setIsBellOpen(!isBellOpen)} className="hover:text-white transition bg-transparent border-none cursor-pointer relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* BELL NOTIFICATION LOG PANEL DRAWER OVERLAY */}
      {isBellOpen && (
        <div className="fixed top-16 right-4 z-50 w-72 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl shadow-2xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h4 className="text-[10px] font-black tracking-widest uppercase text-zinc-400">System Logs</h4>
            <button onClick={() => setNotifications([])} className="text-[9px] font-bold text-cyan-400 bg-transparent border-none cursor-pointer">Clear</button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-[11px] text-zinc-500 py-4 text-center">No unread alerts logs mapped.</p>
            ) : (
              notifications.map((n, idx) => (
                <p key={idx} className="text-[11px] text-zinc-300 bg-zinc-950 p-2 rounded border border-zinc-900 leading-snug">{n}</p>
              ))
            )}
          </div>
        </div>
      )}

      {/* FLOATING SEARCH MATRIX GRID PANEL DRAWER OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md p-6 space-y-6 overflow-y-auto animate-fade-in">
          <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-zinc-800 pb-4 mt-8">
            <div className="flex items-center gap-3 flex-1">
              <Search className="text-zinc-500" size={20} />
              <input 
                type="text"
                placeholder="Search streams, categories, codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-md text-white font-bold placeholder-zinc-600"
                autoFocus
              />
            </div>
            <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white cursor-pointer border-none"><X size={18} /></button>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {itemsFilteredBySearch.map(movie => (
              <div key={movie.id} onClick={() => { setActivePlaybackMovie(movie); setIsSearchOpen(false); }} className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl cursor-pointer hover:border-cyan-500 transition space-y-2">
                <img src={movie.posterUrl} className="w-full aspect-[2/3] object-cover rounded-lg" alt="" />
                <h4 className="text-xs font-bold text-white truncate uppercase">{movie.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CORE DISPLAY WINDOW VIEWPORTS CONTROL ELEMENT */}
      <main className="pt-20">
        
        {/* VIEWPORTS EXPAND ROW SCREEN ROUTER */}
        {expandedCategory ? (
          <div className="px-4 md:px-12 py-6 space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setExpandedCategory(null)}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition cursor-pointer border-none"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h1 className="text-md font-black uppercase tracking-widest text-white">{expandedCategory} Archive Vault</h1>
                <p className="text-[11px] text-zinc-500">Showing all indexed stream media cards mapped under this network category.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {moviesCatalogue.filter(m => m.category === expandedCategory).map((movie) => (
                <div 
                  key={movie.id}
                  onClick={() => setActivePlaybackMovie(movie)}
                  className="bg-zinc-900 border border-zinc-800/80 rounded-xl overflow-hidden p-2 space-y-2 hover:border-cyan-500 transition cursor-pointer"
                >
                  <img src={movie.posterUrl} className="w-full aspect-[2/3] object-cover rounded-lg" alt="" />
                  <h3 className="font-bold text-xs uppercase text-white truncate">{movie.title}</h3>
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>{movie.year}</span>
                    <span className="text-cyan-400 font-bold">{movie.ageRating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* STANDARD WINDOW HOUSING ROWS */}
            {currentTab === 'home' && (
              <div className="animate-fade-in space-y-12 pb-16">
                
                {/* Swipable Manual Control Billboard Banner Stage */}
                <section 
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-start overflow-hidden group/hero"
                >
                  <div className="absolute inset-0 z-0">
                    <img src={activeHeroMovie.backdropUrl} alt="" className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/50 z-10"></div>
                  </div>

                  {/* Operational Carousel Trigger Overlays */}
                  <button onClick={handlePrevHero} className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-black/70 border border-zinc-800 text-white hover:text-cyan-400 opacity-0 group-hover/hero:opacity-100 transition cursor-pointer">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={handleNextHero} className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-black/70 border border-zinc-800 text-white hover:text-cyan-400 opacity-0 group-hover/hero:opacity-100 transition cursor-pointer">
                    <ChevronRight size={18} />
                  </button>

                  <div className="relative z-30 max-w-2xl px-4 md:px-12 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-zinc-900/90 backdrop-blur border border-zinc-800 p-1.5 rounded-lg text-[10px] font-black tracking-widest text-cyan-400">
                      <Flame size={12} fill="currentColor" /> HIGHLIGHT DATA STREAM
                    </div>
                    <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-white line-clamp-2">{activeHeroMovie.title}</h1>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 max-w-lg">{activeHeroMovie.overview}</p>
                    
                    <div className="pt-2">
                      <button onClick={() => setActivePlaybackMovie(activeHeroMovie)} className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition cursor-pointer border-none flex items-center gap-2">
                        <Play size={14} fill="currentColor" /> Watch Stream Production
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 pt-2">
                      {moviesCatalogue.filter(m => m.category !== 'Coming Soon').slice(0, 5).map((_, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setHeroIndex(idx)}
                          className={`h-1.5 rounded-full transition-all bg-transparent border-none p-0 cursor-pointer ${heroIndex === idx ? 'w-6 bg-cyan-500' : 'w-1.5 bg-zinc-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* THE SEGMENTED MAIN RAILS CATALOGUE DISPLAY */}
                <div className="space-y-12 relative z-40 -mt-10 md:-mt-16">
                  {renderContentRow("Animation Production Studio", "Animation")}
                  {renderContentRow("Anime Network Channels", "Anime")}
                  {renderContentRow("Korean Dramas & Series", "K-Drama")}
                  {renderContentRow("Hollywood Movies", "Hollywood")}
                  {renderContentRow("Paranormal Horror Vault", "Horror")}
                  {renderContentRow("Ecosystem Comedies", "Comedy")}
                  {renderContentRow("Reality TV Channels", "Reality TV")}
                  {renderContentRow("Anticipated Coming Soon Pipeline", "Coming Soon")}
                </div>
              </div>
            )}

            {/* AI COMPANION INTERACTIVE TEXTAREA WORKSPACE */}
            {currentTab === 'ai-chat' && (
              <section className="px-4 max-w-2xl mx-auto h-[80vh] flex flex-col justify-center animate-fade-in pt-4">
                <div className="p-4 bg-zinc-900 border-t border-x border-zinc-800 rounded-t-2xl flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <h2 className="text-xs font-black tracking-widest text-zinc-400 uppercase">NEROXA AI COMPANION Terminal</h2>
                </div>
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-4 overflow-y-auto space-y-4 text-xs font-mono">
                  {chatLog.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-3 rounded-xl whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-cyan-500 text-black font-bold shadow-md' : 'bg-zinc-900 text-zinc-300 border border-zinc-800'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900 border-b border-x border-zinc-800 rounded-b-2xl flex gap-2 items-end">
                  <textarea
                    placeholder="Enter command messages (Press enter for new lines, click arrow to submit query)..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                    rows={2}
                    className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 outline-none rounded-xl px-4 py-2.5 text-xs text-white resize-none font-sans"
                  />
                  <button type="submit" className="p-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition cursor-pointer border-none self-end">
                    <Send size={14} />
                  </button>
                </form>
              </section>
            )}

            {/* HIGH-BANDWIDTH COMMUNITY HUD COMPONENT PANEL */}
            {currentTab === 'community' && (
              <section className="px-4 max-w-4xl mx-auto space-y-6 animate-fade-in py-6">
                <div className="border border-zinc-800 bg-zinc-900/40 p-6 rounded-2xl text-center space-y-1">
                  <h1 className="text-md font-black uppercase tracking-widest text-white">Community Node Router</h1>
                  <p className="text-xs text-zinc-500">Live communication boards processing user clusters correctly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Community Hub Mainframe', 'Anime Network Chat', 'Hollywood Discussion Feed'].map((forum) => (
                    <div key={forum} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between gap-4 hover:border-zinc-700 transition">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wide text-cyan-400">#{forum}</h4>
                        <p className="text-[11px] text-zinc-500 mt-1">Status: Operational. Chat active.</p>
                      </div>
                      <button onClick={() => alert(`Synchronized connection terminal to channel: ${forum}`)} className="w-full text-center text-xs font-bold py-2 bg-zinc-950 text-white hover:bg-cyan-500 hover:text-black rounded-lg transition border border-zinc-800 hover:border-cyan-500 cursor-pointer">Link Terminal Feed</button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECURE MASTER ADMIN PANEL MODULE (REAL REVENUE COUNTERS) */}
            {currentTab === 'admin' && isAdmin && (
              <section className="px-4 max-w-3xl mx-auto space-y-6 animate-fade-in py-6">
                <div className="p-5 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl flex items-center gap-4">
                  <div className="p-2.5 bg-cyan-500 text-black rounded-xl"><ShieldAlert size={24} /></div>
                  <div>
                    <h1 className="text-sm font-black uppercase tracking-widest text-white">Admin Command Matrix</h1>
                    <p className="text-xs text-zinc-400">Authenticated Root Profile Node: <span className="text-cyan-400 font-bold">BENNY RICHY</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase block">Total Registered Users</span>
                    <p className="text-xl font-black text-white">{registeredNodesCount} Accounts</p>
                    <div className="flex gap-2">
                      <button onClick={() => setRegisteredNodesCount(prev => prev + 1)} className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold rounded cursor-pointer border-none text-white">Add Mock</button>
                      <button onClick={() => setRegisteredNodesCount(2540)} className="px-2.5 py-1 bg-zinc-950 text-[10px] text-zinc-400 rounded cursor-pointer border border-zinc-800">Reset</button>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase block">Global Announcement Buffer</span>
                    <input 
                      type="text"
                      value={globalSystemMessage}
                      onChange={(e) => setGlobalSystemMessage(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 outline-none p-2 rounded text-xs text-zinc-200"
                    />
                    <span className="text-[9px] text-zinc-500 block">Modifies application metadata packages in real-time.</span>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Active Database Overview</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800"><p className="text-xs text-zinc-400">Animation</p><p className="text-sm font-black text-cyan-400">{moviesCatalogue.filter(m=>m.category==='Animation').length}</p></div>
                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800"><p className="text-xs text-zinc-400">Anime</p><p className="text-sm font-black text-cyan-400">{moviesCatalogue.filter(m=>m.category==='Anime').length}</p></div>
                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800"><p className="text-xs text-zinc-400">Horror</p><p className="text-sm font-black text-cyan-400">{moviesCatalogue.filter(m=>m.category==='Horror').length}</p></div>
                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800"><p className="text-xs text-zinc-400">Coming Soon</p><p className="text-sm font-black text-cyan-400">{moviesCatalogue.filter(m=>m.category==='Coming Soon').length}</p></div>
                  </div>
                </div>
              </section>
            )}

            {/* HIGH-FIDELITY DESIGNED ACCOUNT WIREFRAME PAGE */}
            {currentTab === 'profile' && (
              <section className="px-4 max-w-xl mx-auto space-y-6 animate-fade-in py-6">
                
                {/* Avatar Banner Card Profile Structure Layout */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-cyan-600 to-cyan-400 opacity-20"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <div className="relative group/avatar">
                      <img src={profileAvatar} className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500 shadow-xl" alt="" />
                      <button 
                        onClick={() => {
                          const customUrl = window.prompt("Paste absolute image address URL asset path to upload profile avatar:", profileAvatar);
                          if (customUrl) setProfileAvatar(customUrl);
                        }}
                        className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition cursor-pointer border-none text-white"
                      >
                        <Camera size={16} />
                      </button>
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                      <h2 className="text-md font-black text-white uppercase tracking-wide">{userData?.name || 'BENNY RICHY'}</h2>
                      <p className="text-xs text-cyan-400 font-bold font-mono">@{userData?.username || 'BENNY RICHY'}</p>
                      <div className="inline-block bg-cyan-500 text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mt-1">Master Admin Node</div>
                    </div>
                  </div>
                </div>

                {/* Database Metrics Specification List Grid Layout */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">Streaming Tier</span>
                    <span className="text-xs font-black text-white tracking-wider block mt-1 uppercase">4K ULTRA HDR ACCORD</span>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">Gateway Address</span>
                    <span className="text-xs font-mono text-cyan-400 block mt-1 truncate">atieejovwo13@gmail.com</span>
                  </div>
                </div>

                {/* Dedicated System Account Message Mail Inbox Drawer Panel Layout */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 flex items-center gap-1.5"><Mail size={14} /> Encrypted Inbound Mailbox</h3>
                  <div className="space-y-2">
                    {systemMails.map((mail) => (
                      <div key={mail.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-cyan-400">
                          <span className="uppercase tracking-wider">Source Code Node Notification</span>
                          <span className="font-mono text-zinc-500">{mail.timestamp}</span>
                        </div>
                        <h4 className="text-xs font-black text-white uppercase">{mail.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">{mail.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Critical Destructive Disconnection Options Layout */}
                <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl flex flex-col sm:flex-row gap-2 justify-between items-center">
                  <button onClick={handleLogout} className="w-full sm:w-auto px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase rounded-lg border border-zinc-800 transition cursor-pointer flex items-center justify-center gap-1.5">
                    <LogOut size={14} /> Disconnect Session
                  </button>
                  <button onClick={handleDeleteAccount} className="w-full sm:w-auto px-4 py-2.5 bg-zinc-950 hover:bg-red-950 border border-zinc-900 hover:border-red-900 text-zinc-500 hover:text-red-400 text-xs font-bold uppercase rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5">
                    <Trash2 size={14} /> Delete System Records
                  </button>
                </div>
              </section>
            )}
          </>
        )}

      </main>

      {/* FULL FUNCTIONAL OVERLAY COMPANION VIDEO PLAYER PIPELINE PLAYER CANVAS ENGINE */}
      {activePlaybackMovie && (
        <div className="fixed inset-0 z-[999] bg-black flex flex-col justify-center items-center animate-fade-in">
          
          <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
            <button 
              onClick={() => { setActivePlaybackMovie(null); setIsSubtitleMenuOpen(false); }}
              className="text-xs font-black bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white px-4 py-2.5 rounded-xl cursor-pointer uppercase"
            >
              ✕ Exit Player Canvas
            </button>
            
            <button 
              onClick={() => setIsSubtitleMenuOpen(!isSubtitleMenuOpen)}
              className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:text-cyan-400 text-white transition flex items-center gap-2 text-xs font-bold uppercase cursor-pointer"
            >
              <Subtitles size={14} /> Captions ({selectedSubtitle})
            </button>
          </div>

          {isSubtitleMenuOpen && (
            <div className="absolute top-16 right-6 z-[999] w-40 bg-zinc-900 border border-zinc-800 p-1 rounded-xl shadow-2xl space-y-0.5">
              {['Off', 'English', 'Spanish', 'French', 'Korean'].map((track) => (
                <button
                  key={track}
                  onClick={() => { setSelectedSubtitle(track); setIsSubtitleMenuOpen(false); }}
                  className="w-full flex items-center justify-between text-left text-xs p-2 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer border-none bg-transparent"
                >
                  {track} {selectedSubtitle === track && <Check size={12} className="text-cyan-400" />}
                </button>
              ))}
            </div>
          )}

          {/* Interactive HTML5 Video Stream Node */}
          <div className="w-full max-w-4xl aspect-video bg-black relative flex items-center justify-center shadow-2xl border border-zinc-900">
            <video 
              src={activePlaybackMovie.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />

            {selectedSubtitle !== 'Off' && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none w-full px-4">
                <span className="bg-black/90 text-yellow-400 border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold shadow-lg">
                  [Caption Sync ({selectedSubtitle}): Parsing synchronized track for {activePlaybackMovie.title}]
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FIXED BASE NAVIGATION SYSTEM FOOTER BAR FOR PHONE ORIENTATIONS */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 py-3.5 px-4 flex justify-around items-center md:hidden shadow-2xl">
        <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-0 ${currentTab === 'home' && !expandedCategory ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <Film size={18} />
          <span className="text-[9px] font-black uppercase tracking-wider">Home</span>
        </button>
        <button onClick={() => setTab('ai-chat')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-0 ${currentTab === 'ai-chat' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <MessageSquare size={18} />
          <span className="text-[9px] font-black uppercase tracking-wider">AI Chat</span>
        </button>
        <button onClick={() => setTab('community')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-0 ${currentTab === 'community' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <Layers size={18} />
          <span className="text-[9px] font-black uppercase tracking-wider">Hub</span>
        </button>
        
        {isAdmin && (
          <button onClick={() => setTab('admin')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-0 ${currentTab === 'admin' ? 'text-cyan-400' : 'text-zinc-500'}`}>
            <ShieldAlert size={18} />
            <span className="text-[9px] font-black uppercase tracking-wider">Admin</span>
          </button>
        )}

        <button onClick={() => setTab('profile')} className={`flex flex-col items-center gap-1 bg-transparent border-none outline-none cursor-pointer p-0 ${currentTab === 'profile' ? 'text-cyan-400' : 'text-zinc-500'}`}>
          <User size={18} />
          <span className="text-[9px] font-black uppercase tracking-wider">Account</span>
        </button>
      </div>

    </div>
  );
}
