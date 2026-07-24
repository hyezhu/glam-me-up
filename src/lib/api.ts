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

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      res.status === 413
        ? "Your photos are too large together. Try removing one or use fewer/smaller images."
        : `The styling server didn't respond as expected (status ${res.status}). Make sure the API server is running (npm run dev starts both the web and api processes).`
    );
  }

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong while styling your look.");
  }
  return data as StyleAnalysis;
}
