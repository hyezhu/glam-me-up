import type { WizardStep } from "../types";

const STEPS: { id: WizardStep; label: string }[] = [
  { id: "occasion", label: "Occasion" },
  { id: "photos", label: "Photos" },
  { id: "details", label: "Details" },
  { id: "review", label: "Review" },
];

export default function ProgressSteps({ current }: { current: WizardStep }) {
  const activeIndex = STEPS.findIndex((s) => s.id === current);
  if (activeIndex === -1) return null;

  return (
    <ol className="mx-auto mb-10 flex max-w-md items-center justify-between px-6">
      {STEPS.map((step, i) => {
        const isDone = i < activeIndex;
        const isActive = i === activeIndex;
        return (
          <li key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-rose-500 text-cream"
                    : isDone
                    ? "bg-rose-200 text-rose-600"
                    : "bg-blush-100 text-plum-400"
                }`}
              >
                {isDone ? "✓" : i + 1}
              </div>
              <span
                className={`text-[11px] font-medium uppercase tracking-wide ${
                  isActive ? "text-rose-500" : "text-plum-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mx-2 h-px flex-1 ${isDone ? "bg-rose-300" : "bg-blush-200"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
