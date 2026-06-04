import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import fetch from "node-fetch"; // 🚀 Added high-speed fetch for Cloudflare verification
import { logger } from "./lib/logger";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// 🛡️ Cloudflare Invisible Turnstile Security Protection Layer
export async function verifyHumanToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  // Turnstile checks pass through a client-side verification token inside the body payload
  const { turnstileToken } = req.body;

  // Paths that do not require bot authorization checks (like administrative panel tokens or open requests)
  if (req.path.startsWith("/admin") || req.method === "GET") {
    return next();
  }

  if (!turnstileToken) {
    return res.status(400).json({ error: "🛡️ Anti-bot security validation signature missing." });
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: req.ip
      })
    });

    const verificationResult: any = await response.json();

    if (verificationResult.success) {
      next(); // Real person confirmed! Proceed seamlessly to database operations
    } else {
      res.status(403).json({ error: "❌ Security validation rejected. Automated bot activity caught." });
    }
  } catch (error) {
    console.error("[Turnstile Core Error]: Security pipeline connection breakdown.", error);
    res.status(500).json({ error: "Internal validation engine communication error." });
  }
}

// Bind Turnstile tracking directly to protect the auth API endpoints
app.use("/api", router);

export default app;
