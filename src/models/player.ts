export interface Player {
  id: number;
  userId: number;
  match_id: number;
  state: string;
}

export interface PlayerCreate {
  userId: number;
  match_id: number;
  state?: string;
}

export interface PlayerUpdate {
  userId?: number | null;
  match_id?: number | null;
  state?: string | null;
}

export function adaptPlayer(raw: any): Player {
  return {
    id: raw.id,
    userId: raw.userId,
    match_id: raw.match_id,
    state: raw.state,
  };
}

