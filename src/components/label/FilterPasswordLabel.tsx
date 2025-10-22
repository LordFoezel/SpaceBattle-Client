
import { BaseLabel } from "../base/label/BaseLabel";
import { BaseCheckbox } from "../base/checkbox/BaseCheckbox";

interface FilterPasswordLabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
}

const FilterPasswordLabel = function FilterPasswordLabel({
    value,
    defaultValue = '',
    onChange,
}: FilterPasswordLabelProps) {
    return (
        <BaseLabel variant='transparent' label={globalThis.t("lobby.hasNoPassword.label")} info={globalThis.t("lobby.hasNoPassword.info")} direction="horizontal">
            <BaseCheckbox name="hasNoPassword" value={value} defaultValue={defaultValue} onChange={onChange} />
        </BaseLabel>
    );
};

export { FilterPasswordLabel };
