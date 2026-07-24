import type { PaletteColor } from "../../types";

export default function PaletteSwatches({ palette }: { palette: PaletteColor[] }) {
  return (
    <div className="card">
      <p className="eyebrow mb-4">Your Palette</p>
      <div className="flex flex-wrap gap-4">
        {palette.map((color) => (
          <div key={color.hex} className="flex flex-col items-center gap-2">
            <div
              className="h-14 w-14 rounded-full border border-black/5 shadow-soft"
              style={{ backgroundColor: color.hex }}
            />
            <span className="max-w-[70px] text-center text-xs text-plum-400">{color.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
