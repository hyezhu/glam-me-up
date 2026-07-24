const MESSAGES = [
  "Reading your coloring and undertone...",
  "Matching silhouettes to your shape...",
  "Consulting our seasonal palette guides...",
  "Scoring your outfit...",
  "Pairing hair, makeup, and accessories...",
];

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto flex max-w-md flex-col items-center px-6 py-32 text-center">
      <div className="relative mb-8 h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-rose-200 border-t-rose-500" />
        <div className="absolute inset-3 flex items-center justify-center text-xl">✨</div>
      </div>
      <p className="font-display text-xl font-semibold text-plum-700">Styling your look</p>
      <p className="mt-3 min-h-[1.5em] text-sm text-plum-400 transition-opacity">{MESSAGES[index]}</p>
    </section>
  );
}
