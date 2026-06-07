import React, { useState, useEffect } from "react";
import { Play, Flame, Star } from "lucide-react";

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://neroxa-app.onrender.com";
        const response = await fetch(`${backendUrl}/api/movies/trending`);
        const data = await response.json();
        
        if (data && data.results) {
          const mapped: Movie[] = data.results.map((m: any) => ({
            id: m.id.toString(),
            title: m.title || m.name || "Cinema Presentation",
            category: m.media_type === "movie" ? "Feature Film" : "Premium Series",
            views: `${Math.floor(m.popularity)} views`,
            rating: m.vote_average ? m.vote_average.toFixed(1) : "8.4",
            image: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : `https://image.tmdb.org/t/p/w1280${m.poster_path}`,
            description: m.overview || "No extended overview metrics logged."
          }));

          setMovies(mapped.slice(0, 4));
          setTrending(mapped.slice(4, 10));
        }
      } catch (err) {
        console.error("Database connection fault:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06070d] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const mainHero = movies[0];

  return (
    <div className="pb-32 bg-[#06070d] w-full min-h-screen text-white overflow-x-hidden font-sans">
      {mainHero && (
        <div className="relative h-[45vh] w-full flex items-end">
          <div className="absolute inset-0">
            <img src={mainHero.image} alt="" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] to-transparent" />
          </div>
          <div className="relative z-10 p-4 w-full">
            <span className="bg-[#00b4d8]/20 text-[#00b4d8] text-[9px] font-black px-2 py-0.5 rounded border border-[#00b4d8]/30 font-mono tracking-wider">FEATURED</span>
            <h1 className="text-xl font-black tracking-tight mt-1 uppercase line-clamp-1">{mainHero.title}</h1>
            <p className="text-gray-400 text-[11px] mt-1 max-w-sm line-clamp-2">{mainHero.description}</p>
            <button className="mt-3 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-black px-4 py-2 rounded-xl text-[10px] uppercase flex items-center gap-1"><Play className="w-3 h-3 fill-white" /> Play Stream</button>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-3"><Flame className="w-4 h-4 text-[#00b4d8]" /><h2 className="text-xs font-black uppercase tracking-wider font-mono text-gray-400">Trending Now</h2></div>
        <div className="grid grid-cols-2 gap-3">
          {trending.map((m) => (
            <div key={m.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 relative">
              <img src={m.image} alt="" className="w-full aspect-[16/10] object-cover opacity-80" />
              <div className="p-2">
                <h3 className="text-[11px] font-bold text-white line-clamp-1">{m.title}</h3>
                <div className="flex items-center justify-between text-[9px] text-gray-500 font-mono mt-0.5">
                  <span>{m.views}</span>
                  <span className="text-amber-400 flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-amber-400" />{m.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
