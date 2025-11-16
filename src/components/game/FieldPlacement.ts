import type {
  FieldDirection,
  FieldItemDefinition,
  FieldRenderableItem,
} from "./Field.types";

const DEFAULT_DIRECTION: FieldDirection = "horizontal";

function normalizeItem(item: FieldItemDefinition): FieldRenderableItem | null {
  if (!Number.isFinite(item.startPosition)) return null;
  const dimension = Number.isFinite(item.dimension) ? Math.max(1, Math.trunc(Number(item.dimension))) : 1;
  const direction = item.direction ?? DEFAULT_DIRECTION;
  return {
    ...item,
    direction,
    dimension,
  };
}

function withinBounds(index: number, columns: number, rows: number): boolean {
  return index >= 0 && index < columns * rows;
}

function computeCoverageIndexes(
  item: FieldRenderableItem,
  columns: number,
  rows: number,
): number[] | null {
  const coverage: number[] = [];
  const baseIndex = Math.trunc(item.startPosition);
  if (!withinBounds(baseIndex, columns, rows)) return null;
  const baseColumn = baseIndex % columns;
  const baseRow = Math.floor(baseIndex / columns);

  for (let offset = 0; offset < item.dimension; offset += 1) {
    const column = item.direction === "horizontal" ? baseColumn + offset : baseColumn;
    const row = item.direction === "vertical" ? baseRow + offset : baseRow;
    if (column >= columns || row >= rows) return null;
    coverage.push(row * columns + column);
  }
  return coverage;
}

export interface PlacementResult {
  normalizedItems: FieldRenderableItem[];
  coverageMap: Map<number, FieldItemDefinition[]>;
}

export function placeItems(
  items: FieldItemDefinition[],
  columns: number,
  rows: number,
): PlacementResult {
  const normalizedItems: FieldRenderableItem[] = [];
  const coverageMap = new Map<number, FieldItemDefinition[]>();

  for (const definition of items) {
    const normalized = normalizeItem(definition);
    if (!normalized) continue;
    const coverage = computeCoverageIndexes(normalized, columns, rows);
    if (!coverage) continue;

    normalizedItems.push(normalized);
    for (const index of coverage) {
      const bucket = coverageMap.get(index);
      if (bucket) {
        bucket.push(definition);
      } else {
        coverageMap.set(index, [definition]);
      }
    }
  }

  return { normalizedItems, coverageMap };
}

