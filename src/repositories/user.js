import { request } from "./base.js";
import { adaptUser } from "../models/user.js";

export async function fetchUsers() {
  const data = await request("/users");
  return Array.isArray(data) ? data.map(adaptUser) : [];
}

export async function fetchUserById(id) {
  if (typeof id !== "number") {
    throw new Error("fetchUserById expects a numeric id");
  }
  const user = await request(`/users/${id}`);
  return user ? adaptUser(user) : null;
}

export async function createUser(payload) {
  const user = await request("/users", { method: "POST", body: payload });
  return adaptUser(user);
}

export async function updateUser(id, payload) {
  const user = await request(`/users/${id}`, { method: "PATCH", body: payload });
  return adaptUser(user);
}

export async function deleteUser(id) {
  await request(`/users/${id}`, { method: "DELETE" });
}
