import React, { useRef } from "react";
import type { PlacedEntity } from "./types";
import { applyShipDragPreview, cleanupShipDragPreview } from "./dragPreview";

interface DropItemProps {
    index: number;
    occupant: PlacedEntity | null;
    partIndex: number;
    isHighlighted: boolean;
    highlightValid: boolean;
    onDrop: (index: number, event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (index: number, event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (index: number) => void;
    onDragStartFromCell?: (entity: PlacedEntity, partIndex: number, event: React.DragEvent<HTMLDivElement>) => void;
    onDoubleClickFromCell?: (entity: PlacedEntity) => void;
    onDragEndFromCell?: () => void;
}

const DropItem: React.FC<DropItemProps> = (props) => {
    const {
        index,
        occupant,
        partIndex,
        isHighlighted,
        highlightValid,
        onDrop,
        onDragOver,
        onDragLeave,
        onDragStartFromCell,
        onDoubleClickFromCell,
        onDragEndFromCell,
    } = props;

    const previewRef = useRef<HTMLElement | null>(null);
    const occupied = Boolean(occupant);
    const canDrag = occupied && !occupant?.disabled;

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        onDragOver(index, event);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        onDrop(index, event);
    };

    const handleDragLeave = () => {
        onDragLeave(index);
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        if (!canDrag || !occupant) {
            event.preventDefault();
            return;
        }
        previewRef.current = applyShipDragPreview(event, occupant, partIndex, true);
        onDragStartFromCell?.(occupant, partIndex, event);
    };

    const handleDragEnd = () => {
        cleanupShipDragPreview(previewRef.current);
        previewRef.current = null;
        onDragEndFromCell?.();
    };

    const highlightColor = isHighlighted
        ? highlightValid
            ? "rgba(16,185,129,0.9)"
            : "rgba(239,68,68,0.9)"
        : "rgba(148,163,184,0.35)";

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            style={{
                width: "40px",
                height: "40px",
                borderRadius: "6px",
                border: `2px solid ${highlightColor}`,
                backgroundColor: "rgba(15,23,42,0.65)",
                position: "relative",
                overflow: "visible",
                boxShadow: isHighlighted
                    ? `0 0 10px ${highlightColor}`
                    : "0 0 0 1px rgba(15,23,42,0.4) inset",
                transition: "box-shadow 120ms ease, transform 120ms ease",
            }}
        >
            {occupied && (
                <div
                    draggable={canDrag}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDoubleClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        if (occupant) {
                            onDoubleClickFromCell?.(occupant);
                        }
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        userSelect: "none",
                        cursor: canDrag ? "grab" : "not-allowed",
                        opacity: 0,
                        zIndex: 4,
                    }}
                >
                    {partIndex === 0 ? occupant?.name : null}
                </div>
            )}
        </div>
    );
};

export { DropItem };
