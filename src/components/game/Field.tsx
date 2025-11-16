import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FieldItem, type FieldItemType } from "./FieldItem";
import type { ShipDirection } from "../../models/fleet";
import type { Shot } from "../../models/shot";
import type { Ship } from "../../models/ship";
import type { Fleet } from "../../models/fleet";
import { fetchById as fetchMatchById } from "../../repositories/matches.js";
import { fetchAll as fetchFleet } from "../../repositories/fleet.js";
import { fetchAll as fetchShips } from "../../repositories/ships.js";
import { fetchAll as fetchShots } from "../../repositories/shots.js";
import { CELL_GAP, CELL_SIZE } from "../base/dragDrop/constants";

interface FieldProps {
  playerId: number;
  matchId: number;
  showShots?: boolean;
  showShips?: boolean;
  disableInteraction?: boolean;
  onClick?: (payload: { position: number; items: FieldRenderableItem[] }) => void;
}

interface FieldRenderableItem {
  id: string | number;
  type: FieldItemType;
  startPosition: number;
  direction: ShipDirection;
  dimension: number;
  opacity?: number;
  selectable?: boolean;
  payload?: Fleet | Shot | null;
  iconTag?: string | null;
}

interface FieldSize {
  columns: number;
  rows: number;
}

const DEFAULT_FIELD_SIZE: FieldSize = { columns: 10, rows: 10 };

function toPositiveIndex(index: number | null | undefined): number {
  if (!Number.isFinite(index ?? NaN)) return 0;
  return Math.max(0, Number(index));
}

