
import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputEmail } from "../base/input/BaseInputEmail";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const EmailLabel = function EmailLabel({
    value,
    defaultValue = '',
    onChange,
    onBlur,
}: LabelProps) {
    return (
        <BaseLabel variant='transparent' label={globalThis.t("login.email.label")} info={globalThis.t("login.email.info")}>
            <BaseInputEmail name="email" value={value} defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} />
        </BaseLabel>
    );
};

export { EmailLabel };
