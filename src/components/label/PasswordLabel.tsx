

import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputPassword } from "../base/input/BaseInputPassword";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const PasswordLabel = function PasswordLabel({
    value,
    defaultValue = '',
    onChange,
    onBlur,
}: LabelProps) {

    return (
        <BaseLabel variant='transparent' label={globalThis.t("login.password.label")} info={globalThis.t("login.password.info")}>
            <BaseInputPassword name="password" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { PasswordLabel };

