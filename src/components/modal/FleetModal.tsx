import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useEffect, useState } from "react";
import { Match } from "../../models/match";
import { BaseDragDrop, DragEntity } from "../base/dragDrop/BaseDragDrop";
import {
    fetchAll,
} from "../../repositories/config_fleet_ship";
import { ConfigFleetShip } from "../../models/config_fleet_ship";
import { ErrorHelper } from "../../helper/errorHelper";
import {
    fetchById,
} from "../../repositories/ships";
interface ModalProps {
    onChange?: (e: any) => any;
    match: Match;
}

const FleetModal = function FleetModal(props: ModalProps) {
    const {
        onChange,
        match,
    } = props;

    const [dragEntity, setDragEntity] = useState<DragEntity[]>([]);

    if (!match) return;

    useEffect(() => {
        if (!match.config) return;
        loadShipConfigs();
    }, []);

    async function loadShipConfigs() {
        try {
            const data = await fetchAll({ config_fleet_id: match.config.fleet_config_id });
            const temp: DragEntity[] = [];
            data.forEach(async (shipConfig, index) => {
                if (shipConfig.count > 0) {
                    const ship = await fetchById(shipConfig.ship_id);
                    let cnt = 0;
                    while (cnt < shipConfig.count) {
                        temp.push({ id: `${ship.name}-${index}-${cnt}`, name: ship.name, length: ship.dimension, direction: "horizontal" });
                        cnt++;
                    }
                }
            });
            setDragEntity(temp);
        } catch (error) {
            ErrorHelper.handleError(error);
        }
    }

    return (
        <BaseModal buttonText={globalThis.t("fleet.fleet")} title={globalThis.t("fleet.fleetManager")} placement="top" showClose={false} showSave={false}>
            <TransparentCard direction="col" gap="2">
                <BaseDragDrop sizeX={match.config?.dimension_x} sizeY={match.config?.dimension_y} onChange={onChange} entities={dragEntity} />
            </TransparentCard>
        </BaseModal>
    );
};

export { FleetModal };
