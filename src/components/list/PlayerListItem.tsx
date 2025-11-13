import { Player } from "src/models/player";
import { BaseCard } from "../base/layout/BaseCard";
import { BaseText } from "../base/text/BaseText";
import { TransparentCard } from "../layout/TransparentCard";
import { DeletePlayerButton } from "../button/DeletePlayerButton";
import { ReadySwitch } from "../checkbox/ReadySwitch";
import { SelfCheck } from "../../helper/SelfCheck";

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

    return (
        <BaseCard direction='col' variant="light" gap='2' padding="2">
            <TransparentCard direction="row" gap="2" justify="between">
                <TransparentCard direction="row" gap="2" >
                    <BaseText fontSize="lg">{player.name}</BaseText>
                    <BaseText fontSize="lg" color="gray">{globalThis.t(`playerState.${player.state}`)}</BaseText>
                </TransparentCard>
                <TransparentCard direction="row" gap="2" justify="end">
                    {SelfCheck({ userId: player.user_id }) && <ReadySwitch player={player} onChange={onChangeState} />}
                    <DeletePlayerButton playerId={player.id} onDeleted={onDeleted} matchId={matchId} />
                </TransparentCard>
            </TransparentCard>
        </BaseCard>
    );
}

export { PlayerListItem };
