# Glam Me Up

An occasion-first styling app. Pick what you're getting dressed for, upload 3–5
photos, and get back an elegant, specific styling brief: colors, silhouette,
hair, makeup, and accessories — plus an honest 0–100 score on any outfit you're
considering, with concrete fixes.

This is not a wardrobe-cataloguing app. There's no closet to build — you upload
a handful of photos for one occasion and get a complete answer back.

## How it works

1. **Pick an occasion** — wedding guest, black-tie gala, cocktail party, date
   night, interview, holiday party, brunch, or a red-carpet moment.
2. **Upload 3–5 photos** — at least one clear photo of you (face + body) for
   coloring and proportions, plus any outfits or pieces you're deciding
   between. Photos are downscaled to max 1200px in the browser before upload.
3. **Add context** — formality, season, venue, time of day, colors to avoid,
   free-form notes. All optional except formality (defaulted per occasion).
4. **Review and submit.** The photos and context are sent to Claude
   (`claude-sonnet-5` by default) with a single, structured prompt.
5. **Get your styling notes** — undertone, seasonal palette, body shape,
   a recommended color palette, silhouette guidance, hairstyle and makeup
   suggestions, accessory pairings, a scored breakdown for any outfit photos,
   and event-specific do's and don'ts.

### About "multiple resources"

There's no live web-scraping or third-party fashion API here — that would need
paid API keys and licensing this prototype doesn't have. Instead, the model is
prompted to reason the way a real stylist synthesizes several established
frameworks at once: seasonal color analysis, body-shape silhouette guides,
event dress-code norms, face-shape/hairstyle pairing conventions, and makeup
theory. See `shared/stylist.js` for the exact system prompt.

## Tech stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** the analysis prompt/logic lives in `shared/stylist.js` and is
  used by two interchangeable servers so your API key never reaches the
  browser either way:
  - `server/index.js` — a small Express server, for local dev (`npm run dev`)
    and for any host that runs a persistent Node process (Render, Railway, a
    VPS, etc. — start it with `npm start`).
  - `netlify/functions/analyze.mts` — a Netlify Function at the same
    `/api/analyze` path, for Netlify deploys (see below).
- **Model:** Claude (vision) via `@anthropic-ai/sdk`

## Running it locally

```bash
npm install
cp .env.example .env
# then edit .env and add your ANTHROPIC_API_KEY
npm run dev
```

This runs the Vite dev server (`http://localhost:5180`) and the Express API
(`http://localhost:8787`) together; Vite proxies `/api/*` to the Express
server.

### Environment variables (`.env`)

| Variable            | Default          | Notes                                  |
| -------------------- | ---------------- | --------------------------------------- |
| `ANTHROPIC_API_KEY`  | —                 | Required. Get one at console.anthropic.com |
| `ANTHROPIC_MODEL`    | `claude-sonnet-5` | Any current vision-capable Claude model |
| `API_PORT`           | `8787`            | Port for the Express API server         |

## Production build (self-hosted / Express)

```bash
npm run build   # type-checks then builds the frontend to dist/
npm start        # serves dist/ and the API from one Express process
```

## Deploying to Netlify

This repo is set up to deploy directly — `netlify.toml` points the build at
`npm run build` / `dist`, and `netlify/functions/analyze.mts` serves the exact
same `/api/analyze` path as a Netlify Function (no redirect rules needed —
the function's in-code `config.path` handles that).

1. Connect the repo in Netlify (or push to a repo already connected — it'll
   auto-deploy on every push to `main`).
2. In the Netlify UI: **Site settings → Environment variables**, add
   `ANTHROPIC_API_KEY` (and optionally `ANTHROPIC_MODEL`) with your own key.
   Do this in Netlify's dashboard directly — never commit a real key to the
   repo or paste it into chat with an assistant.
3. Trigger a deploy (or just push — it happens automatically once the repo is
   connected). No redeploy is required after only changing an environment
   variable; Netlify Functions read it at invoke time.

If you see a 404 on `/api/analyze` after deploying, it almost always means
the deploy predates `netlify/functions/analyze.mts` being added, or the
Netlify site's functions directory setting doesn't match `netlify.toml` — redeploy
after confirming both are present.

## Project structure

```
shared/stylist.js          The system prompt + request/response logic, shared by both servers below
server/index.js            Express API for local dev and self-hosting — POST /api/analyze
netlify/functions/analyze.mts   Netlify Function serving the same /api/analyze path when deployed there
netlify.toml                Netlify build + functions config
src/App.tsx                 Wizard state machine (occasion → photos → details → review → results)
src/components/             Step components (occasion picker, upload, details, review, loading, error)
src/components/results/     Results dashboard (style profile, palette, silhouette, scores, beauty, dos/donts)
src/lib/image.ts             Client-side photo downscaling to base64
src/lib/api.ts               Fetch wrapper for /api/analyze
src/data/occasions.ts        Occasion catalog and form option lists
old-prototype/               An earlier, deliberately minimal single-file validation prototype, kept for reference
```

## Privacy

Photos are downscaled in the browser and sent directly to the Claude API via
your own server — this app does not store them anywhere.
