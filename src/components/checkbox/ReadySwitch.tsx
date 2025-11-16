import { useEffect, useState } from "react";

import { Player, PlayerState } from "../../models/player";
import { BaseSwitch } from "../base/checkbox/BaseSwitch";
import { updateOne } from "../../repositories/players";
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
    const [value, setValue] = useState(player.state === PlayerState.READY);

    async function onChangeState() {
        if (isDisabled) {
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
        setValue(player.state === PlayerState.READY);
    }, [player.state]);

    return (
        <BaseSwitch
            name="join"
            onChange={onChangeState}
            value={value}
            defaultValue={value}
            isDisabled={isDisabled}
            size="lg"
            height="full"
        />
    );
};

export { ReadySwitch };

