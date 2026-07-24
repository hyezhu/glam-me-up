# Glam Me Up

A single-page prototype for occasion-first styling. Pick the moment, add a few photos, get honest styling notes back.

This is a **validation prototype**, not a product. It exists to answer one question before anyone spends real money: do people actually come back for a second occasion?

## The thesis being tested

Most wardrobe apps are closet-first — they need you to catalogue 30+ garments before they do anything useful, and that's where users drop off. This one is occasion-first and asks for almost nothing: no account, no cataloguing, one tap plus a couple of photos.

## Running it

Open `index.html` in a browser. That's the whole setup.

To call the model you need an Anthropic API key. Two options:

**Quick and dirty (testing on your own machine)**
The page will prompt for a key if the request fails. It's held in memory for that tab only and never saved. Fine for you, not fine for real users — anyone can read it.

**Proper (sharing the link with testers)**
Deploy to Netlify and let the included serverless function hold the key:

1. Push this repo to GitHub, connect it to Netlify
2. Set `ANTHROPIC_API_KEY` in Site settings → Environment variables
3. In `index.html`, change the fetch URL from `https://api.anthropic.com/v1/messages` to `/.netlify/functions/style` and delete the header block that sets `x-api-key`

Netlify's free tier covers this comfortably at prototype scale.

## Cost per use

Each styling request sends 1–5 downscaled images plus a short prompt and gets back ~500 tokens. Expect somewhere in the range of a few US cents per request. A hundred testers running three sessions each will cost single-digit dollars, not hundreds — but check current API pricing rather than trusting this estimate.

## What to actually measure

The prototype deliberately has no analytics. Add whatever you like (Plausible and Umami are both lightweight and privacy-friendly), but only three numbers matter at this stage:

1. **Completion rate** — of people who pick an occasion, how many get to a result? If this is low, onboarding friction is still too high and the whole thesis is wrong.
2. **Repeat rate** — how many come back for a *second, different* occasion within four weeks? This is the one that determines whether this is a business or a novelty.
3. **Which occasions win** — if one occasion dominates, that's your actual wedge, and you should build the real app around it rather than all six.

Pair the numbers with about ten real conversations. At this sample size, what people tell you is worth more than what the dashboard says.

## Files

```
index.html                    the entire app
netlify/functions/style.js    optional proxy so the key stays server-side
```

No build step, no dependencies, no framework.

## Notes

Photos are downscaled in the browser to max 900px before being sent, and are not stored anywhere by this page. If you put this in front of real testers, tell them that plainly and add a short privacy note — people are sending pictures of themselves.
