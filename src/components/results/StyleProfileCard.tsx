import type { StyleProfile } from "../../types";

export default function StyleProfileCard({ profile }: { profile: StyleProfile }) {
  const rows: [string, string][] = [
    ["Undertone", profile.undertone],
    ["Seasonal Palette", profile.seasonalPalette],
    ["Body Shape", profile.bodyShape.replace("-", " ")],
    ["Face Shape", profile.faceShape],
  ];

  return (
    <div className="card">
      <p className="eyebrow mb-4">Your Style Profile</p>
      <dl className="grid grid-cols-2 gap-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[11px] uppercase tracking-wide text-plum-400">{label}</dt>
            <dd className="font-display text-base font-semibold capitalize text-plum-700">{value}</dd>
          </div>
        ))}
      </dl>
      {profile.bodyShapeNote && (
        <p className="mt-4 border-t border-blush-100 pt-4 text-sm text-plum-500">{profile.bodyShapeNote}</p>
      )}
    </div>
  );
}
