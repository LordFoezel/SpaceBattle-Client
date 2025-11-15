import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useEffect, useState } from "react";
import { Match } from "../../models/match";
import { BaseDragDrop, PlacedEntity } from "../base/dragDrop/BaseDragDrop";
import { ErrorHelper } from "../../helper/errorHelper";
import { fetchById } from "../../repositories/ships";
import { fetchAll, updateOne } from "../../repositories/fleet";
import { FleetUpdate } from "../../models/fleet";
import { AutoPlaceButton } from "../button/AutoPlaceButton";

interface ModalProps {
    match: Match;
    isDisabled?: boolean;
}

const FleetModal = function FleetModal(props: ModalProps) {
    const {
        match,
        isDisabled = false,
    } = props;

    const [dragEntity, setDragEntity] = useState<PlacedEntity[]>([]);

    if (!match) return null;

    useEffect(() => {
        if (!match.config) return;
        void placeShips();
    }, [match]);

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
                    icon_tag: ship.icon_tag,
                    shipId: fleet.ship_id,
                    length: ship.dimension,
                    direction: fleet.direction,
                    startIndex,
                };
            }));

            setDragEntity(temp);
        } catch (error) {
            ErrorHelper.handleError(error);
        }
    }

    function onChange(e: any) {
        void updateShip(e.item.id, { position: e.indexTo, direction: e.item.direction });
    }

    async function updateShip(shipId: number, payload: FleetUpdate) {
        try {
            await updateOne(shipId, payload);
        } catch (error) {
            ErrorHelper.handleError(error);
        }
    }

    function onOpen() {
        void placeShips();
    }

    function onClose() {
        void placeShips();
    }

    async function handleAutoPlaceComplete() {
        await placeShips();
    }

    return (
        <BaseModal
            buttonText={globalThis.t("fleet.fleet")}
            title={globalThis.t("fleet.fleetManager")}
            placement="top"
            showClose={false}
            showSave={false}
            onOpen={onOpen}
            onClose={onClose}
            triggerProps={{ isDisabled }}
        >
            <TransparentCard direction="col" gap="2">
                <AutoPlaceButton
                    match={match}
                    isDisabled={isDisabled || !match.config}
                    onPlaced={handleAutoPlaceComplete}
                />
                <BaseDragDrop sizeX={match.config?.dimension_x} sizeY={match.config?.dimension_y} onChange={onChange} entities={dragEntity} />
            </TransparentCard>
        </BaseModal>
    );
};

export { FleetModal };
