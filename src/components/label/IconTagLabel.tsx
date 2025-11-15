import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInput } from "../base/input/BaseInput";

interface LabelProps {
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const IconTagLabel = function IconTagLabel({
    value,
    defaultValue = "",
    onChange,
    onBlur,
}: LabelProps) {
    return (
        <BaseLabel variant="transparent" label={globalThis.t?.("ships.iconTag.label") ?? "Icon Component"} info={globalThis.t?.("ships.iconTag.info") ?? "Name of the icon component to render for this ship."}>
            <BaseInput name="iconTag" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { IconTagLabel };
