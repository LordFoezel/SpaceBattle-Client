export enum MatchState {
  LOBBY = "lobby",
  PLACE = "place",
  GAME = "game",
  DONE = "done",
  ARCHIVED = "archived",
}

import { adaptConfigMatch, type ConfigMatch } from "./config_match.js";

export interface Match {
  id: number;
  name: string;
  description: string;
  state: MatchState;
  password_hash?: string | null;
  created_by: number;
  created_at: Date;
  config?: ConfigMatch | null;
  current_player_count?: number;
}

export interface MatchCreate {
  name: string;
  state?: MatchState;
  password_hash?: string;
  created_by?: number;
  created_at?: Date;
  description?: string;
}

export interface MatchUpdate {
  name?: string | null;
  state?: MatchState | null;
  password_hash?: string | null;
  created_by?: number | null;
  created_at?: Date | null;
  config_match_id?: number | null;
  description?: string | null;
}

export function adaptMatch(raw: any): Match {
  return {
    id: raw.id,
    name: raw.name,
    state: raw.state as MatchState,
    password_hash: raw.password_hash ?? null,
    created_by: raw.created_by,
    created_at: new Date(raw.created_at),
    description: raw.description ?? "",
    config: raw.config ? adaptConfigMatch(raw.config) : null,
    current_player_count: raw.current_player_count ?? 0,
  };
}
