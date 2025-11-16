import type { ComponentType } from "react";

export type FieldDirection = "horizontal" | "vertical";
export type FieldItemType = "ship" | "shot" | "mine" | string;

export interface FieldItemDefinition {
  id: string | number;
  type: FieldItemType;
  startPosition: number;
  dimension?: number;
  direction?: FieldDirection;
  selectable?: boolean;
  visible?: boolean;
  iconTag?: string | null;
  opacity?: number;
  metadata?: Record<string, unknown>;
}

export interface FieldRenderableItem extends FieldItemDefinition {
  direction: FieldDirection;
  dimension: number;
}

export interface FieldItemRenderProps extends FieldRenderableItem {
  columns: number;
  cellSize: number;
  cellGap: number;
  hidden?: boolean;
  onSelect?: () => void;
}

export interface FieldClickPayload {
  position: number;
  items: FieldItemDefinition[];
}

export interface FieldProps {
  dimensionX: number;
  dimensionY: number;
  interactable?: boolean;
  items: FieldItemDefinition[];
  FieldItemComponent?: ComponentType<FieldItemRenderProps>;
  onClick?: (payload: FieldClickPayload) => void;
}

