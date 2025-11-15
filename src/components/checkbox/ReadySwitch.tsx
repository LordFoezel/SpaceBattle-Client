import { useCallback, useEffect, useState } from "react";

import { Player, PlayerState } from "../../models/player";
import { BaseSwitch } from "../base/checkbox/BaseSwitch";
import { updateOne } from "../../repositories/players";
import { fetchAll as fetchFleet } from "../../repositories/fleet";
import { ErrorHelper } from "../../helper/errorHelper";

interface SwitchProps {
    player: Player;
    isDisabled?: boolean;
    onChange?: () => void;
}

const ReadySwitch = function ReadySwitch({
    player,
    isDisabled,
    onChange,
}: SwitchProps) {
    const [value, setValue] = useState(false);
    const [hasAllShipsPlaced, setHasAllShipsPlaced] = useState(false);

    const checkPlacementStatus = useCallback(async () => {
        try {
            const fleets = await fetchFleet({
                player_id: player.id,
                match_id: player.match_id,
            });
            const allPlaced = fleets.length > 0 && fleets.every((fleet) => typeof fleet.position === "number");
            setHasAllShipsPlaced(allPlaced);
        } catch (error) {
            ErrorHelper.handleError(error);
            setHasAllShipsPlaced(false);
        }
    }, [player.id, player.match_id]);

    useEffect(() => {
        checkPlacementStatus();
    }, [checkPlacementStatus]);

    useEffect(() => {
        const handler = () => {
            checkPlacementStatus();
        };
        window.addEventListener("fleet:update", handler);
        return () => window.removeEventListener("fleet:update", handler);
    }, [checkPlacementStatus]);

    async function onChangeState() {
        const readyDisabled = isDisabled || !hasAllShipsPlaced;
        if (readyDisabled) {
            return;
        }
        const previousValue = value;
        const nextValue = !previousValue;
        setValue(nextValue);
        const state = nextValue ? PlayerState.READY : PlayerState.PLACE;
        try {
            await updateOne(player.id, { state });
            if (typeof onChange === "function") {
                onChange();
            }
        } catch (error) {
            ErrorHelper.handleError(error);
            // revert local switch if update fails
            setValue(previousValue);
        }
    }

    useEffect(() => {
        if (player.state === PlayerState.READY) {
            setValue(true);
        } else {
            setValue(false);
        }
    }, [player]);

    const disabled = isDisabled || !hasAllShipsPlaced;

    return (
        <BaseSwitch
            name="join"
            onChange={onChangeState}
            value={value}
            defaultValue={value}
            isDisabled={disabled}
            size="lg"
            height="full"
        />
    );
};

export { ReadySwitch };

