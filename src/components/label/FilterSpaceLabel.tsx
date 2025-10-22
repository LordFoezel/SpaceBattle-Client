
import { BaseLabel } from "../base/label/BaseLabel";
import { BaseCheckbox } from "../base/checkbox/BaseCheckbox";

interface FilterSpaceLabelProps {
    value?: any;
    defaultValue?: string;
    onChange?: (e: any) => any;
}

const FilterSpaceLabel = function FilterSpaceLabel({
    value,
    defaultValue = '',
    onChange,
}: FilterSpaceLabelProps) {
    return (
        <BaseLabel variant='transparent' label={globalThis.t("lobby.hasSpace.label")} info={globalThis.t("lobby.hasSpace.info")} direction="horizontal">
            <BaseCheckbox name="hasSpace" value={value} defaultValue={defaultValue} onChange={onChange} />
        </BaseLabel>
    );
};

export { FilterSpaceLabel };
