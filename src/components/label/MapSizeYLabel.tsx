import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputNumber } from "../base/input/BaseInputNumber";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const MapSizeYLabel = function MapSizeYLabel({
    value,
    defaultValue = '10',
    onChange,
    onBlur,
}: LabelProps) {
    return (
        <BaseLabel variant='transparent' label={globalThis.t("lobby.mapSizeY.label")} info={globalThis.t("lobby.mapSizeY.info")}>
            <BaseInputNumber
                name="mapSizeY"
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onBlur={onBlur}
                min={1}
                max={100}
            />
        </BaseLabel>
    );
};

export { MapSizeYLabel };
