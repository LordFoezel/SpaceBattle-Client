
import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInput } from "../base/input/BaseInput";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const DescriptionLabel = function DescriptionLabel({
    value,
    defaultValue = '',
    onChange,
    onBlur,
}: LabelProps) {
    return (
        <BaseLabel variant='transparent' label={globalThis.t("lobby.description.label")} info={globalThis.t("lobby.description.info")}>
            <BaseInput name="description" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { DescriptionLabel };

