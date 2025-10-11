
import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputEmail } from "../base/input/BaseInputEmail";

const EmailLabel = function EmailLabel({
    defaultValue = '',
    onChange,
    onBlur,
}) {
    return (
        <BaseLabel variant='transparent' label={t("login.email.label")} info={t("login.email.info")}>
            <BaseInputEmail name="email" defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { EmailLabel };
