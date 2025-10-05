import { useEffect, useMemo, useState } from "react";
import Title from "../components/layout/title.jsx";
import { panelClass } from "../styles/theme.js";
import { getApiBaseUrl } from "../config/api.js";

export default function DashboardPage() {
  const apiBaseUrl = useMemo(getApiBaseUrl, []);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTables() {
      try {
        setLoading(true);
        const response = await fetch(`${apiBaseUrl}/database/tables`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        if (!cancelled) {
          setTables(Array.isArray(payload?.tables) ? payload.tables : []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setTables([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTables();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  return (
    <section className="flex flex-1 flex-col gap-10">
      <Title
        title="SpaceBattle Uebersicht"
        subtitle="Ueberblick ueber deine Datenbanken und Ressourcen."
      />

      <div className={`${panelClass} space-y-4`}>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-slate-100">Database Tables</h2>
          <p className="text-sm text-slate-400">
            {`API Endpoint: ${apiBaseUrl}/database/tables`}
          </p>
        </div>

        {loading && <p className="text-sm text-slate-400">Tabellen werden geladen...</p>}
        {!loading && error && (
          <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            {`Fehler beim Laden: ${error}`}
          </p>
        )}
        {!loading && !error && tables.length === 0 && (
          <p className="text-sm text-slate-400">Keine Tabellen gefunden.</p>
        )}
        {!loading && !error && tables.length > 0 && (
          <ul className="grid gap-2 text-sm text-slate-300">
            {tables.map((tableName) => (
              <li
                key={tableName}
                className="rounded-lg border border-slate-800/70 bg-slate-900/70 px-3 py-2 font-mono"
              >
                {tableName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
