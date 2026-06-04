import React, { useState } from "react";
import { Play, Activity, Users, Trophy, Flame, CheckCircle2, Calendar } from "lucide-react";

// The master blueprint. Whatever sports data drops into this array from the database 
// will be rendered instantly and automatically by the app.
interface SportMatchArena {
  id: string;
  sportCategory: "FOOTBALL" | "UFC" | "WWE" | "BASKETBALL" | "BOXING" | "TENNIS" | "FORMULA 1";
  eventName: string;
  status: "LIVE" | "UPCOMING" | "CONCLUDED";
  bannerUrl: string;
  viewerCount: number;
  timeLabel: string; // e.g., "74'", "Round 3", "FT"
  exactDate: string; // e.g., "June 4, 2026", "May 30, 2026"
  competitors: {
    sideA: { name: string; emblem: string; statScore: string };
    sideB: { name: string; emblem: string; statScore: string };
  };
  liveTickerMessage?: string;
}

export default function SportsArena() {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  // This internal list automatically updates across all sport types
  const [arenas] = useState<SportMatchArena[]>([
    {
      id: "sa-1",
      sportCategory: "FOOTBALL",
      eventName: "Champions League Quarterfinals",
      status: "LIVE",
      bannerUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
      viewerCount: 14205,
      timeLabel: "74'",
      exactDate: "Live Now",
      competitors: {
        sideA: { name: "Madrid Elite", emblem: "⚪", statScore: "2" },
        sideB: { name: "London FC", emblem: "🔵", statScore: "1" }
      },
      liveTickerMessage: "Penalty challenge reviewed by VAR. Stadium chat intensity spiking!"
    },
    {
      id: "sa-2",
      sportCategory: "UFC",
      eventName: "UFC Heavyweight Championship",
      status: "LIVE",
      bannerUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80",
      viewerCount: 9840,
      timeLabel: "Round 3",
      exactDate: "Live Now",
      competitors: {
        sideA: { name: "Alex Pereira", emblem: "🇧🇷", statScore: "Sig Strikes: 48" },
        sideB: { name: "Jamahal Hill", emblem: "🇺🇸", statScore: "Sig Strikes: 31" }
      },
      liveTickerMessage: "Pereira controlling the center canvas with heavy low leg kicks."
    },
    {
      id: "sa-3",
      sportCategory: "FOOTBALL",
      eventName: "Serie A Matchday",
      status: "CONCLUDED",
      exactDate: "June 3, 2026",
      bannerUrl: "https://images.unsplash.com/photo-1540747737956-378724044282?auto=format&fit=crop&w=600&q=80",
      viewerCount: 0,
      timeLabel: "Final Score",
      competitors: {
        sideA: { name: "AC Milan", emblem: "🔴", statScore: "1" },
        sideB: { name: "Inter Milan", emblem: "⚫", statScore: "0" }
      }
    },
    {
      id: "sa-4",
      sportCategory: "BASKETBALL",
      eventName: "Playoff Semifinals",
      status: "CONCLUDED",
      exactDate: "June 2, 2026",
      bannerUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
      viewerCount: 0,
      timeLabel: "Final Score",
      competitors: {
        sideA: { name: "Los Angeles", emblem: "🟡", statScore: "112" },
        sideB: { name: "Boston", emblem: "🟢", statScore: "105" }
      }
    }
  ]);

  // Automated sorting filters
  const liveAndUpcoming = arenas.filter(a => a.status !== "CONCLUDED" && (activeTab === "ALL" || a.sportCategory === activeTab));
  const pastResults = arenas.filter(a => a.status === "CONCLUDED" && (activeTab === "ALL" || a.sportCategory === activeTab));

  return (
    <div className="min-h-screen bg-[#06070d] text-white pb-32 max-w-md mx-auto border-x border-gray-800/40 relative">
      
      {/* 🏆 UNIVERSAL SPORTS CATEGORY FILTER RAIL */}
      <div className="p-4 bg-[#0b1424]/90 sticky top-0 z-30 border-b border-gray-900 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h1 className="text-xs font-black uppercase tracking-wider text-gray-200">Neroxa Sports Core</h1>
        </div>
        
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {["ALL", "FOOTBALL", "UFC", "WWE", "BASKETBALL", "BOXING", "TENNIS", "FORMULA 1"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap border ${
                activeTab === tab 
                  ? "bg-[#00b4d8] border-[#00b4d8] text-white shadow-md shadow-[#00b4d8]/20" 
                  : "bg-[#111c30] border-gray-800 text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ⚡ ACTIVE MATCHES DISPLAY BLOCK */}
      <div className="p-4 space-y-6">
        {liveAndUpcoming.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-[10px] font-black tracking-widest text-gray-400 uppercase flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-emerald-400" /> Live Global Arenas
            </h2>
            {liveAndUpcoming.map((arena) => (
              <div key={arena.id} className="bg-[#0b1424] border border-gray-800/60 rounded-2xl overflow-hidden relative">
                <div className="h-36 w-full relative bg-black">
                  <img src={arena.bannerUrl} alt={arena.eventName} className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1424] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase animate-pulse">
                    LIVE
                  </span>
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-[#00b4d8] rounded-full flex items-center justify-center text-white shadow-lg">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  <span className="text-[8px] font-black tracking-widest text-[#00b4d8] uppercase">{arena.sportCategory}</span>
                  <h3 className="text-xs font-black uppercase text-white tracking-tight mt-0.5">{arena.eventName}</h3>
                  <div className="bg-[#111c30]/60 border border-gray-800/40 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 max-w-[40%] truncate">
                      <span>{arena.competitors.sideA.emblem}</span>
                      <span className="font-black text-gray-200 truncate">{arena.competitors.sideA.name}</span>
                    </div>
                    <div className="bg-gray-950 px-2 py-0.5 rounded border border-gray-800 font-mono text-[10px] font-black text-[#00b4d8]">
                      {arena.timeLabel}
                    </div>
                    <div className="flex items-center gap-1.5 max-w-[40%] truncate flex-row-reverse text-right">
                      <span>{arena.competitors.sideB.emblem}</span>
                      <span className="font-black text-gray-200 truncate">{arena.competitors.sideB.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 📜 HISTORICAL RESULTS LOG (AUTOMATED DATES) */}
        {pastResults.length > 0 && (
          <div className="space-y-3 pt-2">
            <h2 className="text-[10px] font-black tracking-widest text-gray-400 uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-[#00b4d8]" /> Match Results Archive
            </h2>
            
            {pastResults.map((arena) => (
              <div key={arena.id} className="bg-[#0b1424]/60 border border-gray-800/40 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between border-b border-gray-900 pb-1.5">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5 text-gray-500" /> {arena.exactDate} • {arena.eventName}
                  </span>
                  <span className="bg-purple-950/40 text-purple-400 px-1.5 py-0.2 rounded text-[7px] font-black border border-purple-900/30 uppercase tracking-widest font-mono">
                    {arena.sportCategory}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{arena.competitors.sideA.emblem}</span>
                    <span className="font-bold text-gray-200">{arena.competitors.sideA.name}</span>
                  </div>
                  <span className="font-mono font-black text-white bg-gray-950 px-2.5 py-0.5 rounded border border-gray-800">
                    {arena.competitors.sideA.statScore} - {arena.competitors.sideB.statScore}
                  </span>
                  <div className="flex items-center gap-2 flex-row-reverse text-right">
                    <span className="text-sm">{arena.competitors.sideB.emblem}</span>
                    <span className="font-bold text-gray-200">{arena.competitors.sideB.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
