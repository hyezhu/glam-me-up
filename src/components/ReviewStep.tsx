import type { Occasion, StyleContext, UploadedPhoto } from "../types";

interface Props {
  occasion: Occasion;
  context: StyleContext;
  photos: UploadedPhoto[];
  onSubmit: () => void;
  onBack: () => void;
}

const FORMALITY_LABELS = ["Casual", "Smart Casual", "Polished", "Formal", "Ultra Formal"];

export default function ReviewStep({ occasion, context, photos, onSubmit, onBack }: Props) {
  return (
    <section className="mx-auto max-w-2xl px-6 pb-24">
      <div className="mb-8 text-center">
        <p className="eyebrow mb-2">Step 4</p>
        <h2 className="text-3xl font-semibold text-plum-700">Ready when you are</h2>
        <p className="mx-auto mt-3 max-w-lg text-plum-400">
          Double-check everything, then let our stylist put your look together.
        </p>
      </div>

      <div className="card space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{occasion.emoji}</span>
          <div>
            <p className="font-display text-lg font-semibold text-plum-700">{occasion.label}</p>
            <p className="text-sm text-plum-400">{occasion.tagline}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <ReviewFact label="Formality" value={FORMALITY_LABELS[context.formality - 1]} />
          <ReviewFact label="Season" value={context.season} />
          <ReviewFact label="Venue" value={context.venue} />
          <ReviewFact label="Time" value={context.timeOfDay} />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-plum-600">Photos ({photos.length})</p>
          <div className="grid grid-cols-5 gap-2">
            {photos.map((p) => (
              <img key={p.id} src={p.dataUrl} className="aspect-[3/4] w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>

        {context.notes && (
          <div>
            <p className="mb-1 text-sm font-semibold text-plum-600">Notes</p>
            <p className="text-sm text-plum-400">{context.notes}</p>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" onClick={onSubmit}>
          Style my look ✨
        </button>
      </div>
    </section>
  );
}

function ReviewFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-blush-50 px-3 py-2">
      <p className="text-[11px] uppercase tracking-wide text-plum-400">{label}</p>
      <p className="font-semibold text-plum-700">{value}</p>
    </div>
  );
}
