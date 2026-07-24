import { OCCASIONS } from "../data/occasions";
import type { Occasion } from "../types";

interface Props {
  selected: Occasion | null;
  onSelect: (occasion: Occasion) => void;
  onNext: () => void;
}

export default function OccasionStep({ selected, onSelect, onNext }: Props) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-semibold leading-tight text-plum-700 sm:text-5xl">
          What are you getting <span className="text-rose-500">dressed for?</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-body text-base text-plum-400">
          Pick your occasion, upload 3–5 photos, and we'll put together your colors,
          silhouette, hair, makeup, and accessories — plus an honest score on any
          outfit you're considering.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OCCASIONS.map((occasion) => {
          const isSelected = selected?.id === occasion.id;
          return (
            <button
              key={occasion.id}
              type="button"
              onClick={() => onSelect(occasion)}
              className={`group flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all duration-200 ${
                isSelected
                  ? "border-rose-400 bg-white shadow-card"
                  : "border-blush-200 bg-white/60 hover:border-rose-200 hover:shadow-soft"
              }`}
            >
              <span className="text-3xl">{occasion.emoji}</span>
              <span className="font-display text-lg font-semibold text-plum-700">
                {occasion.label}
              </span>
              <span className="text-sm text-plum-400">{occasion.tagline}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <button type="button" className="btn-primary" disabled={!selected} onClick={onNext}>
          Continue
        </button>
      </div>
    </section>
  );
}
