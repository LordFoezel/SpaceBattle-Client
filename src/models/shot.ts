export interface Shot {
  id: number;
  player_id: number;
  match_id: number;
  position: number;
  result?: string | null;
  created_at?: Date | null;
}

export interface ShotCreate {
  player_id: number;
  match_id: number;
  position: number;
  result?: string | null;
}

export interface ShotUpdate {
  player_id?: number | null;
  match_id?: number | null;
  position?: number | null;
  result?: string | null;
}

export function adaptShot(raw: any): Shot {
  return {
    id: raw.id,
    player_id: raw.player_id,
    match_id: raw.match_id,
    position: raw.position,
    result: raw.result ?? null,
    created_at: raw.created_at ? new Date(raw.created_at) : null,
  };
}

