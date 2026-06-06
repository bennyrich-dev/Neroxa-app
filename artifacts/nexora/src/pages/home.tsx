import React, { useState } from "react";
import { 
  Play, 
  Plus, 
  TrendingUp, 
  Tv, 
  Film, 
  Flame, 
  Sparkles, 
  ArrowRight,
  Clock,
  ThumbsUp,
  Award
} from "lucide-react";

// Completely self-contained data simulation to bypass missing monorepo links
const useWorkspaceApi = () => {
  return {
    isLoading: false,
    error: null,
    data: {
      heroMovie: {
        id: "hero-1",
        title: "NEXORA: REVELATIONS",
        tagline: "The Future of Cinematic Entertainment",
        description: "In a world governed by distributed intelligence protocols, a lone developer uncovers a deep-cycle framework that threatens to alter reality itself.",
        bannerUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80",
        rating: "9.8",
        year: "2026",
        duration: "2h 42m"
      },
      trending: [
        { id: "t1", title: "Quantum Shift", category: "Sci-Fi", views: "1.2M", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80" },
        { id: "t2", title: "Neon Horizon", category: "Cyberpunk", views: "984K", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=80" },
        { id: "t3", title: "Shadow Ledger", category: "Thriller", views: "850K", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80" },
        { id: "t4", title: "Aetheria", category: "Fantasy", views: "2.1M", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" }
      ],
      categories: ["All Streams", "Cinematics", "Live Sports", "Originals", "Docu-Series", "Tech Intel"]
    }
  };
};

export default function Home() {
  const { data, isLoading } = useWorkspaceApi();
  const [activeCategory, setActiveCategory] = useState("All Streams");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06070d] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-32 bg-[#06070d] min-h-screen text-white">
      {/* HERO BANNER */}
      <div className="relative h-[70vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={data?.heroMovie.bannerUrl} 
            alt="Hero Banner" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070d] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full grid md:grid-cols-2 gap-6 items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#00b4d8]/20 text-[#00b4d8] text-xs font-bold px-3 py-1 rounded-full border border-[#00b4d8]/30 backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> FEATURED PREMIERE
              </span>
              <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-500" /> {data?.heroMovie.rating} Rating
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3">
              {data?.heroMovie.title}
            </h1>
            
            <p className="text-[#00b4d8] font-medium text-lg mb-4 tracking-wide">{data?.heroMovie.tagline}</p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mb-6">
              {data?.heroMovie.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-bold px-8 py-3.5 rounded-xl flex items-center gap-2.5 text-sm">
                <Play className="w-4 h-4 fill-white" /> Stream Now
              </button>
              <button className="bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2 border border-white/10 backdrop-blur-md text-sm">
                <Plus className="w-4 h-4" /> Watchlist
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex justify-end gap-6 text-xs text-gray-400 font-mono">
            <div><span className="text-gray-500 block">YEAR</span>{data?.heroMovie.year}</div>
            <div className="border-l border-white/10 pl-6"><span className="text-gray-500 block">DURATION</span>{data?.heroMovie.duration}</div>
            <div className="border-l border-white/10 pl-6"><span className="text-gray-500 block">AUDIO</span>DOLBY ATMOS</div>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="max-w-7xl mx-auto px-6 mb-10 overflow-x-auto">
        <div className="flex items-center gap-3 whitespace-nowrap">
          {data?.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium border ${
                activeCategory === cat
                  ? "bg-[#00b4d8] text-white border-[#00b4d8]"
                  : "bg-[#0f111a] text-gray-400 border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TRENDING CARDS */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Trending Media Collections</h2>
              <p className="text-xs text-gray-500">Most consumed feeds across Nexora channels right now</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {data?.trending.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#0f111a] rounded-2xl overflow-hidden border border-white/5 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-black/60 text-[10px] text-gray-300 px-2 py-0.5 rounded font-mono">
                  {item.views}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-[#00b4d8] tracking-widest uppercase block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated</span>
                  <span className="flex items-center gap-0.5 text-gray-400"><ThumbsUp className="w-2.5 h-2.5 text-[#00b4d8]" /> 96%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
                }
                
