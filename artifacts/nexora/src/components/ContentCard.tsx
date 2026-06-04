import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Play, Plus, Check } from "lucide-react";
import { Content } from "@workspace/api-client-react/src/generated/api.schemas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAddToWatchlist, useRemoveFromWatchlist, useGetWatchlist } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getGetWatchlistQueryKey } from "@workspace/api-client-react";

export function ContentCard({ content, className }: { content: Content; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: watchlist } = useGetWatchlist();
  const isInWatchlist = watchlist?.some(item => item.contentId === content.id);
  
  const addMutation = useAddToWatchlist();
  const removeMutation = useRemoveFromWatchlist();

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist) {
      removeMutation.mutate(
        { contentId: content.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetWatchlistQueryKey() });
            toast({ title: "Removed from Watchlist" });
          }
        }
      );
    } else {
      addMutation.mutate(
        { data: { contentId: content.id } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetWatchlistQueryKey() });
            toast({ title: "Added to Watchlist" });
          }
        }
      );
    }
  };

  return (
    <Link href={`/watch/${content.id}`}>
      <motion.div
        className={cn(
          "relative group rounded-xl overflow-hidden cursor-pointer aspect-[2/3] glass-panel bg-card/40 border-card-border/50",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, zIndex: 10 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={content.thumbnailUrl}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content Info (Visible on Hover mostly) */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-bold text-lg text-white mb-1 line-clamp-1 neon-text">{content.title}</h3>
            
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs text-gray-300 mb-3">
                <span className="text-primary font-medium">{content.rating}% Match</span>
                <span>•</span>
                <span>{content.year}</span>
                <span>•</span>
                <span className="border border-gray-500 px-1 rounded">{content.type}</span>
              </div>
              
              <div className="flex gap-2">
                <Button size="icon" variant="default" className="w-8 h-8 rounded-full bg-primary text-black hover:bg-primary/90 neon-glow">
                  <Play className="w-4 h-4 ml-0.5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="w-8 h-8 rounded-full border-primary/50 text-white hover:bg-primary/20 hover:text-primary hover:border-primary"
                  onClick={handleWatchlistToggle}
                >
                  {isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {content.isNewRelease && (
            <Badge className="bg-primary/20 text-primary border border-primary/50 backdrop-blur-md font-bold uppercase tracking-wider text-[10px]">
              New
            </Badge>
          )}
          {content.isTrending && (
            <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/50 backdrop-blur-md font-bold uppercase tracking-wider text-[10px]">
              Trending
            </Badge>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
