import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FieldItemDefinition, FieldProps, FieldRenderableItem } from "./Field.types";
import { FieldItem } from "./FieldItem";
import { placeItems } from "./FieldPlacement";
import { CELL_GAP, CELL_SIZE } from "../base/dragDrop/constants";

const TYPE_PRIORITY: Record<string, number> = {
  shot: 2,
  mine: 1,
};

function clampIndex(index: number, max: number): number {
  if (!Number.isFinite(index)) return 0;
  return Math.max(0, Math.min(Math.trunc(index), max));
}

function sortItems(items: FieldRenderableItem[]): FieldRenderableItem[] {
  return [...items].sort((a, b) => {
    const scoreA = TYPE_PRIORITY[a.type] ?? 0;
    const scoreB = TYPE_PRIORITY[b.type] ?? 0;
    return scoreA - scoreB;
  });
}

export function Field({
  dimensionX,
  dimensionY,
  interactable = true,
  items,
  onClick,
}: FieldProps) {
  const columns = Math.max(1, Math.trunc(dimensionX));
  const rows = Math.max(1, Math.trunc(dimensionY));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cellSize, setCellSize] = useState(CELL_SIZE);

  const { normalizedItems, coverageMap } = useMemo(
    () => placeItems(items, columns, rows),
    [items, columns, rows],
  );

  const visibleCoverageMap = useMemo(() => {
    const map = new Map<number, FieldItemDefinition[]>();
    for (const [cell, defs] of coverageMap.entries()) {
      const visibleItems = defs.filter((definition) => {
        const isVisible = definition.visible !== false;
        const hasOpacity = definition.opacity == null || definition.opacity > 0;
        return isVisible && hasOpacity;
      });
      if (visibleItems.length > 0) {
        map.set(cell, visibleItems);
      }
    }
    return map;
  }, [coverageMap]);

  const sortedItems = useMemo(() => sortItems(normalizedItems), [normalizedItems]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateSize = () => {
      const totalWidth = node.clientWidth;
      if (!totalWidth) return;
      const usableWidth = Math.max(totalWidth - 24, 0);
      const totalGap = (columns - 1) * CELL_GAP;
      const maxCell = (usableWidth - totalGap) / columns;
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
  }, [columns]);

  const totalCells = columns * rows;
  const gridTemplateColumns = `repeat(${columns}, ${cellSize}px)`;
  const gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
  const fieldWidth = columns * cellSize + (columns - 1) * CELL_GAP;
  const fieldHeight = rows * cellSize + (rows - 1) * CELL_GAP;

  const emitClick = useCallback(
    (index: number) => {
      if (!onClick || !interactable) return;
      const payloadItems = coverageMap.get(index) ?? [];
      onClick({ position: index, items: payloadItems });
    },
    [coverageMap, interactable, onClick],
  );

  const handleCellClick = useCallback(
    (index: number) => {
      emitClick(index);
    },
    [emitClick],
  );

  const handleItemSelect = useCallback(
    (item: FieldRenderableItem) => {
      const primary = clampIndex(item.startPosition, totalCells - 1);
      emitClick(primary);
    },
    [emitClick, totalCells],
  );

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
                background: visibleCoverageMap.has(index) ? "rgba(59,130,246,0.15)" : "rgba(15,23,42,0.45)",
                outline: "none",
                cursor: interactable ? "pointer" : "default",
                transition: "background 120ms ease",
              }}
              disabled={!interactable}
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
          {sortedItems.map((item, index) => {
            const hidden = item.visible === false;
            const selectable = interactable && (item.selectable ?? true) && !hidden;
            const flipped = index % 2 === 0;
            return (
              <FieldItem
                key={item.id}
                {...item}
                selectable={selectable}
                columns={columns}
                cellSize={cellSize}
                cellGap={CELL_GAP}
                hidden={hidden}
                flipped={flipped}
                onSelect={selectable ? () => handleItemSelect(item) : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type { FieldProps, FieldRenderableItem, FieldItemDefinition } from "./Field.types";
