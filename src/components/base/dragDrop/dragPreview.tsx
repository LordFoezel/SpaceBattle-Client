import React from "react";
import ReactDOMServer from "react-dom/server";
import type { DragDirection, PlacedEntity } from "./types";
import { CELL_GAP, CELL_SIZE, SHIP_TEXTURE } from "./constants";
import { getShipImage } from "./shipImages";

function createSegment(documentRef: Document): HTMLDivElement {
    const el = documentRef.createElement("div");
    el.style.width = `${CELL_SIZE}px`;
    el.style.height = `${CELL_SIZE}px`;
    el.style.borderRadius = "6px";
    el.style.backgroundImage = `url(${SHIP_TEXTURE})`;
    el.style.backgroundSize = "cover";
    el.style.backgroundRepeat = "no-repeat";
    el.style.boxShadow = "inset 0 0 10px rgba(15,23,42,0.3)";
    return el;
}

function createShipPreviewDom(entity: { length: number; direction: DragDirection; name: string, id: number}): HTMLElement | null {
    if (typeof document === "undefined") return null;
    const doc = document;

    const wrapper = doc.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.top = "-9999px";
    wrapper.style.left = "-9999px";
    wrapper.style.pointerEvents = "none";
    wrapper.style.padding = "8px";
    wrapper.style.borderRadius = "12px";
    wrapper.style.background = "rgba(15,23,42,0.9)";
    wrapper.style.border = "1px solid rgba(99,102,241,0.5)";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "6px";
    wrapper.style.boxShadow = "0 10px 25px rgba(15,23,42,0.55)";

    const label = doc.createElement("span");
    label.textContent = entity.name;
    label.style.fontSize = "12px";
    label.style.fontWeight = "600";
    label.style.color = "rgba(226,232,240,0.92)";
    wrapper.appendChild(label);

    const ship = doc.createElement("div");
    ship.style.display = "flex";
    ship.style.alignItems = "center";
    ship.style.justifyContent = "center";
    ship.style.padding = "2px";
    ship.style.background = "rgba(129,140,248,0.15)";
    ship.style.borderRadius = "8px";
    wrapper.appendChild(ship);

    const ShipIllustration = getShipImage(entity.name);
    const shouldFlip = typeof entity.id === "number" && entity.id % 2 === 0;
    if (ShipIllustration) {
        const base = (
            <ShipIllustration
                flipped={shouldFlip}
                style={{
                    width: `${entity.length * CELL_SIZE}px`,
                    height: `${CELL_SIZE}px`,
                }}
            />
        );
        const markup = ReactDOMServer.renderToStaticMarkup(
            entity.direction === "vertical" ? (
                <div
                    style={{
                        position: "relative",
                        width: `${CELL_SIZE}px`,
                        height: `${entity.length * CELL_SIZE}px`,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: `${entity.length * CELL_SIZE}px`,
                            height: `${CELL_SIZE}px`,
                            transformOrigin: "top left",
                            transform: `translateX(${CELL_SIZE}px) rotate(90deg)`,
                        }}
                    >
                        {base}
                    </div>
                </div>
            ) : (
                base
            ),
        );
        const tmp = doc.createElement("div");
        tmp.innerHTML = markup;
        const element = tmp.firstElementChild;
        if (element) {
            ship.appendChild(element);
        }
    } else {
        ship.style.display = "flex";
        ship.style.flexDirection = entity.direction === "vertical" ? "column" : "row";
        ship.style.gap = `${CELL_GAP}px`;
        for (let i = 0; i < entity.length; i += 1) {
            ship.appendChild(createSegment(doc));
        }
    }

    doc.body.appendChild(wrapper);
    return wrapper;
}

export function applyShipDragPreview(
    event: React.DragEvent,
    entity: Pick<PlacedEntity, "length" | "direction" | "name" | "shipId">,
    grabbedPartIndex: number,
    fromGrid: boolean,
): HTMLElement | null {
    const ghost = createShipPreviewDom(entity);
    if (!ghost) return null;

    if (fromGrid && grabbedPartIndex > 0) {
        const axisShift = grabbedPartIndex * CELL_GAP;
        if (entity.direction === "horizontal") {
            ghost.style.transform = `translateX(${axisShift}px)`;
        } else {
            ghost.style.transform = `translateY(${axisShift}px)`;
        }
    }

    const offsetX =
        entity.direction === "horizontal" ? grabbedPartIndex * CELL_SIZE + CELL_SIZE / 2 : CELL_SIZE / 2;
    const offsetY =
        entity.direction === "vertical" ? grabbedPartIndex * CELL_SIZE + CELL_SIZE / 2 : CELL_SIZE / 2;

    try {
        event.dataTransfer.setDragImage(ghost, offsetX, offsetY);
    } catch {
        // Drag image unsupported, ignore.
    }

    return ghost;
}

export function cleanupShipDragPreview(ghost: HTMLElement | null) {
    if (ghost?.parentNode) {
        ghost.parentNode.removeChild(ghost);
    }
}
