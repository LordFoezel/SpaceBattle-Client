import { useState } from "react";

import { BaseButton } from "../base/button/BaseButton";
import { Match } from "../../models/match";
import { autoplaceFleet } from "../../repositories/fleet";
import { ErrorHelper } from "../../helper/errorHelper";

interface AutoPlaceButtonProps {
    match: Match;
    isDisabled?: boolean;
    onPlaced?: () => void | Promise<void>;
}

const AutoPlaceButton = function AutoPlaceButton({ match, isDisabled = false, onPlaced }: AutoPlaceButtonProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleClick() {
        if (!match.config || isSubmitting || isDisabled) return;
        const playerIdStr = window.localStorage.getItem("spacebattle.playerId");
        const playerId = playerIdStr ? Number(playerIdStr) : NaN;
        if (!Number.isFinite(playerId)) {
            ErrorHelper.handleError(new Error("Player not found for autoplace"));
            return;
        }
        setIsSubmitting(true);
        try {
            await autoplaceFleet({
                player_id: playerId,
                match_id: match.id,
                dimension_x: match.config.dimension_x,
                dimension_y: match.config.dimension_y,
            });
            if (typeof onPlaced === "function") {
                await onPlaced();
            }
        } catch (error) {
            ErrorHelper.handleError(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <BaseButton
            name="autoplace"
            onClick={handleClick}
            isDisabled={isDisabled || isSubmitting || !match.config}
            isLoading={isSubmitting}
            colorScheme="purple"
        >
            {globalThis.t?.("fleet.autoplace") ?? "Auto place"}
        </BaseButton>
    );
};

export { AutoPlaceButton };
