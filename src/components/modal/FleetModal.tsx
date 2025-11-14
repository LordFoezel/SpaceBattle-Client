import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useEffect, useState } from "react";
import { Match } from "../../models/match";
import { BaseDragDrop, PlacedEntity } from "../base/dragDrop/BaseDragDrop";
import { ErrorHelper } from "../../helper/errorHelper";
import { fetchById } from "../../repositories/ships";
import { fetchAll, updateOne } from "../../repositories/fleet";
import { FleetUpdate } from "../../models/fleet";

interface ModalProps {
    match: Match;
}

const FleetModal = function FleetModal(props: ModalProps) {
    const {
        match,
    } = props;

    const [dragEntity, setDragEntity] = useState<PlacedEntity[]>([]);

    if (!match) return;

    useEffect(() => {
        if (!match.config) return;
        placeShips();
    }, [match]); // todo: also make this if open the modal again


    async function placeShips() {
        try {
            const playerId = window.localStorage.getItem("spacebattle.playerId");
            const fleets = await fetchAll({ player_id: playerId, match_id: match.id });
            const temp: PlacedEntity[] = await Promise.all(fleets.map(async (fleet) => {
                const ship = await fetchById(fleet.ship_id);
                const startIndex = typeof fleet.position === "number" ? fleet.position : null;

                return {
                    id: fleet.id,
                    ident: fleet.ident,
                    name: ship.name,
                    length: ship.dimension,
                    direction: fleet.direction ?? "horizontal",
                    startIndex,
                };
            }));

            setDragEntity(temp);
        } catch (error) {
            ErrorHelper.handleError(error);
        }
    }

    function onChange(e: any) {
        updateShip(e.item.id, { position: e.indexTo });
    }

    async function updateShip(shipId: number, payload: FleetUpdate) {
        try {
            await updateOne(shipId, payload);
        } catch (error) {
            ErrorHelper.handleError(error);
        }
    }

    function onOpen() {
        placeShips();
    }

    function onClose() {
        placeShips();
    }

    return (
        <BaseModal buttonText={globalThis.t("fleet.fleet")} title={globalThis.t("fleet.fleetManager")} placement="top" showClose={false} showSave={false} onOpen={onOpen} onClose={onClose}>
            <TransparentCard direction="col" gap="2">
                <BaseDragDrop sizeX={match.config?.dimension_x} sizeY={match.config?.dimension_y} onChange={onChange} entities={dragEntity} />
            </TransparentCard>
        </BaseModal>
    );
};

export { FleetModal };
