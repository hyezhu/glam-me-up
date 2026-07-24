export default function SilhouetteGuidance({ guidance, avoid }: { guidance: string[]; avoid: string[] }) {
  return (
    <div className="card">
      <p className="eyebrow mb-3">Silhouette & Fit</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-plum-500">Seek out</p>
          <ul className="space-y-1.5 text-sm text-plum-500">
            {guidance.map((item, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-rose-400">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-plum-500">Steer away from</p>
          <ul className="space-y-1.5 text-sm text-plum-500">
            {avoid.map((item, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-plum-300">−</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
