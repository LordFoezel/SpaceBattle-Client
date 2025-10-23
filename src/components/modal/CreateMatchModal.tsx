import { BaseModal } from "../base/modal/BaseModal";
import { FilterPasswordLabel } from "../label/FilterPasswordLabel";
import { TransparentCard } from "../layout/TransparentCard";
import { FilterSpaceLabel } from "../label/FilterSpaceLabel";
import { useState } from "react";

interface Props {
    onChange?: (e: any) => any;
}

const CreateMatchModal = function CreateMatchModal(props: Props) {
    const {
        onChange,
    } = props;


    return (
        <BaseModal buttonText={globalThis.t("lobby.createMatch")} title={globalThis.t("lobby.createMatch")} placement="top">
            <TransparentCard direction="col" gap="2">
                Modal with all things for a match
            </TransparentCard>
        </BaseModal>
    );
};

export { CreateMatchModal };
