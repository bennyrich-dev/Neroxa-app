import React, { useState, useEffect } from "react";
import { 
  Play, 
  Plus, 
  Flame, 
  Sparkles, 
  Clock,
  ThumbsUp,
  Award,
  Star,
  Layers,
  TrendingUp
} from "lucide-react";

interface Movie {
  id: string;
  title: string;
  category: string;
  views: string;
  rating: string;
  image: string;
  duration?: string;
  match?: string;
  description?: string;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All Movies");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [blockbusters, setBlockbusters] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback high-fidelity real world content array if the live internet handshake delays
  const fallbackMovies = [
    { id: "m1", title: "Interstellar", category: "Sci-Fi", views: "12M", rating: "9.2", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
    { id: "m2", title: "Blade Runner 2049", category: "Cyberpunk", views: "8.4M", rating: "8.8", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=80", description: "A new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos." },
    { id: "m3", title: "The Dark Knight", category: "Action", views: "24M", rating: "9.6", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80", description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice." },
    { id: "m4", title: "Avatar: The Way of Water", category: "Fantasy", views: "19M", rating: "8.9", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80", description: "Jake Sully lives with his newfound family formed on the extraterrestrial moon of Pandora." }
  ];

  useEffect(() => {
    const fetchRealMovies = async () => {
      try {
        // Fetching directly from a live production server endpoint to provide real content data
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=ca8c2c77d48d6174a742f9b8841da367");
        if (!response.ok) throw new Error("API Network issue");
        
        const resData = await response.json();
        
        // Map real API results directly into Nexora UI layout formats
        const mapped: Movie[] = resData.results.map((m: any) => ({
          id: m.id.toString(),
          title: m.title || m.name,
          category: m.media_type === "movie" ? "Feature" : "Series",
          views: `${Math.floor(m.popularity / 10)}K views`,
          rating: m.vote_average.toFixed(1),
          image: `https://image.tmdb.org/t/p/w500${m.backdrop_path || m.poster_path}`,
          description: m.overview
        }));

        setMovies(mapped.slice(0, 4));
        setTrending(mapped.slice(4, 8));
        setBlockbusters(mapped.slice(8, 12));
      } catch (err) {
        // Safe failover to real-world blockbuster definitions if network drops out
        setMovies(fallbackMovies);
        setTrending(fallbackMovies);
        setBlockbusters(fallbackMovies);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06070d] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const heroItem = movies[0] || fallbackMovies[0];

  return (
    <div className="pb-32 bg-[#06070d] w-full min-h-screen text-white overflow-x-hidden">
      
      {/* IMMERSIVE LIVE HERO SPOTLIGHT */}
      <div className="relative h-[50vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroItem.image} 
            alt={heroItem.title} 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070d] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-4 w-full">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-[#00b4d8]/20 text-[#00b4d8] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#00b4d8]/30 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> LIVE RELEASES FROM TMDB
            </span>
            <span className="text-[9px] text-amber-400 font-bold flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-amber-400" /> {heroItem.rating} Rating
            </span>
          </div>
          
          <h1 className="text-2xl md:text-5xl font-black tracking-tight text-white mb-0.5 uppercase">
            {heroItem.title}
          </h1>
          <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed max-w-xl mb-3 line-clamp-2">
            {heroItem.description}
          </p>

          <div className="flex items-center gap-2">
            <button className="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-bold px-5 py-2 rounded-xl flex items-center gap-1.5 text-[11px] shadow-lg shadow-[#00b4d8]/20">
              <Play className="w-3 h-3 fill-white" /> Stream Now
            </button>
            <button className="bg-white/5 text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 border border-white/10 backdrop-blur-md text-[11px]">
              <Plus className="w-3 h-3" /> Save Content
            </button>
          </div>
        </div>
      </div>

      {/* SWIPABLE CATEGORIES ROW */}
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

      {/* SECTION 1: DYNAMIC MOVIES LIST */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-1.5 mb-3 px-0.5">
          <Layers className="w-4 h-4 text-[#00b4d8]" />
          <h2 className="text-sm font-black uppercase tracking-wider font-mono">Featured Global Hits</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {movies.map((item) => (
            <div key={item.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 relative group">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-[8px] font-bold text-[#00b4d8] uppercase block">{item.category}</span>
                <h3 className="text-xs font-bold text-white line-clamp-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: TRENDING SLIDER */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-1.5 mb-3 px-0.5">
          <Flame className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-black uppercase tracking-wider font-mono">Trending Across Network</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {trending.map((item) => (
            <div key={item.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 min-w-[140px] max-w-[140px]">
              <div className="aspect-square bg-gray-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-2">
                <h3 className="text-[11px] font-bold text-white line-clamp-1 mb-1">{item.title}</h3>
                <div className="flex items-center justify-between text-[8px] text-gray-500">
                  <span className="flex items-center gap-0.5"><Clock className="w-2 h-2" /> TMDB</span>
                  <span className="text-[#00b4d8] font-bold">{item.rating} ★</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: BLOCKBUSTERS */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1.5 mb-3 px-0.5">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <h2 className="text-sm font-black uppercase tracking-wider font-mono">Top Global Rated</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {blockbusters.map((item) => (
            <div key={item.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 flex flex-col">
              <div className="aspect-[16/10] bg-gray-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-2 flex-1 flex flex-col justify-between">
                <h3 className="text-[11px] font-bold text-white line-clamp-1">{item.title}</h3>
                <div className="flex items-center justify-between text-[9px] text-gray-500 mt-1 pt-1 border-t border-white/5">
                  <span className="text-emerald-400 font-bold">Popular Content</span>
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
        
