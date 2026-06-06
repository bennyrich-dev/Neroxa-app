import React, { useState } from "react";
import { 
  Play, 
  Plus, 
  Flame, 
  Sparkles, 
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
    <div className="pb-32 bg-[#06070d] w-full min-h-screen text-white overflow-x-hidden">
      
      {/* IMMERSIVE HEADER SPOTLIGHT HERO BANNER */}
      <div className="relative h-[55vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={data?.heroMovie.bannerUrl} 
            alt="Hero Banner" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070d] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-4 w-full grid md:grid-cols-2 gap-4 items-end">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-[#00b4d8]/20 text-[#00b4d8] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#00b4d8]/30 backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> FEATURED PREMIERE
              </span>
              <span className="text-[9px] text-gray-400 font-medium flex items-center gap-1">
                <Award className="w-2.5 h-2.5 text-amber-500" /> {data?.heroMovie.rating} Rating
              </span>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-0.5">
              {data?.heroMovie.title}
            </h1>
            
            <p className="text-[#00b4d8] font-medium text-xs mb-1.5 tracking-wide">{data?.heroMovie.tagline}</p>
            <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed max-w-xl mb-3 line-clamp-2">
              {data?.heroMovie.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button className="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-bold px-5 py-2 rounded-xl flex items-center gap-1.5 text-[11px]">
                <Play className="w-3 h-3 fill-white" /> Stream Now
              </button>
              <button className="bg-white/10 text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 border border-white/10 backdrop-blur-md text-[11px]">
                <Plus className="w-3 h-3" /> Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL SWIPABLE CATEGORIES ROW */}
      <div className="max-w-7xl mx-auto px-4 mb-6 mt-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 whitespace-nowrap">
          {data?.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
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

      {/* TRENDING MEDIA CARDS GRID SECTION */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-white">Trending Media Collections</h2>
              <p className="text-[10px] text-gray-500">Most consumed feeds across Nexora channels right now</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-0.5">
          {data?.trending.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-1.5 right-1.5 bg-black/60 text-[8px] text-gray-300 px-1.5 py-0.5 rounded font-mono">
                  {item.views}
                </div>
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-between gap-1">
                <div>
                  <span className="text-[8px] font-bold text-[#00b4d8] tracking-widest uppercase block mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-[11px] font-bold text-white line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-[9px] text-gray-500 pt-1.5 border-t border-white/5">
                  <span className="flex items-center gap-0.5"><Clock className="w-2 h-2" /> Updated</span>
                  <span className="flex items-center gap-0.5 text-gray-400"><ThumbsUp className="w-2 h-2 text-[#00b4d8]" /> 96%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
                }
                  
