import { Player } from "src/models/player";
import { BaseCard } from "../base/layout/BaseCard";
import { BaseText } from "../base/text/BaseText";
import { TransparentCard } from "../layout/TransparentCard";
import { DeletePlayerButton } from "../button/DeletePlayerButton";

interface ListItemProps {
    player: Player;
    key: number;
    onDeleted?: (id: number) => void;
}

const PlayerListItem = function PlayerListItem(props: ListItemProps) {
    const {
        player,
        onDeleted,
    } = props;

    return (
        <BaseCard direction='col' variant="light" gap='2' padding="2">
            <TransparentCard direction="row" gap="2">
                <BaseText fontSize="lg">{player.name}</BaseText>
                <TransparentCard direction="row">
                    <BaseText fontSize="sm" color="gray">{globalThis.t("core.id")}: {player.id}</BaseText>
                    <BaseText fontSize="sm" color="gray">{globalThis.t("core.state")}: {player.state}</BaseText>
                    <DeletePlayerButton playerId={player.id} onDeleted={onDeleted} />
                </TransparentCard>
            </TransparentCard>
        </BaseCard>
    );
}

export { PlayerListItem };
