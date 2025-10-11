

import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputPassword } from "../base/input/BaseInputPassword";

const PasswordLabel = function PasswordLabel({
    value,
    defaultValue = '',
    onChange,
    onBlur,
}) {

    return (
        <BaseLabel variant='transbaretn' label={t("login.password.label")} info={t("login.password.info")}>
            <BaseInputPassword name="password" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { PasswordLabel };
