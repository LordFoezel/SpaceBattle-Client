import { BaseModal } from "../base/modal/BaseModal";
import { FilterPasswordLabel } from "../label/FilterPasswordLabel";
import { TransparentCard } from "../layout/TransparentCard";
import { FilterSpaceLabel } from "../label/FilterSpaceLabel";
import { useState } from "react";

interface FilterModalProps {
    onChange?: (e: any) => any;
}

const FilterModal = function FilterModal(props: FilterModalProps) {
    const {
        onChange,
    } = props;

    const [password, setPassword] = useState(true);
    const [space, setSpace] = useState(true);

    function onChangePassword(e) {
        const value = e?.target?.checked;
        setPassword(value);
        props.onChange?.({ password: value, space });
    }

    function onChangeSpace(e) {
        const value = e?.target?.checked;
        setSpace(value);
        props.onChange?.({ password, space: value });
    }

    return (
        <BaseModal buttonText={globalThis.t("core.filter")} title={globalThis.t("core.filter")} placement="top" showClose={false} showSave={false}>
            <TransparentCard direction="col" gap="2">
                <FilterPasswordLabel onChange={onChangePassword} value={password} />
                <FilterSpaceLabel onChange={onChangeSpace} value={space} />
            </TransparentCard>
        </BaseModal>
    );
};

export { FilterModal };
