export default function Header() {
  return (
    <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-2xl font-semibold tracking-tight text-rose-500">
          Glam Me Up
        </span>
      </div>
      <span className="hidden text-xs font-medium uppercase tracking-[0.25em] text-plum-400 sm:block">
        Occasion Styling Studio
      </span>
    </header>
  );
}
