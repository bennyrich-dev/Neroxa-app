import React, { useState } from "react";
import { Heart, MessageCircle, ThumbsUp, Trash2, X, Play, Info, Star, Clock, ShieldAlert, Film, Share2 } from "lucide-react";

// Expanded Media Structure with Structural Certification Labels
const MOCK_MOVIE = {
  id: "m1",
  title: "The Comedy of Terrors",
  description: "When an eccentric horror writer moves into a tight-knit neighborhood, accidental hilarity and genuine spooks collide in an unexpected twist of fate.",
  rating: "4.8",
  duration: "2h 14m",
  releaseYear: "2026",
  maturityRating: "R-18+", // Embedded Core System Regulatory Label
  banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  cast: [
    { id: "a1", name: "Benny Richy", role: "The Writer", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", bio: "Benny Richy is an award-winning actor specializing in dark comedy and high-stakes psychological dramas.", filmography: ["Shadow Bound", "Neroxa Nights", "Echoes of Laughter"] },
    { id: "a2", name: "Sarah Connor", role: "The Neighbor", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", bio: "Sarah Connor is a seasoned cinematic performer known for intense action sequences and grounded dramatic roles.", filmography: ["Judgment Hour", "The Comedy of Terrors", "Dark Horizon"] }
  ]
};

interface Review {
  id: string;
  user: string;
  avatar: string;
  text: string;
  likes: number;
  hasLiked: boolean;
  replies: Array<{ id: string; user: string; text: string }>;
}

export default function MovieDetails() {
  const isAdmin = true; // Hardcoded fallback for layout testing - grants absolute control
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedActor, setSelectedActor] = useState<any | null>(null);
  const [reviewInput, setReviewInput] = useState("");
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [activeReplyBox, setActiveReplyBox] = useState<string | null>(null);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "r1",
      user: "Alex_Streamer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      text: "This movie is crazy good! The horror elements jump out when you least expect it, but the comedic timing is perfect. 10/10!",
      likes: 42,
      hasLiked: false,
      replies: [
        { id: "rp1", user: "CinemaFan", text: "Agreed! That scene in the library had me laughing out loud while sweating." }
      ]
    }
  ]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewInput.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      user: "You (Benny)",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
      text: reviewInput,
      likes: 0,
      hasLiked: false,
      replies: []
    };

    setReviews([newReview, ...reviews]);
    setReviewInput("");
  };

  const handleLikeReview = (id: string) => {
    setReviews(reviews.map(rev => {
      if (rev.id === id) {
        return {
          ...rev,
          likes: rev.hasLiked ? rev.likes - 1 : rev.likes + 1,
          hasLiked: !rev.hasLiked
        };
      }
      return rev;
    }));
  };

  const handleAddReply = (reviewId: string) => {
    const text = replyInputs[reviewId];
    if (!text || !text.trim()) return;

    setReviews(reviews.map(rev => {
      if (rev.id === reviewId) {
        return {
          ...rev,
          replies: [...rev.replies, { id: Date.now().toString(), user: "You (Benny)", text }]
        };
      }
      return rev;
    }));

    setReplyInputs({ ...replyInputs, [reviewId]: "" });
    setActiveReplyBox(null);
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(rev => rev.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#06070d] text-white pb-32 max-w-md mx-auto border-x border-gray-800/40 relative">
      
      {/*  CINEMATIC MEDIA CONTROLLER VIEWPORT */}
      <div className="relative h-64 w-full overflow-hidden bg-black border-b border-gray-900 shadow-2xl">
        {isPlaying ? (
          <video 
            src={MOCK_MOVIE.videoUrl} 
            controls 
            autoPlay 
            className="w-full h-full object-contain"
          />
        ) : (
          <>
            <img src={MOCK_MOVIE.banner} alt={MOCK_MOVIE.title} className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-[#06070d]/30 to-transparent" />
            
            {/* Play Trigger Node */}
            <button 
              onClick={() => setIsPlaying(true)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#00b4d8] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#00b4d8]/40 hover:scale-105 active:scale-95 transition-all z-20 group"
            >
              <Play className="w-6 h-6 fill-white ml-1 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}
      </div>

      {/* METADATA SUMMARY & REGULATORY LABELS GRID */}
      <div className="px-4 -mt-4 relative z-10 space-y-4">
        
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-xl font-black tracking-tight uppercase">{MOCK_MOVIE.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              
              {/* Maturity Rating Badge System */}
              <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> {MOCK_MOVIE.maturityRating}
              </span>

              <span className="bg-gray-900 border border-gray-800 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 font-sans">
                <Clock className="w-3 h-3" /> {MOCK_MOVIE.duration}
              </span>

              <span className="bg-gray-900 border border-gray-800 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-md font-sans">
                {MOCK_MOVIE.releaseYear}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-xl text-xs font-black border border-amber-500/20 shadow-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {MOCK_MOVIE.rating}
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
            <Film className="w-3.5 h-3.5" /> Storyline Overview
          </span>
          <p className="text-xs text-gray-400 leading-relaxed font-medium font-sans">{MOCK_MOVIE.description}</p>
        </div>
      </div>

      {/*  CAST CAROUSEL */}
      <div className="mt-6 space-y-2.5">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 px-4">Interactive Cast Profiles</h2>
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-none">
          {MOCK_MOVIE.cast.map((actor) => (
            <button
              key={actor.id}
              type="button"
              onClick={() => setSelectedActor(actor)}
              className="flex flex-col items-center gap-1.5 min-w-[70px] active:scale-95 transition-transform group"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-800 group-hover:ring-[#00b4d8] transition-all relative">
                <img src={actor.img} alt={actor.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold text-gray-300 truncate w-16 text-center">{actor.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/*  TIMELINE THEATER CHAT COMPONENT */}
      <div className="mt-6 px-4 space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">Theater Chat & Reviews</h2>
        
        <form onSubmit={handleAddReview} className="flex gap-2">
          <input
            type="text"
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
            placeholder="Share an authorized review or comment..."
            className="flex-1 bg-[#111c30] border border-gray-700/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00b4d8] placeholder-gray-500 font-sans"
          />
          <button type="submit" className="px-4 py-2.5 bg-[#00b4d8] text-white text-xs font-black uppercase tracking-wider rounded-xl active:scale-95 transition-transform">
            Post
          </button>
        </form>

        <div className="space-y-4 pt-2">
          {reviews.map((rev) => (
            <div key={rev.id} className="border-b border-gray-900 pb-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-2.5">
                  <img src={rev.avatar} alt={rev.user} className="w-8 h-8 rounded-full object-cover border border-gray-800" />
                  <div>
                    <span className="text-[11px] font-black text-gray-300 block">@{rev.user}</span>
                    <p className="text-xs text-gray-200 mt-0.5 leading-relaxed font-sans">{rev.text}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <button onClick={() => handleLikeReview(rev.id)} className={`p-1 transition-colors ${rev.hasLiked ? "text-rose-500" : "text-gray-500 hover:text-white"}`}>
                    <ThumbsUp className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[9px] font-black block text-center mt-0.5 text-gray-400 font-sans">{rev.likes}</span>
                  </button>
                  
                  {isAdmin && (
                    <button onClick={() => handleDeleteReview(rev.id)} className="p-1 text-gray-600 hover:text-rose-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="pl-10 space-y-2">
                <button
                  onClick={() => setActiveReplyBox(activeReplyBox === rev.id ? null : rev.id)}
                  className="text-[10px] text-[#00b4d8] font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" /> Reply Thread
                </button>

                {activeReplyBox === rev.id && (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={replyInputs[rev.id] || ""}
                      onChange={(e) => setReplyInputs({ ...replyInputs, [rev.id]: e.target.value })}
                      placeholder="Write thread response..."
                      className="flex-1 bg-[#0b1424] border border-gray-800 rounded-lg px-3 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#00b4d8] font-sans"
                    />
                    <button onClick={() => handleAddReply(rev.id)} className="px-3 bg-gray-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
                      Send
                    </button>
                  </div>
                )}

                {rev.replies.map((reply) => (
                  <div key={reply.id} className="bg-[#111c30]/40 border-l-2 border-gray-800 pl-3 py-1.5 text-xs rounded-r-lg">
                    <span className="text-[10px] font-bold text-[#00b4d8]">@{reply.user}</span>
                    <p className="text-gray-300 text-[11px] mt-0.5 font-sans">{reply.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*  ACTOR BIO POP-UP MODAL */}
      {selectedActor && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0b1424] border border-gray-800 rounded-2xl p-6 relative shadow-2xl animate-fade-in">
            <button onClick={() => setSelectedActor(null)} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white bg-gray-900 rounded-lg">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
              <img src={selectedActor.img} alt={selectedActor.name} className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#00b4d8]" />
              <div>
                <h3 className="text-sm font-black uppercase tracking-wide text-white">{selectedActor.name}</h3>
                <span className="text-xs font-bold text-[#00b4d8]">{selectedActor.role}</span>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Biography</span>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed font-medium font-sans">{selectedActor.bio}</p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#00b4d8]" /> Other Roles on Neroxa
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedActor.filmography.map((film: string, index: number) => (
                    <span key={index} className="bg-[#111c30] border border-gray-800 text-gray-300 text-[10px] font-bold px-2.5 py-1 rounded-md font-sans">
                      {film}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
