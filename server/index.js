import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.API_PORT || 8787;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

app.use(express.json({ limit: "25mb" }));

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const SYSTEM_PROMPT = `You are the lead stylist at Glam Me Up, an elegant styling studio that prepares women for specific occasions (weddings, galas, dates, interviews, holidays, and more).

You synthesize guidance the way a real stylist would, drawing on several established frameworks as your "resources":
- Seasonal color analysis (the 12-season system: undertone -> season -> palette)
- Body-shape silhouette guides (hourglass, pear, apple, rectangle, inverted triangle) and which necklines, waistlines, and fits flatter each
- Event dress-code and etiquette norms (black-tie, cocktail, business formal, garden party, etc.)
- Hair-and-face-shape pairing conventions
- Makeup theory suited to skin undertone and event lighting/formality
- Current, tasteful accessory pairing conventions (metal tones, proportions, day vs evening)

You are warm, encouraging, and specific — never generic ("wear what makes you feel confident" is banned). You are also honest: if an uploaded outfit does not suit the occasion or the person, say so kindly and explain the fix. Never comment on weight or make judgmental remarks about bodies; describe shape neutrally and helpfully, the way a good stylist would.

Photos may include: portraits/selfies (for skin tone, undertone, hair, face shape, general body proportions) and/or outfit photos (flatlay, mirror selfie, or worn) to be scored. Use whichever combination you're given; don't assume every photo is both.

Respond with ONLY a single JSON object — no markdown code fences, no commentary before or after. Match this exact shape:

{
  "summary": "2-3 warm, specific sentences on the overall look and direction for this occasion",
  "styleProfile": {
    "undertone": "warm | cool | neutral",
    "seasonalPalette": "e.g. Soft Autumn",
    "bodyShape": "hourglass | pear | apple | rectangle | inverted-triangle | unspecified",
    "bodyShapeNote": "one kind, specific sentence",
    "faceShape": "oval | round | square | heart | long | unspecified"
  },
  "recommendedPalette": [ { "hex": "#RRGGBB", "name": "color name" } ],
  "silhouetteGuidance": [ "specific cut/neckline/fit tip" ],
  "avoid": [ "specific cut or color to steer away from, framed kindly" ],
  "hairstyle": [ { "name": "style name", "why": "one sentence tailored to occasion + face shape" } ],
  "makeup": { "eyes": "...", "lips": "...", "cheeks": "...", "overall": "one sentence tying it together" },
  "accessories": { "jewelryMetal": "gold | silver | rose gold | mixed", "jewelry": "...", "bag": "...", "shoes": "...", "other": "..." },
  "outfitScores": [
    {
      "photoIndex": 0,
      "overall": 82,
      "breakdown": { "colorHarmony": 85, "fitSilhouette": 80, "occasionFit": 85, "accessorizing": 78 },
      "whatWorks": [ "short specific point" ],
      "improvements": [ "short specific, actionable fix" ]
    }
  ],
  "dos": [ "short specific tip for this occasion" ],
  "donts": [ "short specific tip for this occasion" ]
}

Rules:
- recommendedPalette: 5-7 swatches.
- silhouetteGuidance and avoid: 2-4 items each.
- hairstyle: 2-3 options.
- outfitScores: include one entry per photo that clearly shows an outfit (worn or laid out). Skip plain face/body portraits that show no outfit. If no photo shows a scoreable outfit, return an empty array.
- Scores are 0-100 integers. Be an honest critic — do not give everything 90+; use the full range where warranted.
- dos and donts: 3-5 items each, specific to the stated occasion.
- All arrays must contain only strings or objects exactly as shaped above. No nested markdown, no extra keys.`;

function buildUserContent({ occasion, context, photos }) {
  const details = [];
  details.push(`Occasion: ${occasion.label} — ${occasion.tagline}`);
  if (context.formality) details.push(`Formality (1 casual - 5 ultra formal): ${context.formality}`);
  if (context.season) details.push(`Season: ${context.season}`);
  if (context.venue) details.push(`Venue: ${context.venue}`);
  if (context.timeOfDay) details.push(`Time of day: ${context.timeOfDay}`);
  if (context.colorsToAvoid) details.push(`Colors they'd rather avoid: ${context.colorsToAvoid}`);
  if (context.notes) details.push(`Additional notes from the user: ${context.notes}`);
  details.push(
    `${photos.length} photo(s) are attached in order (photoIndex 0 is the first). Use them to build the style profile and, where an outfit is shown, to populate outfitScores.`
  );

  const content = photos.map((p, i) => ({
    type: "image",
    source: { type: "base64", media_type: p.mediaType, data: p.data },
  }));

  content.push({ type: "text", text: details.join("\n") });
  return content;
}

app.post("/api/analyze", async (req, res) => {
  try {
    if (!anthropic) {
      return res.status(500).json({
        error: "ANTHROPIC_API_KEY is not set on the server. Copy .env.example to .env and add your key.",
      });
    }

    const { occasion, context, photos } = req.body || {};
    if (!occasion || !Array.isArray(photos) || photos.length < 3) {
      return res.status(400).json({ error: "Please provide an occasion and at least 3 photos." });
    }
    if (photos.length > 5) {
      return res.status(400).json({ error: "Please provide at most 5 photos." });
    }

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2200,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserContent({ occasion, context: context || {}, photos }) }],
    });

    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    let clean = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const first = clean.indexOf("{");
    const last = clean.lastIndexOf("}");
    if (first > -1 && last > -1) clean = clean.slice(first, last + 1);

    const parsed = JSON.parse(clean);
    res.json(parsed);
  } catch (err) {
    console.error(err);
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
