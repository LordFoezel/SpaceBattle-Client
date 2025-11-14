export enum ShipDirection {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export interface Fleet {
  id: number;
  ident: string;
  player_id: number;
  match_id: number;
  ship_id: number;
  position: number;
  direction: ShipDirection;
}

export interface FleetCreate {
  player_id: number;
  ident: string;
  match_id: number;
  ship_id: number;
  position: number;
  direction: ShipDirection;
}

export interface FleetUpdate {
  player_id?: number | null;
  ident?: string | null;
  match_id?: number | null;
  ship_id?: number | null;
  position?: number | null;
  direction?: ShipDirection | null;
}

export function adaptFleet(raw: any): Fleet {
  return {
    id: raw.id,
    ident: raw.ident,
    player_id: raw.player_id,
    match_id: raw.match_id,
    ship_id: raw.ship_id,
    position: raw.position,
    direction: raw.direction as ShipDirection,
  };
}
