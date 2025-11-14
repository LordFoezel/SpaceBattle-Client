export type DragDirection = "horizontal" | "vertical";

export interface DragEntity {
    id: number;
    ident: string;
    name: string;
    shipId?: number | null;
    length: number;
    direction: DragDirection;
    disabled?: boolean;
}

export interface PlacedEntity extends DragEntity {
    /**
     * Linear index (based on sizeX * sizeY) describing the top-left cell
     * occupied by the entity, or null when the entity is still in the palette.
     */
    startIndex: number | null;
}

export interface DropResponse {
    indexFrom: number | null;
    indexTo: number | null;
    item: PlacedEntity | null;
}

export interface DragData {
    entityId: PlacedEntity["id"];
    fromIndex: number | null;
    /**
     * Offset (in cells) from the entity's origin to the cell that initiated
     * the drag. Used to keep the entity anchored to the pointer while moving.
     */
    grabOffset: number;
}
