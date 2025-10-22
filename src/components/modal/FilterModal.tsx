import { BaseModal } from "../base/modal/BaseModal";

interface FilterModalProps {
}

const FilterModal = function FilterModal(props: FilterModalProps) {
    const {
    } = props;

    return (
        <BaseModal buttonText={globalThis.t("core.filter")} title={globalThis.t("core.filter")} placement="top" showClose={false} showSave={false}> Todo: add things </BaseModal>
    );
};

export { FilterModal };
