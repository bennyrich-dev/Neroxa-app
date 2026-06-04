import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Shield, Sparkles, Film, Activity, Sliders } from "lucide-react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "movie",
    genre: "",
    year: new Date().getFullYear().toString(),
    rating: "85",
    duration: "2h 0m",
    thumbnailUrl: "",
    backdropUrl: "",
    trailerUrl: "",
    status: "released",
    isWWE: false,
    isFeatured: false,
    isTrending: false,
    isNewRelease: false,
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:5000/api/admin/content/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          isWWE: Boolean(formData.isWWE),
          isFeatured: Boolean(formData.isFeatured),
          isTrending: Boolean(formData.isTrending),
          isNewRelease: Boolean(formData.isNewRelease),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMsg({ type: "success", text: `🎉 Successfully published "${formData.title}" to Neroxa networks!` });
        setFormData({
          title: "",
          description: "",
          type: "movie",
          genre: "",
          year: "2026",
          rating: "85",
          duration: "2h 0m",
          thumbnailUrl: "",
          backdropUrl: "",
          trailerUrl: "",
          status: "released",
          isWWE: false,
          isFeatured: false,
          isTrending: false,
          isNewRelease: false,
        });
      } else {
        setStatusMsg({ type: "error", text: result.error || "Submission rejected by database layer." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Failed to connect to backend api-server pipeline." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#06070d] text-white pt-24 px-6 pb-16 relative overflow-hidden">
        {/* Ambient background glow layout */}
        <div className="absolute w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] top-10 left-1/4 pointer-events-none" />

        <div className="max-w-3xl mx-auto bg-[#0b1424] border border-gray-800/60 rounded-2xl p-8 shadow-2xl relative z-10">
          
          {/* 👑 Custom Personalized Header Banner Greeting */}
          <div className="mb-8 border-b border-gray-800/60 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00b4d8] mb-1">
                <Shield className="w-3.5 h-3.5" /> Core Root Administrator Portal
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white">
                Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">BENNY RICHY</span> ⚡
              </h1>
              <p className="text-xs text-gray-400 mt-1">Manual Database Override Console. Instantly inject custom files, flag coming soon titles, or drop classic WWE files.</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-[10px] font-bold uppercase tracking-wider h-fit self-start sm:self-center">
              <Sparkles className="w-3 h-3 animate-spin" /> System Live
            </div>
          </div>

          {statusMsg.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm border ${
              statusMsg.type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}>
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Media Title</label>
                <div className="relative">
                  <Film className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#00b4d8] text-white transition-colors" placeholder="WrestleMania Legacy" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Genre Categories</label>
                <input required type="text" value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00b4d8] text-white transition-colors" placeholder="Action, Sports Entertainment" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description / Synopsis</label>
              <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00b4d8] text-white resize-none transition-colors" placeholder="Enter movie overview plotting summary data..." />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Media Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#00b4d8] text-white transition-colors">
                  <option value="movie">Movie</option>
                  <option value="series">Series</option>
                  <option value="wwe">WWE Show</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Release Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#00b4d8] text-amber-400 transition-colors">
                  <option value="released">Released</option>
                  <option value="coming-soon">⏰ Coming Soon</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Year</label>
                <input type="number" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00b4d8] text-white transition-colors" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Duration</label>
                <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00b4d8] text-white transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Thumbnail Image URL</label>
                <input type="text" value={formData.thumbnailUrl} onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00b4d8] text-white transition-colors" placeholder="https://image-source.jpg" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Backdrop Banner URL</label>
                <input type="text" value={formData.backdropUrl} onChange={e => setFormData({...formData, backdropUrl: e.target.value})} className="w-full bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00b4d8] text-white transition-colors" placeholder="https://backdrop-source.jpg" />
              </div>
            </div>

            {/* Categorization Rules Flags Checklist Mapping */}
            <div className="bg-[#111c30]/50 border border-gray-800 rounded-xl p-4 grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-300 font-semibold hover:text-white transition-colors">
                <input type="checkbox" checked={formData.isWWE} onChange={e => setFormData({...formData, isWWE: e.target.checked})} className="w-4 h-4 accent-[#00b4d8]" />
                Is WWE Event?
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-300 font-semibold hover:text-white transition-colors">
                <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 accent-[#00b4d8]" />
                Hero Banner Feature?
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-300 font-semibold hover:text-white transition-colors">
                <input type="checkbox" checked={formData.isTrending} onChange={e => setFormData({...formData, isTrending: e.target.checked})} className="w-4 h-4 accent-[#00b4d8]" />
                Add to Trending Row?
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-300 font-semibold hover:text-white transition-colors">
                <input type="checkbox" checked={formData.isNewRelease} onChange={e => setFormData({...formData, isNewRelease: e.target.checked})} className="w-4 h-4 accent-[#00b4d8]" />
                Add to New Releases?
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <button disabled={loading} type="submit" className="px-6 py-3.5 bg-[#00b4d8] hover:bg-[#0096b4] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#00b4d8]/10 disabled:opacity-50">
                {loading ? "Syncing Database Cluster..." : "Push Content Live 🚀"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </Layout>
  );
}
