interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorPanel({ message, onRetry }: Props) {
  return (
    <section className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="mb-2 text-3xl">🪞</p>
      <h2 className="font-display text-2xl font-semibold text-plum-700">
        We couldn't finish styling your look
      </h2>
      <p className="mt-3 text-sm text-plum-400">{message}</p>
      <button type="button" className="btn-primary mt-8" onClick={onRetry}>
        Try again
      </button>
    </section>
  );
}
