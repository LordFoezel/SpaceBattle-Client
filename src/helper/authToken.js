const TOKEN_STORAGE_KEY = "spacebattle.access_token";

function ensureStringToken(token) {
  if (!token || typeof token !== "string") {
    throw new Error("Missing auth token");
  }
  return token;
}

function decodeBase64Url(segment) {
  const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4;
  const padded = padding ? normalized.padEnd(normalized.length + (4 - padding), "=") : normalized;

  if (typeof globalThis.atob === "function") {
    return globalThis.atob(padded);
  }

  if (typeof globalThis.Buffer === "function") {
    return globalThis.Buffer.from(padded, "base64").toString("utf-8");
  }

  throw new Error("No base64 decoder available");
}

function extractPayload(token) {
  const safeToken = ensureStringToken(token);
  const parts = safeToken.split(".");
  if (parts.length < 2) {
    throw new Error("Invalid auth token");
  }

  const decoded = decodeBase64Url(parts[1]);
  return JSON.parse(decoded);
}

export class AuthTokenHelper {
  static getStoredToken() {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  static decode(token = this.getStoredToken()) {
    return extractPayload(token);
  }

  static getUserIdentity(token = this.getStoredToken()) {
    const payload = this.decode(token);

    const rawId = payload?.sub;
    const id = typeof rawId === "number" ? rawId : Number(rawId);
    const role = payload?.role;

    if (!Number.isFinite(id) || !role) {
      throw new Error("Invalid auth token payload");
    }

    return { id, role };
  }
}