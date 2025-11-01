import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useEffect, useState } from "react";
import { Match } from "../../models/match";
import { BaseDragDrop } from "../base/dragDrop/BaseDragDrop";

interface ModalProps {
    onChange?: (e: any) => any;
    match: Match;
}

const FleetModal = function FleetModal(props: ModalProps) {
    const {
        onChange,
        match,
    } = props;

    const [ships, setShips] = useState([]);


    useEffect(() => {
        if (!match) return;
        console.log(match.config?.fleet_config_id);
        // todo: get all ships from config_fleet_ship->shipId repo who is contained in configFleet extend exiting repo if nessesary 
    }, []);


    if (!match) return;
    return (
        <BaseModal buttonText={globalThis.t("fleet.fleet")} title={globalThis.t("fleet.fleetManager")} placement="top" showClose={false} showSave={false}>
            <TransparentCard direction="col" gap="2">
                <BaseDragDrop sizeX={match.config?.dimension_x ?? 10} sizeY={match.config?.dimension_y ?? 10} onChange={onChange} entities={ships} />
            </TransparentCard>
        </BaseModal>
    );
};

export { FleetModal };
