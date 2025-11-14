import type React from "react";
import { SatelliteImage } from "../../icon/SatelliteImage";
import { FighterImage } from "../../icon/FighterImage";
import { DestroyerImage } from "../../icon/DestroyerImage";
import { CargoImage } from "../../icon/CargoImage";
import { CapitalImage } from "../../icon/CapitalImage";

type ShipName = "Satelite" | "Fighter" | "Destroyer" | "Cargo" | "Capital";
type ShipImageComponent = React.ComponentType<{ style?: React.CSSProperties; flipped?: boolean }>;

const shipImageMap: Record<ShipName, ShipImageComponent> = {
    Satelite: SatelliteImage as ShipImageComponent,
    Fighter: FighterImage as ShipImageComponent,
    Destroyer: DestroyerImage as ShipImageComponent,
    Cargo: CargoImage as ShipImageComponent,
    Capital: CapitalImage as ShipImageComponent,
};

export const getShipImage = (name: string): ShipImageComponent | null => {
    return (shipImageMap as Record<string, ShipImageComponent | undefined>)[name] ?? null;
};
