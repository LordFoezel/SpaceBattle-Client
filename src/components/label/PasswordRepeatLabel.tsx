

import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputPassword } from "../base/input/BaseInputPassword";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const PasswordRepeatLabel = function PasswordRepeatLabel({
    value,
    defaultValue = '',
    onChange,
    onBlur,
}: LabelProps) {

    return (
        <BaseLabel variant='transparent' label={globalThis.t("login.passwordRepeat.label")} info={globalThis.t("login.passwordRepeat.info")}>
            <BaseInputPassword name="passwordRepead" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { PasswordRepeatLabel };

