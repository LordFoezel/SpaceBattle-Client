import { request } from "./base.js";
import {
  adaptSelectOptions,
  type SelectOption,
  type SelectOptionRaw,
} from "../models/selectOption.js";

const basePath = "/select-options";

export async function fetchByTag(tag: string): Promise<SelectOption[]> {
  if (!tag) return [];
  const data = await request<SelectOptionRaw[]>(`${basePath}/${encodeURIComponent(tag)}`);
  return adaptSelectOptions(Array.isArray(data) ? data : []);
}

export async function fetchShips(): Promise<SelectOption[]> {
  return fetchByTag("ship");
}
