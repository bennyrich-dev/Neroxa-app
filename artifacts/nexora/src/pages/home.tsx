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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const fallbackMovies = [
    { id: "m1", title: "Interstellar", category: "Sci-Fi", views: "12M views", rating: "9.2", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", match: "98% Match" },
    { id: "m2", title: "Blade Runner 2049", category: "Cyberpunk", views: "8.4M views", rating: "8.8", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1600&q=80", description: "A new blade runner unearths a long-buried secret that has the potential to plunge society into chaos.", match: "95% Match" },
    { id: "m3", title: "The Dark Knight", category: "Action", views: "24M views", rating: "9.6", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80", description: "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", match: "99% Match" }
  ];

  useEffect(() => {
    const fetchRealMovies = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://neroxa-app.onrender.com";
        const response = await fetch(`${backendUrl}/api/movies/trending`);
        const resData = await response.json();
        
        if (resData && resData.results) {
          const mapped: Movie[] = resData.results.map((m: any) => ({
            id: m.id.toString(),
            title: m.title || m.name || "Untitled Production",
            category: m.media_type === "movie" ? "Feature Film" : "Premium Series",
            views: `${Math.floor(m.popularity / 5)}K views`,
            rating: m.vote_average ? m.vote_average.toFixed(1) : "8.5",
            image: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : `https://image.tmdb.org/t/p/w1280${m.poster_path}`,
            description: m.overview || "No description available.",
            match: `${Math.floor(88 + Math.random() * 11)}% Match`
          }));

          setMovies(mapped.slice(0, 5));
          setTrending(mapped.slice(5, 11));
          setBlockbusters(mapped.slice(11, 15));
        } else {
          setMovies(fallbackMovies);
          setTrending(fallbackMovies);
          setBlockbusters(fallbackMovies);
        }
      } catch (err) {
        setMovies(fallbackMovies);
        setTrending(fallbackMovies);
        setBlockbusters(fallbackMovies);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealMovies();
  }, []);

  useEffect(() => {
    if (movies.length <= 1) return;
    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % movies.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, [movies]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06070d] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeHeroMovie = movies[currentSlideIndex] || fallbackMovies[0];

  return (
    <div className="pb-32 bg-[#06070d] w-full min-h-screen text-white overflow-x-hidden select-none">
      {activeHeroMovie && (
        <div className="relative h-[50vh] w-full overflow-hidden flex items-end group">
          <div className="absolute inset-0 z-0">
            <img src={activeHeroMovie.image} alt={activeHeroMovie.title} className="w-full h-full object-cover opacity-40 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06070d] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-6 w-full">
            <div className="flex items-center gap-1.5 mb-2">
              {movies.map((_, idx) => (
                <div key={idx} className={`h-1 rounded-full transition-all ${currentSlideIndex === idx ? "w-4 bg-[#00b4d8]" : "w-1 bg-white/20"}`} />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-[#00b4d8]/20 text-[#00b4d8] text-[9px] font-black px-2 py-0.5 rounded border border-[#00b4d8]/30 font-mono tracking-wider">FEATURED</span>
              <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5 font-mono"><Star className="w-3 h-3 fill-amber-400" /> {activeHeroMovie.rating}</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight mb-1 uppercase line-clamp-1">{activeHeroMovie.title}</h1>
            <p className="text-gray-400 text-[11px] max-w-xl mb-4 line-clamp-2">{activeHeroMovie.description}</p>
            <div className="flex items-center gap-2">
              <button className="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-bold px-5 py-2.5 rounded-xl text-[11px]">Stream Now</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 mb-6 mt-4">
        <div className="flex items-center gap-1.5 mb-3"><Flame className="w-4 h-4 text-[#00b4d8]" /><h2 className="text-xs font-black uppercase tracking-wider font-mono text-gray-400">Trending Movies</h2></div>
        <div className="grid grid-cols-2 gap-3">
          {trending.map((item) => (
            <div key={item.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 relative">
              <img src={item.image} alt={item.title} className="w-full aspect-[16/10] object-cover" />
              <div className="p-2"><h3 className="text-xs font-bold text-white line-clamp-1">{item.title}</h3></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
