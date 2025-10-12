

import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputPassword } from "../base/input/BaseInputPassword";

const PasswordRepeatLabel = function PasswordRepeatLabel({
    value,
    defaultValue = '',
    onChange,
    onBlur,
}) {

    return (
        <BaseLabel variant='transbaretn' label={t("login.passwordRepeat.label")} info={t("login.passwordRepeat.info")}>
            <BaseInputPassword name="passwordRepead" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { PasswordRepeatLabel };
