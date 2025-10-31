import React, { useRef } from "react";
import type { DragData, PlacedEntity } from "./types";
import { applyShipDragPreview, cleanupShipDragPreview } from "./dragPreview";

interface DragItemProps {
    entity: PlacedEntity;
    onDragStart: (data: DragData, event: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: () => void;
    className?: string;
}

const boxSize = 18;

const DragItem: React.FC<DragItemProps> = (props) => {
    const { entity, onDragStart, onDragEnd, className } = props;
    const draggable = !entity.disabled;
    const previewRef = useRef<HTMLElement | null>(null);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        if (!draggable) {
            event.preventDefault();
            return;
        }

        const payload: DragData = {
            entityId: entity.id,
            fromIndex: entity.startIndex,
            grabOffset: 0,
        };

        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("application/json", JSON.stringify(payload));
        previewRef.current = applyShipDragPreview(event, entity, 0);
        onDragStart(payload, event);
    };

    const handleDragEnd = () => {
        cleanupShipDragPreview(previewRef.current);
        previewRef.current = null;
        onDragEnd?.();
    };

    const orientationStyle: React.CSSProperties = {
        display: "inline-flex",
        flexDirection: entity.direction === "vertical" ? "column" : "row",
        gap: "4px",
    };

    return (
        <div
            draggable={draggable}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={className}
            style={{
                cursor: draggable ? "grab" : "not-allowed",
                opacity: draggable ? 1 : 0.4,
                userSelect: "none",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid rgba(99,102,241,0.4)",
                backgroundColor: "rgba(99,102,241,0.08)",
                minWidth: entity.direction === "horizontal" ? entity.length * (boxSize + 4) : boxSize + 8,
            }}
        >
            <span style={{ fontSize: "12px", fontWeight: 600 }}>{entity.name}</span>
            <div style={orientationStyle}>
                {Array.from({ length: entity.length }).map((_, index) => (
                    <span
                        key={index}
                        style={{
                            width: boxSize,
                            height: boxSize,
                            backgroundColor: "rgba(99,102,241,0.9)",
                            borderRadius: "4px",
                            border: "1px solid rgba(79,70,229,0.9)",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export { DragItem };
