import React, { useEffect, useMemo, useState } from "react";
import { DragDropField } from "./DragDropField";
import { DragItem } from "./DragItem";
import type { DragData, DragEntity, DropResponse, PlacedEntity } from "./types";

interface BaseDragDropProps {
    sizeX?: number;
    sizeY?: number;
    entities?: Array<PlacedEntity | (DragEntity & { startIndex?: number | null })>;
    onChange?: (e: DropResponse) => DropResponse | void;
    onDrag?: (e: DropResponse) => DropResponse | void;
    onHold?: (e: DropResponse) => DropResponse | void;
    onDrop?: (e: DropResponse) => DropResponse | void;
}

const normalizeEntities = (
    entities: Array<PlacedEntity | (DragEntity & { startIndex?: number | null })> | undefined,
): PlacedEntity[] => {
    if (!entities || entities.length === 0) {
        return [];
    }

    return entities.map((entity, index) => ({
        ...entity,
        startIndex: entity.startIndex ?? null,
        id: entity.id ?? index,
    }));
};

const BaseDragDrop: React.FC<BaseDragDropProps> = (props) => {
    const {
        sizeX = 10,
        sizeY = 10,
        entities: entitiesProp,
        onChange,
        onDrag,
        onHold,
        onDrop,
    } = props;

    const [entities, setEntities] = useState<PlacedEntity[]>(() => normalizeEntities(entitiesProp));
    const [activeDrag, setActiveDrag] = useState<{ entity: PlacedEntity; data: DragData } | null>(null);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [hoverValid, setHoverValid] = useState<boolean>(false);

    useEffect(() => {
        setEntities(normalizeEntities(entitiesProp));
    }, [entitiesProp]);

    const entityMap = useMemo(() => {
        const map = new Map<number, PlacedEntity>();
        for (const entity of entities) {
            map.set(entity.id, entity);
        }
        return map;
    }, [entities]);

    const emit = (cb: BaseDragDropProps["onChange"], payload: DropResponse) => {
        if (typeof cb === "function") {
            cb(payload);
        }
    };

    const computeCells = (entity: PlacedEntity, startIndex: number | null): number[] | null => {
        if (startIndex == null || startIndex < 0) return null;
        const baseX = startIndex % sizeX;
        const baseY = Math.floor(startIndex / sizeX);
        const cells: number[] = [];

        for (let offset = 0; offset < entity.length; offset += 1) {
            const x = entity.direction === "horizontal" ? baseX + offset : baseX;
            const y = entity.direction === "vertical" ? baseY + offset : baseY;
            if (x < 0 || y < 0 || x >= sizeX || y >= sizeY) {
                return null;
            }
            cells.push(y * sizeX + x);
        }

        return cells;
    };

    const canPlaceAt = (entityId: number, startIndex: number | null): boolean => {
        if (startIndex == null || startIndex < 0) return false;
        const entity = entityMap.get(entityId);
        if (!entity) return false;
        const cells = computeCells(entity, startIndex);
        if (!cells) return false;

        const occupied = new Set<number>();
        for (const other of entities) {
            if (other.id === entityId || other.startIndex == null) continue;
            const otherCells = computeCells(other, other.startIndex);
            if (!otherCells) continue;
            for (const cell of otherCells) {
                occupied.add(cell);
            }
        }

        for (const cell of cells) {
            if (occupied.has(cell)) return false;
        }

        return true;
    };

    const withResponse = (fromIndex: number | null, toIndex: number | null, entity: PlacedEntity | null): DropResponse => ({
        indexFrom: fromIndex,
        indexTo: toIndex,
        item: entity,
    });

    const findEntity = (entityId: number): PlacedEntity | null => {
        return entityMap.get(entityId) ?? null;
    };

    const startDrag = (entity: PlacedEntity, data: DragData) => {
        setActiveDrag({ entity, data });
        setHoverIndex(null);
        setHoverValid(false);
        emit(onDrag, withResponse(data.fromIndex, data.fromIndex, entity));
    };

    const endDrag = () => {
        setActiveDrag(null);
        setHoverIndex(null);
        setHoverValid(false);
    };

    const handlePaletteDragStart =
        (entity: PlacedEntity) => (data: DragData, event: React.DragEvent<HTMLDivElement>) => {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.dropEffect = "move";
            startDrag(entity, data);
        };

    const handleCellDragStart = (entity: PlacedEntity, partIndex: number, event: React.DragEvent<HTMLDivElement>) => {
        const payload: DragData = {
            entityId: entity.id,
            fromIndex: entity.startIndex,
            grabOffset: partIndex,
        };
        event.dataTransfer.setData("application/json", JSON.stringify(payload));
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.dropEffect = "move";
        startDrag(entity, payload);
    };

    const handleHover = (index: number) => {
        if (!activeDrag) return;
        const proposedStart = index - activeDrag.data.grabOffset;
        const isValid = canPlaceAt(activeDrag.entity.id, proposedStart);
        setHoverIndex(index);
        setHoverValid(isValid);

        const response = withResponse(
            activeDrag.data.fromIndex,
            isValid ? proposedStart : null,
            findEntity(activeDrag.entity.id),
        );
        emit(onHold, response);
    };

    const handleHoverLeave = () => {
        setHoverIndex(null);
        setHoverValid(false);
    };

    const handleDrop = (index: number) => {
        if (!activeDrag) return;
        const { entity, data } = activeDrag;
        const proposedStart = index - data.grabOffset;
        const valid = canPlaceAt(entity.id, proposedStart);

        if (valid) {
            const updatedEntity: PlacedEntity = { ...entity, startIndex: proposedStart };
            setEntities((prev) => prev.map((item) => (item.id === entity.id ? updatedEntity : item)));
            const response: DropResponse = {
                indexFrom: data.fromIndex,
                indexTo: proposedStart,
                item: updatedEntity,
            };
            emit(onChange, response);
            emit(onDrop, response);
        } else {
            emit(onDrop, withResponse(data.fromIndex, data.fromIndex, findEntity(entity.id)));
        }

        endDrag();
    };

    const handlePaletteDrop = () => {
        if (!activeDrag) return;
        const { entity, data } = activeDrag;

        if (data.fromIndex !== null) {
            const updatedEntity: PlacedEntity = { ...entity, startIndex: null };
            setEntities((prev) => prev.map((item) => (item.id === entity.id ? updatedEntity : item)));
            const response: DropResponse = {
                indexFrom: data.fromIndex,
                indexTo: null,
                item: updatedEntity,
            };
            emit(onChange, response);
            emit(onDrop, response);
        } else {
            emit(onDrop, withResponse(data.fromIndex, null, findEntity(entity.id)));
        }

        endDrag();
    };

    const paletteItems = entities.filter((entity) => entity.startIndex == null);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "240px auto",
                gap: "16px",
                width: "100%",
            }}
        >
            <div
                onDragOver={(event) => {
                    if (!activeDrag) return;
                    event.preventDefault();
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    handlePaletteDrop();
                }}
                style={{
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px dashed rgba(148,163,184,0.4)",
                    backgroundColor: "rgba(15,23,42,0.4)",
                    minHeight: "280px",
                }}
            >
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#94a3b8", marginBottom: "12px" }}>
                    {globalThis.t?.("fleet.availableShips") ?? "Available Ships"}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {paletteItems.length === 0 ? (
                        <span style={{ fontSize: "12px", color: "#cbd5f5" }}>
                            {globalThis.t?.("fleet.allShipsPlaced") ?? "All ships placed on the field"}
                        </span>
                    ) : (
                        paletteItems.map((entity) => (
                            <DragItem
                                key={entity.id}
                                entity={entity}
                                onDragStart={(data, event) => handlePaletteDragStart(entity)(data, event)}
                                onDragEnd={endDrag}
                            />
                        ))
                    )}
                </div>
            </div>

            <DragDropField
                sizeX={sizeX}
                sizeY={sizeY}
                entities={entities}
                hoverIndex={hoverIndex}
                hoverValid={hoverValid}
                onDrop={(index, event) => {
                    event.preventDefault();
                    handleDrop(index);
                }}
                onDragOver={(index, event) => {
                    handleHover(index);
                    event.dataTransfer.dropEffect = "move";
                }}
                onDragLeave={(_index) => {
                    handleHoverLeave();
                }}
                onCellDragStart={handleCellDragStart}
                onCellDragEnd={endDrag}
            />
        </div>
    );
};

export { BaseDragDrop };
export type { DragEntity, DropResponse, PlacedEntity } from "./types";
