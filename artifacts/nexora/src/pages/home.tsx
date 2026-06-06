import React, { useState } from "react";
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
  TrendingUp,
  Tv
} from "lucide-react";

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
      categories: ["All Movies", "Action", "Sci-Fi", "Originals", "Anime", "Documentaries"],
      featuredOriginals: [
        { id: "fo1", title: "Quantum Shift", category: "Sci-Fi", views: "1.2M", rating: "4.9", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80" },
        { id: "fo2", title: "Neon Horizon: 2099", category: "Cyberpunk", views: "984K", rating: "4.7", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=80" },
        { id: "fo3", title: "Shadow Ledger", category: "Thriller", views: "850K", rating: "4.5", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80" },
        { id: "fo4", title: "Aetheria Legend", category: "Fantasy", views: "2.1M", rating: "4.9", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" }
      ],
      trendingNow: [
        { id: "tr1", title: "The Circuit Breaker", category: "Action", views: "4.3M", duration: "1h 55m", image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&q=80" },
        { id: "tr2", title: "Data Stream Alpha", category: "Sci-Fi", views: "2.8M", duration: "2h 10m", image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80" },
        { id: "tr3", title: "Subnet Renegades", category: "Cyberpunk", views: "3.1M", duration: "1h 42m", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80" },
        { id: "tr4", title: "Grid Lockout", category: "Thriller", views: "1.7M", duration: "2h 02m", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80" }
      ],
      blockbusters: [
        { id: "bb1", title: "Chasing Shadows", category: "Suspense", views: "7.1M", match: "98%", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80" },
        { id: "bb2", title: "Infinite Loop", category: "Sci-Fi", views: "5.4M", match: "95%", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80" },
        { id: "bb3", title: "Code Red: Zero Day", category: "Tech Action", views: "8.2M", match: "99%", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80" },
        { id: "bb4", title: "The Last Node", category: "Dystopian", views: "6.0M", match: "92%", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80" }
      ]
    }
  };
};

export default function Home() {
  const { data } = useWorkspaceApi();
  const [activeCategory, setActiveCategory] = useState("All Movies");

  return (
    <div className="pb-32 bg-[#06070d] w-full min-h-screen text-white overflow-x-hidden">
      
      {/* IMMERSIVE HEADER HERO SPOTLIGHT */}
      <div className="relative h-[50vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={data?.heroMovie.bannerUrl} 
            alt="Hero Banner" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070d] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-4 w-full">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-[#00b4d8]/20 text-[#00b4d8] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#00b4d8]/30 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> NEXORA ORIGINAL PREMIERE
            </span>
            <span className="text-[9px] text-amber-400 font-bold flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-amber-400" /> {data?.heroMovie.rating}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-5xl font-black tracking-tight text-white mb-0.5">
            {data?.heroMovie.title}
          </h1>
          <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed max-w-xl mb-3 line-clamp-2">
            {data?.heroMovie.description}
          </p>

          <div className="flex items-center gap-2">
            <button className="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white font-bold px-5 py-2 rounded-xl flex items-center gap-1.5 text-[11px] shadow-lg shadow-[#00b4d8]/20">
              <Play className="w-3 h-3 fill-white" /> Play Stream
            </button>
            <button className="bg-white/5 text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 border border-white/10 backdrop-blur-md text-[11px]">
              <Plus className="w-3 h-3" /> Add Library
            </button>
          </div>
        </div>
      </div>

      {/* SWIPABLE CATEGORIES ACCENT ROW */}
      <div className="max-w-7xl mx-auto px-4 mb-6 mt-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 whitespace-nowrap">
          {data?.categories.map((cat) => (
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

      {/* SECTION 1: NEXORA ORIGINALS SLIDER */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-1.5 mb-3 px-0.5">
          <Layers className="w-4 h-4 text-[#00b4d8]" />
          <h2 className="text-sm font-black uppercase tracking-wider font-mono">Nexora Original Catalog</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {data?.featuredOriginals.map((item) => (
            <div key={item.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 relative group">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-[8px] font-bold text-[#00b4d8] uppercase block">{item.category}</span>
                <h3 className="text-xs font-bold text-white line-clamp-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: TRENDING CHANNELS NOW */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-1.5 mb-3 px-0.5">
          <Flame className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-black uppercase tracking-wider font-mono">Trending Streams</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {data?.trendingNow.map((item) => (
            <div key={item.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 min-w-[140px] max-w-[140px]">
              <div className="aspect-square bg-gray-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-2">
                <h3 className="text-[11px] font-bold text-white line-clamp-1 mb-1">{item.title}</h3>
                <div className="flex items-center justify-between text-[8px] text-gray-500">
                  <span className="flex items-center gap-0.5"><Clock className="w-2 h-2" /> {item.duration}</span>
                  <span className="text-[#00b4d8] font-bold">{item.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: TOP CONFLICT BLOCKBUSTERS */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1.5 mb-3 px-0.5">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <h2 className="text-sm font-black uppercase tracking-wider font-mono">Blockbuster Picks</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {data?.blockbusters.map((item) => (
            <div key={item.id} className="bg-[#0f111a] rounded-xl overflow-hidden border border-white/5 flex flex-col">
              <div className="aspect-[16/10] bg-gray-900">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-2 flex-1 flex flex-col justify-between">
                <h3 className="text-[11px] font-bold text-white line-clamp-1">{item.title}</h3>
                <div className="flex items-center justify-between text-[9px] text-gray-500 mt-1 pt-1 border-t border-white/5">
                  <span className="text-emerald-400 font-bold">{item.match} Match</span>
                  <span>{item.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
