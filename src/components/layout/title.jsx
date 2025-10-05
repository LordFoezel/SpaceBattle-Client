export default function Title({ title, subtitle }) {
  return (
    <header className="space-y-3 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-400/80">SpaceBattle</p>
      <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">{title}</h1>
      {subtitle ? (
        <p className="text-sm text-slate-400 sm:text-base">{subtitle}</p>
      ) : null}
    </header>
  );
}
