import React, { useState } from "react";
import { Shield, Users, Film, AlertTriangle, CheckCircle, Trash2, Ban, Radio, Zap, Award, Bell, Eye } from "lucide-react";

interface FlaggedItem {
  id: string;
  author: string;
  content: string;
  reason: string;
  timestamp: string;
}

export default function AdminConsole() {
  // Master Interactive State Hooks
  const [announcement, setAnnouncement] = useState("");
  const [activeBanner, setActiveBanner] = useState("Welcome to Neroxa! Dive into the Lounge to chat live.");
  const [carouselTitle, setCarouselTitle] = useState("");
  const [carouselMovieId, setCarouselMovieId] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [systemPush, setSystemPush] = useState("");

  // Live Queue of Flagged Infractions
  const [flaggedQueue, setFlaggedQueue] = useState<FlaggedItem[]>([
    { id: "f1", author: "SpamBot_99", content: "CLICK HERE FOR FREE MOVIE TOKENS!!!", reason: "Malicious link ad spam.", timestamp: "2 mins ago" },
    { id: "f2", author: "ToxicStreamer", content: "This match is garbage and everyone in this room is stupid.", reason: "Community workspace harassment.", timestamp: "11 mins ago" }
  ]);

  // Telemetry Metric Trackers
  const liveMetrics = [
    { label: "Live Stream Viewers", count: "1,240", icon: Users, color: "text-[#00b4d8]" },
    { label: "Media Catalog Titles", count: "348", icon: Film, color: "text-amber-400" },
    { label: "Active Group Rooms", count: "12", icon: Shield, color: "text-emerald-400" },
  ];

  // System Core Action Callbacks
  const handleBroadcastAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement.trim()) return;
    setActiveBanner(announcement);
    setAnnouncement("");
  };

  const handleUpdateCarousel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carouselTitle.trim()) return;
    alert(`Featured Spotlight Carousel locked onto: ${carouselTitle}`);
    setCarouselTitle("");
  };

  const handleGeneratePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    alert(`Promo Code [${promoCode.toUpperCase()}] is now registered in the DB!`);
    setPromoCode("");
  };

  const handleSendPushAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!systemPush.trim()) return;
    alert(`Emergency Push Notification broadcasted: "${systemPush}"`);
    setSystemPush("");
  };

  return (
    <div className="min-h-screen bg-[#06070d] text-white pb-32 max-w-md mx-auto border-x border-gray-800/40 relative">
      
      {/* Fixed Layout Command Header */}
      <div className="bg-[#0b1424]/80 backdrop-blur-md border-b border-gray-800/80 p-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500 ring-1 ring-rose-500/30">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-wider">Neroxa Command</h1>
            <p className="text-[10px] text-rose-400 font-bold tracking-widest uppercase">Master Override Status</p>
          </div>
        </div>
        {maintenanceMode && (
          <span className="bg-rose-500 text-black font-black text-[8px] uppercase px-2 py-0.5 rounded animate-pulse">
            SYSTEM LOCKED
          </span>
        )}
      </div>

      <div className="p-4 space-y-6">

        {/*  1. LIVE APP METRICS & TELEMETRY */}
        <div className="grid grid-cols-3 gap-2.5">
          {liveMetrics.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-[#0b1424] border border-gray-800/60 p-3 rounded-xl space-y-1">
                <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                <div>
                  <span className="text-[8px] font-black text-gray-500 block uppercase tracking-wider">{stat.label}</span>
                  <span className="text-xs font-black text-white">{stat.count}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/*  2. LIVE ANNOUNCEMENT BANNER TICKER */}
        <div className="bg-[#0b1424] border border-gray-800 rounded-2xl p-4 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5" /> Live Announcement Banner
          </span>
          <div className="bg-[#06070d] p-2.5 rounded-xl border border-gray-900 text-[11px] font-medium text-gray-300 italic">
            <span className="text-amber-400 font-black not-italic uppercase tracking-widest text-[8px] block mb-0.5">Live Alert Status:</span>
            "{activeBanner}"
          </div>
          <form onSubmit={handleBroadcastAnnouncement} className="flex gap-2">
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="Type new global streaming alert ticker..."
              className="flex-1 bg-[#111c30] border border-gray-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 placeholder-gray-500"
            />
            <button type="submit" className="px-3 bg-amber-500 hover:bg-amber-600 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-transform active:scale-95">
              Deploy
            </button>
          </form>
        </div>

        {/*  3. FEATURED SPOTLIGHT BILLBOARD CAROUSEL */}
        <div className="bg-[#0b1424] border border-gray-800 rounded-2xl p-4 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#00b4d8] flex items-center gap-1">
            <Film className="w-3.5 h-3.5" /> Featured Spotlight Sliders
          </span>
          <form onSubmit={handleUpdateCarousel} className="space-y-2">
            <input
              type="text"
              required
              value={carouselTitle}
              onChange={(e) => setCarouselTitle(e.target.value)}
              placeholder="Spotlight Movie / Live Match Event Title"
              className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#00b4d8] placeholder-gray-500"
            />
            <button type="submit" className="w-full py-2.5 bg-[#00b4d8] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-transform active:scale-95">
              Update Showcase Slider Content
            </button>
          </form>
        </div>

        {/*  4. BAN & 24H TIMEOUT MANAGER INFRACTIONS QUEUE */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-400 px-0.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            Lounge Infractions Queue ({flaggedQueue.length})
          </div>

          <div className="space-y-2.5">
            {flaggedQueue.map((item) => (
              <div key={item.id} className="bg-[#111c30]/40 border border-gray-800 rounded-2xl p-4 space-y-3">
                <div className="bg-[#06070d]/50 p-2.5 rounded-xl border border-gray-900 text-xs">
                  <span className="text-rose-400 font-black block mb-0.5">@{item.author} (Flagged):</span>
                  <p className="text-gray-300 italic font-medium">"{item.content}"</p>
                </div>
                <p className="text-[10px] text-gray-400 font-medium"><span className="text-gray-500 font-bold">Reason:</span> {item.reason}</p>

                {/* Account Suspension Control Array */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      alert(`User @${item.author} account has been frozen for 24 Hours.`);
                      setFlaggedQueue(flaggedQueue.filter(q => q.id !== item.id));
                    }}
                    className="flex-1 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 text-amber-400 hover:text-black text-[10px] font-black uppercase tracking-wider py-2 rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    <Ban className="w-3.5 h-3.5" /> 24H Timeout User
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFlaggedQueue(flaggedQueue.filter(q => q.id !== item.id))}
                    className="px-3.5 bg-rose-600/10 hover:bg-rose-600 border border-rose-500/20 text-rose-400 hover:text-white rounded-xl transition-colors flex items-center justify-center"
                    title="Delete Content Only"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*  5. EMERGENCY SYSTEM PUSH ALERT DISPATCHER */}
        <div className="bg-[#0b1424] border border-gray-800 rounded-2xl p-4 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1">
            <Bell className="w-3.5 h-3.5" /> Forced System Push Modal
          </span>
          <form onSubmit={handleSendPushAlert} className="flex gap-2">
            <input
              type="text"
              value={systemPush}
              onChange={(e) => setSystemPush(e.target.value)}
              placeholder="Interrupt app screens with alert message..."
              className="flex-1 bg-[#111c30] border border-gray-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 placeholder-gray-500"
            />
            <button type="submit" className="px-3 bg-rose-500 hover:bg-rose-600 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-transform active:scale-95">
              Blast
            </button>
          </form>
        </div>

        {/*  6. PROMO CODE GENERATOR SUITE */}
        <div className="bg-[#0b1424] border border-gray-800 rounded-2xl p-4 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> Deploy Premium Promo Voucher
          </span>
          <form onSubmit={handleGeneratePromo} className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="e.g., NEROXAFREE7"
              className="flex-1 bg-[#111c30] border border-gray-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-gray-500 uppercase"
            />
            <button type="submit" className="px-3 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-transform active:scale-95">
              Create Pass
            </button>
          </form>
        </div>

        {/*  7. GLOBAL MAINTENANCE TOGGLE MODULE */}
        <div className="bg-[#0b1424] border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-rose-500" /> Maintenance Mode Overrides
            </span>
            <p className="text-[10px] text-gray-500 font-medium">Locks all app clients to a landing state.</p>
          </div>
          
          <button
            type="button"
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`w-12 h-6 rounded-full p-1 transition-all ${
              maintenanceMode ? "bg-rose-500 justify-end" : "bg-gray-800 justify-start"
            } flex items-center`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md" />
          </button>
        </div>

      </div>
    </div>
  );
}
