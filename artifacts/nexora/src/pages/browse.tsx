import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ContentCard } from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useListContent, useListGenres } from "@workspace/api-client-react";

const CONTENT_TYPES = ["all", "movie", "series", "documentary"] as const;

export default function Browse() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  const { data: genres = [] } = useListGenres();
  const { data: content = [], isLoading } = useListContent(
    {
      ...(selectedType !== "all" ? { type: selectedType as "movie" | "series" | "documentary" } : {}),
      ...(selectedGenre !== "all" ? { genre: selectedGenre } : {}),
    }
  );

  return (
    <Layout>
      <div className="px-6 md:px-10 pt-10">
        <motion.h1
          className="text-3xl md:text-4xl font-black neon-text mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Browse
        </motion.h1>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CONTENT_TYPES.map((t) => (
            <Button
              key={t}
              variant={selectedType === t ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(t)}
              className={
                selectedType === t
                  ? "bg-primary text-black font-bold neon-glow capitalize"
                  : "border-primary/30 text-muted-foreground hover:border-primary hover:text-primary capitalize"
              }
            >
              {t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}
            </Button>
          ))}
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Button
            key="all"
            variant={selectedGenre === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedGenre("all")}
            className={
              selectedGenre === "all"
                ? "bg-primary/20 text-primary border border-primary/50 font-bold"
                : "border-white/10 text-muted-foreground hover:border-primary/40 hover:text-primary"
            }
          >
            All Genres
          </Button>
          {genres.map((g) => (
            <Button
              key={g.slug}
              variant="outline"
              size="sm"
              onClick={() => setSelectedGenre(g.name)}
              className={
                selectedGenre === g.name
                  ? "bg-primary/20 text-primary border border-primary/50 font-bold"
                  : "border-white/10 text-muted-foreground hover:border-primary/40 hover:text-primary"
              }
            >
              {g.name}
            </Button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] rounded-xl" />
            ))}
          </div>
        ) : content.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">No content found for these filters.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {content.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <ContentCard content={item} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="h-20" />
      </div>
    </Layout>
  );
}
