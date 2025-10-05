export function adaptUser(payload = {}) {
  return {
    id: Number(payload.id ?? payload.user_id ?? 0) || 0,
    email: String(payload.email ?? "").toLowerCase(),
    displayName: payload.displayName ?? payload.display_name ?? payload.name ?? "",
    createdAt: payload.createdAt ?? payload.created_at ?? null,
    updatedAt: payload.updatedAt ?? payload.updated_at ?? null,
  };
}
