import React, { useState, useEffect } from "react";
import { Play, Flame, Star, Tv } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  category: string;
  views: string;
  rating: string;
  image: string;
  description: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState<string | null>(null);

  const backendUrl = "https://neroxa-app.onrender.com";

  useEffect(() => {
    async function getCatalog() {
      try {
        const response = await fetch(`${backendUrl}/api/movies/trending`);
        const data = await response.json();
        
        if (data && data.results) {
          const formatted: Movie[] = data.results.map((m: any) => ({
            id: m.id.toString(),
            title: m.title || m.name || "Untitled Cinema",
            category: m.media_type === "tv" ? "Series Event" : "Premium Movie",
            views: `${Math.round(m.popularity || 120)} tuning in`,
            rating: m.vote_average ? m.vote_average.toFixed(1) : "8.2",
            image: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : `https://image.tmdb.org/t/p/w1280${m.poster_path}`,
            description: m.overview || "No secondary network description bounds provided."
          }));

          setMovies(formatted.slice(0, 3));
          setTrending(formatted.slice(3, 11));
        } else {
          setErrorState("Zero active streams returning from master cluster nodes.");
        }
      } catch (err) {
        console.error(err);
        setErrorState("Database configuration connection handshake refused.");
      } finally {
        setIsLoading(false);
      }
    }
    getCatalog();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06070d] flex flex-col items-center justify-center gap-2">
        <div className="w-6 h-6 border-2 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-mono tracking-wider text-gray-500 uppercase">Synchronizing Catalog Streams...</p>
      </div>
    );
  }

  if (errorState) {
    return (
      <div className="min-h-screen bg-[#06070d] flex items-center justify-center p-6 text-center">
        <p className="text-xs font-mono text-rose-400">{errorState}</p>
      </div>
    );
  }

  const primaryHero = movies[0];

  return (
    <div className="pb-32 bg-[#06070d] w-full min-h-screen text-white overflow-x-hidden font-sans">
      {primaryHero && (
        <div className="relative h-[48vh] w-full flex items-end">
          <div className="absolute inset-0">
            <img src={primaryHero.image} alt="" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/60 to-transparent" />
          </div>
          <div className="relative z-10 p-5 w-full space-y-1.5">
            <span className="bg-[#00b4d8]/20 text-[#00b4d8] text-[8px] font-black px-2 py-0.5 rounded border border-[#00b4d8]/30 font-mono tracking-widest uppercase">FEATURED EVENT</span>
            <h1 className="text-xl font-black tracking-tight uppercase line-clamp-1">{primaryHero.title}</h1>
            <p className="text-gray-400 text-[11px] max-w-sm leading-relaxed line-clamp-2">{primaryHero.description}</p>
            <div className="pt-1">
              <button className="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-black px-5 py-2.5 rounded-xl text-[10px] uppercase flex items-center gap-1.5 shadow-lg shadow-[#00b4d8]/20">
                <Play className="w-3 h-3 fill-white text-white" /> Launch Media Feed
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 mt-6">
        <div className="flex items-center gap-1.5 mb-3">
          <Flame className="w-4 h-4 text-[#00b4d8]" />
          <h2 className="text-xs font-black uppercase tracking-wider font-mono text-gray-400">Live Global Matrix</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {trending.map((m) => (
            <div key={m.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 relative group">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img src={m.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[8px] px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                  <Tv className="w-2.5 h-2.5 text-[#00b4d8]" /> {m.category}
                </span>
              </div>
              <div className="p-2.5 space-y-0.5">
                <h3 className="text-[11px] font-bold text-gray-200 line-clamp-1 uppercase tracking-wide">{m.title}</h3>
                <div className="flex items-center justify-between text-[9px] text-gray-500 font-mono">
                  <span>{m.views}</span>
                  <span className="text-amber-400 flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-transparent" /> {m.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
