export enum PlayerState {
  PLACE = "place",
  READY = "ready",
  GAME = "game",
  WINN = "winn",
  LOOSE = "loose",
}

export interface Player {
  id: number;
  name: string;
  user_id: number;
  match_id: number;
  state: PlayerState;
}

export interface PlayerCreate {
  name: string;
  user_id: number;
  match_id: number;
  state?: PlayerState;
}

export interface PlayerUpdate {
  name?: string | null;
  user_id?: number | null;
  match_id?: number | null;
  state?: PlayerState | null;
}

export function adaptPlayer(raw: any): Player {
  return {
    id: raw.id,
    name: raw.name,
    user_id: raw.user_id,
    match_id: raw.match_id,
    state: raw.state,
  };
}
