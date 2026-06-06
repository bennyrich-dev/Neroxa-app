import React, { useState, useEffect } from "react";
import { 
  Play, 
  Plus, 
  Flame, 
  Sparkles, 
  Clock,
  Star,
  Layers,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Movie {
  id: string;
  title: string;
  category: string;
  views: string;
  rating: string;
  image: string;
  description?: string;
  match?: string;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All Movies");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [blockbusters, setBlockbusters] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🎞️ Carousel Slider Control State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Fallback high-fidelity cinema data array if the live network handshake delays
  const fallbackMovies = [
    { id: "m1", title: "Interstellar", category: "Sci-Fi", views: "12M feeds", rating: "9.2", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", match: "98% Match" },
    { id: "m2", title: "Blade Runner 2049", category: "Cyberpunk", views: "8.4M feeds", rating: "8.8", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1600&q=80", description: "A new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos.", match: "95% Match" },
    { id: "m3", title: "The Dark Knight", category: "Action", views: "24M feeds", rating: "9.6", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80", description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.", match: "99% Match" },
    { id: "m4", title: "Avatar: The Way of Water", category: "Fantasy", views: "19M feeds", rating: "8.9", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80", description: "Jake Sully lives with his newfound family formed on the extraterrestrial moon of Pandora.", match: "91% Match" }
  ];

  // Fetch real trending titles over the live internet network
  useEffect(() => {
    const fetchRealMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=ca8c2c77d48d6174a742f9b8841da367");
        if (!response.ok) throw new Error("API Connection Interrupted");
        
        const resData = await response.json();
        
        const mapped: Movie[] = resData.results.map((m: any) => ({
          id: m.id.toString(),
          title: m.title || m.name || "Untitled Production",
          category: m.media_type === "movie" ? "Feature Film" : "Premium Series",
          views: `${Math.floor(m.popularity / 5)}K active views`,
          rating: m.vote_average ? m.vote_average.toFixed(1) : "8.5",
          image: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : `https://image.tmdb.org/t/p/w1280${m.poster_path}`,
          description: m.overview || "No extended overview matrix description file provided.",
          match: `${Math.floor(88 + Math.random() * 11)}% Match`
        }));

        if (mapped.length > 0) {
          setMovies(mapped.slice(0, 5)); // Top 5 titles go straight into the sliding header carousel
          setTrending(mapped.slice(5, 10));
          setBlockbusters(mapped.slice(10, 15));
        } else {
          setMovies(fallbackMovies);
          setTrending(fallbackMovies);
          setBlockbusters(fallbackMovies);
        }
      } catch (err) {
        console.log("Using localized high-fidelity assets due to proxy sandbox constraints.");
        setMovies(fallbackMovies);
        setTrending(fallbackMovies);
        setBlockbusters(fallbackMovies);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealMovies();
  }, []);

  // 🔄 Automated Slide Rotation Loop Engine (Swipes every 4.5 seconds)
  useEffect(() => {
    if (movies.length <= 1) return;

    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 4500);

    return () => clearInterval(slideTimer);
  }, [movies]);

  // Manual Swipe Handlers
  const handlePreviousSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  // Mobile Touch Swiping Handling Gestures Setup
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50; // Minimum sliding travel space required in pixels
    
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swiped Left -> Load Next Slide
      setCurrentSlideIndex((prev) => (prev + 1) % movies.length);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swiped Right -> Load Previous Slide
      setCurrentSlideIndex((prev) => (prev - 1 + movies.length) % movies.length);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06070d] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Identify active movie asset item in the current carousel loop index
  const activeHeroMovie = movies[currentSlideIndex] || fallbackMovies[0];

  return (
    <div className="pb-32 bg-[#06070d] w-full min-h-screen text-white overflow-x-hidden select-none">
      
      {/* 🎠 AUTOMATIC SWIPE BANNER CAROUSEL HEADER AREA */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-[55vh] w-full overflow-hidden flex items-end group transition-all duration-500 ease-in-out"
      >
        {/* Dynamic Image Placement Layer with Fade Transition effect */}
        <div className="absolute inset-0 z-0">
          <img 
            src={activeHeroMovie.image} 
            alt={activeHeroMovie.title} 
            className="w-full h-full object-cover opacity-50 transition-all duration-700 scale-100 ease-out"
            key={activeHeroMovie.id} // Forces image fade animations on slide modifications
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070d] via-transparent to-transparent" />
        </div>

        {/* Manual Clickable Chevron Arrows (Hidden on mobile viewports until active tap) */}
        <button 
          onClick={handlePreviousSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 p-2 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 p-2 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Hero Meta Description Info Block Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-6 w-full">
          
          {/* Active Slider Horizontal Bullet Dot Line Indicators */}
          <div className="flex items-center gap-1.5 mb-3">
            {movies.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentSlideIndex(dotIdx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentSlideIndex === dotIdx ? "w-5 bg-[#00b4d8]" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#00b4d8]/20 text-[#00b4d8] text-[9px] font-black px-2 py-0.5 rounded-md border border-[#00b4d8]/30 backdrop-blur-md flex items-center gap-1 uppercase font-mono tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> FEATURED STREAM
            </span>
            <span className="text-[9px] text-emerald-400 font-bold font-mono">
              {activeHeroMovie.match}
            </span>
            <span className="text-[9px] text-amber-400 font-bold flex items-center gap-0.5 font-mono">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> {activeHeroMovie.rating}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-5xl font-black tracking-tight text-white mb-1 uppercase drop-shadow-md line-clamp-1 max-w-2xl">
            {activeHeroMovie.title}
          </h1>
          
          <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed max-w-xl mb-4 line-clamp-2 drop-shadow-sm font-sans">
            {activeHeroMovie.description}
          </p>

          <div className="flex items-center gap-2">
            <button className="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 text-[11px] shadow-lg shadow-[#00b4d8]/20 transition-transform active:scale-95">
              <Play className="w-3 h-3 fill-white text-white" /> Play Movie
            </button>
            <button className="bg-white/5 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 border border-white/10 backdrop-blur-md text-[11px] transition-transform active:scale-95">
              <Plus className="w-3 h-3" /> My List
            </button>
          </div>
        </div>
      </div>

      {/* SWIPABLE HORIZONTAL CATEGORIES ROW */}
      <div className="max-w-7xl mx-auto px-4 mb-6 mt-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 whitespace-nowrap">
          {["All Movies", "Action", "Sci-Fi", "Originals", "Anime", "Documentaries"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                activeCategory === cat
                  ? "bg-[#00b4d8] text-white border-[#00b4d8] shadow-sm shadow-[#00b4d8]/20"
                  : "bg-[#0f111a] text-gray-400 border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: DYNAMIC LIVE MOVIE TILES GRID */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-1.5 mb-3 px-0.5">
          <Layers className="w-4 h-4 text-[#00b4d8]" />
          <h2 className="text-sm font-black uppercase tracking-wider font-mono">Top Global Hits</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {movies.map((item) => (
            <div key={item.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 relative group active:scale-98 transition-transform">
              <div className="aspect-[16/10] overflow-hidden bg-gray-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-[8px] font-bold text-[#00b4d8] uppercase block font-mono">{item.category}</span>
                <h3 className="text-xs font-bold text-white line-clamp-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: TRENDING SLIDER HORIZONTAL CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-1.5 mb-3 px-0.5">
          <Flame className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-black uppercase tracking-wider font-mono">Trending Across Network</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {trending.map((item) => (
            <div key={item.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 min-w-[140px] max-w-[140px] shrink-0">
              <div className="aspect-square bg-gray-900 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-2">
                <h3 className="text-[11px] font-bold text-white line-clamp-1 mb-1">{item.title}</h3>
                <div className="flex items-center justify-between text-[8px] text-gray-500 font-mono">
                  <span className="flex items-center gap-0.5"><Clock className="w-2 h-2" /> TMDB</span>
                  <span className="text-[#00b4d8] font-bold">{item.rating} ★</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: TOP RANKED BLOCKBUSTERS COVERS */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1.5 mb-3 px-0.5">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <h2 className="text-sm font-black uppercase tracking-wider font-mono">Top Blockbusters</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {blockbusters.map((item) => (
            <div key={item.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 flex flex-col active:scale-98 transition-transform">
              <div className="aspect-[16/10] bg-gray-900 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-2 flex-1 flex flex-col justify-between">
                <h3 className="text-[11px] font-bold text-white line-clamp-1">{item.title}</h3>
                <div className="flex items-center justify-between text-[9px] text-gray-500 mt-2 pt-1 border-t border-white/5 font-mono">
                  <span className="text-emerald-400 font-bold">{item.match}</span>
                  <span>{item.rating} ★</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
      }
          
