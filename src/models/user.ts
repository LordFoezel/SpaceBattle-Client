
export enum UserRole {
  ADMIN = "admin",
  PLAYER = "player",
}

export enum UserLanguage {
  DE = "de",
  EN = "en",
}


export interface User {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  blocked: boolean;
  role: UserRole;
  language: UserLanguage;
  created_at: Date;
  password_hash: string;
}

export interface UserCreate {
  name: string;
  email: string;
  password_hash: string;
  role?: UserRole;
  language?: UserLanguage;
}

export interface UserUpdate {
  name?: string | null;
  email?: string;
  password_hash?: string;
  verified?: boolean | null;
  blocked?: boolean | null;
  role?: UserRole | null;
  language?: UserLanguage | null;
}

export function adaptUser(raw: any): User {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    verified: !!raw.verified,
    blocked: !!raw.blocked,
    role: raw.role as UserRole,
    created_at: new Date(raw.created_at),
    password_hash: raw.password_hash,
    language: raw.language,
  };
}