import { useCallback, useEffect, useState } from "react";

import { Player } from "src/models/player";
import { BaseCard } from "../base/layout/BaseCard";
import { BaseText } from "../base/text/BaseText";
import { TransparentCard } from "../layout/TransparentCard";
import { DeletePlayerButton } from "../button/DeletePlayerButton";
import { ReadySwitch } from "../checkbox/ReadySwitch";
import { SelfCheck } from "../../helper/SelfCheck";
import { fetchAll as fetchFleet } from "../../repositories/fleet";
import { ErrorHelper } from "../../helper/errorHelper";

interface ListItemProps {
    player: Player;
    key: number;
    matchId: number;
    onDeleted?: (id: number) => void;
    onChangeState?: () => void;
}

const PlayerListItem = function PlayerListItem(props: ListItemProps) {
    const {
        player,
        matchId,
        onDeleted,
        onChangeState,
    } = props;
    const [hasAllShipsPlaced, setHasAllShipsPlaced] = useState(false);
    const isSelfPlayer = SelfCheck({ userId: player.user_id });

    const checkPlacementStatus = useCallback(async () => {
        if (!isSelfPlayer) {
            setHasAllShipsPlaced(false);
            return;
        }
        try {
            const fleets = await fetchFleet({
                player_id: player.id,
                match_id: matchId,
            });
            const allPlaced = fleets.length > 0 && fleets.every((fleet) => typeof fleet.position === "number");
            setHasAllShipsPlaced(allPlaced);
        } catch (error) {
            ErrorHelper.handleError(error);
            setHasAllShipsPlaced(false);
        }
    }, [isSelfPlayer, matchId, player.id]);

    useEffect(() => {
        checkPlacementStatus();
    }, [checkPlacementStatus]);

    useEffect(() => {
        if (!isSelfPlayer) {
            return;
        }
        const handler = () => {
            checkPlacementStatus();
        };
        window.addEventListener("fleet:update", handler);
        return () => window.removeEventListener("fleet:update", handler);
    }, [checkPlacementStatus, isSelfPlayer]);

    const readyDisabled = !hasAllShipsPlaced;

    return (
        <BaseCard direction='col' variant="light" gap='2' padding="2">
            <TransparentCard direction="row" gap="2" justify="between">
                <TransparentCard direction="row" gap="2" >
                    <BaseText fontSize="lg">{player.name}</BaseText>
                    <BaseText fontSize="lg" color="gray">{globalThis.t(`playerState.${player.state}`)}</BaseText>
                </TransparentCard>
                <TransparentCard direction="row" gap="2" justify="end">
                    {isSelfPlayer && (
                        <ReadySwitch
                            player={player}
                            onChange={onChangeState}
                            isDisabled={readyDisabled}
                        />
                    )}
                    <DeletePlayerButton playerId={player.id} onDeleted={onDeleted} matchId={matchId} />
                </TransparentCard>
            </TransparentCard>
        </BaseCard>
    );
}

export { PlayerListItem };
