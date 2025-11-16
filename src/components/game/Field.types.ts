import type { ComponentType } from "react";
import type { ShipDirection, Fleet } from "../../models/fleet";
import type { Shot } from "../../models/shot";
import type { FieldItemType } from "./FieldItem";

export interface FieldRenderableItem {
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

export interface FieldItemRenderProps extends FieldRenderableItem {
  columns: number;
  cellSize: number;
  cellGap: number;
  hidden?: boolean;
  onSelect?: () => void;
}

export interface FieldProps {
  playerId: number;
  matchId: number;
  showShots?: boolean;
  showShips?: boolean;
  disableInteraction?: boolean;
  FieldItemComponent: ComponentType<FieldItemRenderProps>;
  onClick?: (payload: { position: number; items: FieldRenderableItem[] }) => void;
}

