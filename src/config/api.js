const DEFAULT_API_URL = "http://localhost:8000";

const CANDIDATE_ENV_KEYS = [
  "VITE_API_BASE_URL",
  "REACT_APP_API_BASE_URL",
];

export function getApiBaseUrl() {
  const raw = CANDIDATE_ENV_KEYS.map((key) => import.meta.env[key]).find(Boolean);
  const base = raw ?? DEFAULT_API_URL;
  return base.endsWith("/") ? base.slice(0, -1) : base;
}
