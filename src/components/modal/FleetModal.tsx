import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useEffect, useState } from "react";
import { Match } from "../../models/match";
import { BaseDragDrop, DragEntity } from "../base/dragDrop/BaseDragDrop";
import { ErrorHelper } from "../../helper/errorHelper";
import { fetchById } from "../../repositories/ships";
import { fetchAll, updateOne } from "../../repositories/fleet";

interface ModalProps {
    match: Match;
}

const FleetModal = function FleetModal(props: ModalProps) {
    const {
        match,
    } = props;

    const [dragEntity, setDragEntity] = useState<DragEntity[]>([]);

    if (!match) return;

    useEffect(() => {
        if (!match.config) return;
        placeShips();
    }, [match]);


    async function placeShips() {
        try {
            const playerId = window.localStorage.getItem("spacebattle.playerId");
            const fleets = await fetchAll({ player_id: playerId, match_id: match.id });
            const temp: DragEntity[] = [];
            fleets.map(async (fleet) => {
                const ship = await fetchById(fleet.ship_id);
                temp.push({ id: fleet.id, ident: fleet.ident, name: ship.name, length: ship.dimension, direction: "horizontal" });
            });
            setDragEntity(temp);
        } catch (error) {
            ErrorHelper.handleError(error);
        }
    }

    function onChange(e: any) {
        updateOne(e.item.id, { position_x: 0, position_y: 0 });
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