async function loadFieldShips(playerId: number, matchId: number): Promise<FieldRenderableItem[]> {
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

async function loadFieldShots(playerId: number, matchId: number): Promise<FieldRenderableItem[]> {
  if (!playerId || !matchId) return [];
  try {
    const shots = await fetchShots({ where: { player_id: playerId, match_id: matchId } });
    return shots
      .filter((shot) => Number.isFinite(shot.position))
      .map<FieldRenderableItem>((shot) => ({
        id: `shot-${shot.id}`,
        type: "shot",
        startPosition: toPositiveIndex(shot.position),
        direction: ShipDirection.HORIZONTAL,
        dimension: 1,
        opacity: 0.95,
        selectable: false,
        payload: shot,
      }));
  } catch (error) {
    // if (process.env.NODE_ENV !== "production") {
    //   console.warn("[Field] Failed to load shots", error);
    // }
    return [];
  }
}

async function loadFieldSize(matchId: number): Promise<FieldSize> {
  if (!matchId) return DEFAULT_FIELD_SIZE;
  try {
    const match = await fetchMatchById(matchId);
    if (!match?.config) return DEFAULT_FIELD_SIZE;
    const columns = Number(match.config.dimension_x) || DEFAULT_FIELD_SIZE.columns;
    const rows = Number(match.config.dimension_y) || DEFAULT_FIELD_SIZE.rows;
    return { columns, rows };
  } catch (error) {
    // if (process.env.NODE_ENV !== "production") {
    //   console.warn("[Field] Failed to load match config", error);
    // }
    return DEFAULT_FIELD_SIZE;
  }
}

function computeCoverage(item: FieldRenderableItem, columns: number, rows: number): number[] {
  const coverage: number[] = [];
  const baseColumn = item.startPosition % columns;
  const baseRow = Math.floor(item.startPosition / columns);
  for (let offset = 0; offset < item.dimension; offset += 1) {
    const column = item.direction === "horizontal" ? baseColumn + offset : baseColumn;
    const row = item.direction === "vertical" ? baseRow + offset : baseRow;
    if (column >= columns || row >= rows) break;
    coverage.push(row * columns + column);
  }
  return coverage;
}

export function Field({
  playerId,
  matchId,
  showShots = true,
  showShips = true,
  disableInteraction = false,
  onClick,
}: FieldProps) {
  const [fieldSize, setFieldSize] = useState<FieldSize>(DEFAULT_FIELD_SIZE);
  const [shipItems, setShipItems] = useState<FieldRenderableItem[]>([]);
  const [shotItems, setShotItems] = useState<FieldRenderableItem[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cellSize, setCellSize] = useState(CELL_SIZE);

  useEffect(() => {
    let active = true;
    (async () => {
      const size = await loadFieldSize(matchId);
      if (!active) return;
      setFieldSize(size);
    })();
    return () => {
      active = false;
    };
  }, [matchId]);

  useEffect(() => {
    let active = true;
    (async () => {
      const [ships] = await Promise.all([
      // const [ships, shots] = await Promise.all([
        showShips ? loadFieldShips(playerId, matchId) : Promise.resolve([]),
        // showShots ? loadFieldShots(playerId, matchId) : Promise.resolve([]),
      ]);
      if (!active) return;
      setShipItems(showShips ? ships : []);
      // setShotItems(showShots ? shots : []);
    })();
    return () => {
      active = false;
    };
  }, [playerId, matchId, showShots, showShips]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || fieldSize.columns <= 0) return;

    const updateSize = () => {
      const totalWidth = node.clientWidth;
      if (!totalWidth) return;
      const usableWidth = Math.max(totalWidth - 24, 0); // subtract inner padding
      const totalGap = (fieldSize.columns - 1) * CELL_GAP;
      const maxCell = (usableWidth - totalGap) / fieldSize.columns;
      const desired = Math.min(CELL_SIZE, maxCell);
      const next = Math.max(20, desired || 0);
      setCellSize((prev) => (Math.abs(prev - next) > 0.5 ? next : prev));
    };

    updateSize();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateSize);
      observer.observe(node);
      return () => observer.disconnect();
    }
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [fieldSize.columns]);

  const renderableItems = useMemo(() => {
    const items: FieldRenderableItem[] = [];
    if (showShips) items.push(...shipItems);
    if (showShots) items.push(...shotItems);
    return items;
  }, [shipItems, shotItems, showShips, showShots]);

  const coverageMap = useMemo(() => {
    const map = new Map<number, FieldRenderableItem[]>();
    for (const item of renderableItems) {
      const coverage = computeCoverage(item, fieldSize.columns, fieldSize.rows);
      for (const cell of coverage) {
        const bucket = map.get(cell);
        if (bucket) {
          bucket.push(item);
        } else {
          map.set(cell, [item]);
        }
      }
    }
    return map;
  }, [renderableItems, fieldSize.columns, fieldSize.rows]);

  const sortedItems = useMemo(() => {
    return [...renderableItems].sort((a, b) => {
      const score = (value: FieldRenderableItem) => (value.type === "shot" ? 1 : 0);
      return score(a) - score(b);
    });
  }, [renderableItems]);

  const totalCells = fieldSize.columns * fieldSize.rows;

  const handleCellClick = useCallback(
    (index: number) => {
      if (!onClick || disableInteraction) return;
      const items = coverageMap.get(index) ?? [];
      onClick({ position: index, items });
    },
    [coverageMap, disableInteraction, onClick],
  );

  const handleItemSelect = useCallback(
    (item: FieldRenderableItem) => {
      if (!onClick || disableInteraction) return;
      const [firstCell] = computeCoverage(item, fieldSize.columns, fieldSize.rows);
      const primary = firstCell ?? item.startPosition;
      const items = coverageMap.get(primary) ?? [];
      onClick({ position: primary, items });
    },
    [coverageMap, disableInteraction, fieldSize.columns, fieldSize.rows, onClick],
  );

  const gridTemplateColumns = `repeat(${fieldSize.columns}, ${cellSize}px)`;
  const gridTemplateRows = `repeat(${fieldSize.rows}, ${cellSize}px)`;
  const fieldWidth = fieldSize.columns * cellSize + (fieldSize.columns - 1) * CELL_GAP;
  const fieldHeight = fieldSize.rows * cellSize + (fieldSize.rows - 1) * CELL_GAP;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: fieldHeight + 24,
        padding: 12,
        backgroundColor: "rgba(15,23,42,0.65)",
        border: "1px solid rgba(148,163,184,0.35)",
        borderRadius: 16,
        margin: "0 auto",
      }}
    >
      <div style={{ position: "relative", width: fieldWidth, height: fieldHeight, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns,
            gridTemplateRows,
            gap: CELL_GAP,
            width: fieldWidth,
            height: fieldHeight,
          }}
        >
          {Array.from({ length: totalCells }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleCellClick(index)}
              style={{
                width: cellSize,
                height: cellSize,
                borderRadius: 6,
                border: "1px solid rgba(148,163,184,0.2)",
                background: coverageMap.has(index) ? "rgba(59,130,246,0.15)" : "rgba(15,23,42,0.45)",
                outline: "none",
                cursor: "pointer",
                transition: "background 120ms ease",
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: fieldWidth,
            height: fieldHeight,
            pointerEvents: "none",
          }}
        >
          {sortedItems.map((item) => (
            <FieldItem
              key={item.id}
              type={item.type}
              startPosition={item.startPosition}
              direction={item.direction}
              dimension={item.dimension}
              opacity={item.opacity}
            selectable={item.selectable && !disableInteraction}
              iconTag={item.iconTag}
              columns={fieldSize.columns}
              cellSize={cellSize}
              cellGap={CELL_GAP}
              onSelect={item.selectable ? () => handleItemSelect(item) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export type { FieldProps, FieldRenderableItem };
export { loadFieldShips, loadFieldShots };
