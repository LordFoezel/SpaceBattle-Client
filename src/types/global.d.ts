import type { t as TFunc } from "../helper/translate";

declare global {
  interface GlobalThis {
    t: typeof TFunc;
    notify: {
      (opts?: { text?: string; state?: "success" | "error" | "warning" | "info" } & Record<string, any>): any;
      success: (text: string, opts?: Record<string, any>) => any;
      error: (text: string, opts?: Record<string, any>) => any;
      warning: (text: string, opts?: Record<string, any>) => any;
      info: (text: string, opts?: Record<string, any>) => any;
    };
  }
}

export {};

