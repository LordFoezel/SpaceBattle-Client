import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type PropsWithChildren,
} from "react";
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

type DragState = { entity: PlacedEntity; data: DragData } | null;
type Placement = { cells: number[]; withinBounds: boolean } | null;

const SHIP_NAME_TO_ID: Record<string, number> = {
    Satelite: 0,
    Fighter: 1,
    Destroyer: 2,
    Cargo: 3,
    Capital: 4,
};

const normalizeEntities = (
    entities: Array<PlacedEntity | (DragEntity & { startIndex?: number | null })> | undefined,
): PlacedEntity[] => {
    if (!entities || entities.length === 0) {
        return [];
    }

    return entities.map((entity, index) => {
        const providedShipId = entity.shipId;
        const normalizedShipId =
            typeof providedShipId === "number"
                ? providedShipId
                : typeof providedShipId === "string"
                  ? Number(providedShipId)
                  : SHIP_NAME_TO_ID[entity.name];

        return {
            ...entity,
            shipId: Number.isFinite(normalizedShipId) ? normalizedShipId : null,
            startIndex: entity.startIndex ?? null,
            id: entity.id ?? index,
        };
    });
};

const DragDropContext = createContext<{ renderHome: () => React.ReactElement; renderField: () => React.ReactElement } | null>(
    null,
);

const useDragDropContext = () => {
    const ctx = React.useContext(DragDropContext);
    if (!ctx) {
        throw new Error("BaseDragDrop context missing. Wrap your layout with <BaseDragDrop>.");
    }
    return ctx;
};

