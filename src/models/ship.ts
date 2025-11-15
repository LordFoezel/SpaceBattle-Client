export interface Ship {
  id: number;
  name: string;
  dimension: number;
  icon_tag: string;
}

export interface ShipCreate {
  name: string;
  dimension: number;
  icon_tag: string;
}

export interface ShipUpdate {
  name?: string | null;
  dimension?: number | null;
  icon_tag?: string | null;
}

export function adaptShip(raw: any): Ship {
  return {
    id: raw.id,
    name: raw.name,
    dimension: raw.dimension,
    icon_tag: raw.iconTag ?? raw.icon_tag,
  };
}
