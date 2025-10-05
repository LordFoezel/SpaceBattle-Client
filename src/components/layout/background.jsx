export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at top, rgba(59,130,246,0.3), transparent 55%)" }} />
      <div className="absolute inset-0 opacity-[0.15] bg-[url('data:image/svg+xml,%3Csvg width=\'288\' height=\'288\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'none\' stroke=\'rgba(148,163,184,0.18)\' stroke-width=\'0.75\' d=\'M0 50h100M50 0v100\' /%3E%3C/svg%3E')]" />
    </div>
  );
}
