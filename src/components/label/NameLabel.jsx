
import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInput } from "../base/input/BaseInput";

const NameLabel = function NameLabel({
    value,
    defaultValue = '',
    onChange,
    onBlur,
}) {
    return (
        <BaseLabel variant='transparent' label={t("login.name.label")} info={t("login.name.info")}>
            <BaseInput name="name" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { NameLabel };
