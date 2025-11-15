import type React from "react";
import { SatelliteImage } from "../../icon/SatelliteImage";
import { FighterImage } from "../../icon/FighterImage";
import { DestroyerImage } from "../../icon/DestroyerImage";
import { CargoImage } from "../../icon/CargoImage";
import { CapitalImage } from "../../icon/CapitalImage";
import { MineImage } from "../../icon/MineImage";
import { AlienSatelitImage } from "../../icon/AlienSatelitImage";
import { AlienFighterImage } from "../../icon/AlienFighterImage";
import { AlienDestroyerImage } from "../../icon/AlienDestroyerImage";
import { AlienCargoImage } from "../../icon/AlienCargoImage";
import { AlienCapitalImage } from "../../icon/AlienCapitalImage";
import { AlienMineImage } from "../../icon/AlienMineImage";

type ShipImageComponent = React.ComponentType<{ style?: React.CSSProperties; flipped?: boolean }>;

const shipImageMap: Record<string, ShipImageComponent> = {
    SatelliteImage,
    FighterImage,
    DestroyerImage,
    CargoImage,
    CapitalImage,
    MineImage,
    AlienSatelitImage,
    AlienFighterImage,
    AlienDestroyerImage,
    AlienCargoImage,
    AlienCapitalImage,
    AlienMineImage,
};

export const getShipImage = (iconTag: string | null | undefined): ShipImageComponent | null => {
    if (!iconTag) return null;
    return shipImageMap[iconTag] ?? null;
};
