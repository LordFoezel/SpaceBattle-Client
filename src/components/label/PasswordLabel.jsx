

import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputPassword } from "../base/input/BaseInputPassword";

const PasswordLabel = function PasswordLabel({
    value,
    onBlur,
}) {

    return (
        <BaseLabel variant='transbaretn' label={t("login.password.label")} info={t("login.password.info")}>
            <BaseInputPassword name="password" value={value} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { PasswordLabel };