import type { Config } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";
import { validateAnalyzeBody, runStylistAnalysis, StylistRequestError } from "../../shared/stylist.js";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = Netlify.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "ANTHROPIC_API_KEY is not set on this Netlify site. Add it in Site settings > Environment variables.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const payload = validateAnalyzeBody(body);
    const anthropic = new Anthropic({ apiKey });
    const model = Netlify.env.get("ANTHROPIC_MODEL") || "claude-sonnet-5";
    const parsed = await runStylistAnalysis(anthropic, model, payload);
    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    if (err instanceof StylistRequestError) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: err.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    const message = err instanceof Error ? err.message : "The stylist model failed to respond. Please try again.";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config: Config = {
  path: "/api/analyze",
};
