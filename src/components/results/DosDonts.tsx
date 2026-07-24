export default function DosDonts({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="card border-l-4 border-l-rose-400">
        <p className="eyebrow mb-3">Do</p>
        <ul className="space-y-2 text-sm text-plum-500">
          {dos.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
      <div className="card border-l-4 border-l-plum-400">
        <p className="eyebrow mb-3">Avoid</p>
        <ul className="space-y-2 text-sm text-plum-500">
          {donts.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
