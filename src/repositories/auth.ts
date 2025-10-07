import { request } from "./base.ts";
import { AuthResponse, LoginPayload, RegisterPayload } from "../models/auth.ts";

const path = '/auth';

export async function login(payload: LoginPayload): Promise<AuthResponse | null> {
  return request<AuthResponse>(`${path}/login`, { method: "POST", body: payload as unknown as string });
}

export async function register(payload: RegisterPayload): Promise<AuthResponse | null> {
  return request<AuthResponse>(`${path}/register`, { method: "POST", body: payload as unknown as string });
}

export async function requestPasswordResetEmail(payload: { email: string }): Promise<void> {
  await request<void>(`${path}/forgot-password-email`, { method: "POST", body: payload as unknown as string });
}

export async function requestVerificationEmail(payload: { email: string }): Promise<void> {
  await request<void>(`${path}/verification-email`, { method: "POST", body: payload as unknown as string });
}

export async function resetPassword(payload: { email: string; password: string; token?: string }): Promise<void> {
  await request<void>(`${path}/reset-password`, { method: "POST", body: payload as unknown as string });
}
