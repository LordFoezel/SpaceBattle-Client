import type { MouseEventHandler } from "react";
import { Player } from "src/models/player";
import { BaseCard } from "../base/layout/BaseCard";
import { BaseText } from "../base/text/BaseText";
import { TransparentCard } from "../layout/TransparentCard";
import { JoinButton } from "../button/JoinButton";
import { IconLock } from "../icon/IconLock";
import { IconPeople } from "../icon/IconPeople";
import { JoinModal } from "../modal/JoinModal";
import { DeleteMatchButton } from "../button/DeleteMatchButton";

interface ListItemProps {
    player: Player;
    key: number;
    onDeleted?: () => void;
}

const PlayerListItem = function PlayerListItem(props: ListItemProps) {
    const {
        player,
        onDeleted,
    } = props;

    return (
        <BaseCard direction='col' variant="light" gap='2' padding="2">
            <TransparentCard direction="row" gap="2">
                <BaseText>{player.id}</BaseText>
                {/* <TransparentCard width="full" direction="col" justify="start"> */}
                    {/* <BaseText fontSize="lg">{match.name}</BaseText>
                    <BaseText fontSize="xs" color="gray">{match.description}</BaseText>
                </TransparentCard>
                <TransparentCard width="1/5" direction="col" justify="center" gap="0" padding="0" margin="0">
                    <TransparentCard direction="row" justify="end" gap="2">
                        {match.password_hash ? <IconLock /> : <IconPeople />}
                        {match.config?.player_count === match.current_player_count ? <BaseText>{globalThis.t("core.full")}</BaseText> : <BaseText>{match.current_player_count}/{match.config?.player_count || "?"}</BaseText>}
                    </TransparentCard>
                    <DeleteMatchButton matchId={match.id} onDeleted={onDeleted} />
                </TransparentCard>
                <TransparentCard width="1/5" direction="col" justify="center" >
                    {match.password_hash ? <JoinModal matchId={match.id} disabledSave={match.config?.player_count === match.current_player_count} /> : <JoinButton matchId={match.id} isDisabled={match.config?.player_count === match.current_player_count} />}
                </TransparentCard> */}
            </TransparentCard>
        </BaseCard>
    );
}

export { PlayerListItem };
