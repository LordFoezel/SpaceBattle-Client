import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FieldProps, FieldRenderableItem } from "./Field.types";
import {
  DEFAULT_FIELD_SIZE,
  loadFieldShips,
  loadFieldShots,
  loadFieldSize,
  type FieldSize,
} from "./FieldData";
import { CELL_GAP, CELL_SIZE } from "../base/dragDrop/constants";

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
  FieldItemComponent,
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
      const [ships, shots] = await Promise.all([
        loadFieldShips(playerId, matchId),
        loadFieldShots(playerId, matchId),
      ]);
      if (!active) return;
      setShipItems(ships);
      setShotItems(shots);
    })();
    return () => {
      active = false;
    };
  }, [playerId, matchId]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || fieldSize.columns <= 0) return;

    const updateSize = () => {
      const totalWidth = node.clientWidth;
      if (!totalWidth) return;
      const usableWidth = Math.max(totalWidth - 24, 0);
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

  const allItems = useMemo(() => [...shipItems, ...shotItems], [shipItems, shotItems]);

  const coverageMap = useMemo(() => {
    const map = new Map<number, FieldRenderableItem[]>();
    for (const item of allItems) {
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
  }, [allItems, fieldSize.columns, fieldSize.rows]);

  const sortedItems = useMemo(() => {
    return [...allItems].sort((a, b) => {
      const score = (value: FieldRenderableItem) => (value.type === "shot" ? 1 : 0);
      return score(a) - score(b);
    });
  }, [allItems]);

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
                cursor: disableInteraction ? "default" : "pointer",
                transition: "background 120ms ease",
              }}
              disabled={disableInteraction}
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
          {sortedItems.map((item) => {
            const hidden =
              (item.type === "ship" && !showShips) ||
              (item.type === "shot" && !showShots);
            const selectable = !hidden && item.selectable && !disableInteraction;
            return (
              <FieldItemComponent
                key={item.id}
                {...item}
                selectable={selectable}
                columns={fieldSize.columns}
                cellSize={cellSize}
                cellGap={CELL_GAP}
                hidden={hidden}
                onSelect={selectable ? () => handleItemSelect(item) : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type { FieldProps, FieldRenderableItem } from "./Field.types";

