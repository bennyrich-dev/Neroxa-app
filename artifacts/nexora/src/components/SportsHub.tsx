import React, { useState } from "react";
import { Trophy, Tv, Calendar, Play, Search, Flame } from "lucide-react";

// Mock Data for Live and Upcoming Sports Streams
const MOCK_SPORTS = {
  live: [
    { id: "s1", title: "WWE Raw: Championship Showdown", category: "WWE", views: "14.2K", banner: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80", streamUrl: "#" },
    { id: "s2", title: "Premier League: Matchday 34", category: "Football", views: "28.5K", banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80", streamUrl: "#" }
  ],
  upcoming: [
    { id: "s3", title: "WWE SmackDown: Live Event", category: "WWE", time: "Tonight 8:00 PM", banner: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80" },
    { id: "s4", title: "Champions League Semi-Final", category: "Football", time: "Tomorrow 7:45 PM", banner: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=600&q=80" }
  ]
};

export default function SportsHub() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "WWE", "Football", "Basketball", "UFC"];

  const filterStreams = (streams: any[]) => {
    if (activeCategory === "All") return streams;
    return streams.filter(s => s.category === activeCategory);
  };

  return (
    <div className="min-h-screen bg-[#06070d] text-white pb-32 max-w-md mx-auto border-x border-gray-800/40 relative">
      
      {/* Header Panel */}
      <div className="bg-[#0b1424]/80 backdrop-blur-md border-b border-gray-800/80 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-wider">Neroxa Arena</h1>
            <p className="text-[10px] text-gray-400 font-medium">Live Global Broadcast Hub</p>
          </div>
        </div>
      </div>

      {/* Category Horizontal Filter Row */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              activeCategory === cat
                ? "bg-[#00b4d8] text-white shadow-lg shadow-[#00b4d8]/20"
                : "bg-[#111c30] border border-gray-800 text-gray-400 hover:text-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔴 LIVE CHANNELS SECTION */}
      <div className="mt-2 px-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-rose-500">
          <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
          Live Match Streams
        </div>

        <div className="space-y-4">
          {filterStreams(MOCK_SPORTS.live).length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-6 font-medium">No live streams found for this arena category.</p>
          ) : (
            filterStreams(MOCK_SPORTS.live).map((stream) => (
              <div key={stream.id} className="bg-[#0b1424] border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl relative group">
                {/* Thumbnail Layer */}
                <div className="relative h-44 w-full">
                  <img src={stream.banner} alt={stream.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1424] via-transparent to-transparent" />
                  
                  {/* Viewers Floating Tag */}
                  <span className="absolute top-3 left-3 bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-white" /> Live: {stream.views}
                  </span>

                  {/* Play Action Hook Overlay */}
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#00b4d8] rounded-full flex items-center justify-center text-white opacity-90 shadow-lg shadow-[#00b4d8]/30 group-hover:scale-105 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>
                </div>

                {/* Stream Info Area */}
                <div className="p-3.5 space-y-1">
                  <span className="text-[9px] font-black text-[#00b4d8] uppercase tracking-widest">{stream.category} Stadium</span>
                  <h3 className="text-xs font-bold text-white leading-tight">{stream.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🗓️ UPCOMING SCHEDULE SECTION */}
      <div className="mt-8 px-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-400">
          <Calendar className="w-4 h-4 text-[#00b4d8]" />
          Upcoming Matches
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filterStreams(MOCK_SPORTS.upcoming).map((match) => (
            <div key={match.id} className="bg-[#111c30]/50 border border-gray-800 rounded-xl p-3 flex gap-3 items-center">
              <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img src={match.banner} alt={match.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-0.5">
                <span className="text-[9px] font-bold text-[#00b4d8] uppercase tracking-wider block">{match.category}</span>
                <h4 className="text-xs font-bold text-gray-200 line-clamp-1">{match.title}</h4>
                <p className="text-[10px] text-gray-400 font-medium">{match.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
