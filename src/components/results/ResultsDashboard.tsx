import type { Occasion, StyleAnalysis, UploadedPhoto } from "../../types";
import StyleProfileCard from "./StyleProfileCard";
import PaletteSwatches from "./PaletteSwatches";
import SilhouetteGuidance from "./SilhouetteGuidance";
import OutfitScoreCard from "./OutfitScoreCard";
import BeautyAccessories from "./BeautyAccessories";
import DosDonts from "./DosDonts";

interface Props {
  occasion: Occasion;
  analysis: StyleAnalysis;
  photos: UploadedPhoto[];
  onStartOver: () => void;
}

export default function ResultsDashboard({ occasion, analysis, photos, onStartOver }: Props) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24">
      <div className="mb-10 text-center">
        <p className="eyebrow mb-2">
          {occasion.emoji} {occasion.label}
        </p>
        <h2 className="text-3xl font-semibold text-plum-700">Your Styling Notes</h2>
        <p className="mx-auto mt-4 max-w-xl text-plum-500">{analysis.summary}</p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <StyleProfileCard profile={analysis.styleProfile} />
          <PaletteSwatches palette={analysis.recommendedPalette} />
        </div>

        <SilhouetteGuidance guidance={analysis.silhouetteGuidance} avoid={analysis.avoid} />

        <BeautyAccessories
          hairstyle={analysis.hairstyle}
          makeup={analysis.makeup}
          accessories={analysis.accessories}
        />

        {analysis.outfitScores.length > 0 ? (
          <div>
            <p className="eyebrow mb-3 px-1">Outfit Scores</p>
            <div className="space-y-5">
              {analysis.outfitScores.map((score) => (
                <OutfitScoreCard key={score.photoIndex} score={score} photo={photos[score.photoIndex]} />
              ))}
            </div>
          </div>
        ) : (
          <div className="card text-center text-sm text-plum-400">
            No outfit photos to score this time — upload a flatlay or mirror shot of what
            you're considering next time for a full score breakdown.
          </div>
        )}

        <DosDonts dos={analysis.dos} donts={analysis.donts} />
      </div>

      <div className="mt-12 flex justify-center">
        <button type="button" className="btn-secondary" onClick={onStartOver}>
          Style another look
        </button>
      </div>
    </section>
  );
}
