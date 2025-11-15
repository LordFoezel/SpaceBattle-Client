import React, { useMemo } from "react";
import { DropItem } from "./DropItem";
import type { PlacedEntity } from "./types";
import { CELL_GAP, CELL_SIZE } from "./constants";
import { getShipImage } from "./shipImages";

interface DragDropFieldProps {
    sizeX: number;
    sizeY: number;
    entities: PlacedEntity[];
    hoverCells: number[];
    hoverValid: boolean;
    onDrop: (index: number, event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (index: number, event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (index: number) => void;
    onCellDragStart: (entity: PlacedEntity, partIndex: number, event: React.DragEvent<HTMLDivElement>) => void;
    onCellDoubleClick: (entity: PlacedEntity) => void;
    onCellDragEnd: () => void;
}

type CellState = {
    entity: PlacedEntity;
    partIndex: number;
};

const DragDropField: React.FC<DragDropFieldProps> = (props) => {
    const {
        sizeX,
        sizeY,
        entities,
        hoverCells,
        hoverValid,
        onDrop,
        onDragOver,
        onDragLeave,
        onCellDragStart,
        onCellDoubleClick,
        onCellDragEnd,
    } = props;

    const cells = useMemo(() => {
        const total = sizeX * sizeY;
        const next: Array<CellState | null> = Array.from({ length: total }, () => null);

        for (const entity of entities) {
            if (entity.startIndex == null) continue;

            const baseX = entity.startIndex % sizeX;
            const baseY = Math.floor(entity.startIndex / sizeX);
            const placement: number[] = [];
            let withinBounds = true;

            for (let offset = 0; offset < entity.length; offset += 1) {
                const x = entity.direction === "horizontal" ? baseX + offset : baseX;
                const y = entity.direction === "vertical" ? baseY + offset : baseY;
                if (x < 0 || y < 0 || x >= sizeX || y >= sizeY) {
                    withinBounds = false;
                    break;
                }
                placement.push(y * sizeX + x);
            }

            if (!withinBounds) continue;

            for (let offset = 0; offset < placement.length; offset += 1) {
                const index = placement[offset];
                next[index] = { entity, partIndex: offset };
            }
        }

        return next;
    }, [entities, sizeX, sizeY]);

    const hoverSet = useMemo(() => new Set(hoverCells), [hoverCells]);

    const fieldWidth = sizeX * CELL_SIZE + (sizeX - 1) * CELL_GAP;
    const fieldHeight = sizeY * CELL_SIZE + (sizeY - 1) * CELL_GAP;

    return (
        <div
            style={{
                position: "relative",
                padding: "12px",
                backgroundColor: "rgba(15,23,42,0.7)",
                borderRadius: "16px",
                border: "1px solid rgba(148,163,184,0.25)",
                width: "max-content",
                overflow: "visible",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${sizeX}, ${CELL_SIZE}px)`,
                    gridTemplateRows: `repeat(${sizeY}, ${CELL_SIZE}px)`,
                    gap: `${CELL_GAP}px`,
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {cells.map((cell, index) => (
                    <DropItem
                        key={index}
                        index={index}
                        occupant={cell?.entity ?? null}
                        partIndex={cell?.partIndex ?? 0}
                        isHighlighted={hoverSet.has(index)}
                        highlightValid={hoverValid}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDragStartFromCell={
                            cell
                                ? (entity, partIndex, event) => {
                                      onCellDragStart(entity, partIndex, event);
                                  }
                                : undefined
                        }
                        onDoubleClickFromCell={
                            cell
                                ? (entity) => {
                                      onCellDoubleClick(entity);
                                  }
                                : undefined
                        }
                        onDragEndFromCell={onCellDragEnd}
                    />
                ))}
            </div>

            <div
                style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    width: `${fieldWidth}px`,
                    height: `${fieldHeight}px`,
                    pointerEvents: "none",
                    zIndex: 5,
                }}
            >
                {entities.map((entity) => {
                    if (entity.startIndex == null) return null;
                    const ShipIllustration = getShipImage(entity.icon_tag);
                    if (!ShipIllustration) return null;
                    const col = entity.startIndex % sizeX;
                    const row = Math.floor(entity.startIndex / sizeX);
                    const left = col * (CELL_SIZE + CELL_GAP);
                    const top = row * (CELL_SIZE + CELL_GAP);
                    const shipLengthPx = entity.length * CELL_SIZE;
                    const baseStyle: React.CSSProperties = {
                        position: "absolute",
                        left: `${left}px`,
                        top: `${top}px`,
                        pointerEvents: "none",
                    };
                    const shouldFlip = typeof entity.id === "number" && entity.id % 2 === 0;

                    const horizontalImage = (
                        <ShipIllustration
                            flipped={shouldFlip}
                            style={{
                                width: `${shipLengthPx}px`,
                                height: `${CELL_SIZE}px`,
                            }}
                        />
                    );

                    if (entity.direction === "vertical") {
                        return (
                            <div
                                key={entity.id}
                                style={{
                                    ...baseStyle,
                                    width: `${CELL_SIZE}px`,
                                    height: `${shipLengthPx}px`,
                                    position: "absolute",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: `${shipLengthPx}px`,
                                        height: `${CELL_SIZE}px`,
                                        transformOrigin: "top left",
                                        transform: `translateX(${CELL_SIZE}px) rotate(90deg)`,
                                    }}
                                >
                                    {horizontalImage}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={entity.id}
                            style={{
                                ...baseStyle,
                                width: `${shipLengthPx}px`,
                                height: `${CELL_SIZE}px`,
                            }}
                        >
                            {horizontalImage}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { DragDropField };
