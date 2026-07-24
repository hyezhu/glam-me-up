import type { Occasion, StyleAnalysis, StyleContext, UploadedPhoto } from "../types";

export async function analyzeStyle(
  occasion: Occasion,
  context: StyleContext,
  photos: UploadedPhoto[]
): Promise<StyleAnalysis> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      occasion,
      context,
      photos: photos.map((p) => ({ mediaType: p.mediaType, data: p.base64 })),
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong while styling your look.");
  }
  return data as StyleAnalysis;
}
