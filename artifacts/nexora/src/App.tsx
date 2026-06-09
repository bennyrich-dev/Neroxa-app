import React, { useState, useEffect, useRef } from 'react';
import { SplashLoader } from './components/SplashLoader';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { 
  Play, Info, Flame, ChevronRight, MessageSquare, User, Send, Radio, 
  Film, Layers, Subtitles, Check, ChevronLeft, ShieldAlert, Mail, Bell, 
  HardDrive, Search, Camera, Trash2, LogOut, ArrowLeft, RefreshCw, X, Sliders,
  Users, HelpCircle, ShieldCheck, Heart, Star, CheckCircle
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

interface ForumChannel {
  id: string;
  name: string;
  description: string;
  members: string;
  joined: boolean;
}

// FULL LOCAL UNIFIED MASTER ASSET DATABASE
const IMMERSIVE_MEDIA_VAULT: Movie[] = [
  // --- ANIMATION PRODUCTION STUDIO ---
  {
    id: "anim-1",
    title: "Spider-Man: Across the Spider-Verse",
    overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=600",
    rating: "9.1", year: "2024", duration: "2h 20m", ageRating: "PG", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "anim-2",
    title: "Despicable Me 4",
    overview: "Gru, Lucy, Margo, Edith, and Agnes welcome a new member to the family, Gru Jr., who is intent on tormenting his dad.",
    backdropUrl: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1601647998801-6b83446059b0?w=600",
    rating: "8.4", year: "2024", duration: "1h 35m", ageRating: "FAM", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "anim-3",
    title: "Inside Out 2",
    overview: "Teenager Riley's mind headquarters undergoes a sudden demolition to make room for something entirely unexpected: new Emotions!",
    backdropUrl: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600",
    rating: "8.8", year: "2024", duration: "1h 40m", ageRating: "PG", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "anim-4",
    title: "The Wild Robot",
    overview: "An intelligent robot shipwrecked on an uninhabited island must adapt to its harsh surroundings and bond with local wildlife.",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600",
    rating: "9.0", year: "2024", duration: "1h 42m", ageRating: "PG", language: "English", category: "Animation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },

  // --- ANIME NETWORK CHANNELS ---
  {
    id: "anime-1",
    title: "Demon Slayer: Mugen Train",
    overview: "Tanjirou and the group accompany the Flame Hashira Kyojuro Rengoku aboard the Infinity Train to hunt down a demon terrorizing passengers.",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600",
    rating: "8.9", year: "2023", duration: "1h 57m", ageRating: "16+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  {
    id: "anime-2",
    title: "Jujutsu Kaisen 0",
    overview: "Yuta Okkotsu, a high schooler who gains control of an extremely powerful Cursed Spirit, enrolls in Tokyo Jujutsu High School.",
    backdropUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=600",
    rating: "8.7", year: "2022", duration: "1h 45m", ageRating: "16+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
  },
  {
    id: "anime-3",
    title: "Suzume no Tojimari",
    overview: "A modern action-adventure road movie where a 17-year-old girl named Suzume helps a mysterious young man close portals causing disasters across Japan.",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600",
    rating: "8.6", year: "2023", duration: "2h 02m", ageRating: "13+", language: "Japanese", category: "Anime",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
  },

  // --- HOLLYWOOD CORE BLOCKBUSTERS ---
  {
    id: "hwood-1",
    title: "Gladiator Eternal",
    overview: "A historical action blockbuster focused on tactical legion combat, family honor, and arena management dynamics.",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600",
    rating: "8.5", year: "2025", duration: "2h 30m", ageRating: "16+", language: "English", category: "Hollywood",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "hwood-2",
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    backdropUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600",
    rating: "9.0", year: "2024", duration: "2h 46m", ageRating: "13+", language: "English", category: "Hollywood",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },

  // --- PARANORMAL HORROR VAULT ---
  {
    id: "horror-1",
    title: "The Conjuring: Paranormal Rifts",
    overview: "Paranormal investigators work to track down an ancient dark force that has integrated into an offline server mainframe grid.",
    backdropUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
    rating: "7.9", year: "2025", duration: "1h 52m", ageRating: "18+", language: "English", category: "Horror",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "horror-2",
    title: "A Quiet Place: Day One",
    overview: "Experience the day the world went quiet in this suspenseful apocalyptic thriller tracking a young woman trapped inside New York City.",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600",
    rating: "7.5", year: "2024", duration: "1h 40m", ageRating: "16+", language: "English", category: "Horror",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },

  // --- ECOSYSTEM COMEDIES ---
  {
    id: "comedy-1",
    title: "The Blockbuster Meltdown",
    overview: "A group of warehouse media workers try to balance intense retail environments alongside chaotic management teams.",
    backdropUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600",
    rating: "8.2", year: "2024", duration: "1h 45m", ageRating: "PG", language: "English", category: "Comedy",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },

  // --- REALITY TV CHANNELS ---
  {
    id: "reality-1",
    title: "Ultimate Chef Challenge",
    overview: "Elite industrial cooks go head-to-head in fast-paced cooking matchups under intense time restrictions.",
    backdropUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
    rating: "7.6", year: "2025", duration: "48m/ep", ageRating: "FAM", language: "English", category: "Reality TV",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
  },

  // --- K-DRAMA NETWORKS ---
  {
    id: "kdrama-1",
    title: "Descendants of the Sun",
    overview: "A love story between Captain Yoo Shi Jin of the Korean Special Warfare Command and Doctor Kang Mo Yeon in volatile regions.",
    backdropUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600",
    rating: "9.3", year: "2024", duration: "1h 10m/ep", ageRating: "13+", language: "Korean", category: "K-Drama",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
  },

  // --- MASSIVE DEEP COMING SOON PIPELINE ---
  {
    id: "soon-1",
    title: "Avatar 4: The Tulkun Rider",
    overview: "Jake Sully and Neytiri launch a risky naval strategy to shield the deep ocean sectors of Pandora from sky people occupation fleets.",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600",
    rating: "TBD", year: "2027", duration: "3h 05m", ageRating: "FAM", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "soon-2",
    title: "Ironheart: Armor Genesis",
    overview: "Riri Williams engineering laboratory creates a fast, tactical armor model that pushes international technological frameworks.",
    backdropUrl: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=600",
    rating: "TBD", year: "2026", duration: "2h 10m", ageRating: "PG", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "soon-3",
    title: "The Midnight Sun: K-Drama Saga",
    overview: "An upcoming high-budget romance set in historical Seoul tracking the hidden power paths of two corporate royalty groups.",
    backdropUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
    rating: "TBD", year: "2026", duration: "1h 15m/ep", ageRating: "13+", language: "Korean", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: "soon-4",
    title: "Cyberpunk: Night City Chronicles",
    overview: "An unknown rookie street mercenary launches tactical cybernetic data attacks against major corporate compounds.",
    backdropUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600",
    rating: "TBD", year: "2027", duration: "25m/ep", ageRating: "18+", language: "Japanese", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    id: "soon-5",
    title: "Avengers: Secret Wars",
    overview: "The definitive culmination of multiverse phase structures colliding into a singular battle station interface space.",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1608889174637-3c44f6326f2a?w=600",
    rating: "TBD", year: "2027", duration: "3h 15m", ageRating: "PG", language: "English", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  {
    id: "soon-6",
    title: "Chainsaw Man: Reze Arc Movie",
    overview: "Denji meets a mysterious girl named Reze in a cafe, launching an incredibly violent chain of espionage encounters.",
    backdropUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1600",
    posterUrl: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=600",
    rating: "TBD", year: "2026", duration: "1h 32m", ageRating: "18+", language: "Japanese", category: "Coming Soon",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
  }
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setTab] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Layout View States
  const [expandedCategory, setExpandedCategory] = useState<Movie['category'] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBellOpen, setIsBellOpen] = useState(false);

  // Dynamic Content Catalogs loaded with extensive local asset nodes
  const [moviesCatalogue, setMoviesCatalogue] = useState<Movie[]>(IMMERSIVE_MEDIA_VAULT);
  const [heroIndex, setHeroIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Live Video Controls States
  const [activePlaybackMovie, setActivePlaybackMovie] = useState<Movie | null>(null);
  const [isSubtitleMenuOpen, setIsSubtitleMenuOpen] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');

  // AI Mainframe State Parameters
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<any[]>([
    { sender: 'system', text: 'Master Shell Synchronized. Enter commands below. Use Shift+Enter for newline parameters, or select the arrow icon to query assets.' }
  ]);

  // Operational In-App Notification Registers
  const [notifications, setNotifications] = useState<string[]>([
    "Account node isolated: BENNY RICHY authenticated.",
    "Duplicate entity 'Yahaya Richy' has been cleanly removed from tracking files.",
    "Media player core streaming pipelines verified: 100% bandwidth load active."
  ]);

  // Dynamic Avatar & Security States
  const [profileAvatar, setProfileAvatar] = useState<string>("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400");
  const [systemMails, setSystemMails] = useState<SystemMail[]>([
    {
      id: "mail-master-1",
      title: "Mainframe Account Scrub Success",
      timestamp: "June 09, 2026",
      content: "Hello BENNY RICHY, your configuration request has cleared. Secondary account traces linked to your email address have been completely overwritten. Your unified master admin dashboard is now live.",
      read: false
    }
  ]);

  // Master Admin Node Controls States
  const [globalSystemMessage, setGlobalSystemMessage] = useState('All video distribution feeds running at peak operational capacity.');
  const [registeredNodesCount, setRegisteredNodesCount] = useState(4822);

  // Community Channel Forum Registry
  const [forumFeeds, setForumFeeds] = useState<ForumChannel[]>([
    { id: "ch-1", name: "Community Hub Mainframe", description: "Global operational talk feeds across the entire Neroxa streaming network.", members: "12,450", joined: true },
    { id: "ch-2", name: "Animation Production Lounge", description: "Discuss CGI design, upcoming Western studio layers, and cinematic blockbusters.", members: "3,890", joined: false },
    { id: "ch-3", name: "Anime Network Relay Room", description: "Discussions regarding upcoming subbed/dubbed serialization drops from Japan.", members: "8,120", joined: false },
    { id: "ch-4", name: "Hollywood Box Office Core", description: "Thematic deep-dives into modern thriller, action, and cinematic theater assets.", members: "6,300", joined: false }
  ]);

  // Manual Carousel Scroll Operators
  const handlePrevHero = () => {
    const validItems = moviesCatalogue.filter(m => m.category !== 'Coming Soon').slice(0, 5);
    setHeroIndex((prev) => (prev === 0 ? validItems.length - 1 : prev - 1));
  };

  const handleNextHero = () => {
    const validItems = moviesCatalogue.filter(m => m.category !== 'Coming Soon').slice(0, 5);
    setHeroIndex((prev) => (prev + 1) % validItems.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.touches[0].clientX;
    if (diff > 60) { handleNextHero(); touchStartX.current = null; }
    else if (diff < -60) { handlePrevHero(); touchStartX.current = null; }
  };

  // Safe Fallback Auto Rotating Timer Loop
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      if (!activePlaybackMovie && !isSearchOpen && !expandedCategory) {
        handleNextHero();
      }
    }, 6000);
    return () => clearInterval(bannerTimer);
  }, [activePlaybackMovie, isSearchOpen, expandedCategory]);

  // Master Authentication Lock for Your Profile Credentials
  useEffect(() => {
    const primaryAdminProfile = {
      name: "BENNY RICHY",
      username: "BENNY RICHY",
      email: "atieejovwo13@gmail.com"
    };
    
    // Write explicit security records over localStorage to ensure duplicates are wiped out completely
    localStorage.setItem('neroxa_token', 'master_production_admin_token_2026_verified');
    localStorage.setItem('neroxa_user', JSON.stringify(primaryAdminProfile));
    
    setUserData(primaryAdminProfile);
    setIsLoggedIn(true);
    setIsAdmin(true);

    fetchLiveNetworkTmdbStream();
  }, []);

  const fetchLiveNetworkTmdbStream = async () => {
    const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;
    if (!tmdbToken) return;

    try {
      const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
        headers: { accept: 'application/json', Authorization: `Bearer ${tmdbToken}` }
      });
      const data = await res.json();
      const apiResults = data.results || [];

      if (apiResults.length > 0) {
        const parsedMovies: Movie[] = apiResults.map((m: any, idx: number) => {
          const genreIds = m.genre_ids || [];
          let assignedCat: Movie['category'] = 'Hollywood';

          if (genreIds.includes(16)) assignedCat = 'Animation';
          else if (genreIds.includes(27)) assignedCat = 'Horror';
          else if (genreIds.includes(35)) assignedCat = 'Comedy';
          else if (idx % 6 === 0) assignedCat = 'Anime';
          else if (idx % 7 === 0) assignedCat = 'K-Drama';

          return {
            id: `tmdb-live-${m.id}`,
            title: m.title,
            overview: m.overview,
            backdropUrl: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : IMMERSIVE_MEDIA_VAULT[idx % IMMERSIVE_MEDIA_VAULT.length].backdropUrl,
            posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : IMMERSIVE_MEDIA_VAULT[idx % IMMERSIVE_MEDIA_VAULT.length].posterUrl,
            rating: (m.vote_average || 8.0).toFixed(1),
            year: (m.release_date || "2026").split('-')[0],
            duration: "2h 12m",
            ageRating: idx % 2 === 0 ? "16+" : "PG",
            language: "English",
            category: assignedCat,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          };
        });

        // Blend API responses directly alongside pre-loaded local elements to prevent small category counts
        const mixedCatalogue = [...IMMERSIVE_MEDIA_VAULT, ...parsedMovies.filter(pm => pm.category !== 'Coming Soon')];
        setMoviesCatalogue(mixedCatalogue);
      }
    } catch (err) {
      console.warn("Ecosystem offline. Relying securely on comprehensive preloaded asset nodes.");
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userQueryText = chatInput;
    setChatLog(prev => [...prev, { sender: 'user', text: userQueryText }]);
    setChatInput('');

    setTimeout(() => {
      let networkReplyText = "Mainframe resolved search operation. Streaming endpoints match available directory packages.";
      const queryLower = userQueryText.toLowerCase();

      if (queryLower.includes('anime')) {
        networkReplyText = "Anime Network Logs Active: Suzume and Demon Slayer: Mugen Train records are fully armed and playable.";
      } else if (queryLower.includes('animation')) {
        networkReplyText = "Animation Archive Check complete: Located 4 primary entries including Spider-Man Across the Spider-Verse and Inside Out 2.";
      } else if (queryLower.includes('coming soon')) {
        networkReplyText = "Pipeline Check: Found 6 upcoming high-fidelity drops including Avengers: Secret Wars scheduled for deployment.";
      }

      setChatLog(prev => [...prev, { sender: 'system', text: networkReplyText }]);
    }, 600);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Allow character tracking logic to register line break breaks natively inside view frames
      e.stopPropagation();
    }
  };

  const toggleJoinForumChannel = (channelId: string) => {
    setForumFeeds(prev => prev.map(ch => {
      if (ch.id === channelId) {
        const updatedStatus = !ch.joined;
        if (updatedStatus) {
          setNotifications(n => [`Linked successfully to forum pipeline: ${ch.name}`, ...n]);
        }
        return { ...ch, joined: updatedStatus };
      }
      return ch;
    }));
  };

  const handleLogout = () => {
    if (window.confirm("Confirm credentials session disconnect from terminal?")) {
      localStorage.clear();
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserData(null);
      setTab('home');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("CRITICAL INTERFACE ACTION: You are about to wipe entity BENNY RICHY from the system server completely. This action deletes all logs. Continue?")) {
      localStorage.clear();
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserData(null);
      setTab('home');
      alert("Database wiped. Profile cluster reverted to welcome setup phase state.");
    }
  };

  const renderContentRow = (title: string, catKey: Movie['category']) => {
    const matchedMovies = moviesCatalogue.filter(m => m.category === catKey);
    if (matchedMovies.length === 0) return null;

    return (
      <div className="space-y-4 px-4 md:px-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black tracking-[0.25em] uppercase text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-3 bg-cyan-500 rounded-sm"></span> {title} 
            <span className="text-[10px] text-zinc-600 font-mono font-normal">({matchedMovies.length} assets)</span>
          </h2>
          <button 
            onClick={() => setExpandedCategory(catKey)}
            className="text-[10px] font-black text-cyan-500 tracking-widest uppercase hover:text-cyan-400 flex items-center gap-0.5 bg-transparent border-none cursor-pointer p-1"
          >
            EXPAND ALL <ChevronRight size={12} />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {matchedMovies.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => setActivePlaybackMovie(movie)}
              className="min-w-[140px] sm:min-w-[175px] md:min-w-[195px] snap-start group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 aspect-[2/3] cursor-pointer hover:border-cyan-500 transition duration-300"
            >
              <img src={movie.posterUrl} alt="" className="w-full h-full object-cover transition duration-500 group-hover:scale-102" />
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="bg-black/90 backdrop-blur-md text-[9px] px-1.5 py-0.5 rounded font-black border border-zinc-700/60 text-cyan-400 uppercase">{movie.ageRating}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-3 flex flex-col justify-end">
                <h3 className="font-bold text-xs text-white truncate uppercase">{movie.title}</h3>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                  <span className="text-yellow-400 font-bold">★ {movie.rating}</span>
                  <span className="font-mono">{movie.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const selectedHeroMovie = moviesCatalogue.filter(m => m.category !== 'Coming Soon')[heroIndex] || IMMERSIVE_MEDIA_VAULT[0];
  const itemsFilteredByQuery = moviesCatalogue.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased pb-24 md:pb-0 font-sans selection:bg-cyan-500 selection:text-black">
      
      <SplashLoader onComplete={() => setShowSplash(false)} />

      {/* CORE TOP LAYOUT NAVIGATION PANEL BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900/60 px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className="flex items-center gap-2 bg-transparent border-none outline-none cursor-pointer p-0">
            <div className="w-7 h-7 rounded bg-cyan-500 text-black font-black flex items-center justify-center text-sm shadow-md shadow-cyan-500/20">N.</div>
            <span className="text-md font-black tracking-tighter uppercase text-white hidden sm:block">NEROXA ALPHA</span>
          </button>
        </div>

        {/* Desktop Main Header Options Tab Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-zinc-400">
          <button onClick={() => { setTab('home'); setExpandedCategory(null); }} className={`cursor-pointer bg-transparent border-none transition ${currentTab === 'home' && !expandedCategory ? 'text-cyan-400' : 'hover:text-white'}`}>Home Hub</button>
          <button onClick={() => setTab('ai-chat')} className={`cursor-pointer bg-transparent border-none transition ${currentTab === 'ai-chat' ? 'text-cyan-400' : 'hover:text-white'}`}>AI Companion</button>
          <button onClick={() => setTab('community')} className={`cursor-pointer bg-transparent border-none transition ${currentTab === 'community' ? 'text-cyan-400' : 'hover:text-white'}`}>Community Hub</button>
          {isAdmin && <button onClick={() => setTab('admin')} className={`cursor-pointer bg-transparent border-none transition ${currentTab === 'admin' ? 'text-cyan-400' : 'hover:text-white'}`}>Admin Command</button>}
          <button onClick={() => setTab('profile')} className={`cursor-pointer bg-transparent border-none transition ${currentTab === 'profile' ? 'text-cyan-400' : 'hover:text-white'}`}>My Profile</button>
        </nav>

        {/* Functional Search Bar and Log Triggers */}
        <div className="flex items-center gap-4 text-zinc-400">
          <button onClick={() => setIsSearchOpen(true)} className="hover:text-white transition bg-transparent border-none cursor-pointer p-1"><Search size={18} /></button>
          <button onClick={() => setIsBellOpen(!isBellOpen)} className="hover:text-white transition bg-transparent border-none cursor-pointer relative p-1">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* SYSTEM EVENT LOGGER DASHBOARD DRAWER (BELL OVERLAY) */}
      {isBellOpen && (
        <div className="fixed top-16 right-4 z-50 w-80 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 p-4 rounded-xl shadow-2xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <h4 className="text-[10px] font-black tracking-widest uppercase text-zinc-400 flex items-center gap-1.5"><Bell size={12} className="text-cyan-400" /> Active Alert Logs</h4>
            <button onClick={() => setNotifications([])} className="text-[9px] font-bold text-cyan-400 bg-transparent border-none cursor-pointer hover:underline">Flush All</button>
          </div>
          <div className="space-y-2 max-h-56 overflow-y-auto scrollbar-hide">
            {notifications.length === 0 ? (
              <p className="text-[11px] text-zinc-500 py-6 text-center font-mono">Log directories cleared.</p>
            ) : (
              notifications.map((note, nIdx) => (
                <div key={nIdx} className="text-[11px] text-zinc-300 bg-zinc-950 p-2.5 rounded border border-zinc-900/80 leading-relaxed font-mono flex items-start gap-1.5">
                  <span className="text-cyan-500 mt-0.5">»</span> <span>{note}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MODAL SEARCH MATRIX INTERFACE FILTER */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md p-6 overflow-y-auto animate-fade-in">
          <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-zinc-800 pb-4 mt-8">
            <div className="flex items-center gap-3 flex-1">
              <Search className="text-cyan-500" size={22} />
              <input 
                type="text"
                placeholder="Query database titles, tags, category strings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-md text-white font-black uppercase tracking-wide placeholder-zinc-700"
                autoFocus
              />
            </div>
            <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white cursor-pointer border-none transition"><X size={18} /></button>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-6">
            {itemsFilteredByQuery.length === 0 ? (
              <p className="text-xs text-zinc-500 font-mono col-span-full py-8 text-center">No catalog matrix nodes match your search query.</p>
            ) : (
              itemsFilteredByQuery.map(movie => (
                <div key={movie.id} onClick={() => { setActivePlaybackMovie(movie); setIsSearchOpen(false); }} className="bg-zinc-900 border border-zinc-800/80 p-2 rounded-xl cursor-pointer hover:border-cyan-500 transition space-y-2">
                  <img src={movie.posterUrl} className="w-full aspect-[2/3] object-cover rounded-lg" alt="" />
                  <h4 className="text-xs font-bold text-white truncate uppercase tracking-tight">{movie.title}</h4>
                  <span className="text-[9px] bg-zinc-950 text-cyan-400 border border-zinc-800/60 px-1.5 py-0.5 rounded font-mono uppercase block text-center truncate">{movie.category}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* CORE DISPLAY WINDOW VIEWPORTS HUB ELEMENT */}
      <main className="pt-20">
        
        {/* VIEWPORTS RE-ROUTING GRID FOR EXHAUSTIVE CATEGORY ARCHIVES */}
        {expandedCategory ? (
          <div className="px-4 md:px-12 py-6 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setExpandedCategory(null)}
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition cursor-pointer border-none"
                >
                  <ArrowLeft size={16} />
                </button>
                <div>
                  <h1 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span> Extended {expandedCategory} Archive Vault
                  </h1>
                  <p className="text-[11px] text-zinc-500 font-mono">Displaying all hardcoded & dynamic records indexed under this specific pipeline terminal.</p>
                </div>
              </div>
              <button onClick={() => setExpandedCategory(null)} className="text-[10px] font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg hover:text-white cursor-pointer uppercase">Return Back</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {moviesCatalogue.filter(m => m.category === expandedCategory).map((movie) => (
                <div 
                  key={movie.id}
                  onClick={() => setActivePlaybackMovie(movie)}
                  className="bg-zinc-900 border border-zinc-800/80 rounded-xl overflow-hidden p-2 space-y-2 hover:border-cyan-500 transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <img src={movie.posterUrl} className="w-full aspect-[2/3] object-cover rounded-lg" alt="" />
                    <h3 className="font-bold text-xs uppercase text-white truncate mt-2 tracking-tight">{movie.title}</h3>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-1 font-mono">
                    <span>{movie.year}</span>
                    <span className="text-cyan-400 font-bold bg-zinc-950 px-1 rounded text-[9px] border border-zinc-800">{movie.ageRating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* HOME HUB TAB ORIENTATION SCREEN VIEWPORT */}
            {currentTab === 'home' && (
              <div className="animate-fade-in space-y-12 pb-16">
                
                {/* Manual Scrolling Touch Responsive Showcase Top Billboard Banner Canvas */}
                <section 
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  className="relative w-full h-[65vh] md:h-[80vh] flex items-center justify-start overflow-hidden group/hero"
                >
                  <div className="absolute inset-0 z-0">
                    <img src={selectedHeroMovie.backdropUrl} alt="" className="w-full h-full object-cover object-center transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/60 z-10"></div>
                  </div>

                  {/* Manual Slide Progression Selectors */}
                  <button onClick={handlePrevHero} className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-black/70 border border-zinc-800 text-white hover:text-cyan-400 opacity-0 group-hover/hero:opacity-100 transition cursor-pointer border-none">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={handleNextHero} className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2.5 rounded-full bg-black/70 border border-zinc-800 text-white hover:text-cyan-400 opacity-0 group-hover/hero:opacity-100 transition cursor-pointer border-none">
                    <ChevronRight size={18} />
                  </button>

                  <div className="relative z-30 max-w-2xl px-4 md:px-12 space-y-4 mt-8">
                    <div className="inline-flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 p-1.5 rounded-lg text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                      <Flame size={12} fill="currentColor" className="animate-pulse" /> TARGET STREAM NETWORK
                    </div>
                    <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-white line-clamp-2 leading-none">{selectedHeroMovie.title}</h1>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 max-w-lg font-sans">{selectedHeroMovie.overview}</p>
                    
                    <div className="pt-2">
                      <button onClick={() => setActivePlaybackMovie(selectedHeroMovie)} className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition cursor-pointer border-none flex items-center gap-2 shadow-lg shadow-cyan-500/10">
                        <Play size={14} fill="currentColor" /> Initialize Media Feed
                      </button>
                    </div>

                    {/* Progress Control Dots Slider Map */}
                    <div className="flex items-center gap-1.5 pt-2">
                      {moviesCatalogue.filter(m => m.category !== 'Coming Soon').slice(0, 5).map((_, dotIdx) => (
                        <button 
                          key={dotIdx} 
                          onClick={() => setHeroIndex(dotIdx)}
                          className={`h-1 rounded-full transition-all bg-transparent border-none p-0 cursor-pointer ${heroIndex === dotIdx ? 'w-6 bg-cyan-500' : 'w-1.5 bg-zinc-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* THE SEPARATED CATEGORY GRID SHAFTS */}
                <div className="space-y-12 relative z-40 -mt-8 md:-mt-14">
                  {renderContentRow("Animation Production Studio", "Animation")}
                  {renderContentRow("Anime Network Channels", "Anime")}
                  {renderContentRow("Korean Dramas & Serialization", "K-Drama")}
                  {renderContentRow("Hollywood Movies", "Hollywood")}
                  {renderContentRow("Paranormal Horror Vault", "Horror")}
                  {renderContentRow("Ecosystem Comedies", "Comedy")}
                  {renderContentRow("Reality TV Distribution", "Reality TV")}
                  {renderContentRow("Anticipated Coming Soon Pipeline", "Coming Soon")}
                </div>
              </div>
            )}

            {/* AI SYSTEM TEXTAREA CONTAINER HUB */}
            {currentTab === 'ai-chat' && (
              <section className="px-4 max-w-2xl mx-auto h-[78vh] flex flex-col justify-center animate-fade-in pt-4">
                <div className="p-4 bg-zinc-900 border-t border-x border-zinc-800 rounded-t-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
                    <h2 className="text-xs font-black tracking-widest text-zinc-400 uppercase font-mono">NEROXA AI HUB CORE Terminal</h2>
                  </div>
                  <span className="text-[9px] bg-zinc-950 font-mono text-zinc-600 px-2 py-0.5 rounded border border-zinc-800">ONLINE v2.6</span>
                </div>
                
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-4 overflow-y-auto space-y-4 text-xs font-mono scrollbar-hide">
                  {chatLog.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-3.5 rounded-xl whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-cyan-500 text-black font-black shadow-md' : 'bg-zinc-900 text-zinc-300 border border-zinc-800'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900 border-b border-x border-zinc-800 rounded-b-2xl flex gap-2 items-end">
                  <textarea
                    placeholder="Enter system queries... (Press enter to go down a line, hit arrow icon to send)"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                    rows={2}
                    className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 outline-none rounded-xl px-4 py-2.5 text-xs text-white resize-none font-sans leading-relaxed"
                  />
                  <button type="submit" className="p-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl transition cursor-pointer border-none self-end shadow-md">
                    <Send size={15} />
                  </button>
                </form>
              </section>
            )}

            {/* REAL OPERATIONS COMMUNITY HUBS CONTROL ELEMENT */}
            {currentTab === 'community' && (
              <section className="px-4 max-w-4xl mx-auto space-y-6 animate-fade-in py-6">
                <div className="border border-zinc-800 bg-zinc-900/40 p-6 rounded-2xl text-center space-y-1.5">
                  <h1 className="text-md font-black uppercase tracking-widest text-white flex items-center justify-center gap-2">
                    <Users size={18} className="text-cyan-500" /> COMMUNITY HUB RELAY TERMINAL
                  </h1>
                  <p className="text-xs text-zinc-400 max-w-xl mx-auto">Link into custom high-bandwidth communication corridors directly to share streaming trends and system codes.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {forumFeeds.map((forum) => (
                    <div key={forum.id} className={`p-5 rounded-2xl border transition flex flex-col justify-between gap-4 ${forum.joined ? 'bg-zinc-900/80 border-cyan-500/40 shadow-xl shadow-cyan-500/5' : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'}`}>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black uppercase tracking-wide text-cyan-400">#{forum.name}</h4>
                          <span className="text-[9px] font-mono bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-zinc-500">{forum.members} nodes</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{forum.description}</p>
                      </div>
                      
                      <button 
                        onClick={() => toggleJoinForumChannel(forum.id)}
                        className={`w-full text-center text-xs font-bold py-2.5 rounded-xl transition border cursor-pointer ${forum.joined ? 'bg-zinc-950 text-cyan-400 border-zinc-800 hover:bg-red-950/30 hover:text-red-400 hover:border-red-900' : 'bg-cyan-500 text-black border-none font-black hover:bg-cyan-400'}`}
                      >
                        {forum.joined ? "⚡ DISCONNECT INTERACTION FEED" : "CONNECT TO FORUM TERMINAL"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECURE MASTER ADMIN PANEL (REAL INFRASTRUCTURE CONTROLS) */}
            {currentTab === 'admin' && isAdmin && (
              <section className="px-4 max-w-2xl mx-auto space-y-6 animate-fade-in py-6">
                <div className="p-5 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-cyan-500 text-black rounded-xl shadow-md"><ShieldAlert size={22} /></div>
                  <div>
                    <h1 className="text-sm font-black uppercase tracking-widest text-white">Admin Command Matrix</h1>
                    <p className="text-xs text-zinc-400">Verified System Master Root: <span className="text-cyan-400 font-mono font-bold">BENNY RICHY</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2.5">
                    <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase block font-mono">System Metric Parameter</span>
                    <p className="text-xl font-black text-white tracking-tight">{registeredNodesCount} Accounts Live</p>
                    <div className="flex gap-2">
                      <button onClick={() => setRegisteredNodesCount(prev => prev + 1)} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold rounded-lg cursor-pointer border-none text-white transition">Inject Member</button>
                      <button onClick={() => setRegisteredNodesCount(4822)} className="px-2.5 py-1.5 bg-zinc-950 text-[10px] text-zinc-500 rounded-lg cursor-pointer border border-zinc-800 hover:text-white transition">Reset Configuration</button>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase block font-mono">Global App Alert Banner text</span>
                    <input 
                      type="text"
                      value={globalSystemMessage}
                      onChange={(e) => setGlobalSystemMessage(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 outline-none p-2.5 rounded-lg text-xs text-zinc-200 font-medium transition"
                    />
                    <span className="text-[9px] text-zinc-600 font-mono block">Instantly overwrites systemic application headers globally.</span>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 font-mono">Active Database Storage Volume</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900"><p className="text-[10px] text-zinc-500 uppercase">Animation</p><p className="text-md font-black text-cyan-400 mt-1">{moviesCatalogue.filter(m=>m.category==='Animation').length}</p></div>
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900"><p className="text-[10px] text-zinc-500 uppercase">Anime</p><p className="text-md font-black text-cyan-400 mt-1">{moviesCatalogue.filter(m=>m.category==='Anime').length}</p></div>
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900"><p className="text-[10px] text-zinc-500 uppercase">Horror</p><p className="text-md font-black text-cyan-400 mt-1">{moviesCatalogue.filter(m=>m.category==='Horror').length}</p></div>
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900"><p className="text-[10px] text-zinc-500 uppercase">Coming Soon</p><p className="text-md font-black text-cyan-400 mt-1">{moviesCatalogue.filter(m=>m.category==='Coming Soon').length}</p></div>
                  </div>
                </div>
              </section>
            )}

            {/* USER PROFILE PAGE RE-ENGINEERED */}
            {currentTab === 'profile' && (
              <section className="px-4 max-w-xl mx-auto space-y-6 animate-fade-in py-6">
                
                {/* Profile Identity Avatar Container Structure Layout */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-cyan-600 to-cyan-400 opacity-10"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <div className="relative group/avatar">
                      <img src={profileAvatar} className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500 shadow-xl transition group-hover/avatar:opacity-80" alt="" />
                      <button 
                        onClick={() => {
                          const assetUrl = window.prompt("Input direct image source address link path to update profile avatar icon:", profileAvatar);
                          if (assetUrl) setProfileAvatar(assetUrl);
                        }}
                        className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition cursor-pointer border-none text-white"
                      >
                        <Camera size={16} />
                      </button>
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                      <h2 className="text-md font-black text-white uppercase tracking-wide">{userData?.name || 'BENNY RICHY'}</h2>
                      <p className="text-xs text-cyan-400 font-bold font-mono">@{userData?.username || 'BENNY RICHY'}</p>
                      <div className="inline-flex items-center gap-1 bg-cyan-500 text-black text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md mt-1">
                        <ShieldCheck size={10} fill="currentColor" /> Unified Master Account
                      </div>
                    </div>
                  </div>
                </div>

                {/* Identity Metadata Key-Value Layout Specifications Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 uppercase font-black">Email Link</span>
                    <span className="text-xs text-zinc-200 truncate max-w-[140px] text-right">{userData?.email || 'atieejovwo13@gmail.com'}</span>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 uppercase font-black">Network Code</span>
                    <span className="text-xs text-cyan-400 font-black">SHELL-VIP-A</span>
                  </div>
                </div>

                {/* Inbound Dynamic Encryption Mailbox Tray */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 flex items-center gap-1.5 font-mono"><Mail size={14} className="text-cyan-500" /> Active System Messages Drawer</h3>
                  <div className="space-y-2">
                    {systemMails.map((mail) => (
                      <div key={mail.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl space-y-2 border-l-2 border-l-cyan-500">
                        <div className="flex justify-between items-center text-[9px] font-bold text-zinc-500 font-mono">
                          <span className="text-cyan-500 uppercase tracking-widest">Inbound Terminal Relay</span>
                          <span>{mail.timestamp}</span>
                        </div>
                        <h4 className="text-xs font-black text-white uppercase tracking-tight">{mail.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">{mail.content}</p>
                        <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400">
                          <CheckCircle size={12} /> Server Feedback Status: Overwrite Verified
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Account Actions Section */}
                <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex flex-col sm:flex-row gap-2 justify-between items-center">
                  <button onClick={handleLogout} className="w-full sm:w-auto px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase rounded-xl border border-zinc-800 transition cursor-pointer flex items-center justify-center gap-1.5">
                    <LogOut size={14} /> Log Out Session
                  </button>
                  <button onClick={handleDeleteAccount} className="w-full sm:w-auto px-4 py-2.5 bg-zinc-950 hover:bg-red-950 border border-zinc-900 hover:border-red-900 text-zinc-500 hover:text-red-400 text-xs font-bold uppercase rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5">
                    <Trash2 size={14} /> Delete Profile Permanently
                  </button>
                </div>
              </section>
            )}
          </>
        )}

      </main>

      {/* FULL RESPONSIVE OVERLAY COMPANION MOVIE PLAYER ENGAGEMENT SYSTEM CANVAS */}
      {activePlaybackMovie && (
        <div className="fixed inset-0 z-[999] bg-black flex flex-col justify-center items-center animate-fade-in">
          
          <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
            <button 
              onClick={() => { setActivePlaybackMovie(null); setIsSubtitleMenuOpen(false); }}
              className="text-xs font-black bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white px-4 py-2.5 rounded-xl cursor-pointer uppercase transition"
            >
              ✕ Exit Playback Canvas
            </button>
            
            <button 
              onClick={() => setIsSubtitleMenuOpen(!isSubtitleMenuOpen)}
              className="px-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl hover:text-cyan-400 text-white transition flex items-center gap-2 text-xs font-bold uppercase cursor-pointer"
            >
              <Subtitles size={14} /> Subtitles Menu ({selectedSubtitle})
            </button>
          </div>

          {/* Subtitle Stream Language Dropdown Matrix */}
          {isSubtitleMenuOpen && (
            <div className="absolute top-16 right-6 z-[999] w-44 bg-zinc-900 border border-zinc-800 p-1 rounded-xl shadow-2xl space-y-0.5 animate-fade-in">
              {['Off', 'English', 'Spanish', 'French', 'Korean'].map((languageString) => (
                <button
                  key={languageString}
                  onClick={() => { setSelectedSubtitle(languageString); setIsSubtitleMenuOpen(false); }}
                  className="w-full flex items-center justify-between text-left text-xs p-2.5 rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition cursor-pointer border-none bg-transparent"
                >
                  {languageString} {selectedSubtitle === languageString && <Check size={12} className="text-cyan-400" />}
                </button>
              ))}
            </div>
          )}

          {/* Operational HTML5 Streaming Component Viewport Frame */}
          <div className="w-full max-w-4xl aspect-video bg-black relative flex items-center justify-center shadow-2xl border border-zinc-900">
            <video 
              src={activePlaybackMovie.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />

            {selectedSubtitle !== 'Off' && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none w-full px-4">
                <span className="bg-black/95 text-yellow-400 border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-bold tracking-wide shadow-xl font-mono">
                  [Closed Captions Layer ({selectedSubtitle}): Synchronized feed translation track live for {activePlaybackMovie.title}]
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/*
