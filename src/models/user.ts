
export enum UserRole {
  ADMIN = "admin",
  PLAYER = "player",
}

export interface User {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  blocked: boolean;
  role: UserRole;
  created_at: Date;
}

export interface UserCreate {
  name: string;
  email: string;
  password_hash: string;
  role?: UserRole;
}

export interface UserUpdate {
  name?: string | null;
  email: string;
  password_hash?: string;
  verified?: boolean | null;
  blocked?: boolean | null;
  role?: UserRole | null;
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
  };
}