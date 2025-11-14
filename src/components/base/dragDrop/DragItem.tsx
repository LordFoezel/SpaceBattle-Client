import React, { useMemo, useRef } from "react";
import type { DragData, PlacedEntity } from "./types";
import { applyShipDragPreview, cleanupShipDragPreview } from "./dragPreview";
import { CELL_GAP, CELL_SIZE, SHIP_TEXTURE } from "./constants";
import { getShipImage } from "./shipImages";

interface DragItemProps {
    entity: PlacedEntity;
    onDragStart: (data: DragData, event: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: () => void;
    className?: string;
    onDoubleClick?: (entity: PlacedEntity) => void;
}

const DragItem: React.FC<DragItemProps> = (props) => {
    const { entity, onDragStart, onDragEnd, className, onDoubleClick } = props;
    const draggable = !entity.disabled;
    const previewRef = useRef<HTMLElement | null>(null);
    const ShipIllustration = useMemo(() => getShipImage(entity.name), [entity.name]);

    const payload: DragData = useMemo(
        () => ({
            entityId: entity.id,
            fromIndex: entity.startIndex,
            grabOffset: 0,
        }),
        [entity.id, entity.startIndex],
    );

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        if (!draggable) {
            event.preventDefault();
            return;
        }

        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.setData("application/json", JSON.stringify(payload));
        previewRef.current = applyShipDragPreview(event, entity, 0);
        onDragStart(payload, event);
    };

    const handleDragEnd = () => {
        cleanupShipDragPreview(previewRef.current);
        previewRef.current = null;
        onDragEnd?.();
    };

    const segmentStyle: React.CSSProperties = {
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
        borderRadius: "8px",
        backgroundImage: `url(${SHIP_TEXTURE})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        boxShadow: "inset 0 0 12px rgba(15,23,42,0.4)",
    };

    const segments = useMemo(
        () =>
            Array.from({ length: entity.length }).map((_, index) => (
                <span key={index} style={segmentStyle} />
            )),
        [entity.length],
    );

    const trackStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: entity.direction === "vertical" ? "column" : "row",
        gap: `${CELL_GAP}px`,
        alignItems: "center",
        justifyContent: "center",
    };

    const shipPixelLength = entity.length * CELL_SIZE;
    const width = entity.direction === "horizontal" ? shipPixelLength : CELL_SIZE;
    const height = entity.direction === "vertical" ? shipPixelLength : CELL_SIZE;

    return (
        <div
            draggable={draggable}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDoubleClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onDoubleClick?.(entity);
            }}
            className={className}
            style={{
                cursor: draggable ? "grab" : "not-allowed",
                opacity: draggable ? 1 : 0.4,
                userSelect: "none",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid rgba(99,102,241,0.35)",
                background: "rgba(30,41,59,0.6)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                width,
                minWidth: width,
            }}
        >
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#e2e8f0" }}>{entity.name}</span>
            <div style={{ ...trackStyle, width, height }}>
                {ShipIllustration ? (
                    entity.direction === "vertical" ? (
                        <div
                            style={{
                                width: `${CELL_SIZE}px`,
                                height: `${shipPixelLength}px`,
                                position: "relative",
                            }}
                        >
                            <ShipIllustration
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: `${shipPixelLength}px`,
                                    height: `${CELL_SIZE}px`,
                                    transformOrigin: "top left",
                                    transform: `translateX(${CELL_SIZE}px) rotate(90deg)`,
                                }}
                            />
                        </div>
                    ) : (
                        <ShipIllustration
                            style={{
                                width: `${shipPixelLength}px`,
                                height: `${CELL_SIZE}px`,
                            }}
                        />
                    )
                ) : (
                    segments
                )}
            </div>
        </div>
    );
};

export { DragItem };
