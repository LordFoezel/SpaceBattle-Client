import React, { useRef } from "react";
import type { PlacedEntity } from "./types";
import { applyShipDragPreview, cleanupShipDragPreview } from "./dragPreview";

interface DropItemProps {
    index: number;
    occupant: PlacedEntity | null;
    partIndex: number;
    isHover: boolean;
    isValidTarget: boolean;
    onDrop: (index: number, event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (index: number, event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (index: number) => void;
    onDragStartFromCell?: (entity: PlacedEntity, partIndex: number, event: React.DragEvent<HTMLDivElement>) => void;
    onDragEndFromCell?: () => void;
}

const DropItem: React.FC<DropItemProps> = (props) => {
    const {
        index,
        occupant,
        partIndex,
        isHover,
        isValidTarget,
        onDrop,
        onDragOver,
        onDragLeave,
        onDragStartFromCell,
        onDragEndFromCell,
    } = props;

    const occupied = Boolean(occupant);
    const canDrag = occupied && !occupant?.disabled;
    const previewRef = useRef<HTMLElement | null>(null);

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
        previewRef.current = applyShipDragPreview(event, occupant, partIndex);
        onDragStartFromCell?.(occupant, partIndex, event);
    };

    const handleDragEnd = () => {
        cleanupShipDragPreview(previewRef.current);
        previewRef.current = null;
        onDragEndFromCell?.();
    };

    const hoverStyle = isHover ? (isValidTarget ? "rgba(34,197,94,0.4)" : "rgba(248,113,113,0.4)") : "transparent";

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            style={{
                width: "40px",
                height: "40px",
                border: "1px solid rgba(148,163,184,0.6)",
                backgroundColor: occupied ? "rgba(99,102,241,0.6)" : hoverStyle,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 120ms ease",
                boxShadow: isHover ? `0 0 0 2px ${hoverStyle}` : "none",
            }}
        >
            {occupied && (
                <div
                    draggable={canDrag}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: partIndex === 0 ? "11px" : 0,
                        fontWeight: 600,
                        color: "white",
                        cursor: canDrag ? "grab" : "not-allowed",
                        userSelect: "none",
                        backgroundColor: partIndex === 0 ? "rgba(79,70,229,0.8)" : "transparent",
                    }}
                >
                    {partIndex === 0 ? occupant?.name : null}
                </div>
            )}
        </div>
    );
};

export { DropItem };
