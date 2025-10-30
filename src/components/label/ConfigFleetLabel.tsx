import { BaseLabel } from "../base/label/BaseLabel";
import { BaseSelect } from "../base/select/BaseSelect";
import type { SelectOption } from "../../models/selectOption";

interface LabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
    options: SelectOption[];
}

const ConfigFleetLabel = function ConfigFleetLabel({
    value,
    onChange,
    options = [],
}: LabelProps) {
    return (
        <BaseLabel variant='transparent' label={globalThis.t("match.configFleet.label")} info={globalThis.t("match.configFleet.info")}>
            <BaseSelect options={options} value={value} onChange={onChange} />
        </BaseLabel>
    );
};

export { ConfigFleetLabel };
