import { getApiBaseUrl } from "../config/api";
import { AuthTokenHelper } from "./authToken.js";

export type RealtimeEvent = {
  type: string;
  matchId?: number;
  data?: Record<string, unknown>;
  [key: string]: any;
};

export interface RealtimeChannelOptions {
  query?: Record<string, string | number | boolean | undefined>;
  autoReconnect?: boolean;
  reconnectDelayMs?: number;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  onMessage?: (event: RealtimeEvent) => void;
}

function buildWebSocketUrl(path: string, query?: Record<string, string | number | boolean | undefined>): string {
  const base = getApiBaseUrl();
  const wsBase = base.replace(/^http/i, (match) => (match.toLowerCase() === "https" ? "wss" : "ws"));
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(normalizedPath, `${wsBase}/`);
  const params = url.searchParams;
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      params.set(key, String(value));
    });
  }
  return url.toString();
}

export class RealtimeChannel {
  private socket: WebSocket | null = null;
  private destroyed = false;
  private readonly options: RealtimeChannelOptions;
  private readonly path: string;

  constructor(path: string, options: RealtimeChannelOptions = {}) {
    this.path = path;
    this.options = options;
  }

  connect(): void {
    const token = AuthTokenHelper.getStoredToken();
    const query = { ...this.options.query, token };
    const wsUrl = buildWebSocketUrl(this.path, query);
    this.socket = new WebSocket(wsUrl);
    this.socket.onopen = () => {
      this.options.onOpen?.();
    };
    this.socket.onerror = (event) => {
      this.options.onError?.(event);
    };
    this.socket.onclose = (event) => {
      this.options.onClose?.(event);
      if (!this.destroyed && this.options.autoReconnect !== false) {
        const delay = this.options.reconnectDelayMs ?? 2000;
        setTimeout(() => this.connect(), delay);
      }
    };
    this.socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        this.options.onMessage?.(payload);
      } catch {
        // ignore malformed payloads
      }
    };
  }

  disconnect(): void {
    this.destroyed = true;
    if (this.socket?.readyState === WebSocket.OPEN || this.socket?.readyState === WebSocket.CONNECTING) {
      this.socket.close();
    }
    this.socket = null;
  }

  send(message: unknown): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
    this.socket.send(JSON.stringify(message));
  }
}

export class MatchRealtimeChannel extends RealtimeChannel {
  constructor(matchId: number, options: RealtimeChannelOptions = {}) {
    super(`/ws/matches/${matchId}`, options);
  }
}
