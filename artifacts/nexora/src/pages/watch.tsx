import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Play, Plus, Check, Star, Clock, Calendar, Film, User, ChevronLeft, Loader2, Video, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import { ContentCard } from "@/components/ContentCard";
import { TrailerModal } from "@/components/TrailerModal";
import {
  useGetContent,
  useGetRecommendations,
  useGetWatchlist,
  useAddToWatchlist,
  useRemoveFromWatchlist,
  getGetWatchlistQueryKey,
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Manages switching to live video view mode
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: content, isLoading, isError } = useGetContent(id!);
  const { data: recommendations = [] } = useGetRecommendations(id!);
  const { data: watchlist = [] } = useGetWatchlist();

  const isInWatchlist = watchlist.some((w) => w.contentId === Number(id));
  const addMutation = useAddToWatchlist();
  const removeMutation = useRemoveFromWatchlist();

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeMutation.mutate(
        { contentId: Number(id) },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetWatchlistQueryKey() });
            toast({ title: "Removed from Watchlist" });
          },
        }
      );
    } else {
      addMutation.mutate(
        { data: { contentId: Number(id) } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetWatchlistQueryKey() });
            toast({ title: "Added to Watchlist" });
          },
        }
      );
    }
  };

  // 📥 High-Speed Chunk Compiler Downloader Logic
  const handleMediaDownload = async () => {
    if (!content) return;
    setIsCompiling(true);
    setDownloadProgress(0);

    // Dynamic targeting: Fallback to stream resolver if a direct streamUrl property is missing
    const mediaSourceUrl = content.streamUrl || `http://localhost:5000/content/${id}/stream`;

    try {
      const response = await fetch(mediaSourceUrl);
      if (!response.body) throw new Error("Stream capture engine failed to connect.");

      const reader = response.body.getReader();
      const contentLength = +(response.headers.get("Content-Length") || "0");
      
      let receivedLength = 0;
      let chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        if (contentLength > 0) {
          const percentage = Math.round((receivedLength / contentLength) * 100);
          setDownloadProgress(percentage);
        }
      }

      // Consolidate memory chunks into an offline high-definition file
      const videoBlob = new Blob(chunks, { type: "video/mp4" });
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(videoBlob);
      downloadLink.download = `${content.title.replace(/\s+/g, "_")}_1080p.mp4`;
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast({ title: "✨ Download complete! Saved to your device." });

    } catch (err) {
      console.error("Native streaming extraction fallback:", err);
      toast({
        title: "Redirecting Download",
        description: "Opening premium media stream wrapper link natively...",
      });
      window.open(mediaSourceUrl, "_blank");
    } finally {
      setIsCompiling(false);
      setDownloadProgress(null);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  if (isError || !content) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-xl font-bold text-white">Content not found</p>
          <Link href="/">
            <Button className="bg-primary text-black font-bold">Go Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const isComingSoon = content.status === "coming-soon" || false;

  return (
    <Layout>
      {/* Dynamic Video View Window Frame */}
      <div className="relative w-full h-[55vh] md:h-[70vh] bg-black overflow-hidden">
        {isPlaying ? (
          <div className="w-full h-full relative group">
            <iframe
              src={`http://localhost:5000/content/${id}/stream`}
              className="w-full h-full border-0"
              allowFullScreen
              scrolling="no"
              title={content.title}
            />
            <button 
              onClick={() => setIsPlaying(false)}
              className="absolute top-6 left-6 z-50 flex items-center gap-1 bg-black/60 hover:bg-primary hover:text-black text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Stop Viewing
            </button>
          </div>
        ) : (
          <>
            <img
              src={content.backdropUrl}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

            <Link href="/">
              <button className="absolute top-6 left-6 md:left-10 flex items-center gap-1 text-white/70 hover:text-primary transition-colors text-sm">
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            </Link>

            <div className="absolute bottom-8 left-6 md:left-16">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/20 text-primary border border-primary/40 text-xs font-bold uppercase tracking-widest">
                    {content.type}
                  </Badge>
                  {isComingSoon && (
                    <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold uppercase tracking-widest animate-pulse">
                      ⏰ Coming Soon
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-black neon-text leading-tight mb-2">
                  {content.title}
                </h1>
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* Content Detail Panels */}
      <div className="px-6 md:px-16 mt-6 pb-24">
        <div className="max-w-5xl">
          {/* Action Row Control Blocks */}
          <div className="flex flex-wrap gap-3 mb-8">
            {isComingSoon ? (
              <Button 
                disabled 
                className="bg-zinc-800 text-zinc-500 font-bold border border-zinc-700 gap-2 px-8 cursor-not-allowed"
              >
                <Video className="w-4 h-4" />
                Not Yet Released
              </Button>
            ) : (
              <Button 
                onClick={() => setIsPlaying(true)}
                className="bg-primary text-black font-bold hover:bg-primary/90 neon-glow gap-2 px-8"
              >
                <Play className="w-4 h-4 fill-current" />
                Play Now
              </Button>
            )}

            {/* Premium Teal Download Action Button Link Matching Your Reference Sheet */}
            {!isComingSoon && (
              <Button
                disabled={isCompiling}
                onClick={handleMediaDownload}
                className="bg-[#00b4d8] text-white hover:bg-[#0096b4] font-bold gap-2 px-6 transition-all shadow-md shadow-[#00b4d8]/10"
              >
                <Download className="w-4 h-4" />
                {isCompiling ? `Compiling (${downloadProgress}%)` : "Download File"}
              </Button>
            )}

            {content.trailerUrl && (
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 gap-2"
                onClick={() => setTrailerOpen(true)}
              >
                <Film className="w-4 h-4" />
                Watch Trailer
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleWatchlistToggle}
              className={`gap-2 transition-all ${
                isInWatchlist
                  ? "border-primary text-primary hover:bg-primary/10"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
            >
              {isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </Button>
          </div>

          {/* Meta Information Badges */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
            {!isComingSoon && (
              <span className="flex items-center gap-1.5 text-primary font-bold text-base">
                <Star className="w-4 h-4 fill-primary text-primary" />
                {content.rating}% Match
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {isComingSoon ? `Expected Release: ${content.year}` : content.year}
            </span>
            {content.duration && !isComingSoon && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {content.duration}
              </span>
            )}
            <Badge className="border border-white/20 text-white/70 bg-transparent text-xs">
              {content.genre}
            </Badge>
          </div>

          {/* Synopsis Section */}
          <p className="text-gray-300 text-base leading-relaxed mb-10 max-w-2xl">
            {content.description}
          </p>

          {/* Production Credits Panels */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {content.director && (
              <div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Director</h3>
                <div className="flex items-center gap-3 glass-panel rounded-xl p-3 border border-primary/10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-white font-medium">{content.director}</span>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations Row */}
          {recommendations.length > 0 && (
            <div>
              <h2 className="text-xl font-bold neon-text mb-6">More Like This</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {recommendations.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <ContentCard content={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        trailerUrl={content.trailerUrl}
      />
    </Layout>
  );
}
