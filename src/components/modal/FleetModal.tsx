import { BaseModal } from "../base/modal/BaseModal";
import { FilterPasswordLabel } from "../label/FilterPasswordLabel";
import { TransparentCard } from "../layout/TransparentCard";
import { FilterSpaceLabel } from "../label/FilterSpaceLabel";
import { useEffect, useState } from "react";
import { Match } from "../../models/match";

interface ModalProps {
    onChange?: (e: any) => any;
    match: Match;
}

const FleetModal = function FleetModal(props: ModalProps) {
    const {
        onChange,
        match,
    } = props;

    useEffect(() => {
        console.log(match);
    }, []);


    return (
        <BaseModal buttonText={globalThis.t("fleet.fleet")} title={globalThis.t("fleet.fleetManager")} placement="top" showClose={false} showSave={false}>
            <TransparentCard direction="col" gap="2">


            </TransparentCard>
        </BaseModal>
    );
};

export { FleetModal };