const BaseDragDrop: React.FC<PropsWithChildren<BaseDragDropProps>> = (props) => {
    const { sizeX = 10, sizeY = 10, entities: entitiesProp, onChange, onDrag, onHold, onDrop, children } = props;

    const [entities, setEntities] = useState<PlacedEntity[]>(() => normalizeEntities(entitiesProp));
    const [activeDrag, setActiveDrag] = useState<DragState>(null);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [hoverCells, setHoverCells] = useState<number[]>([]);
    const [hoverValid, setHoverValid] = useState<boolean>(false);

    const entitiesRef = useRef<PlacedEntity[]>(entities);
    const activeDragRef = useRef<DragState>(activeDrag);
    const hoverIndexRef = useRef<number | null>(hoverIndex);

    useEffect(() => {
        const normalized = normalizeEntities(entitiesProp);
        entitiesRef.current = normalized;
        setEntities(normalized);
    }, [entitiesProp]);

    useEffect(() => {
        entitiesRef.current = entities;
    }, [entities]);

    useEffect(() => {
        activeDragRef.current = activeDrag;
    }, [activeDrag]);

    useEffect(() => {
        hoverIndexRef.current = hoverIndex;
    }, [hoverIndex]);

    const entityMap = useMemo(() => {
        const map = new Map<number, PlacedEntity>();
        for (const entity of entities) {
            map.set(entity.id, entity);
        }
        return map;
    }, [entities]);

    const emit = useCallback((cb: BaseDragDropProps["onChange"], payload: DropResponse) => {
        if (typeof cb === "function") {
            cb(payload);
        }
    }, []);

    const withResponse = (
        fromIndex: number | null,
        toIndex: number | null,
        entity: PlacedEntity | null,
    ): DropResponse => ({
        indexFrom: fromIndex,
        indexTo: toIndex,
        item: entity,
    });

    const computePlacement = useCallback(
        (entity: PlacedEntity, startIndex: number | null): Placement => {
            if (startIndex == null || startIndex < 0) return null;
            const baseX = startIndex % sizeX;
            const baseY = Math.floor(startIndex / sizeX);
            const cells: number[] = [];
            let withinBounds = true;

            for (let offset = 0; offset < entity.length; offset += 1) {
                const x = entity.direction === "horizontal" ? baseX + offset : baseX;
                const y = entity.direction === "vertical" ? baseY + offset : baseY;
                if (x < 0 || y < 0 || x >= sizeX || y >= sizeY) {
                    withinBounds = false;
                } else {
                    cells.push(y * sizeX + x);
                }
            }

            return { cells, withinBounds };
        },
        [sizeX, sizeY],
    );

    const canPlaceAt = useCallback(
        (entityId: number, startIndex: number | null, listOverride?: PlacedEntity[]): boolean => {
            if (startIndex == null || startIndex < 0) return false;
            const collection = listOverride ?? entitiesRef.current;
            const entity = collection.find((item) => item.id === entityId);
            if (!entity) return false;

            const placement = computePlacement(entity, startIndex);
            if (!placement || !placement.withinBounds) return false;

            const occupied = new Set<number>();
            for (const other of collection) {
                if (other.id === entity.id || other.startIndex == null) continue;
                const otherPlacement = computePlacement(other, other.startIndex);
                if (!otherPlacement || !otherPlacement.withinBounds) continue;
                for (const cell of otherPlacement.cells) {
                    occupied.add(cell);
                }
            }

            for (const cell of placement.cells) {
                if (occupied.has(cell)) return false;
            }

            return true;
        },
        [computePlacement],
    );

    const findEntity = (entityId: number): PlacedEntity | null => {
        return entityMap.get(entityId) ?? null;
    };

    const startDrag = useCallback(
        (entity: PlacedEntity, data: DragData) => {
            const dragState: DragState = { entity, data };
            activeDragRef.current = dragState;
            setActiveDrag(dragState);
            setHoverIndex(null);
            setHoverCells([]);
            setHoverValid(false);
            emit(onDrag, withResponse(data.fromIndex, data.fromIndex, entity));
        },
        [emit, onDrag],
    );

    const endDrag = useCallback(() => {
        activeDragRef.current = null;
        setActiveDrag(null);
        setHoverIndex(null);
        hoverIndexRef.current = null;
        setHoverCells([]);
        setHoverValid(false);
    }, []);

    const handlePaletteDragStart =
        (entity: PlacedEntity) => (data: DragData, event: React.DragEvent<HTMLDivElement>) => {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.dropEffect = "move";
            const payload: DragData = { ...data, grabIndex: 0 };
            startDrag(entity, payload);
        };

    const handleCellDragStart = (
        entity: PlacedEntity,
        partIndex: number,
        event: React.DragEvent<HTMLDivElement>,
    ) => {
        const linearOffset = partIndex * (entity.direction === "horizontal" ? 1 : sizeX);
        const payload: DragData = {
            entityId: entity.id,
            fromIndex: entity.startIndex,
            grabOffset: linearOffset,
            grabIndex: partIndex,
        };
        event.dataTransfer.setData("application/json", JSON.stringify(payload));
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.dropEffect = "move";
        startDrag(entity, payload);
    };

    const handleHover = (index: number) => {
        const drag = activeDragRef.current;
        if (!drag) return;
        const { entity, data } = drag;
        const proposedStart = index - data.grabOffset;
        const placement = computePlacement(entity, proposedStart);
        const isValid = placement ? canPlaceAt(entity.id, proposedStart) : false;
        setHoverIndex(index);
        setHoverCells(placement?.cells ?? []);
        setHoverValid(isValid);

        const latestEntity = findEntity(entity.id) ?? entity;
        emit(onHold, withResponse(data.fromIndex, isValid ? proposedStart : null, latestEntity));
    };

    const handleHoverLeave = () => {
        setHoverIndex(null);
        setHoverCells([]);
        setHoverValid(false);
    };

    const handleDrop = (index: number) => {
        const drag = activeDragRef.current;
        if (!drag) return;
        const { entity, data } = drag;
        const proposedStart = index - data.grabOffset;
        const valid = canPlaceAt(entity.id, proposedStart);

        if (valid) {
            const updatedEntity: PlacedEntity = { ...entity, startIndex: proposedStart };
            const updatedEntities = entitiesRef.current.map((item) =>
                item.id === entity.id ? updatedEntity : item,
            );
            entitiesRef.current = updatedEntities;
            setEntities(updatedEntities);
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

    const rotateEntity = useCallback(
        (target: PlacedEntity) => {
            const latest = entitiesRef.current.find((item) => item.id === target.id);
            if (!latest) return false;

            const rotated: PlacedEntity = {
                ...latest,
                direction: latest.direction === "horizontal" ? "vertical" : "horizontal",
            };

            const updatedEntities = entitiesRef.current.map((item) =>
                item.id === rotated.id ? rotated : item,
            );

            if (
                rotated.startIndex !== null &&
                !canPlaceAt(rotated.id, rotated.startIndex, updatedEntities)
            ) {
                return false;
            }

            entitiesRef.current = updatedEntities;
            setEntities(updatedEntities);

            if (activeDragRef.current?.entity.id === rotated.id) {
                const grabIndex = activeDragRef.current.data.grabIndex ?? 0;
                const updatedData: DragData = {
                    ...activeDragRef.current.data,
                    grabOffset: grabIndex * (rotated.direction === "horizontal" ? 1 : sizeX),
                };
                const nextDrag: DragState = { entity: rotated, data: updatedData };
                activeDragRef.current = nextDrag;
                setActiveDrag(nextDrag);

                const currentHoverIndex = hoverIndexRef.current;
                if (currentHoverIndex !== null) {
                    const proposedStart = currentHoverIndex - nextDrag.data.grabOffset;
                    const placement = computePlacement(rotated, proposedStart);
                    const valid = placement
                        ? canPlaceAt(rotated.id, proposedStart, updatedEntities)
                        : false;
                    setHoverCells(placement?.cells ?? []);
                    setHoverValid(valid);
                    emit(
                        onHold,
                        withResponse(nextDrag.data.fromIndex, valid ? proposedStart : null, rotated),
                    );
                }
            }

            emit(onChange, withResponse(rotated.startIndex, rotated.startIndex, rotated));

            return true;
        },
        [canPlaceAt, computePlacement, emit, onHold, onChange],
    );

    const handlePaletteDrop = () => {
        const drag = activeDragRef.current;
        if (!drag) return;
        const { entity, data } = drag;

        if (data.fromIndex !== null) {
            const updatedEntity: PlacedEntity = { ...entity, startIndex: null };
            const updatedEntities = entitiesRef.current.map((item) =>
                item.id === entity.id ? updatedEntity : item,
            );
            entitiesRef.current = updatedEntities;
            setEntities(updatedEntities);
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

    const paletteItems = useMemo(
        () => entities.filter((entity) => entity.startIndex == null),
        [entities],
    );

    useEffect(() => {
        const handleDoubleClick = (event: MouseEvent) => {
            const drag = activeDragRef.current;
            if (!drag) return;

            event.preventDefault();
            event.stopPropagation();

            rotateEntity(drag.entity);
        };

        window.addEventListener("dblclick", handleDoubleClick);
        return () => window.removeEventListener("dblclick", handleDoubleClick);
    }, [rotateEntity]);

    const homeSection = (
        <div
            onDragOver={(event) => {
                if (!activeDragRef.current) return;
                event.preventDefault();
            }}
            onDrop={(event) => {
                event.preventDefault();
                handlePaletteDrop();
            }}
            style={{
                padding: "16px",
                borderRadius: "16px",
                border: "1px dashed rgba(148,163,184,0.45)",
                backgroundColor: "rgba(15,23,42,0.5)",
                minHeight: "280px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            }}
        >
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#94a3b8" }}>
                {globalThis.t?.("fleet.availableShips") ?? "Available Ships"}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {paletteItems.map((entity) => (
                    <DragItem
                        key={entity.id}
                        entity={entity}
                        onDragStart={(data, event) => handlePaletteDragStart(entity)(data, event)}
                        onDoubleClick={() => rotateEntity(entity)}
                        onDragEnd={endDrag}
                    />
                ))}
            </div>
        </div>
    );

    const fieldSection = (
        <DragDropField
            sizeX={sizeX}
            sizeY={sizeY}
            entities={entities}
            hoverCells={hoverCells}
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
            onCellDoubleClick={rotateEntity}
            onCellDragEnd={endDrag}
        />
    );

    const contextValue = useMemo(
        () => ({
            renderHome: () => homeSection,
            renderField: () => fieldSection,
        }),
        [homeSection, fieldSection],
    );

    return (
        <DragDropContext.Provider value={contextValue}>
            {children ?? (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(220px, 260px) auto",
                        gap: "16px",
                        width: "100%",
                    }}
                >
                    {homeSection}
                    <div style={{ justifySelf: "start" }}>{fieldSection}</div>
                </div>
            )}
        </DragDropContext.Provider>
    );
};

const BaseDragDropHome: React.FC = () => {
    const ctx = useDragDropContext();
    return ctx.renderHome();
};

const BaseDragDropFieldArea: React.FC = () => {
    const ctx = useDragDropContext();
    return ctx.renderField();
};

export { BaseDragDrop, BaseDragDropFieldArea, BaseDragDropHome };
export type { DragEntity, DropResponse, PlacedEntity } from "./types";
