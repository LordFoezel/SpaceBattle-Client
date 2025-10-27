export enum ShipDirection {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export interface Fleet {
  id: number;
  player_id: number;
  match_id: number;
  ship_id: number;
  position_x: number;
  position_y: number;
  direction: ShipDirection;
}

export interface FleetCreate {
  player_id: number;
  match_id: number;
  ship_id: number;
  position_x: number;
  position_y: number;
  direction: ShipDirection;
}

export interface FleetUpdate {
  player_id?: number | null;
  match_id?: number | null;
  ship_id?: number | null;
  position_x?: number | null;
  position_y?: number | null;
  direction?: ShipDirection | null;
}

export function adaptFleet(raw: any): Fleet {
  return {
    id: raw.id,
    player_id: raw.player_id,
    match_id: raw.match_id,
    ship_id: raw.ship_id,
    position_x: raw.position_x,
    position_y: raw.position_y,
    direction: raw.direction as ShipDirection,
  };
}
