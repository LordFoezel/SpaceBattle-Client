import { getApiBaseUrl } from "../config/api";
import type { QueryInterface } from "../models/queryInterface";

function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }
  return { ...(headers as Record<string, string>) };
}

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem("spacebattle.access_token");
  } catch {
    return null;
  }
}

function hasAuthorizationHeader(headers: Record<string, string>): boolean {
  return Object.keys(headers).some((key) => key.toLowerCase() === "authorization");
}

function isFormData(v: unknown): v is FormData {
  return typeof FormData !== "undefined" && v instanceof FormData;
}
function isBodyInit(v: unknown): v is BodyInit {
  return typeof Blob !== "undefined" && v instanceof Blob
    || typeof URLSearchParams !== "undefined" && v instanceof URLSearchParams
    || typeof ArrayBuffer !== "undefined" && v instanceof ArrayBuffer;
}

async function safeParseJson(res: Response): Promise<any | null> {
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    try { return await res.json(); } catch { /* ignore */ }
  }
  return null;
}

function serializeQueryValue(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(serializeQueryValue).join(",");
  if (value !== null && typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function appendParam(params: URLSearchParams, key: string, value: unknown) {
  if (Array.isArray(value)) {
    for (const v of value) if (v != null) params.append(key, serializeQueryValue(v));
  } else if (value != null) {
    params.append(key, serializeQueryValue(value));
  }
}

export function buildQueryString(query: QueryInterface = {}): string {
  const params = new URLSearchParams();
  const { limit, offset, orderBy, order_by, where, ...rest } = query;

  if (limit != null)  params.set("limit", String(limit));
  if (offset != null) params.set("offset", String(offset));
  const ob = order_by ?? orderBy;
  if (ob) params.set("order_by", String(ob));

  if (where && typeof where === "object" && !Array.isArray(where)) {
    for (const [k, v] of Object.entries(where)) appendParam(params, k, v);
  }
  for (const [k, v] of Object.entries(rest)) appendParam(params, k, v);

  const s = params.toString();
  return s ? `?${s}` : "";
}

export function withQuery(path: string, query?: QueryInterface): string {
  return `${path}${buildQueryString(query ?? {})}`;
}

function joinPath(base: string, seg: string | number): string {
  return `${String(base).replace(/\/$/, "")}/${encodeURIComponent(String(seg))}`;
}

export async function request<T = any>(
  path: string,
  options: RequestInit & { body?: any } = {},
): Promise<T | null> {
  const base = getApiBaseUrl().replace(/\/$/, "");
  const rel = String(path).replace(/^\//, "");
  const url = new URL(rel, `${base}/`).toString();

  const { method = "GET", headers, body, ...rest } = options;

  const headerMap = normalizeHeaders(headers);
  const initHeaders: Record<string, string> = { Accept: "application/json", ...headerMap };

  const token = getStoredToken();
  if (token && !hasAuthorizationHeader(initHeaders)) {
    initHeaders.Authorization = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method,
    headers: initHeaders,
    ...rest,
  };

  if (body !== undefined) {
    if (typeof body === "string" || isFormData(body) || isBodyInit(body)) {
      init.body = body as BodyInit;
    } else {
      init.body = JSON.stringify(body);
      (init.headers as Record<string, string>)["Content-Type"] = "application/json";
    }
  }

  const res = await fetch(url, init);

  if (res.status === 204) return null;

  const data = await safeParseJson(res);
  if (!res.ok) {
    const fallback = await res.text().catch(() => `HTTP ${res.status}`);
    const msg = (data && (data.message || data.detail || data.error)) || fallback || `HTTP ${res.status}`;
    const err = new Error(msg) as Error & { status?: number; payload?: any };
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return (data as T);
}

// CRUD
export async function fetchAll<T = any>(path: string, opts: { query?: QueryInterface } = {}): Promise<T[]> {
  const data = await request<T[]>(withQuery(path, opts.query));
  return Array.isArray(data) ? data : [];
}

export async function fetchOne<T = any>(path: string, opts: { query?: QueryInterface } = {}): Promise<T | null> {
  const q = { limit: 1, offset: 0, ...(opts.query ?? {}) };
  const list = await fetchAll<T>(path, { query: q });
  return list[0] ?? null;
}

export async function fetchById<T = any>(path: string, id: number | string): Promise<T | null> {
  return request<T>(joinPath(path, id));
}

export async function createOne<TIn = any, TOut = any>(path: string, payload: TIn): Promise<TOut> {
  return request<TOut>(path, { method: "POST", body: payload as string }) as Promise<TOut>;
}

export async function updateOne<TIn = any, TOut = any>(path: string, id: number | string, payload: TIn): Promise<TOut> {
  return request<TOut>(joinPath(path, id), { method: "PATCH", body: payload as string }) as Promise<TOut>;
}

export async function deleteOne(path: string, id: number | string): Promise<void> {
  await request(joinPath(path, id), { method: "DELETE" });
}
