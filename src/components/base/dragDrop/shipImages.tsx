import type React from "react";
import { SatelliteImage } from "../../icon/SatelliteImage";
import { FighterImage } from "../../icon/FighterImage";
import { DestroyerImage } from "../../icon/DestroyerImage";
import { CargoImage } from "../../icon/CargoImage";
import { CapitalImage } from "../../icon/CapitalImage";

type ShipName = "Satelite" | "Fighter" | "Destroyer" | "Cargo" | "Capital";

const shipImageMap: Record<ShipName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    Satelite: SatelliteImage,
    Fighter: FighterImage,
    Destroyer: DestroyerImage,
    Cargo: CargoImage,
    Capital: CapitalImage,
};

export const getShipImage = (name: string): React.ComponentType<React.SVGProps<SVGSVGElement>> | null => {
    return (shipImageMap as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined>)[name] ?? null;
};
