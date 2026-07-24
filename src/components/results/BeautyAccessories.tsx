import type { AccessorySuggestion, HairstyleSuggestion, MakeupSuggestion } from "../../types";

export default function BeautyAccessories({
  hairstyle,
  makeup,
  accessories,
}: {
  hairstyle: HairstyleSuggestion[];
  makeup: MakeupSuggestion;
  accessories: AccessorySuggestion;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      <div className="card">
        <p className="eyebrow mb-3">Hairstyle</p>
        <ul className="space-y-3">
          {hairstyle.map((h, i) => (
            <li key={i}>
              <p className="font-display font-semibold text-plum-700">{h.name}</p>
              <p className="text-sm text-plum-400">{h.why}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <p className="eyebrow mb-3">Makeup</p>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-[11px] uppercase text-plum-400">Eyes</dt>
            <dd className="text-plum-600">{makeup.eyes}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase text-plum-400">Lips</dt>
            <dd className="text-plum-600">{makeup.lips}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase text-plum-400">Cheeks</dt>
            <dd className="text-plum-600">{makeup.cheeks}</dd>
          </div>
        </dl>
        <p className="mt-3 border-t border-blush-100 pt-3 text-sm text-plum-500">{makeup.overall}</p>
      </div>

      <div className="card">
        <p className="eyebrow mb-3">Accessories</p>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-[11px] uppercase text-plum-400">Metal tone</dt>
            <dd className="text-plum-600 capitalize">{accessories.jewelryMetal}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase text-plum-400">Jewelry</dt>
            <dd className="text-plum-600">{accessories.jewelry}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase text-plum-400">Bag</dt>
            <dd className="text-plum-600">{accessories.bag}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase text-plum-400">Shoes</dt>
            <dd className="text-plum-600">{accessories.shoes}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
