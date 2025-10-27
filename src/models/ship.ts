export interface Ship {
  id: number;
  name: string;
  dimension: number;
}

export interface ShipCreate {
  name: string;
  dimension: number;
}

export interface ShipUpdate {
  name?: string | null;
  dimension?: number | null;
}

export function adaptShip(raw: any): Ship {
  return {
    id: raw.id,
    name: raw.name,
    dimension: raw.dimension,
  };
}
