
import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputEmail } from "../base/input/BaseInputEmail";

const EmailLabel = function EmailLabel({
    value,
    onBlur,
}) {


    return (
        <BaseLabel variant='transbaretn' label={t("login.email.label")} info={t("login.email.info")}>
            <BaseInputEmail name="email" value={value} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { EmailLabel };
