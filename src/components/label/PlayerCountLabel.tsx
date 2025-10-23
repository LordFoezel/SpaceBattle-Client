import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputNumber } from "../base/input/BaseInputNumber";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const PlayerCountLabel = function PlayerCountLabel({
    value,
    defaultValue = '2',
    onChange,
    onBlur,
}: LabelProps) {
    return (
        <BaseLabel variant='transparent' label={globalThis.t("lobby.playerCount.label")} info={globalThis.t("lobby.playerCount.info")}>
            <BaseInputNumber
                name="playerCount"
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onBlur={onBlur}
                type="number"
                inputMode="numeric"
                min={2}
                max={8}
            />
        </BaseLabel>
    );
};

export { PlayerCountLabel };
