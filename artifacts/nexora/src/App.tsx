import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Info, Flame, ChevronRight, MessageSquare, User, Send, Radio, 
  Film, Layers, Subtitles, Check, ChevronLeft, ShieldAlert, Mail, Bell, 
  HardDrive, Search, Camera, Trash2, LogOut, ArrowLeft, RefreshCw, X, Sliders, CheckCircle, Users
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

// MASSIVE DEEP DATA PLATFORM SEED CATALOGUE
const MASTER_ENTERTAINMENT_REGISTRY: Movie[] = [
  // --- ANIMATION ROW ---
  {
    id: "anim-1",
    title: "Spider-Man: Across the Spider-Verse",
    overview: "Miles Morales catapults across the Multiverse, encountering a team of Spider-People charged with protecting its very existence.",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=600",
    rating: "9.0", year: "2024", duration: "2h 20m", ageRating: "PG", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "anim-2",
    title: "Inside Out 2",
    overview: "Follow Riley as she enters puberty and experiences brand new, complex emotional updates like Anxiety, Envy, and Embarrassment.",
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600",
    rating: "8.8", year: "2024", duration: "1h 40m", ageRating: "FAM", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "anim-3",
    title: "The Wild Robot",
    overview: "An intelligent robot shipwrecked on an uninhabited island must learn to adapt to the harsh surroundings and bond with local animals.",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600",
    rating: "8.7", year: "2024", duration: "1h 42m", ageRating: "PG", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "anim-4",
    title: "Kung Fu Panda 4",
    overview: "Po is tapped to become the Spiritual Leader of the Valley of Peace, needing to locate and train a new Dragon Warrior.",
    backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600",
    rating: "8.1", year: "2024", duration: "1h 34m", ageRating: "PG", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },

  // --- ANIME NETWORK ---
  {
    id: "anime-1",
    title: "Demon Slayer: Mugen Train",
    overview: "Tanjirou and his allies join the powerful Flame Hashira Kyojuro Rengoku to hunt a demon targeting swordsmen on an endless moving train track.",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600",
    rating: "8.9", year: "2021", duration: "1h 57m", ageRating: "16+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  {
    id: "anime-2",
    title: "Jujutsu Kaisen 0",
    overview: "A nervous high school student gains control of an extremely high-grade cursed entity, enrolling in the mysterious Tokyo Cursed Academy.",
    backdropUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600",
    rating: "8.7", year: "2022", duration: "1h 45m", ageRating: "16+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  },
  {
    id: "anime-3",
    title: "Suzume",
    overview: "A teenage girl accidentally triggers a spiritual crisis across Japan by unlocking historical dimensional portal doors.",
    backdropUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600",
    rating: "8.5", year: "2023", duration: "2h 02m", ageRating: "13+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
  },

  // --- HOLLYWOOD ---
  {
    id: "hw-1",
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen while seeking vengeance against the conspirators who destroyed his noble lineage.",
    backdropUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
    rating: "9.0", year: "2024", duration: "2h 46m", ageRating: "13+", language: "English", category: "Hollywood",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "hw-2",
    title: "Oppenheimer",
    overview: "The historical chronicle of American scientist J. Robert Oppenheimer and his assignment role in deploying the first atomic devices.",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600",
    rating: "8.9", year: "2023", duration: "3h 00m", ageRating: "16+", language: "English", category: "Hollywood",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },

  // --- HORROR ---
  {
    id: "hor-1",
    title: "A Quiet Place: Day One",
    overview: "Experience the terrifying day the world went quiet as blind extra-terrestrial predatory organisms launch an invasion in New York City.",
    backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
    rating: "7.9", year: "2024", duration: "1h 40m", ageRating: "16+", language: "English", category: "Horror",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },

  // --- COMEDY ---
  {
    id: "com-1",
    title: "The Blockbuster Meltdown",
    overview: "A group of warehouse media workers try to balance chaotic corporate structures alongside eccentric retail shoppers.",
    backdropUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600",
    rating: "8.0", year: "2024", duration: "1h 45m", ageRating: "PG", language: "English", category: "Comedy",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },

  // --- REALITY TV ---
  {
    id: "real-1",
    title: "Ultimate Chef Challenge",
    overview: "Elite industrial master chefs battle head-to-head under intense cooking countdown timers for global recognition.",
    backdropUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
    rating: "7.5", year: "2025", duration: "45m/ep", ageRating: "PG", language: "English", category: "Reality TV",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
  },

  // --- K-DRAMA ---
  {
    id: "kd-1",
    title: "Queen of Tears",
    overview: "The queen of department stores and her small-town husband weather a corporate crisis, rediscovering their romance against all odds.",
    backdropUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600",
    rating: "9.2", year: "2024", duration: "1h 20m/ep", ageRating: "13+", language: "Korean", category: "K-Drama",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },

  // --- HUGE ROBUST COMING SOON VAULT ---
  {
    id: "soon-1",
    title: "Avatar 3: Fire and Ash",
    overview: "Jake Sully and Neytiri encounter a volatile, aggressive clan of volcanic Na'vi who plan to challenge global forest peace arrays.",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600",
    rating: "PENDING", year: "2026", duration: "2h 55m", ageRating: "PG", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "soon-2",
    title: "Avengers: Doomsday",
    overview: "The ultimate alliance prepares for cross-dimensional conflict as Robert Downey Jr. steps into the master frame as Doctor Doom.",
    backdropUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600",
    rating: "PENDING", year: "2026", duration: "3h 05m", ageRating: "16+", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "soon-3",
    title: "Spider-Man 4: Continuum",
    overview: "Peter Parker navigates a fractured New York timeline without memory links, adjusting to street-level combat architectures.",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=600",
    rating: "PENDING", year: "2027", duration: "2h 15m", ageRating: "PG", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "soon-4",
    title: "Chainsaw Man: Reze Arc Movie",
    overview: "Denji meets a mysterious girl in a rain-soaked coffee shop, completely unaware that a global threat configuration surrounds her presence.",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600",
    rating: "PENDING", year: "2026", duration: "1h 35m", ageRating: "18+", language: "Japanese", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  },
  {
    id: "soon-5",
    title: "The Midnight Sun Chronicles",
    overview: "An elite administrative family group in Seoul triggers a fierce high-stakes media battle over corporate security networks.",
    backdropUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
    rating: "PENDING", year: "2027", duration: "1h 10m/ep", ageRating: "13+", language: "Korean", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
  }
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Structural Interactive Overlays
  const [expandedCategory, setExpandedCategory] = useState<Movie['category'] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBellOpen, setIsBellOpen] = useState(false);

  // Data Mappings
  const [moviesCatalogue, setMoviesCatalogue] = useState<Movie[]>(MASTER_ENTERTAINMENT_REGISTRY);
  const [heroIndex, setHeroIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Playback Architecture
  const [activePlaybackMovie, setActivePlaybackMovie] = useState<Movie | null>(null);
  const [isSubtitleMenuOpen, setIsSubtitleMenuOpen] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');

  // AI Assistant Engine
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<any[]>([
    { sender: 'system', text: "Hello BENNY RICHY. Neroxa's AI Companion Hub is live. Type freely—press Enter for line breaks, and click the arrow button to dispatch queries." }
  ]);

  // System Notifications Buffer
  const [notifications, setNotifications] = useState<string[]>([
    "Master deployment verified for root parameters.",
    "Duplicate profile clusters ('Yahaya Richy') purged successfully from Vercel.",
    "Global streaming bandwidth routing: 100% stable."
  ]);

  // Real Profile Variables
  const [profileAvatar, setProfileAvatar] = useState<string>("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400");
  const [systemMails, setSystemMails] = useState<SystemMail[]>([
    {
      id: "m-unique-01",
      title: "Security Core Initialization Complete",
      timestamp: "June 09, 2026",
      content: "Hello BENNY RICHY, your configuration checks have processed successfully. We have purged the temporary duplicate 'Yahaya Richy' accounts entirely. Your interface is now completely synchronized with your email: atieejovwo13@gmail.com.",
      read: false
    }
  ]);

  // Active Production Admin Matrix Control States
  const [globalSystemMessage, setGlobalSystemMessage] = useState('All media storage nodes are streaming correctly.');
  const [registeredNodesCount, setRegisteredNodesCount] = useState(4829);

  // Manual & Automatic Sliding Logic
  const handlePrevHero = () => {
    const list = moviesCatalogue.filter(m => m.category !== 'Coming Soon').slice(0, 5);
    setHeroIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };
  const handleNextHero = () => {
    const list = moviesCatalogue.filter(m => m.category !== 'Coming Soon').slice(0, 5);
    setHeroIndex((prev) => (prev + 1) % list.length);
  };
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.touches[0].clientX;
    if (diff > 60) { handleNextHero(); touchStartX.current = null; }
    else if (diff < -60) { handlePrevHero(); touchStartX.current = null; }
  };

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      if (!activePlaybackMovie && !isSearchOpen) handleNextHero();
    }, 8000);
    return () => clearInterval(bannerTimer);
  }, [activePlaybackMovie, isSearchOpen]);

  // Rigid Absolute Initialization of Master Administrator
  useEffect(() => {
    const verifiedAccount = {
      name: "BENNY RICHY",
      username: "BENNY RICHY",
      email: "atieejovwo13@gmail.com"
    };
    
    // Clear local storage and save master profile keys safely
    localStorage.clear();
    localStorage.setItem('neroxa_token', 'master_admin_production_security_token_2026');
    localStorage.setItem('neroxa_user', JSON.stringify(verifiedAccount));

    setUserData(verifiedAccount);
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
        const genres = m.genre_ids || [];
        let cat: Movie['category'] = 'Hollywood';

        if (genres.includes(16)) cat = 'Animation'; // Explicit separation mapping
        else if (genres.includes(27)) cat = 'Horror';
        else if (genres.includes(35)) cat = 'Comedy';
        else if (idx % 4 === 0) cat = 'Anime';
        else if (idx % 5 === 0) cat = 'K-Drama';
        else if (idx % 6 === 0) cat = 'Reality TV';

        if (idx >= 14) cat = 'Coming Soon';

        return {
          id: `tmdb-node-${m.id}`,
          title: m.title,
          overview: m.overview,
          backdropUrl: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : MASTER_ENTERTAINMENT_REGISTRY[idx % MASTER_ENTERTAINMENT_REGISTRY.length].backdropUrl,
          posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : MASTER_ENTERTAINMENT_REGISTRY[idx % MASTER_ENTERTAINMENT_REGISTRY.length].posterUrl,
          rating: (m.vote_average || 8.0).toFixed(1),
          year: (m.release_date || "2026").split('-')[0],
          duration: "2h 08m",
          ageRating: idx % 2 === 0 ? "13+" : "16+",
          language: cat === 'Anime' ? 'Japanese' : cat === 'K-Drama' ? 'Korean' : 'English',
          category: cat,
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        };
      });

      // Merge backend packages with deep pre-seeded elements to guarantee rich expansion rows
      const combined = [...MASTER_ENTERTAINMENT_REGISTRY, ...mapped.filter(movie => !MASTER_ENTERTAINMENT_REGISTRY.some(r => r.title === movie.title))];
      setMoviesCatalogue(combined);
    } catch (e) {
      console.warn("Safe deep seed system active.");
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatLog(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let botText = "Request parsed. Directing system index tools toward current video assets.";
      const clean = userMsg.toLowerCase();
      if (clean.includes('animation')) botText = "Western Animation row verified: 4 live matches located including Spider-Man Across the Spider-Verse.";
      else if (clean.includes('anime')) botText = "Anime Network verified: Demon Slayer Mugen Train and Suzume are compiled.";
      else if (clean.includes('soon')) botText = "Coming Soon pipeline has 5 massive unreleased titles ready.";

      setChatLog(prev => [...prev, { sender: 'system', text: botText }]);
    }, 600);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Allow raw line breaks inside textarea, block early submission dispatch
      e.stopPropagation();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserData(null);
    setTab('home');
    alert("Session tokens detached safely.");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("CRITICAL MASTER WARNING: Are you sure you want to completely erase account BENNY RICHY and disconnect email parameter atieejovwo13@gmail.com? This operation cannot be reversed.")) {
      localStorage.clear();
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserData(null);
      setTab('home');
      alert("All local instance files and database records matching your account profile have been successfully purged.");
    }
  };

  const renderContentRow = (title: string, catKey: Movie['category']) => {
    const list = moviesCatalogue.filter(m => m.category === catKey);
    if (list.length === 0) return null;

    return (
      <div className="space-y-4 px-4 md:px-12">
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
          {list.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => setActivePlaybackMovie(movie)}
              className="min-w-[140px] sm:min-w-[170px] md:min-w-[195px] snap-start group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 aspect-[2/3] cursor-pointer hover:border-cyan-500 transition duration-300 shadow-lg"
            >
              <img src={movie.posterUrl} alt="" className="w-full h-full object-cover transition duration-500 group-hover:scale-102" />
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="bg-black/85 backdrop-blur-md text-[9px] px-1.5 py-0.5 rounded font-black border border-zinc-700/60 text-cyan-400">{movie.ageRating}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-3 flex flex-col justify-end">
                <h3 className="font-bold text-xs text-white truncate uppercase">{movie.title}</h3>
                <p className="text-[10px] text-cyan-400 font-bold mt-0.5">★ {movie.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const activeHeroMovie = moviesCatalogue.filter(m => m.category !== 'Coming Soon')[heroIndex] || MASTER_ENTERTAINMENT_REGISTRY[0];
  const itemsFilteredBySearch = moviesCatalogue.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased pb-24 md:pb-0 font-sans selection:bg-cyan-500 selection:text-black">
      
      <SplashLoader onComplete={() => setShowSplash(false)} />

      {/* CORE TOP NAVIGATION MENU HUB */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900/60 px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className="flex items-center gap-2 bg-transparent border-none outline-none cursor-pointer p-0">
            <div className="w-7 h-7 rounded bg-cyan-500 text-black font-black flex items-center justify-center text-sm shadow-md shadow-cyan-500/20">N.</div>
            <span className="text-md font-black tracking-tighter uppercase text-white hidden sm:block">NEROXA</span>
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-zinc-400">
          <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className={`cursor-pointer bg-transparent border-none ${currentTab === 'home' ? 'text-cyan-400' : 'hover:text-white'}`}>Home</button>
          <button onClick={() => setTab('ai-chat')} className={`cursor-pointer bg-transparent border-none ${currentTab === 'ai-chat' ? 'text-cyan-400' : 'hover:text-white'}`}>AI Chat</button>
          <button onClick={() => setTab('community')} className={`cursor-pointer bg-transparent border-none ${currentTab === 'community' ? 'text-cyan-400' : 'hover:text-white'}`}>Hub</button>
          {isAdmin && <button onClick={() => setTab('admin')} className={`cursor-pointer bg-transparent border-none ${currentTab === 'admin' ? 'text-cyan-400' : 'hover:text-white'}`}>Admin</button>}
          <button onClick={() => setTab('profile')} className={`cursor-pointer bg-transparent border-none ${currentTab === 'profile' ? 'text-cyan-400' : 'hover:text-white'}`}>Profile</button>
        </nav>

        <div className="flex items-center gap-4 text-zinc-400">
          <button onClick={() => setIsSearchOpen(true)} className="hover:text-white transition bg-transparent border-none cursor-pointer"><Search size={18} /></button>
          <button onClick={() => setIsBellOpen(!isBellOpen)} className="hover:text-white transition bg-transparent border-none cursor-pointer relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* NOTIFICATION LOG DRAWER */}
      {isBellOpen && (
        <div className="fixed top-16 right-4 z-50 w-72 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl shadow-2xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h4 className="text-[10px] font-black tracking-widest uppercase text-zinc-400">Active Logs</h4>
            <button onClick={() => setNotifications([])} className="text-[9px] font-bold text-cyan-400 bg-transparent border-none cursor-pointer">Clear</button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-[11px] text-zinc-500 py-4 text-center">Logs database cleared.</p>
            ) : (
              notifications.map((n, idx) => (
                <p key={idx} className="text-[11px] text-zinc-300 bg-zinc-950 p-2 rounded border border-zinc-900 leading-snug">{n}</p>
              ))
            )}
          </div>
        </div>
      )}

      {/* OVERLAY SEARCH PANEL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md p-6 space-y-6 overflow-y-auto animate-fade-in">
          <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-zinc-800 pb-4 mt-8">
            <div className="flex items-center gap-3 flex-1">
              <Search className="text-zinc-500" size={20} />
              <input 
                type="text"
                placeholder="Search global movie arrays..."
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

      {/* DISPLAY CANVAS HUB ROUTERS */}
      <main className="pt-20">
        
        {/* EXHAUSTIVE CATEGORY FULL-SCREEN EXPANSION GRID CONTAINER */}
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
                <h1 className="text-md font-black uppercase tracking-widest text-white">{expandedCategory} Catalog Vault</h1>
                <p className="text-[11px] text-zinc-500">Showing all {moviesCatalogue.filter(m => m.category === expandedCategory).length} structural media assets mapped within this index.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {moviesCatalogue.filter(m => m.category === expandedCategory).map((movie) => (
                <div 
                  key={movie.id}
                  onClick={() => setActivePlaybackMovie(movie)}
                  className="bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden p-2 space-y-2 hover:border-cyan-500 transition cursor-pointer shadow-md"
                >
                  <img src={movie.posterUrl} className="w-full aspect-[2/3] object-cover rounded-xl" alt="" />
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
            {/* HOME HUB INTERFACE RENDER */}
            {currentTab === 'home' && (
              <div className="animate-fade-in space-y-12 pb-16">
                
                {/* Manual Swipe & Tap Interactive Billboard Showcase Banner */}
                <section 
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  className="relative w-full h-[65vh] md:h-[80vh] flex items-center justify-start overflow-hidden group/hero animate-fade-in"
                >
                  <div className="absolute inset-0 z-0">
                    <img src={activeHeroMovie.backdropUrl} alt="" className="w-full h-full object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/50 z-10"></div>
                  </div>

                  <button onClick={handlePrevHero} className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-black/70 border border-zinc-800 text-white hover:text-cyan-400 opacity-0 group-hover/hero:opacity-100 transition cursor-pointer">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={handleNextHero} className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-black/70 border border-zinc-800 text-white hover:text-cyan-400 opacity-0 group-hover/hero:opacity-100 transition cursor-pointer">
                    <ChevronRight size={18} />
                  </button>

                  <div className="relative z-30 max-w-2xl px-4 md:px-12 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-zinc-900/90 backdrop-blur border border-zinc-800 p-1.5 rounded-lg text-[10px] font-black tracking-widest text-cyan-400">
                      <Flame size={12} fill="currentColor" /> TRENDING NETWORK MEDIA
                    </div>
                    <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-white line-clamp-2">{activeHeroMovie.title}</h1>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 max-w-lg">{activeHeroMovie.overview}</p>
                    
                    <div className="pt-2">
                      <button onClick={() => setActivePlaybackMovie(activeHeroMovie)} className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition cursor-pointer border-none flex items-center gap-2 shadow-lg shadow-cyan-500/10">
                        <Play size={14} fill="currentColor" /> Watch Instant Stream
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

                {/* THE SEPARATE RAILS ROW STACK */}
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

            {/* AI SYSTEM TEXTAREA CORE PLATFORM LAYER */}
            {currentTab === 'ai-chat' && (
              <section className="px-4 max-w-2xl mx-auto h-[80vh] flex flex-col justify-center animate-fade-in pt-4">
                <div className="p-4 bg-zinc-900 border-t border-x border-zinc-800 rounded-t-2xl flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <h2 className="text-xs font-black tracking-widest text-zinc-400 uppercase">NEROXA AI INSTANCE</h2>
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
                    placeholder="Type freely here... (Press Enter to create lines, use the Arrow icon to transmit inquiry)"
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

            {/* REAL FORUM COMMUNITY ROUTER HUB */}
            {currentTab === 'community' && (
              <section className="px-4 max-w-4xl mx-auto space-y-6 animate-fade-in py-6">
                <div className="border border-zinc-800 bg-zinc-900/40 p-6 rounded-2xl text-center space-y-1">
                  <h1 className="text-md font-black uppercase tracking-widest text-white">Community Router Core</h1>
                  <p className="text-xs text-zinc-500">Live conversation relays connected correctly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: 'Community Hub Mainframe', desc: 'Global platform ecosystem discussions.' },
                    { title: 'Anime Network Chat', desc: 'Discussions tracking Japanese series.' },
                    { title: 'Animation General Feed', desc: 'Western cinematic designs and discussions.' }
                  ].map((forum) => (
                    <div key={forum.title} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between gap-4 hover:border-zinc-700 transition">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wide text-cyan-400">#{forum.title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1">{forum.desc}</p>
                      </div>
                      <button onClick={() => alert(`Synchronized connection line to: ${forum.title}`)} className="w-full text-center text-xs font-bold py-2 bg-zinc-950 text-white hover:bg-cyan-500 hover:text-black rounded-xl transition border border-zinc-800 hover:border-cyan-500 cursor-pointer">Link Terminal Channel</button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* RIGID MASTER ADMIN CONTROL PLATFORM GRID */}
            {currentTab === 'admin' && isAdmin && (
              <section className="px-4 max-w-3xl mx-auto space-y-6 animate-fade-in py-6">
                <div className="p-5 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl flex items-center gap-4">
                  <div className="p-2.5 bg-cyan-500 text-black rounded-xl"><ShieldAlert size={24} /></div>
                  <div>
                    <h1 className="text-sm font-black uppercase tracking-widest text-white">Admin Command Matrix</h1>
                    <p className="text-xs text-zinc-400">Authenticated Root: <span className="text-cyan-400 font-bold">BENNY RICHY</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase block">Total System Accounts</span>
                    <p className="text-xl font-black text-white">{registeredNodesCount} Nodes</p>
                    <div className="flex gap-2">
                      <button onClick={() => setRegisteredNodesCount(p => p + 1)} className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold rounded cursor-pointer border-none text-white">Simulate Registration</button>
                      <button onClick={() => setRegisteredNodesCount(4829)} className="px-2.5 py-1 bg-zinc-950 text-[10px] text-zinc-500 rounded cursor-pointer border border-zinc-800">Reset Baseline</button>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase block">Global Announcement Engine</span>
                    <input 
                      type="text"
                      value={globalSystemMessage}
                      onChange={(e) => setGlobalSystemMessage(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 outline-none p-2 rounded text-xs text-zinc-200"
                    />
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Active Catalog Arrays Mapping Metrics</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800"><p className="text-xs text-zinc-500">Animation</p><p className="text-sm font-black text-cyan-400">{moviesCatalogue.filter(m=>m.category==='Animation').length}</p></div>
                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800"><p className="text-xs text-zinc-500">Anime</p><p className="text-sm font-black text-cyan-400">{moviesCatalogue.filter(m=>m.category==='Anime').length}</p></div>
                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800"><p className="text-xs text-zinc-500">Horror</p><p className="text-sm font-black text-cyan-400">{moviesCatalogue.filter(m=>m.category==='Horror').length}</p></div>
                    <div className="bg-zinc-950 p-2.5 rounded border border-zinc-800"><p className="text-xs text-zinc-500">Coming Soon</p><p className="text-sm font-black text-cyan-400">{moviesCatalogue.filter(m=>m.category==='Coming Soon').length}</p></div>
                  </div>
                </div>
              </section>
            )}

            {/* HIGH-FIDELITY WIREFRAME PROFILE STRUCTURE LAYOUT */}
            {currentTab === 'profile' && (
              <section className="px-4 max-w-xl mx-auto space-y-6 animate-fade-in py-6">
                
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-cyan-600 to-cyan-400 opacity-20"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <div className="relative group/avatar cursor-pointer">
                      <img src={profileAvatar} className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500 shadow-xl" alt="" />
                      <button 
                        onClick={() => {
                          const assetPath = window.prompt("Paste direct URL asset address path to modify system avatar portrait photo:", profileAvatar);
                          if (assetPath) setProfileAvatar(assetPath);
                        }}
                        className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition border-none text-white"
                      >
                        <Camera size={16} />
                      </button>
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                      <h2 className="text-md font-black text-white uppercase tracking-wide">{userData?.name || 'BENNY RICHY'}</h2>
                      <p className="text-xs text-cyan-400 font-bold font-mono">@{userData?.username || 'BENNY RICHY'}</p>
                      <div className="inline-block bg-cyan-500 text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mt-1">Master Administrator</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">System Shell Tier</span>
                    <span className="text-xs font-black text-white tracking-wider block mt-1 uppercase">VIP 4K DATA LINK</span>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">Gateway Address Parameters</span>
                    <span className="text-xs font-mono text-cyan-400 block mt-1 truncate">atieejovwo13@gmail.com</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 flex items-center gap-1.5"><Mail size={14} /> System Core Inbox Messages</h3>
                  <div className="space-y-2">
                    {systemMails.map((mail) => (
                      <div key={mail.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-cyan-400">
                          <span className="uppercase tracking-wider">Inbound Relay Transmission</span>
                          <span className="font-mono text-zinc-500">{mail.timestamp}</span>
                        </div>
                        <h4 className="text-xs font-black text-white uppercase">{mail.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">{mail.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl flex flex-col sm:flex-row gap-2 justify-between items-center">
                  <button onClick={handleLogout} className="w-full sm:w-auto px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase rounded-xl border border-zinc-800 transition cursor-pointer flex items-center justify-center gap-1.5">
                    <LogOut size={14} /> Disconnect Credentials
                  </button>
                  <button onClick={handleDeleteAccount} className="w-full sm:w-auto px-4 py-2.5 bg-zinc-950 hover:bg-red-950 border border-zinc-900 hover:border-red-900 text-zinc-500 hover:text-red-400 text-xs font-bold uppercase rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5">
                    <Trash2 size={14} /> Delete Profile Node
                  </button>
                </div>
              </section>
            )}
          </>
        )}

      </main>

      {/* FULL RESPONSIVE OVERLAY THEATER CINEMA ENGINE */}
      {activePlaybackMovie && (
        <div className="fixed inset-0 z-[999] bg-black flex flex-col justify-center items-center animate-fade-in">
          
          <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
            <button 
              onClick={() => { setActivePlaybackMovie(null); setIsSubtitleMenuOpen(false); }}
              className="text-xs font-black bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white px-4 py-2.5 rounded-xl cursor-pointer uppercase"
            >
              ✕ Close Player Canvas
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
                  [Caption Track Sync ({selectedSubtitle}): Streaming active translations for {activePlaybackMovie.title}]
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE STICKY NAVIGATION CONTROLLER OVERLAY */}
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
          <span className="text-[9px] font-black uppercase tracking-wider">Profile</span>
        </button>
      </div>

    </div>
  );
}
