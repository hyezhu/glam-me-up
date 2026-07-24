export interface Occasion {
  id: string;
  label: string;
  tagline: string;
  emoji: string;
  defaultFormality: number;
}

export interface StyleContext {
  formality: number;
  season: string;
  venue: string;
  timeOfDay: string;
  colorsToAvoid: string;
  notes: string;
}

export interface UploadedPhoto {
  id: string;
  dataUrl: string;
  mediaType: string;
  base64: string;
}

export interface PaletteColor {
  hex: string;
  name: string;
}

export interface StyleProfile {
  undertone: string;
  seasonalPalette: string;
  bodyShape: string;
  bodyShapeNote: string;
  faceShape: string;
}

export interface HairstyleSuggestion {
  name: string;
  why: string;
}

export interface MakeupSuggestion {
  eyes: string;
  lips: string;
  cheeks: string;
  overall: string;
}

export interface AccessorySuggestion {
  jewelryMetal: string;
  jewelry: string;
  bag: string;
  shoes: string;
  other: string;
}

export interface OutfitScoreBreakdown {
  colorHarmony: number;
  fitSilhouette: number;
  occasionFit: number;
  accessorizing: number;
}

export interface OutfitScore {
  photoIndex: number;
  overall: number;
  breakdown: OutfitScoreBreakdown;
  whatWorks: string[];
  improvements: string[];
}

export interface StyleAnalysis {
  summary: string;
  styleProfile: StyleProfile;
  recommendedPalette: PaletteColor[];
  silhouetteGuidance: string[];
  avoid: string[];
  hairstyle: HairstyleSuggestion[];
  makeup: MakeupSuggestion;
  accessories: AccessorySuggestion;
  outfitScores: OutfitScore[];
  dos: string[];
  donts: string[];
}

export type WizardStep = "occasion" | "photos" | "details" | "review" | "loading" | "results" | "error";
