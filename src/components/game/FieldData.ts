import { fetchById as fetchMatchById } from "../../repositories/matches.js";
import { fetchAll as fetchFleet } from "../../repositories/fleet.js";
import { fetchAll as fetchShips } from "../../repositories/ships.js";
import { fetchAll as fetchShots } from "../../repositories/shots.js";
import type { Ship } from "../../models/ship";
import type { FieldRenderableItem } from "./Field.types";

export interface FieldSize {
  columns: number;
  rows: number;
}

export const DEFAULT_FIELD_SIZE: FieldSize = { columns: 10, rows: 10 };

function toPositiveIndex(index: number | null | undefined): number {
  if (!Number.isFinite(index ?? NaN)) return 0;
  return Math.max(0, Number(index));
}

export async function loadFieldShips(playerId: number, matchId: number): Promise<FieldRenderableItem[]> {
  if (!playerId || !matchId) return [];
  const [fleets, ships] = await Promise.all([
    fetchFleet({ where: { player_id: playerId, match_id: matchId } }),
    fetchShips({}),
  ]);
  const shipDim = new Map<number, Ship>();
  for (const ship of ships) shipDim.set(ship.id, ship);

  return fleets
    .filter((fleet) => Number.isFinite(fleet.position))
    .map<FieldRenderableItem>((fleet) => ({
      id: `ship-${fleet.id}`,
      type: "ship",
      startPosition: toPositiveIndex(fleet.position),
      direction: fleet.direction,
      dimension: shipDim.get(fleet.ship_id)?.dimension ?? 1,
      opacity: 1,
      selectable: true,
      payload: fleet,
      iconTag: shipDim.get(fleet.ship_id)?.icon_tag ?? null,
    }));
}

export async function loadFieldShots(playerId: number, matchId: number): Promise<FieldRenderableItem[]> {
  if (!playerId || !matchId) return [];
  try {
    const shots = await fetchShots({ where: { player_id: playerId, match_id: matchId } });
    return shots
      .filter((shot) => Number.isFinite(shot.position))
      .map<FieldRenderableItem>((shot) => ({
        id: `shot-${shot.id}`,
        type: "shot",
        startPosition: toPositiveIndex(shot.position),
        direction: "horizontal",
        dimension: 1,
        opacity: 0.95,
        selectable: false,
        payload: shot,
      }));
  } catch (error) {
    return [];
  }
}

export async function loadFieldSize(matchId: number): Promise<FieldSize> {
  if (!matchId) return DEFAULT_FIELD_SIZE;
  try {
    const match = await fetchMatchById(matchId);
    if (!match?.config) return DEFAULT_FIELD_SIZE;
    const columns = Number(match.config.dimension_x) || DEFAULT_FIELD_SIZE.columns;
    const rows = Number(match.config.dimension_y) || DEFAULT_FIELD_SIZE.rows;
    return { columns, rows };
  } catch (error) {
    return DEFAULT_FIELD_SIZE;
  }
}

