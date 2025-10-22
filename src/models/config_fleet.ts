export interface ConfigFleet {
  id: number;
  name: string;
  created_at: Date;
}

export interface ConfigFleetCreate {
  name: string;
}

export interface ConfigFleetUpdate {
  name?: string | null;
}

export function adaptConfigFleet(raw: any): ConfigFleet {
  return {
    id: raw.id,
    name: raw.name,
    created_at: new Date(raw.created_at),
  };
}

