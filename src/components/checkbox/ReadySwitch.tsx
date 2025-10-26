import { Player, PlayerState } from "../../models/player";
import { BaseSwitch } from "../base/checkbox/BaseSwitch";
import { useEffect, useState } from "react";
import { updateOne } from "../../repositories/players";

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

    async function onChangeState() {
        setValue(!value);
        const state = value ? PlayerState.PLACE : PlayerState.READY;
        
        await updateOne(player.id, { state });
        onChange();
    }

    useEffect(() => {
        if (player.state == PlayerState.READY) setValue(true);
        else setValue(false);
    }, [player]);


    return (
        <BaseSwitch name="join" onChange={onChangeState} value={value} defaultValue={value} isDisabled={isDisabled} size="lg" height="full" />
    );
};

export { ReadySwitch };



