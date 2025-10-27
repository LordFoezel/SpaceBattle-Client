export interface ConfigFleetShip {
  id: number;
  config_fleet_id: number;
  ship_id: number;
  count: number;
}

export interface ConfigFleetShipCreate {
  config_fleet_id: number;
  ship_id: number;
  count: number;
}

export interface ConfigFleetShipUpdate {
  config_fleet_id?: number | null;
  ship_id?: number | null;
  count?: number | null;
}

export function adaptConfigFleetShip(raw: any): ConfigFleetShip {
  return {
    id: raw.id,
    config_fleet_id: raw.config_fleet_id,
    ship_id: raw.ship_id,
    count: raw.count,
  };
}
