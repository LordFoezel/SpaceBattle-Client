import type React from "react";
import { SatelliteImage } from "../../icon/SatelliteImage";
import { FighterImage } from "../../icon/FighterImage";
import { DestroyerImage } from "../../icon/DestroyerImage";
import { CargoImage } from "../../icon/CargoImage";
import { CapitalImage } from "../../icon/CapitalImage";

type ShipImageComponent = React.ComponentType<{ style?: React.CSSProperties; flipped?: boolean }>;

const shipImageMap: Record<string, ShipImageComponent> = {
    SatelliteImage,
    FighterImage,
    DestroyerImage,
    CargoImage,
    CapitalImage,
};

export const getShipImage = (iconTag: string | null | undefined): ShipImageComponent | null => {
    if (!iconTag) return null;
    console.log(iconTag);
    return shipImageMap[iconTag] ?? null;
};
