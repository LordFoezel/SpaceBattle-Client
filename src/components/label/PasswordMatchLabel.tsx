

import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputPassword } from "../base/input/BaseInputPassword";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const PasswordMatchLabel = function PasswordMatchLabel({
    value,
    defaultValue = '',
    onChange,
    onBlur,
}: LabelProps) {

    return (
        <BaseLabel variant='transparent' label={globalThis.t("lobby.password.label")} info={globalThis.t("lobby.password.info")}>
            <BaseInputPassword name="password" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} autoComplete="off" />
        </BaseLabel>
    );
};

export { PasswordMatchLabel };

