import type React from "react";
import type { DragDirection, PlacedEntity } from "./types";

export const CELL_SIZE = 40;
const CELL_GAP = 4;

function createCellElement(documentRef: Document): HTMLDivElement {
    const el = documentRef.createElement("div");
    el.style.width = `${CELL_SIZE}px`;
    el.style.height = `${CELL_SIZE}px`;
    el.style.borderRadius = "4px";
    el.style.background = "rgba(99,102,241,0.9)";
    el.style.border = "1px solid rgba(79,70,229,0.9)";
    return el;
}

function createShipPreviewDom(entity: { length: number; direction: DragDirection; name: string }): HTMLElement | null {
    if (typeof document === "undefined") return null;
    const doc = document;

    const wrapper = doc.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.top = "-9999px";
    wrapper.style.left = "-9999px";
    wrapper.style.pointerEvents = "none";
    wrapper.style.padding = "6px";
    wrapper.style.borderRadius = "10px";
    wrapper.style.background = "rgba(15,23,42,0.85)";
    wrapper.style.border = "1px solid rgba(99,102,241,0.6)";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "6px";
    wrapper.style.boxShadow = "0 10px 18px rgba(15,23,42,0.35)";

    const label = doc.createElement("span");
    label.textContent = entity.name;
    label.style.fontSize = "12px";
    label.style.fontWeight = "600";
    label.style.color = "rgba(226,232,240,0.92)";
    wrapper.appendChild(label);

    const ship = doc.createElement("div");
    ship.style.display = "flex";
    ship.style.flexDirection = entity.direction === "vertical" ? "column" : "row";
    ship.style.gap = `${CELL_GAP}px`;
    ship.style.padding = "2px";
    ship.style.background = "rgba(129,140,248,0.2)";
    ship.style.borderRadius = "6px";
    wrapper.appendChild(ship);

    for (let i = 0; i < entity.length; i += 1) {
        ship.appendChild(createCellElement(doc));
    }

    doc.body.appendChild(wrapper);
    return wrapper;
}

export function applyShipDragPreview(
    event: React.DragEvent,
    entity: Pick<PlacedEntity, "length" | "direction" | "name">,
    grabbedPartIndex: number,
): HTMLElement | null {
    const ghost = createShipPreviewDom(entity);
    if (!ghost) return null;

    const offsetX =
        entity.direction === "horizontal"
            ? grabbedPartIndex * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2
            : CELL_SIZE / 2;
    const offsetY =
        entity.direction === "vertical"
            ? grabbedPartIndex * (CELL_SIZE + CELL_GAP) + CELL_SIZE / 2
            : CELL_SIZE / 2;

    try {
        event.dataTransfer.setDragImage(ghost, offsetX, offsetY);
    } catch {
        // ignore, drag image unsupported
    }

    return ghost;
}

export function cleanupShipDragPreview(ghost: HTMLElement | null) {
    if (ghost?.parentNode) {
        ghost.parentNode.removeChild(ghost);
    }
}
