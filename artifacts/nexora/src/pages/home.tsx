import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Play, Info, ChevronLeft, ChevronRight, Trophy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/components/ContentCard";
import { Layout } from "@/components/Layout";
import { TrailerModal } from "@/components/TrailerModal";
import {
  useGetFeaturedContent,
  useGetTrendingContent,
  useGetNewReleases,
} from "@workspace/api-client-react";
import type { Content } from "@workspace/api-client-react/src/generated/api.schemas";
import { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Custom type extension to handle upcoming and specialized tracking fields safely
interface ExtendedContent extends Content {
  status?: string;
  isWWE?: boolean;
}

function ContentRow({ title, items, isLoading, isComingSoon = false }: { title: string; items: ExtendedContent[] | undefined; isLoading: boolean; isComingSoon?: boolean }) {
  const safeItems = Array.isArray(items) ? items : [];
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: dir === "left" ? -600 : 600, behavior: "smooth" });
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4 px-6 md:px-10">
        <h2 className="text-xl font-bold neon-text tracking-wide">{title}</h2>
        {isComingSoon && (
          <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] uppercase font-bold tracking-widest animate-pulse">
            Exclusive Preview
          </Badge>
        )}
      </div>
      <div className="relative group/row">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-gradient-to-r from-background to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-10 pb-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="min-w-[160px] h-[240px] rounded-xl" />
              ))
            : safeItems.map((item) => (
                <div key={item.id} className="min-w-[160px] md:min-w-[180px] relative group" style={{ scrollSnapAlign: "start" }}>
                  <ContentCard content={item} />
                  {/* Overlay subtle indicator labels for unreleased material items */}
                  {isComingSoon && (
                    <div className="absolute top-2 right-2 pointer-events-none">
                      <Badge className="bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/40 text-[9px] font-bold py-0.5 px-1.5">
                        <Calendar className="w-2.5 h-2.5 mr-1 inline" /> {item.year || "2026"}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-gradient-to-l from-background to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}

function HeroSection({ items }: { items: Content[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);

  if (!Array.isArray(items) || items.length === 0) return null;

  const featured = items[currentIdx];

  return (
    <div className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === currentIdx ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={item.backdropUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-end md:items-center pb-20 md:pb-0">
        <div className="px-6 md:px-16 max-w-2xl">
          <motion.div
            key={featured.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2 mb-4">
              <Badge className="bg-primary/20 text-primary border border-primary/40 backdrop-blur-md text-xs font-bold uppercase tracking-widest">
                {featured.type}
              </Badge>
              {featured.isTrending && (
                <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/40 backdrop-blur-md text-xs font-bold uppercase tracking-widest">
                  Trending
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-3 neon-text leading-tight">
              {featured.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="text-primary font-bold text-base">{featured.rating}% Match</span>
              <span>•</span>
              <span>{featured.year}</span>
              <span>•</span>
              <span>{featured.genre}</span>
              {featured.duration && <><span>•</span><span>{featured.duration}</span></>}
            </div>

            <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-3 leading-relaxed">
              {featured.description}
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link href={`/watch/${featured.id}`}>
                <Button className="bg-primary text-black font-bold hover:bg-primary/90 neon-glow px-6 gap-2">
                  <Play className="w-4 h-4 fill-current" />
                  Play Now
                </Button>
              </Link>
              {featured.trailerUrl && (
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 gap-2 backdrop-blur-sm"
                  onClick={() => setTrailerOpen(true)}
                >
                  <Play className="w-4 h-4" />
                  Watch Trailer
                </Button>
              )}
              <Link href={`/watch/${featured.id}`}>
                <Button variant="ghost" className="text-white hover:bg-white/10 gap-2">
                  <Info className="w-4 h-4" />
                  More Info
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 md:right-16 flex gap-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setCurrentIdx(i)}
            className={`transition-all duration-300 rounded overflow-hidden border-2 ${
              i === currentIdx ? "border-primary scale-105 neon-glow" : "border-white/20 opacity-50 hover:opacity-80"
            }`}
          >
            <img src={item.thumbnailUrl} alt={item.title} className="w-12 h-16 object-cover" />
          </button>
        ))}
      </div>

      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        trailerUrl={featured.trailerUrl}
      />
    </div>
  );
}

export default function Home() {
  const { data: featured = [], isLoading: featuredLoading } = useGetFeaturedContent();
  const { data: trending = [], isLoading: trendingLoading } = useGetTrendingContent();
  const { data: newReleases = [], isLoading: newLoading } = useGetNewReleases();

  // Temporary client-side array filters using dynamic runtime evaluation fields
  // In the subsequent phase, these items hook directly to your live auto-scraper database pipeline
  const wweArchiveItems = trending.filter((item: ExtendedContent) => 
    item.isWWE || 
    item.genre?.toLowerCase().includes("wrestling") || 
    item.title?.toLowerCase().includes("wwe") ||
    item.title?.toLowerCase().includes("raw")
  );

  const comingSoonItems = newReleases.filter((item: ExtendedContent) => 
    item.status === "coming-soon" || 
    item.year > 2026
  );

  return (
    <Layout>
      {featuredLoading ? (
        <div className="w-full h-[75vh] animate-pulse bg-card/40" />
      ) : (
        <HeroSection items={featured} />
      )}

      <div className="mt-6">
        <ContentRow title="Trending Now" items={trending} isLoading={trendingLoading} />
        
        {/* The Premium WWE Universe Dedicated Row Section */}
        {wweArchiveItems.length > 0 && (
          <ContentRow 
            title="WWE Classic & Premium Event Archives" 
            items={wweArchiveItems} 
            isLoading={trendingLoading} 
          />
        )}

        <ContentRow title="New Releases" items={newReleases} isLoading={newLoading} />

        {/* The Coming Soon Row Array Container */}
        <ContentRow 
          title="Coming Soon to Neroxa" 
          items={comingSoonItems.length > 0 ? comingSoonItems : newReleases.slice(0, 3)} 
          isLoading={newLoading}
          isComingSoon={true}
        />
      </div>
    </Layout>
  );
}
