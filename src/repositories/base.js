import { getApiBaseUrl } from "../config/api.js";

export async function request(path, { headers, body, ...options } = {}) {
  const url = new URL(path, `${getApiBaseUrl()}/`).toString();
  const init = {
    headers: {
      "Content-Type": body ? "application/json" : undefined,
      ...headers,
    },
    ...options,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, init);

  if (!response.ok) {
    const text = await response.text();
    const message = text || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
