import { useEffect, useMemo, useState } from "react";

import "./App.css";

const DEFAULT_API_URL = "http://localhost:8000";

function resolveApiBaseUrl() {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ??
    import.meta.env.REACT_APP_API_BASE_URL ??
    DEFAULT_API_URL;

  return baseUrl.replace(/\/$/, "");
}

export default function App() {
  const apiBaseUrl = useMemo(resolveApiBaseUrl, []);
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
          const message = err instanceof Error ? err.message : "Unknown error";
          setError(message);
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
    <main className="app">
      <h1>Welcome to SpaceBattle</h1>
      <p>Prepare for launch and enjoy your stay.</p>

      <section className="database-tables">
        <h2>Database Tables</h2>
        {loading && <p>Loading tables…</p>}
        {!loading && error && <p className="error">Unable to load tables: {error}</p>}
        {!loading && !error && tables.length === 0 && <p>No tables found.</p>}
        {!loading && !error && tables.length > 0 && (
          <ul>
            {tables.map((tableName) => (
              <li key={tableName}>{tableName}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
