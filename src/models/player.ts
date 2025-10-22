export interface Player {
  id: number;
  user_id: number;
  match_id: number;
  state: string;
}

export interface PlayerCreate {
  user_id: number;
  match_id: number;
  state?: string;
}

export interface PlayerUpdate {
  user_id?: number | null;
  match_id?: number | null;
  state?: string | null;
}

export function adaptPlayer(raw: any): Player {
  return {
    id: raw.id,
    user_id: raw.user_id,
    match_id: raw.match_id,
    state: raw.state,
  };
}

