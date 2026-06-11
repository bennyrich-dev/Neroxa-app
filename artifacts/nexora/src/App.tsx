import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Film, Layers, MessageSquare, ShieldAlert, User, Send, 
  ChevronRight, ArrowLeft, Search, Bell, X, Subtitles, Check, 
  Camera, Trash2, LogOut, CheckCircle, Mail, Users, Flame, Info
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

interface ForumChannel {
  id: string;
  name: string;
  description: string;
  members: string;
  joined: boolean;
}

// STABLE, PRE-LOADED MEDIA ARCHIVE DATA DIRECTORY
const STABLE_MEDIA_VAULT: Movie[] = [
  // --- ANIMATION PRODUCTION STUDIO (WESTERN/CGI) ---
  {
    id: "anim-1",
    title: "Spider-Man: Across the Spider-Verse",
    overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=500",
    rating: "9.1", year: "2024", duration: "2h 20m", ageRating: "PG", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "anim-2",
    title: "Despicable Me 4",
    overview: "Gru, Lucy, Margo, Edith, and Agnes welcome a new member to the family, Gru Jr., who is intent on tormenting his dad.",
    backdropUrl: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1601647998801-6b83446059b0?w=500",
    rating: "8.4", year: "2024", duration: "1h 35m", ageRating: "FAM", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "anim-3",
    title: "Inside Out 2",
    overview: "Teenager Riley's mind headquarters undergoes a sudden demolition to make room for something entirely unexpected: new Emotions!",
    backdropUrl: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500",
    rating: "8.8", year: "2024", duration: "1h 40m", ageRating: "PG", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "anim-4",
    title: "The Wild Robot",
    overview: "An intelligent robot shipwrecked on an uninhabited island must adapt to its harsh surroundings and bond with local wildlife.",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500",
    rating: "9.0", year: "2024", duration: "1h 42m", ageRating: "PG", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },

  // --- ANIME NETWORK CHANNELS (AUTHENTIC JAPANESE) ---
  {
    id: "anime-1",
    title: "Demon Slayer: Mugen Train",
    overview: "Tanjirou and the group accompany the Flame Hashira Kyojuro Rengoku aboard the Infinity Train.",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500",
    rating: "8.9", year: "2023", duration: "1h 57m", ageRating: "16+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  {
    id: "anime-2",
    title: "Jujutsu Kaisen 0",
    overview: "Yuta Okkotsu gains control of an extremely powerful Cursed Spirit and enrolls in Tokyo Jujutsu High School.",
    backdropUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=500",
    rating: "8.7", year: "2022", duration: "1h 45m", ageRating: "16+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
  },
  {
    id: "anime-3",
    title: "Suzume",
    overview: "A 17-year-old girl named Suzume helps a mysterious young man close portals causing disasters across Japan.",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500",
    rating: "8.6", year: "2023", duration: "2h 02m", ageRating: "13+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
  },

  // --- HOLLYWOOD DEEP SECTIONS ---
  {
    id: "hwood-1",
    title: "Gladiator Eternal",
    overview: "A historical action blockbuster focused on tactical legion combat, arena management dynamics, and honor.",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500",
    rating: "8.5", year: "2025", duration: "2h 30m", ageRating: "16+", language: "English", category: "Hollywood",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "hwood-2",
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    backdropUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500",
    rating: "9.0", year: "2024", duration: "2h 46m", ageRating: "13+", language: "English", category: "Hollywood",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },

  // --- PARANORMAL HORROR VAULT ---
  {
    id: "horror-1",
    title: "The Conjuring: Rifts",
    overview: "Paranormal investigators work to track down an ancient dark force that has integrated into an offline server grid.",
    backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500",
    rating: "7.9", year: "2025", duration: "1h 52m", ageRating: "18+", language: "English", category: "Horror",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },

  // --- ECOSYSTEM COMEDIES ---
  {
    id: "comedy-1",
    title: "The Blockbuster Meltdown",
    overview: "A group of warehouse media workers try to balance intense retail environments alongside chaotic management teams.",
    backdropUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=500",
    rating: "8.2", year: "2024", duration: "1h 45m", ageRating: "PG", language: "English", category: "Comedy",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },

  // --- EXTENSIVE COMING SOON PIPELINE (6 MASSIVE ENTRIES) ---
  {
    id: "soon-1",
    title: "Avatar 4: The Tulkun Rider",
    overview: "Jake Sully and Neytiri launch a risky naval strategy to shield the deep ocean sectors of Pandora.",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500",
    rating: "TBD", year: "2027", duration: "3h 05m", ageRating: "FAM", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "soon-2",
    title: "Ironheart: Armor Genesis",
    overview: "Riri Williams engineering laboratory creates a fast, tactical armor model that pushes international technological frameworks.",
    backdropUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=500",
    rating: "TBD", year: "2026", duration: "2h 10m", ageRating: "PG", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "soon-3",
    title: "The Midnight Sun: K-Drama Saga",
    overview: "An upcoming high-budget romance set in historical Seoul tracking the hidden power paths of two corporate royalty groups.",
    backdropUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500",
    rating: "TBD", year: "2026", duration: "1h 15m/ep", ageRating: "13+", language: "Korean", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "soon-4",
    title: "Cyberpunk: Night City Chronicles",
    overview: "An unknown rookie street mercenary launches tactical cybernetic data attacks against major corporate compounds.",
    backdropUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500",
    rating: "TBD", year: "2027", duration: "25m/ep", ageRating: "18+", language: "Japanese", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    id: "soon-5",
    title: "Avengers: Secret Wars",
    overview: "The definitive culmination of multiverse phase structures colliding into a singular battle station interface space.",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=500",
    rating: "TBD", year: "2027", duration: "3h 15m", ageRating: "PG", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  {
    id: "soon-6",
    title: "Chainsaw Man: Reze Arc Movie",
    overview: "Denji meets a mysterious girl named Reze in a cafe, launching an incredibly violent chain of espionage encounters.",
    backdropUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=500",
    rating: "TBD", year: "2026", duration: "1h 32m", ageRating: "18+", language: "Japanese", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
  }
];

export default function App() {
  const [currentTab, setTab] = useState('home');
  const [expandedCategory, setExpandedCategory] = useState<Movie['category'] | null>(null);
  
  // Modals visibility states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBellOpen, setIsBellOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Video playback mechanics
  const [activePlaybackMovie, setActivePlaybackMovie] = useState<Movie | null>(null);
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // Profile Information (Enforcing absolute limits over credentials)
  const [profileAvatar, setProfileAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400");
  const accountEmail = "atieejovwo13@gmail.com";
  const accountName = "BENNY RICHY";

  // System Notifications Log Drawer
  const [alertLogs, setAlertLogs] = useState<string[]>([
    "Secondary account node 'Yahaya Richy' has been cleanly unlinked and wiped.",
    "Master identity verified: BENNY RICHY root privileges armed.",
    "System player status check: Online and independent."
  ]);

  // AI Mainframe State Machine
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'system', text: 'Neroxa Neural Network Online. Press Enter for line breaks. Use the Send Icon to process parameters.' }
  ]);

  // Community Channel Registry
  const [communityFeeds, setCommunityFeeds] = useState<ForumChannel[]>([
    { id: "c1", name: "Community Hub Mainframe", description: "Global talk space for Neroxa streaming trends and configurations.", members: "12.4K", joined: true },
    { id: "c2", name: "Animation Production Lounge", description: "CGI design layers, Pixar concepts, and box office talk.", members: "4.1K", joined: false },
    { id: "c3", name: "Anime Network Relay Room", description: "Discussions regarding upcoming subbed serialization drops from Japan.", members: "9.2K", joined: false }
  ]);

  // Admin Config Variables
  const [appAlertText, setAppAlertText] = useState("All distribution nodes active at peak operational bandwidth.");
  const [registeredAccountsCount, setRegisteredAccountsCount] = useState(4822);

  // Secure Message Interceptor Form Handler
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatLog(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');

    // Simulated response track matching configuration elements
    setTimeout(() => {
      let reply = "Mainframe synchronized query. Data metrics are normal.";
      if (userMessage.toLowerCase().includes('movie')) {
        reply = "Directory scan complete: Pre-loaded index lists are active across Animation, Anime, and 6 upcoming releases.";
      }
      setChatLog(prev => [...prev, { sender: 'system', text: reply }]);
    }, 450);
  };

  // Force accurate Line-Break Injection directly on the native textarea block
  const handleTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // Stop form submission propagation entirely to allow clean native line-break addition
      e.stopPropagation();
    }
  };

  const handleToggleJoinGroup = (groupId: string) => {
    setCommunityFeeds(prev => prev.map(group => {
      if (group.id === groupId) {
        const targetState = !group.joined;
        setAlertLogs(logs => [`Updated connection log path: #${group.name}`, ...logs]);
        return { ...group, joined: targetState };
      }
      return group;
    }));
  };

  const handleLogoutSession = () => {
    if (confirm("Disconnect master credentials from session terminal?")) {
      alert("Session dropped. Returning to welcome stage.");
      setTab('home');
    }
  };

  const handlePermanentWipe = () => {
    if (confirm("CRITICAL RED ZONE: Proceeding will erase all stored parameters associated with BENNY RICHY. Continue?")) {
      alert("Database matrix flushed. Local configurations reset.");
      setTab('home');
    }
  };

  const renderCollectionRow = (headerTitle: string, filterCategory: Movie['category']) => {
    const subset = STABLE_MEDIA_VAULT.filter(m => m.category === filterCategory);
    if (subset.length === 0) return null;

    return (
      <div className="space-y-4 px-4 md:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-cyan-500 rounded-sm"></span>
            <h2 className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400">
              {headerTitle} <span className="text-[10px] text-zinc-600 font-mono font-normal">({subset.length})</span>
            </h2>
          </div>
          <button 
            onClick={() => setExpandedCategory(filterCategory)}
            className="text-[10px] font-black text-cyan-500 tracking-widest uppercase hover:text-cyan-400 flex items-center gap-1 bg-transparent border-none cursor-pointer"
          >
            EXPAND ALL <ChevronRight size={12} />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {subset.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => setActivePlaybackMovie(movie)}
              className="min-w-[140px] sm:min-w-[180px] snap-start bg-zinc-900 border border-zinc-800/80 rounded-xl overflow-hidden aspect-[2/3] relative group cursor-pointer hover:border-cyan-500 transition duration-300"
            >
              <img src={movie.posterUrl} className="w-full h-full object-cover" alt="" />
              <div className="absolute top-2 left-2">
                <span className="bg-black/95 text-[9px] px-1.5 py-0.5 rounded font-black font-mono border border-zinc-800 text-cyan-400">{movie.ageRating}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex flex-col justify-end">
                <h4 className="text-xs font-bold text-white truncate uppercase">{movie.title}</h4>
                <div className="flex justify-between items-center text-[10px] text-zinc-400 mt-1">
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

  const filteredSearchList = STABLE_MEDIA_VAULT.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased pb-24 md:pb-6">
      
      {/* HEADER TOP BAR FRAMEWORK */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900/60 px-4 md:px-12 py-4 flex items-center justify-between">
        <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
          <div className="w-7 h-7 bg-cyan-500 text-black font-black rounded flex items-center justify-center text-sm">N</div>
          <span className="text-xs font-black uppercase tracking-wider text-white hidden sm:inline">Neroxa Mainframe</span>
        </button>

        <nav className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
          <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className={`cursor-pointer bg-transparent border-none transition ${currentTab === 'home' && !expandedCategory ? 'text-cyan-500' : 'hover:text-white'}`}>Home Hub</button>
          <button onClick={() => setTab('ai-chat')} className={`cursor-pointer bg-transparent border-none transition ${currentTab === 'ai-chat' ? 'text-cyan-500' : 'hover:text-white'}`}>AI Chat</button>
          <button onClick={() => setTab('community')} className={`cursor-pointer bg-transparent border-none transition ${currentTab === 'community' ? 'text-cyan-500' : 'hover:text-white'}`}>Community Hub</button>
          <button onClick={() => setTab('admin')} className={`cursor-pointer bg-transparent border-none transition ${currentTab === 'admin' ? 'text-cyan-500' : 'hover:text-white'}`}>Admin command</button>
          <button onClick={() => setTab('profile')} className={`cursor-pointer bg-transparent border-none transition ${currentTab === 'profile' ? 'text-cyan-500' : 'hover:text-white'}`}>My Profile</button>
        </nav>

        <div className="flex items-center gap-4 text-zinc-400">
          <button onClick={() => setIsSearchOpen(true)} className="hover:text-white bg-transparent border-none cursor-pointer p-1"><Search size={16} /></button>
          <button onClick={() => setIsBellOpen(!isBellOpen)} className="hover:text-white bg-transparent border-none cursor-pointer relative p-1">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* SEARCH OVERLAY DASHBOARD MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md p-6 animate-fade-in">
          <div className="max-w-3xl mx-auto flex items-center justify-between border-b border-zinc-800 pb-4 mt-12">
            <div className="flex items-center gap-3 flex-1">
              <Search className="text-cyan-500" size={20} />
              <input 
                type="text" 
                placeholder="Search movies, categories, serialization indexes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm font-bold text-white placeholder-zinc-700 uppercase tracking-wide"
                autoFocus
              />
            </div>
            <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="p-2 bg-zinc-900 text-zinc-400 hover:text-white border-none cursor-pointer rounded-xl"><X size={16} /></button>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
            {filteredSearchList.map(movie => (
              <div key={movie.id} onClick={() => { setActivePlaybackMovie(movie); setIsSearchOpen(false); }} className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl cursor-pointer hover:border-cyan-500 transition">
                <img src={movie.posterUrl} className="w-full aspect-[2/3] object-cover rounded-lg" alt="" />
                <h5 className="text-[11px] font-bold mt-2 truncate uppercase">{movie.title}</h5>
                <span className="text-[9px] text-cyan-400 font-mono block mt-0.5">{movie.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTIFICATION LIVE SYSTEM DRAWER */}
      {isBellOpen && (
        <div className="fixed top-16 right-4 z-50 w-76 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl shadow-2xl space-y-3">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">Live Log Dashboard</span>
            <button onClick={() => setAlertLogs([])} className="text-[9px] text-cyan-500 bg-transparent border-none cursor-pointer hover:underline">Flush</button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
            {alertLogs.length === 0 ? (
              <p className="text-[10px] text-zinc-600 font-mono py-4 text-center">Logs clear.</p>
            ) : (
              alertLogs.map((log, idx) => (
                <p key={idx} className="text-[10px] text-zinc-400 font-mono bg-black p-2 rounded border border-zinc-900 leading-tight">» {log}</p>
              ))
            )}
          </div>
        </div>
      )}

      {/* MAIN LAYOUT GATEWAY COMPONENT */}
      <main className="pt-24 space-y-12">
        
        {/* VIEW RE-ROUTE: FULL COLLECTION EXPANSE FRAMEWORK */}
        {expandedCategory ? (
          <div className="px-4 md:px-12 space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <button onClick={() => setExpandedCategory(null)} className="p-2 bg-zinc-900 text-zinc-400 hover:text-white rounded-xl border-none cursor-pointer"><ArrowLeft size={16} /></button>
              <div>
                <h1 className="text-xs font-black uppercase tracking-widest text-white">Full {expandedCategory} Archive View</h1>
                <p className="text-[10px] text-zinc-500 font-mono">Isolated system listing containing all stored asset vectors for this specific line channel.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {STABLE_MEDIA_VAULT.filter(m => m.category === expandedCategory).map(movie => (
                <div key={movie.id} onClick={() => setActivePlaybackMovie(movie)} className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl cursor-pointer hover:border-cyan-500 transition space-y-2">
                  <img src={movie.posterUrl} className="w-full aspect-[2/3] object-cover rounded-lg" alt="" />
                  <h3 className="text-xs font-bold text-white truncate uppercase">{movie.title}</h3>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                    <span>{movie.year}</span>
                    <span className="text-cyan-400">{movie.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* HUB VIEW: HOME PLATFORM */}
            {currentTab === 'home' && (
              <div className="space-y-12 animate-fade-in">
                
                {/* BILLBOARD TOP BANNER HERO */}
                <section className="relative w-full h-[55vh] flex items-center px-4 md:px-12 overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200" className="w-full h-full object-cover object-center opacity-30" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                  </div>

                  <div className="relative z-10 max-w-xl space-y-4">
                    <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 text-cyan-400 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg">
                      <Flame size={12} /> Live Network Spotlight
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none text-white">Spider-Man: Across the Spider-Verse</h1>
                    <p className="text-xs text-zinc-400 leading-relaxed">Experience independent streaming control with integrated HTML5 player scrubbing and custom localized subtitle overlays.</p>
                    <button onClick={() => setActivePlaybackMovie(STABLE_MEDIA_VAULT[0])} className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer border-none flex items-center gap-2">
                      <Play size={12} fill="currentColor" /> Launch Video Pipeline
                    </button>
                  </div>
                </section>

                {/* THE SYSTEM GRID LANE PIPELINES */}
                <div className="space-y-12">
                  {renderCollectionRow("Animation Production Studio", "Animation")}
                  {renderCollectionRow("Anime Network Channels", "Anime")}
                  {renderCollectionRow("Anticipated Coming Soon Pipeline", "Coming Soon")}
                  {renderCollectionRow("Hollywood core Blockbusters", "Hollywood")}
                  {renderCollectionRow("Paranormal Horror Vault", "Horror")}
                  {renderCollectionRow("Ecosystem Comedies", "Comedy")}
                </div>
              </div>
            )}

            {/* HUB VIEW: AI CHAT COMPANION TERMINAL */}
            {currentTab === 'ai-chat' && (
              <section className="max-w-2xl mx-auto px-4 h-[70vh] flex flex-col justify-between animate-fade-in">
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-t-2xl flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-mono">Neroxa Neural Node</span>
                  <span className="text-[9px] bg-black text-cyan-400 px-2 py-0.5 rounded border border-zinc-800 font-mono">ONLINE</span>
                </div>

                <div className="flex-1 bg-zinc-950 border-x border-zinc-800 p-4 overflow-y-auto space-y-4 font-mono text-xs scrollbar-hide">
                  {chatLog.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-3 rounded-xl whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-cyan-500 text-black font-black' : 'bg-zinc-900 text-zinc-300 border border-zinc-800'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChatMessage} className="p-3 bg-zinc-900 border border-zinc-800 rounded-b-2xl flex gap-2 items-end">
                  <textarea
                    placeholder="Type system queries... (Press Enter to drop a line, tap arrow to send)"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleTextAreaKeyDown}
                    rows={2}
                    className="flex-1 bg-zinc-950 border border-zinc-800 text-white rounded-xl p-2.5 text-xs focus:border-cyan-500 outline-none resize-none font-sans"
                  />
                  <button type="submit" className="p-3.5 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl border-none cursor-pointer self-end">
                    <Send size={14} />
                  </button>
                </form>
              </section>
            )}

            {/* HUB VIEW: COMMUNITY GROUPS BOARD */}
            {currentTab === 'community' && (
              <section className="max-w-3xl mx-auto px-4 space-y-6 animate-fade-in">
                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl text-center">
                  <h1 className="text-sm font-black tracking-widest uppercase text-white">Community Communication Relay</h1>
                  <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">Connect directly into isolated communication corridors to manage tracking parameters and streaming trends.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {communityFeeds.map(group => (
                    <div key={group.id} className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${group.joined ? 'bg-zinc-900 border-cyan-500/30' : 'bg-zinc-900/40 border-zinc-800'}`}>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-black text-cyan-400 uppercase">#{group.name}</h4>
                          <span className="text-[9px] font-mono text-zinc-600">{group.members}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-tight">{group.description}</p>
                      </div>

                      <button 
                        onClick={() => handleToggleJoinGroup(group.id)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${group.joined ? 'bg-black text-red-400 border-zinc-800 hover:border-red-900' : 'bg-cyan-500 text-black border-none font-black'}`}
                      >
                        {group.joined ? "DISCONNECT INTERACTION FEED" : "CONNECT TO FORUM TERMINAL"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* HUB VIEW: ROBUST ADMINISTRATION CONTROL MATRIX */}
            {currentTab === 'admin' && (
              <section className="max-w-2xl mx-auto px-4 space-y-6 animate-fade-in">
                <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-2xl flex items-center gap-3">
                  <div className="p-3 bg-cyan-500 text-black rounded-xl"><ShieldAlert size={18} /></div>
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-wider text-white">Admin Command Matrix</h2>
                    <p className="text-[11px] text-zinc-400 font-mono">Root Supervisor Status: <span className="text-cyan-400 font-bold">{accountName}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-3">
                    <span className="text-[9px] font-black tracking-widest text-zinc-500 uppercase font-mono block">System Accounts Parameter</span>
                    <p className="text-lg font-black text-white font-mono">{registeredAccountsCount} Connected Nodes</p>
                    <div className="flex gap-2">
                      <button onClick={() => setRegisteredAccountsCount(p => p + 1)} className="px-3 py-1.5 bg-zinc-800 text-[10px] font-bold rounded-lg border-none text-white cursor-pointer hover:bg-zinc-700 transition">Inject Entry</button>
                      <button onClick={() => setRegisteredAccountsCount(4822)} className="px-2.5 py-1.5 bg-zinc-950 text-[10px] font-mono text-zinc-500 rounded-lg border border-zinc-800 cursor-pointer hover:text-white transition">Reset</button>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <span className="text-[9px] font-black tracking-widest text-zinc-500 uppercase font-mono block">Global App Alert Banner text</span>
                    <input 
                      type="text" 
                      value={appAlertText}
                      onChange={(e) => setAppAlertText(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 outline-none focus:border-cyan-500"
                    />
                    <span className="text-[9px] text-zinc-600 font-mono block">Instantly overwrites systemic application header variables.</span>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono block">Data Vault Storage Summary</span>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                    <div className="bg-black p-2.5 rounded-lg border border-zinc-900"><p className="text-[9px] text-zinc-500">Animation</p><p className="font-bold text-cyan-400 mt-0.5">{STABLE_MEDIA_VAULT.filter(m=>m.category==='Animation').length}</p></div>
                    <div className="bg-black p-2.5 rounded-lg border border-zinc-900"><p className="text-[9px] text-zinc-500">Anime</p><p className="font-bold text-cyan-400 mt-0.5">{STABLE_MEDIA_VAULT.filter(m=>m.category==='Anime').length}</p></div>
                    <div className="bg-black p-2.5 rounded-lg border border-zinc-900"><p className="text-[9px] text-zinc-500">Coming Soon</p><p className="font-bold text-cyan-400 mt-0.5">{STABLE_MEDIA_VAULT.filter(m=>m.category==='Coming Soon').length}</p></div>
                  </div>
                </div>
              </section>
            )}

            {/* HUB VIEW: MY PROFILE SECURE OPERATIONS CARD LAYOUT */}
            {currentTab === 'profile' && (
              <section className="max-w-xl mx-auto px-4 space-y-6 animate-fade-in">
                
                {/* IDENTITY OVERVIEW */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-cyan-500 to-transparent opacity-5"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative group cursor-pointer">
                      <img src={profileAvatar} className="w-16 h-16 rounded-xl object-cover border border-cyan-500 shadow-xl" alt="" />
                      <button 
                        onClick={() => {
                          const route = prompt("Input image source string parameter link to modify icon:", profileAvatar);
                          if (route) setProfileAvatar(route);
                        }}
                        className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition border-none text-white text-[10px]"
                      >
                        <Camera size={14} />
                      </button>
                    </div>

                    <div className="text-center sm:text-left space-y-0.5">
                      <h2 className="text-sm font-black text-white uppercase tracking-wide">{accountName}</h2>
                      <p className="text-xs text-cyan-500 font-mono">@{accountName}</p>
                      <div className="inline-flex items-center gap-1 bg-cyan-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded mt-1 font-mono">
                        Master Terminal Access
                      </div>
                    </div>
                  </div>
                </div>

                {/* METADATA LISTING CARD LAYOUT */}
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl font-mono text-xs space-y-2.5">
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500 uppercase text-[10px]">Unified Email Address</span>
                    <span className="text-white font-bold">{accountEmail}</span>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="text-zinc-500 uppercase text-[10px]">Network Security Stage</span>
                    <span className="text-cyan-400 font-bold">SHELL-VIP-A</span>
                  </div>
                </div>

                {/* ACTIVE INBOUND MESSAGE NOTIFICATION BOX */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5 font-mono"><Mail size={12} className="text-cyan-500" /> System Messages Drawer</span>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2 border-l-2 border-l-cyan-500">
                    <div className="flex justify-between text-[9px] text-zinc-500 font-mono font-bold">
                      <span>Inbound Hub Routing</span>
                      <span>June 11, 2026</span>
                    </div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight">Mainframe Profile Sync Complete</h4>
                    <p className="text-xs text-zinc-400 leading-normal">Hello BENNY RICHY, secondary user logs linked to this mailbox address have been completely removed. Your clean layout tracking config profile is live.</p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold mt-1"><CheckCircle size={10} /> Overwrite Verification Complete</span>
                  </div>
                </div>

                {/* DESTRUCTIVE OPERATIONAL CONTROL BUTTONS */}
                <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex flex-col sm:flex-row gap-2 justify-between items-center">
                  <button onClick={handleLogoutSession} className="w-full sm:w-auto px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase rounded-xl border border-zinc-800 transition cursor-pointer flex items-center justify-center gap-1.5">
                    <LogOut size={12} /> Log Out Session
                  </button>
                  <button onClick={handlePermanentWipe} className="w-full sm:w-auto px-4 py-2 bg-zinc-950 hover:bg-red-950 border border-zinc-900 hover:border-red-900 text-zinc-600 hover:text-red-400 text-xs font-bold uppercase rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5">
                    <Trash2 size={12} /> Delete Profile Permanently
                  </button>
                </div>

              </section>
            )}
          </>
        )}
      </main>

      {/* CORE HTML5 IMMERSIVE PLAYER CANVAS OVERLAY */}
      {activePlaybackMovie && (
        <div className="fixed inset-0 z-[999] bg-black flex flex-col justify-center items-center">
          
          <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
            <button 
              onClick={() => { setActivePlaybackMovie(null); setIsSubMenuOpen(false); }}
              className="text-[10px] font-black bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white px-4 py-2.5 rounded-xl cursor-pointer uppercase transition"
            >
              ✕ Close Playback Canvas
            </button>

            <button 
              onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
              className="px-4 py-2.5 bg-zinc-900/90 border border-zinc-800 text-white rounded-xl text-[10px] font-black uppercase transition flex items-center gap-1.5 cursor-pointer"
            >
              <Subtitles size={12} /> Subtitles ({selectedSubtitle})
            </button>
          </div>

          {/* Local Subtitle Selection Drawer Matrix */}
          {isSubMenuOpen && (
            <div className="absolute top-16 right-6 z-[999] w-40 bg-zinc-900 border border-zinc-800 p-1 rounded-xl shadow-2xl">
              {['Off', 'English', 'Spanish', 'French'].map(lang => (
                <button
                  key={lang}
                  onClick={() => { setSelectedSubtitle(lang); setIsSubMenuOpen(false); }}
                  className="w-full flex items-center justify-between text-left text-xs p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white bg-transparent border-none cursor-pointer"
                >
                  {lang} {selectedSubtitle === lang && <Check size={12} className="text-cyan-400" />}
                </button>
              ))}
            </div>
          )}

          <div className="w-full max-w-4xl aspect-video bg-black relative flex items-center justify-center border border-zinc-900 shadow-2xl">
            <video 
              src={activePlaybackMovie.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />

            {selectedSubtitle !== 'Off' && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center w-full px-4 pointer-events-none">
                <span className="bg-black/90 text-yellow-400 border border-zinc-800 text-xs px-3 py-1 rounded font-bold font-mono">
                  [CC Layer ({selectedSubtitle}): Streaming synchronized feed tracking for {activePlaybackMovie.title}]
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMPACT PHONE TASKBAR SHORTCUT FOOTER LAYOUT */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 py-3.5 px-2 flex justify-around items-center md:hidden shadow-2xl">
        <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className={`flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer transition ${currentTab === 'home' && !expandedCategory ? 'text-cyan-500' : 'text-zinc-600'}`}>
          <Film size={16} /><span className="text-[9px] font-black uppercase tracking-wider">Home</span>
        </button>
        <button onClick={() => setTab('ai-chat')} className={`flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer transition ${currentTab === 'ai-chat' ? 'text-cyan-500' : 'text-zinc-600'}`}>
          <MessageSquare size={16} /><span className="text-[9px] font-black uppercase tracking-wider">AI Chat</span>
        </button>
        <button onClick={() => setTab('community')} className={`flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer transition ${currentTab === 'community' ? 'text-cyan-500' : 'text-zinc-600'}`}>
          <Layers size={16} /><span className="text-[9px] font-black uppercase tracking-wider">Hub</span>
        </button>
        <button onClick={() => setTab('admin')} className={`flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer transition ${currentTab === 'admin' ? 'text-cyan-500' : 'text-zinc-600'}`}>
          <ShieldAlert size={16} /><span className="text-[9px] font-black uppercase tracking-wider">Admin</span>
        </button>
        <button onClick={() => setTab('profile')} className={`flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer transition ${currentTab === 'profile' ? 'text-cyan-500' : 'text-zinc-600'}`}>
          <User size={16} /><span className="text-[9px] font-black uppercase tracking-wider">Account</span>
        </button>
      </div>

    </div>
  );
}
