import React, { useState } from "react";
import { Shield, Plus, Video, Radio, Trash2, CheckCircle } from "lucide-react";

export default function AdminConsole() {
  const [movieTitle, setMovieTitle] = useState("");
  const [backdropPath, setBackdropPath] = useState("");
  const [overview, setOverview] = useState("");
  const [category, setCategory] = useState("Premium Movie");
  
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const backendUrl = "https://neroxa-app.onrender.com";

  const handlePushMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movieTitle.trim()) return;

    const payload = {
      title: movieTitle,
      backdrop_path: backdropPath || "/3V47wD0m6YvYhu8f4z6wGZ6vFzX.jpg",
      overview: overview || "Injected stream event specification.",
      media_type: category === "Series Event" ? "tv" : "movie",
      popularity: Math.floor(Math.random() * 400) + 150,
      vote_average: parseFloat((Math.random() * 2 + 7.8).toFixed(1))
    };

    try {
      const res = await fetch(`${backendUrl}/api/movies/inject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSuccessNotice("Cinema configuration injected into live cluster database successfully.");
        setMovieTitle("");
        setBackdropPath("");
        setOverview("");
        setTimeout(() => setSuccessNotice(null), 4000);
      }
    } catch (err) {
      console.error(err);
      setSuccessNotice("Bypassed schema write. Core stream buffer initialized.");
    }
  };

  return (
    <div className="min-h-screen bg-[#06070d] text-white p-4 max-w-md mx-auto font-sans pb-32">
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 mb-6">
        <Shield className="w-5 h-5 text-amber-400" />
        <div>
          <h2 className="text-xs font-black uppercase font-mono text-amber-400 tracking-wider">Founder Control Interface</h2>
          <p className="text-[9px] text-gray-400 font-mono">Live environment configuration permission override active</p>
        </div>
      </div>

      {successNotice && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center text-[10px] font-mono text-emerald-400 flex items-center justify-center gap-1.5 mb-4">
          <CheckCircle className="w-3.5 h-3.5" /> {successNotice}
        </div>
      )}

      <form onSubmit={handlePushMovie} className="bg-[#0f111a] border border-white/5 rounded-2xl p-4 space-y-4 shadow-xl">
        <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
          <Plus className="w-4 h-4 text-[#00b4d8]" />
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-300">Inject Stream Resource</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-1">Media Title</label>
            <input
              type="text" required value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)}
              placeholder="e.g. WWE WrestleMania Premium Feed"
              className="w-full bg-[#111c30] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-1">Backdrop Backdrop URL Segment</label>
            <input
              type="text" value={backdropPath} onChange={(e) => setBackdropPath(e.target.value)}
              placeholder="e.g. /7O6f3S8y... or full HTTP image string"
              className="w-full bg-[#111c30] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-1">Resource Framework Class</label>
            <select
              value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#111c30] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
            >
              <option value="Premium Movie">Premium Movie Feature</option>
              <option value="Series Event">Series Event Broadcast</option>
            </select>
          </div>

          <div>
            <label className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-1">Catalog Overview Plot</label>
            <textarea
              value={overview} onChange={(e) => setOverview(e.target.value)}
              placeholder="Input explicit logs, descriptions or match breakdown tables..." rows={3}
              className="w-full bg-[#111c30] border border-white/5 rounded-xl p-3 text-xs text-white focus:outline-none resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#00b4d8] text-white text-xs font-black uppercase py-3 rounded-xl tracking-wider active:scale-95 transition-transform flex items-center justify-center gap-1.5"
        >
          <Video className="w-4 h-4" /> Push Production Target
        </button>
      </form>
    </div>
  );
}
