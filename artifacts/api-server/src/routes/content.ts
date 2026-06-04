import { Router } from "express";
import { eq, ilike, or, ne, and } from "drizzle-orm";
import { db, contentTable, genresTable, watchlistTable } from "@workspace/db";
import {
  ListContentQueryParams,
  GetContentParams,
  GetRecommendationsParams,
  SearchContentQueryParams,
  AddToWatchlistBody,
  RemoveFromWatchlistParams,
} from "@workspace/api-zod";
// Import your custom Benny Richy stream engine from the same folder
import { resolveMediaStream } from "../resolver";

const router = Router();

router.get("/content", async (req, res): Promise<void> => {
  const parsed = ListContentQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { genre, type, limit = 50, offset = 0 } = parsed.data;

  let query = db.select().from(contentTable).$dynamic();

  const conditions = [];
  if (genre) conditions.push(eq(contentTable.genre, genre));
  if (type) conditions.push(eq(contentTable.type, type));

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  const items = await query.limit(limit).offset(offset);
  res.json(items);
});

router.get("/content/featured", async (_req, res): Promise<void> => {
  const items = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.isFeatured, true))
    .limit(5);
  res.json(items);
});

router.get("/content/trending", async (_req, res): Promise<void> => {
  const items = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.isTrending, true))
    .limit(20);
  res.json(items);
});

router.get("/content/new-releases", async (_req, res): Promise<void> => {
  const items = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.isNewRelease, true))
    .limit(20);
  res.json(items);
});

router.get("/content/:id", async (req, res): Promise<void> => {
  const params = GetContentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [item] = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.id, params.data.id));

  if (!item) {
    res.status(404).json({ error: "Content not found" });
    return;
  }

  res.json(item);
});

router.get("/content/:id/recommendations", async (req, res): Promise<void> => {
  const params = GetRecommendationsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [source] = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.id, params.data.id));

  if (!source) {
    res.json([]);
    return;
  }

  const items = await db
    .select()
    .from(contentTable)
    .where(
      and(
        eq(contentTable.genre, source.genre),
        ne(contentTable.id, params.data.id),
      ),
    )
    .limit(10);

  res.json(items);
});

router.get("/genres", async (_req, res): Promise<void> => {
  const genres = await db.select().from(genresTable).orderBy(genresTable.name);
  res.json(genres);
});

router.get("/search", async (req, res): Promise<void> => {
  const parsed = SearchContentQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { q } = parsed.data;
  const term = `%${q}%`;

  const items = await db
    .select()
    .from(contentTable)
    .where(
      or(
        ilike(contentTable.title, term),
        ilike(contentTable.description, term),
        ilike(contentTable.genre, term),
      ),
    )
    .limit(30);

  res.json({ items, total: items.length });
});

router.get("/watchlist", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      id: watchlistTable.id,
      contentId: watchlistTable.contentId,
      addedAt: watchlistTable.addedAt,
      content: contentTable,
    })
    .from(watchlistTable)
    .innerJoin(contentTable, eq(watchlistTable.contentId, contentTable.id))
    .orderBy(watchlistTable.addedAt);

  res.json(rows);
});

router.post("/watchlist", async (req, res): Promise<void> => {
  const parsed = AddToWatchlistBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .insert(watchlistTable)
    .values({ contentId: parsed.data.contentId })
    .returning();

  const [content] = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.id, row.contentId));

  res.status(201).json({ ...row, content });
});

router.delete("/watchlist/:contentId", async (req, res): Promise<void> => {
  const params = RemoveFromWatchlistParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  await db
    .delete(watchlistTable)
    .where(eq(watchlistTable.contentId, params.data.contentId));

  res.sendStatus(204);
});

// =========================================================================
// 🚀 NEROXA TWIN-ENGINE CONTENT INGESTION ENDPOINTS
// =========================================================================

/**
 * ENGINE 1: AUTOMATED BACKGROUND SCRAPER GATEWAY
 * Pushes bulk titles scraped daily from external sources into the database
 */
