import { SEASONS, VENUES, TIMES_OF_DAY } from "../data/occasions";
import type { StyleContext } from "../types";

interface Props {
  context: StyleContext;
  onChange: (context: StyleContext) => void;
  onNext: () => void;
  onBack: () => void;
}

const FORMALITY_LABELS = ["Casual", "Smart Casual", "Polished", "Formal", "Ultra Formal"];

export default function DetailsStep({ context, onChange, onNext, onBack }: Props) {
  function set<K extends keyof StyleContext>(key: K, value: StyleContext[K]) {
    onChange({ ...context, [key]: value });
  }

  return (
    <section className="mx-auto max-w-2xl px-6 pb-24">
      <div className="mb-8 text-center">
        <p className="eyebrow mb-2">Step 3</p>
        <h2 className="text-3xl font-semibold text-plum-700">A few finishing details</h2>
        <p className="mx-auto mt-3 max-w-lg text-plum-400">
          Optional, but the more context you give us, the sharper the styling.
        </p>
      </div>

      <div className="card space-y-7">
        <div>
          <label className="mb-2 block text-sm font-semibold text-plum-600">
            Formality: <span className="text-rose-500">{FORMALITY_LABELS[context.formality - 1]}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={context.formality}
            onChange={(e) => set("formality", Number(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-plum-600">Season</label>
            <select
              className="w-full rounded-lg border border-blush-200 bg-white px-3 py-2 text-sm"
              value={context.season}
              onChange={(e) => set("season", e.target.value)}
            >
              {SEASONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-plum-600">Venue</label>
            <select
              className="w-full rounded-lg border border-blush-200 bg-white px-3 py-2 text-sm"
              value={context.venue}
              onChange={(e) => set("venue", e.target.value)}
            >
              {VENUES.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-plum-600">Time</label>
            <select
              className="w-full rounded-lg border border-blush-200 bg-white px-3 py-2 text-sm"
              value={context.timeOfDay}
              onChange={(e) => set("timeOfDay", e.target.value)}
            >
              {TIMES_OF_DAY.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-plum-600">Colors you'd rather avoid</label>
          <input
            type="text"
            placeholder="e.g. orange, neon green"
            value={context.colorsToAvoid}
            onChange={(e) => set("colorsToAvoid", e.target.value)}
            className="w-full rounded-lg border border-blush-200 bg-white px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-plum-600">Anything else we should know</label>
          <textarea
            placeholder="Venue details, weather, how you want to come across, pieces you already own..."
            value={context.notes}
            onChange={(e) => set("notes", e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-blush-200 bg-white px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" onClick={onNext}>
          Continue
        </button>
      </div>
    </section>
  );
}
