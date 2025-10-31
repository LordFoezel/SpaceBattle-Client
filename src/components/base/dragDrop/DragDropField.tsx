import React, { useMemo } from "react";
import { DropItem } from "./DropItem";
import type { PlacedEntity } from "./types";

interface DragDropFieldProps {
    sizeX: number;
    sizeY: number;
    entities: PlacedEntity[];
    hoverIndex: number | null;
    hoverValid: boolean;
    onDrop: (index: number, event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (index: number, event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (index: number) => void;
    onCellDragStart: (entity: PlacedEntity, partIndex: number, event: React.DragEvent<HTMLDivElement>) => void;
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
        hoverIndex,
        hoverValid,
        onDrop,
        onDragOver,
        onDragLeave,
        onCellDragStart,
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
            let valid = true;

            for (let offset = 0; offset < entity.length; offset += 1) {
                const x = entity.direction === "horizontal" ? baseX + offset : baseX;
                const y = entity.direction === "vertical" ? baseY + offset : baseY;
                if (x < 0 || y < 0 || x >= sizeX || y >= sizeY) {
                    valid = false;
                    break;
                }
                placement.push(y * sizeX + x);
            }

            if (!valid) {
                continue;
            }

            for (let offset = 0; offset < placement.length; offset += 1) {
                const index = placement[offset];
                next[index] = { entity, partIndex: offset };
            }
        }

        return next;
    }, [entities, sizeX, sizeY]);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${sizeX}, 40px)`,
                gridTemplateRows: `repeat(${sizeY}, 40px)`,
                gap: "4px",
                padding: "8px",
                backgroundColor: "rgba(15,23,42,0.6)",
                borderRadius: "12px",
                border: "1px solid rgba(148,163,184,0.25)",
                width: "max-content",
                overflow: "hidden",
            }}
        >
            {cells.map((cell, index) => (
                <DropItem
                    key={index}
                    index={index}
                    occupant={cell?.entity ?? null}
                    partIndex={cell?.partIndex ?? 0}
                    isHover={hoverIndex === index}
                    isValidTarget={hoverIndex === index ? hoverValid : false}
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
                    onDragEndFromCell={onCellDragEnd}
                />
            ))}
        </div>
    );
};

export { DragDropField };
