import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { validateAnalyzeBody, runStylistAnalysis, StylistRequestError } from "../shared/stylist.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.API_PORT || 8787;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

app.use(express.json({ limit: "25mb" }));

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

app.post("/api/analyze", async (req, res) => {
  try {
    if (!anthropic) {
      return res.status(500).json({
        error: "ANTHROPIC_API_KEY is not set on the server. Copy .env.example to .env and add your key.",
      });
    }

    const payload = validateAnalyzeBody(req.body);
    const parsed = await runStylistAnalysis(anthropic, MODEL, payload);
    res.json(parsed);
  } catch (err) {
    console.error(err);
    if (err instanceof StylistRequestError) {
      return res.status(err.status).json({ error: err.message });
    }
    res.status(502).json({ error: err.message || "The stylist model failed to respond. Please try again." });
  }
});

// Guarantee JSON (never HTML) for /api/* errors — e.g. body-parser's
// PayloadTooLargeError, which Express would otherwise render as an HTML
// error page and break the frontend's res.json() parsing.
app.use("/api", (err, req, res, next) => {
  if (!err) return next();
  console.error(err);
  const status = err.status || err.statusCode || 500;
  const message =
    status === 413
      ? "Your photos are too large together. Try removing one or use fewer/smaller images."
      : err.message || "Something went wrong on the server.";
  res.status(status).json({ error: message });
});

// Serve the production build if it exists (npm run build && npm start)
app.use(express.static(path.join(__dirname, "..", "dist")));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Glam Me Up API listening on http://localhost:${PORT}`);
  if (!anthropic) {
    console.warn("No ANTHROPIC_API_KEY set — /api/analyze will return an error until you add one to .env");
  }
});
