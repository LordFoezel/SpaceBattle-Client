import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputNumber } from "../base/input/BaseInputNumber";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const MapSizeXLabel = function MapSizeXLabel({
    value,
    defaultValue = '10',
    onChange,
    onBlur,
}: LabelProps) {
    return (
        <BaseLabel variant='transparent' label={globalThis.t("lobby.mapSizeX.label")} info={globalThis.t("lobby.mapSizeX.info")}>
            <BaseInputNumber
                name="mapSizeX"
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onBlur={onBlur}
                type="number"
                inputMode="numeric"
                min={1}
                max={100}
            />
        </BaseLabel>
    );
};

export { MapSizeXLabel };
