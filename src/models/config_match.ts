export interface ConfigMatch {
  id: number;
  match_id: number;
  fleet_config_id?: number | null;
  dimension_x: number;
  dimension_y: number;
  player_count: number;
  turn_timeout: number;
  created_at: Date;
}

export interface ConfigMatchCreate {
  match_id: number;
  fleet_config_id?: number | null;
  dimension_x?: number;
  dimension_y?: number;
  player_count?: number;
  turn_timeout?: number;
}

export interface ConfigMatchUpdate {
  match_id?: number | null;
  fleet_config_id?: number | null;
  dimension_x?: number | null;
  dimension_y?: number | null;
  player_count?: number | null;
  turn_timeout?: number | null;
}

export function adaptConfigMatch(raw: any): ConfigMatch {
  return {
    id: raw.id,
    match_id: raw.match_id,
    fleet_config_id: raw.fleet_config_id ?? null,
    dimension_x: raw.dimension_x,
    dimension_y: raw.dimension_y,
    player_count: raw.player_count,
    turn_timeout: raw.turn_timeout,
    created_at: new Date(raw.created_at),
  };
}