router.post("/content/auto-scrape", async (req, res): Promise<void> => {
  try {
    const dataItems = Array.isArray(req.body) ? req.body : [req.body];
    const createdItems = [];

    for (const data of dataItems) {
      if (!data.title) continue;

      // Duplicate prevention: match title to avoid duplicate database entries
      const [existingItem] = await db
        .select()
        .from(contentTable)
        .where(ilike(contentTable.title, data.title))
        .limit(1);

      if (existingItem) {
        // If content exists, update its trending metrics instead of duplicating
        const [updated] = await db
          .update(contentTable)
          .set({
            isTrending: data.isTrending ?? existingItem.isTrending,
            rating: data.rating ?? existingItem.rating,
          })
          .where(eq(contentTable.id, existingItem.id))
          .returning();
        createdItems.push(updated);
      } else {
        // Safe defaults fallback to prevent database table insertion crashes
        const [inserted] = await db
          .insert(contentTable)
          .values({
            title: data.title,
            description: data.description || "No overview available.",
            type: data.type || "movie",
            genre: data.genre || "Entertainment",
            year: Number(data.year) || 2026,
            rating: Number(data.rating) || 75.0,
            duration: data.duration || "2h 0m",
            thumbnailUrl: data.thumbnailUrl || "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500",
            backdropUrl: data.backdropUrl || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200",
            trailerUrl: data.trailerUrl || "",
            isFeatured: !!data.isFeatured,
            isTrending: data.isTrending !== undefined ? !!data.isTrending : true,
            isNewRelease: !!data.isNewRelease,
            status: data.status || "released",
            isWWE: !!data.isWWE,
          })
          .returning();
        createdItems.push(inserted);
      }
    }

    res.status(201).json({ success: true, processedCount: createdItems.length });
  } catch (err: any) {
    console.error("[Scraper API Error]:", err);
    res.status(500).json({ error: err.message || "Failed to parse automation block" });
  }
});

/**
 * ENGINE 2: MANUAL ADMINISTRATIVE CONTROL PANEL GATEWAY
 * Processes explicit creations directly from your manual dashboard forms
 */
router.post("/admin/content/add", async (req, res): Promise<void> => {
  try {
    const data = req.body;
    if (!data.title || !data.description || !data.genre) {
      res.status(400).json({ error: "Title, Description, and Genre fields are required." });
      return;
    }

    const [newMedia] = await db
      .insert(contentTable)
      .values({
        title: data.title,
        description: data.description,
        type: data.type || "movie",
        genre: data.genre,
        year: parseInt(data.year) || 2026,
        rating: parseFloat(data.rating) || 90.0,
        duration: data.duration || "1h 30m",
        episodeCount: data.episodeCount ? parseInt(data.episodeCount) : null,
        seasons: data.seasons ? parseInt(data.seasons) : null,
        thumbnailUrl: data.thumbnailUrl || "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500",
        backdropUrl: data.backdropUrl || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200",
        trailerUrl: data.trailerUrl || "",
        isFeatured: !!data.isFeatured,
        isTrending: !!data.isTrending,
        isNewRelease: !!data.isNewRelease,
        status: data.status || "released", // Can explicitly be "coming-soon"
        isWWE: !!data.isWWE,               // Routes directly to the premium WWE rows
        director: data.director || "Benny Richy Productions",
      })
      .returning();

    res.status(201).json({ success: true, addedItem: newMedia });
  } catch (err: any) {
    console.error("[Admin API Creation Crash]:", err);
    res.status(500).json({ error: err.message || "Database write operational failure" });
  }
});

// =========================================================================

// The fully wired streaming endpoint powered by the Benny Richy Engine
router.get('/content/:id/stream', async (req, res): Promise<void> => {
  try {
    // 1. Safely check if the request contains a valid ID parameter
    const params = GetContentParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }

    // 2. Fetch the movie details from the database using Drizzle ORM
    const [mediaItem] = await db
      .select()
      .from(contentTable)
      .where(eq(contentTable.id, params.data.id));

    if (!mediaItem) {
      res.status(404).json({ error: "Media item not found in database" });
      return;
    }

    // 3. Extract the clean title and categorize the content type
    const mediaTitle = mediaItem.title;
    const mediaType = (mediaItem.type === 'movie' || mediaItem.type === 'series') ? mediaItem.type : 'movie';

    // 4. Fire up the Benny Richy Core Resolver Engine to grab the video links
    const streamDetails = await resolveMediaStream(mediaTitle, mediaType);

    // 5. Send the dynamic payload back to Neroxa's user interface
    res.json({
      provider: streamDetails.provider,
      creator: streamDetails.creator,
      mediaId: params.data.id,
      title: streamDetails.title,
      sources: streamDetails.sources,
      meta: {
        supportedResolutions: ["1080p", "720p", "480p", "360p"],
        adaptiveBitrate: true
      }
    });

  } catch (error) {
    console.error("[Backend Server Error] Stream routing failure:", error);
    res.status(500).json({ error: "Internal server error resolving stream" });
  }
});

export default router;
