import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useEffect, useState } from "react";
import { Match } from "../../models/match";
import { BaseDragDrop, DragEntity } from "../base/dragDrop/BaseDragDrop";
import {
    fetchAll,
} from "../../repositories/config_fleet_ship";
import { ErrorHelper } from "../../helper/errorHelper";
import {
    fetchById,
    fetchAll as fetchAllShip,
} from "../../repositories/ships";
import { Fleet } from "../../models/fleet";
import { fetchAll as fetchAllFleet } from "../../repositories/fleet";

interface ModalProps {
    match: Match;
}

const FleetModal = function FleetModal(props: ModalProps) {
    const {
        match,
    } = props;

    const [dragEntity, setDragEntity] = useState<DragEntity[]>([]);
    const [fleets, setFleets] = useState<Fleet[]>([]);

    if (!match) return;

    useEffect(() => {
        if (!match.config) return;
        // loadShipConfigs();
        placeShips();
    }, [match]);

    // async function loadShipConfigs() {
    //     try {
    //         const data = await fetchAll({ config_fleet_id: match.config.fleet_config_id });
    //         const temp: DragEntity[] = [];
    //         data.forEach(async (shipConfig, index) => {
    //             if (shipConfig.count > 0) {
    //                 const ship = await fetchById(shipConfig.ship_id);
    //                 let cnt = 0;
    //                 while (cnt < shipConfig.count) {
    //                     // todo: add fleet
    //                     temp.push({ id: `${ship.name}-${index}-${cnt}`, name: ship.name, length: ship.dimension, direction: "horizontal" });
    //                     cnt++;
    //                 }
    //             }
    //         });
    //         setDragEntity(temp);
    //     } catch (error) {
    //         ErrorHelper.handleError(error);
    //     }
    // }

    async function placeShips() {
        try {
            const playerId = window.localStorage.getItem("spacebattle.playerId");
            const fleets = await fetchAllFleet({ player_id: playerId, match_id: match.id });
            const temp: DragEntity[] = [];
            fleets.map(async (fleet) => {
                const ship = await fetchById(fleet.ship_id);
                temp.push({ id: fleet.ident, name: ship.name, length: ship.dimension, direction: "horizontal" });
            });
            setDragEntity(temp);
        } catch (error) {
            ErrorHelper.handleError(error);
        }
    }

    function onChange() {
        // todo: add update or delete a fleet entrie 
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
