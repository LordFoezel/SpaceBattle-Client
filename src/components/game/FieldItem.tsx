import type { CSSProperties, MouseEvent } from "react";
import type { ShipDirection } from "../../models/fleet";
import { getShipImage } from "../base/dragDrop/shipImages";

export type FieldItemType = "ship" | "shot";

interface FieldItemProps {
  opacity?: number;
  selectable?: boolean;
  type: FieldItemType;
  startPosition: number;
  direction: ShipDirection;
  dimension: number;
  columns: number;
  cellSize: number;
  cellGap: number;
  iconTag?: string | null;
  onSelect?: () => void;
}

const shotStyleBase: CSSProperties = {
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

const shipBaseStyle: CSSProperties = {
  position: "absolute",
  pointerEvents: "none",
  zIndex: 2,
};

export function FieldItem({
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
  onSelect,
}: FieldItemProps) {
  const column = startPosition % columns;
  const row = Math.floor(startPosition / columns);
  const left = column * (cellSize + cellGap);
  const top = row * (cellSize + cellGap);

  if (type === "shot") {
    const size = cellSize * 0.6;
    const style: CSSProperties = {
      position: "absolute",
      left: left + cellSize / 2 - size / 2,
      top: top + cellSize / 2 - size / 2,
      width: size,
      height: size,
      opacity,
      ...shotStyleBase,
    };
    return (
      <div style={style}>
        *
      </div>
    );
  }

  const ShipIllustration = iconTag ? getShipImage(iconTag) : null;
  const shipLengthPx = dimension * cellSize;
  const baseStyle: CSSProperties = {
    ...shipBaseStyle,
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

