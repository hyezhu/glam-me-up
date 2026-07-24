import { useRef, useState } from "react";
import type { UploadedPhoto } from "../types";
import { downscaleImage } from "../lib/image";

const MAX_PHOTOS = 5;
const MIN_PHOTOS = 3;

interface Props {
  photos: UploadedPhoto[];
  onChange: (photos: UploadedPhoto[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PhotoUploadStep({ photos, onChange, onNext, onBack }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    setError(null);
    const files = Array.from(fileList).slice(0, MAX_PHOTOS - photos.length);
    try {
      const next = await Promise.all(files.filter((f) => f.type.startsWith("image/")).map(downscaleImage));
      onChange([...photos, ...next]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not process one of those photos.");
    }
  }

  function removePhoto(id: string) {
    onChange(photos.filter((p) => p.id !== id));
  }

  const canContinue = photos.length >= MIN_PHOTOS;

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24">
      <div className="mb-8 text-center">
        <p className="eyebrow mb-2">Step 2</p>
        <h2 className="text-3xl font-semibold text-plum-700">Add 3 to 5 photos</h2>
        <p className="mx-auto mt-3 max-w-lg text-plum-400">
          Include at least one clear photo of you (face and body) so we can read your
          coloring and proportions, plus any outfits or pieces you're deciding between.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-soft">
            <img src={photo.dataUrl} alt="Uploaded" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removePhoto(photo.id)}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-plum-700/80 text-xs text-cream opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove photo"
            >
              ✕
            </button>
          </div>
        ))}
        {photos.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-rose-200 text-rose-400 transition-colors hover:border-rose-400 hover:bg-rose-50"
          >
            <span className="text-2xl leading-none">+</span>
            <span className="text-[11px] font-medium uppercase tracking-wide">Add photo</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error && <p className="mt-4 text-sm text-rose-500">{error}</p>}

      <p className="mt-6 text-center text-sm text-plum-400">
        {photos.length}/{MAX_PHOTOS} added
        {photos.length < MIN_PHOTOS && ` — add ${MIN_PHOTOS - photos.length} more to continue`}
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-primary" disabled={!canContinue} onClick={onNext}>
          Continue
        </button>
      </div>
    </section>
  );
}
