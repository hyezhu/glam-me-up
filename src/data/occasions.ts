import type { Occasion } from "../types";

export const OCCASIONS: Occasion[] = [
  { id: "wedding-guest", label: "Wedding Guest", tagline: "Polished, never upstaging the bride", emoji: "💍", defaultFormality: 4 },
  { id: "gala", label: "Black-Tie Gala", tagline: "Full glamour, floor-length energy", emoji: "🥂", defaultFormality: 5 },
  { id: "cocktail", label: "Cocktail Party", tagline: "Chic, a little daring", emoji: "🍸", defaultFormality: 4 },
  { id: "date-night", label: "Date Night", tagline: "Confident and romantic", emoji: "🌹", defaultFormality: 3 },
  { id: "interview", label: "Job Interview", tagline: "Sharp, trustworthy, memorable", emoji: "💼", defaultFormality: 3 },
  { id: "holiday", label: "Holiday Party", tagline: "Festive without trying too hard", emoji: "✨", defaultFormality: 3 },
  { id: "brunch", label: "Brunch / Day Event", tagline: "Effortless daytime elegance", emoji: "🥐", defaultFormality: 2 },
  { id: "red-carpet", label: "Red Carpet Moment", tagline: "Statement-making, camera-ready", emoji: "📸", defaultFormality: 5 },
];

export const SEASONS = ["Spring", "Summer", "Fall", "Winter"];
export const VENUES = ["Indoor", "Outdoor", "Both"];
export const TIMES_OF_DAY = ["Daytime", "Evening"];
