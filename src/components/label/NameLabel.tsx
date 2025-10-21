
import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInput } from "../base/input/BaseInput";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const NameLabel = function NameLabel({
    value,
    defaultValue = '',
    onChange,
    onBlur,
}: LabelProps) {
    return (
        <BaseLabel variant='transparent' label={globalThis.t("login.name.label")} info={globalThis.t("login.name.info")}>
            <BaseInput name="name" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { NameLabel };

