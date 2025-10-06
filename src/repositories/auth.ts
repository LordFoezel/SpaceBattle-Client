import { request } from "./base.ts";
import type { User, UserRole } from "../models/user.js";

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", { method: "POST", body: payload });
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register", { method: "POST", body: payload });
}
