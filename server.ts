import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const HOST = "0.0.0.0";

  app.use(express.json());

  // API Routes FIRST
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "Atlas Thinking Workspace Engine",
      version: "0.1.0",
      architecture: "AI-Native Distributed Thought Matrix",
      timestamp: new Date().toISOString(),
    });
  });

  // Vite Middleware in Development vs Static Serving in Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Atlas Server] Running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("[Atlas Server] Failed to start:", err);
  process.exit(1);
});
