export enum MatchState {
  LOBBY = "lobby",
  PLACE = "place",
  GAME = "game",
  DONE = "done",
  ARCHIVED = "archived",
}

export interface Match {
  id: number;
  name: string;
  state: MatchState;
  password_hash?: string | null;
  created_by: number;
  created_at: Date;
}

export interface MatchCreate {
  name: string;
  state?: MatchState;
  password_hash?: string;
  created_by?: number;
  created_at?: Date;
}

export interface MatchUpdate {
  name?: string | null;
  state?: MatchState | null;
  password_hash?: string | null;
  created_by?: number | null;
  created_at?: Date | null;
  config_match_id?: number | null;
}

export function adaptMatch(raw: any): Match {
  return {
    id: raw.id,
    name: raw.name,
    state: raw.state as MatchState,
    password_hash: raw.password_hash ?? null,
    created_by: raw.created_by,
    created_at: new Date(raw.created_at),
  };
}

