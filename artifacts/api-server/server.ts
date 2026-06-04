import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-base-js";

// Initialize environment secrets configurations
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Establish connection points to your live Supabase cloud database cluster
const supabaseUrl = process.env.SUPABASE_URL || "https://your-supabase-url.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PORT = process.env.PORT || 5000;

// 🧠 POST ROUTE: AI Assistant Message Processing & History Weights Logic
app.post("/api/ai/chat", async (req: Request, res: Response) => {
  const { userId, message } = req.body;

  try {
    // 1. Fetch user profile custom settings & self-tag flairs
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, user_role")
      .eq("id", userId)
      .single();

    // 2. Fetch user's watch history data matrix to guide personalization weights
    const { data: history } = await supabase
      .from("watch_history")
      .select("movie_id, progress_percentage, movies(title, description)")
      .eq("user_id", userId);

    // Compile history summaries to inject context directly into the AI's short-term memory
    const watchHistorySummary = history && history.length > 0
      ? history.map(h => `- ${(h as any).movies.title} (Watched: ${h.progress_percentage}%)`).join("\n")
      : "No streaming history recorded yet.";

    // 3. Constructing system instructions for your AI Guide
    const systemPrompt = `
      You are the Neroxa AI Guide, an expert entertainment companion assistant for the Neroxa streaming app.
      You are speaking with ${profile?.full_name || "a user"} who has the community rank tag: [${profile?.user_role || "User"}].
      
      Here is their streaming watch history data for personalized recommendation weighting:
      ${watchHistorySummary}

      CRITICAL OPERATION: When users ask for a recommendation or movie evaluation, you must calculate and output a specific percentage compatibility match weight based on their interests (e.g., "94% Match Compatibility"). Be enthusiastic, sleek, and direct.
    `;

    // 4. Mocking AI API Gateway Response Payload 
    // (Replace the return object placeholder below with your direct OpenAI/Anthropic fetch request)
    const mockAiResponse = `Hey @${profile?.full_name || "User"}! Based on your preference history tracking, I calculated a **94% Match Compatibility** rating for you to check out tonight's upcoming live action stream event. Let me know if you want me to queue it up!`;

    res.status(200).json({
      success: true,
      reply: mockAiResponse
    });

  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Neroxa AI Master Engine online and listening on port ${PORT}`);
});
