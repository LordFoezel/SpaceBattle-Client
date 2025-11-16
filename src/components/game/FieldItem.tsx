import type { CSSProperties, MouseEvent } from "react";
import { getShipImage } from "../base/dragDrop/shipImages";
import type { FieldDirection, FieldItemType } from "./Field.types";

interface FieldItemProps {
  opacity?: number;
  selectable?: boolean;
  type: FieldItemType;
  startPosition: number;
  direction: FieldDirection;
  dimension: number;
  columns: number;
  cellSize: number;
  cellGap: number;
  iconTag?: string | null;
  hidden?: boolean;
  onSelect?: () => void;
}

const shotStyle: CSSProperties = {
  borderRadius: "50%",
  background: "rgba(248,113,113,0.85)",
  border: "1px solid rgba(248,113,113,0.95)",
  boxShadow: "0 0 10px rgba(248,113,113,0.65)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
  zIndex: 3,
};

const defaultShipStyle: CSSProperties = {
  position: "absolute",
  pointerEvents: "none",
  zIndex: 2,
};

export function FieldItem(props: FieldItemProps) {
  const {
    opacity = 1,
    selectable = false,
    type,
    startPosition,
    direction,
    dimension,
    columns,
    cellSize,
    cellGap,
    iconTag,
    hidden = false,
    onSelect,
  } = props;

  if (hidden) return null;

  const column = startPosition % columns;
  const row = Math.floor(startPosition / columns);
  const left = column * (cellSize + cellGap);
  const top = row * (cellSize + cellGap);

  if (type === "shot") {
    const size = cellSize * 0.6;
    return (
      <div
        style={{
          position: "absolute",
          left: left + cellSize / 2 - size / 2,
          top: top + cellSize / 2 - size / 2,
          width: size,
          height: size,
          opacity,
          ...shotStyle,
        }}
      >
        *
      </div>
    );
  }

  if (type === "mine") {
    const size = cellSize * 0.5;
    return (
      <div
        style={{
          position: "absolute",
          left: left + cellSize / 2 - size / 2,
          top: top + cellSize / 2 - size / 2,
          width: size,
          height: size,
          borderRadius: "8px",
          background: "rgba(251,191,36,0.8)",
          border: "1px solid rgba(245,158,11,0.9)",
          boxShadow: "0 0 6px rgba(251,191,36,0.8)",
          opacity,
        }}
      />
    );
  }

  const ShipIllustration = iconTag ? getShipImage(iconTag) : null;
  const shipLengthPx = dimension * cellSize;
  const baseStyle: CSSProperties = {
    ...defaultShipStyle,
    left,
    top,
    opacity,
    cursor: selectable ? "pointer" : "default",
    pointerEvents: selectable ? "auto" : "none",
  };

  const illustration = ShipIllustration ? (
    <ShipIllustration
      style={{
        width: `${shipLengthPx}px`,
        height: `${cellSize}px`,
        pointerEvents: "none",
      }}
    />
  ) : (
    <div
      style={{
        width: `${shipLengthPx}px`,
        height: `${cellSize}px`,
        borderRadius: "6px",
        background: "rgba(59,130,246,0.6)",
        border: "1px solid rgba(96,165,250,0.8)",
      }}
    />
  );

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    if (selectable && onSelect) onSelect();
  }

  if (direction === "vertical") {
    return (
      <div
        style={{
          ...baseStyle,
          width: `${cellSize}px`,
          height: `${shipLengthPx}px`,
        }}
        onClick={handleClick}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${shipLengthPx}px`,
            height: `${cellSize}px`,
            transformOrigin: "top left",
            transform: `translateX(${cellSize}px) rotate(90deg)`,
          }}
        >
          {illustration}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        ...baseStyle,
        width: `${shipLengthPx}px`,
        height: `${cellSize}px`,
      }}
      onClick={handleClick}
    >
      {illustration}
    </div>
  );
}

