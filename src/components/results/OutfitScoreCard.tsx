import type { OutfitScore, UploadedPhoto } from "../../types";

function scoreColor(score: number) {
  if (score >= 85) return "text-rose-500";
  if (score >= 70) return "text-gold-500";
  return "text-plum-400";
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-plum-400">
        <span className="capitalize">{label.replace(/([A-Z])/g, " $1")}</span>
        <span className="font-semibold text-plum-600">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-blush-100">
        <div
          className="h-full rounded-full bg-rose-gradient transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function OutfitScoreCard({ score, photo }: { score: OutfitScore; photo?: UploadedPhoto }) {
  return (
    <div className="card">
      <div className="flex gap-4">
        {photo && (
          <img src={photo.dataUrl} alt="Outfit" className="h-28 w-20 flex-shrink-0 rounded-lg object-cover shadow-soft" />
        )}
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <p className="eyebrow">Outfit Score</p>
            <p className={`font-display text-3xl font-bold ${scoreColor(score.overall)}`}>
              {score.overall}
              <span className="text-base font-normal text-plum-300">/100</span>
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <ScoreBar label="colorHarmony" value={score.breakdown.colorHarmony} />
            <ScoreBar label="fitSilhouette" value={score.breakdown.fitSilhouette} />
            <ScoreBar label="occasionFit" value={score.breakdown.occasionFit} />
            <ScoreBar label="accessorizing" value={score.breakdown.accessorizing} />
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 border-t border-blush-100 pt-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-plum-500">What works</p>
          <ul className="space-y-1.5 text-sm text-plum-500">
            {score.whatWorks.map((item, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-rose-400">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-plum-500">Improve this</p>
          <ul className="space-y-1.5 text-sm text-plum-500">
            {score.improvements.map((item, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-gold-500">→</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
