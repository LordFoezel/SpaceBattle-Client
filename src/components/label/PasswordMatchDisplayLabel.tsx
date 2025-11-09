

import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInput } from "../base/input/BaseInput";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const PasswordMatchDisplayLabel = function PasswordMatchDisplayLabel({
    value,
    defaultValue = '',
    onChange,
    onBlur,
}: LabelProps) {

    return (
        <BaseLabel variant='transparent' label={globalThis.t("lobby.password.label")} info={globalThis.t("lobby.password.info")}>
            <BaseInput name="password" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} autoComplete="off" />
        </BaseLabel>
    );
};

export { PasswordMatchDisplayLabel };

