import Background from "./background.jsx";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <Background />
      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-12 sm:px-10">
        {children}
      </div>
    </div>
  );
}
