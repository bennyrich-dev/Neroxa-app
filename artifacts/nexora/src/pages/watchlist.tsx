import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Loader2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ContentCard } from "@/components/ContentCard";
import { useGetWatchlist } from "@workspace/api-client-react";

export default function Watchlist() {
  const { data: watchlist = [], isLoading } = useGetWatchlist();

  return (
    <Layout>
      <div className="px-6 md:px-10 pt-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-black neon-text mb-2">My Watchlist</h1>
          {!isLoading && watchlist.length > 0 && (
            <p className="text-muted-foreground text-sm">
              {watchlist.length} title{watchlist.length !== 1 ? "s" : ""} saved
            </p>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-24"
            >
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </motion.div>
          ) : watchlist.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full glass-panel border border-primary/30 flex items-center justify-center">
                <Bookmark className="w-10 h-10 text-primary/50" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h2>
              <p className="text-muted-foreground text-sm">
                Add movies and series by clicking the + button on any title.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              {watchlist.map((item, i) =>
                item.content ? (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <ContentCard content={item.content} />
                  </motion.div>
                ) : null
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
