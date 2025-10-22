import type { MouseEventHandler } from "react";
import { Match } from "src/models/match";
import { BaseCard } from "../base/layout/BaseCard";
import { BaseText } from "../base/text/BaseText";
import { TransparentCard } from "./TransparentCard";
import { JoinButton } from "../button/JoinButton";
import { IconLock } from "../icon/IconLock";
import { IconPeople } from "../icon/IconPeople";

interface MatchListItemProps {
    match: Match;
    key: number;
}

const MatchListItem = function MatchListItem(props: MatchListItemProps) {
    const {
        match,
    } = props;

    return (
        <BaseCard direction='col' variant="light" gap='2' padding="2">
            <TransparentCard direction="row" gap="2">
                <TransparentCard width="full" direction="col" justify="start">
                    <BaseText fontSize="lg">{match.name}</BaseText>
                    <BaseText fontSize="xs" color="gray">{match.description}</BaseText>
                </TransparentCard>
                <TransparentCard width="1/5" direction="col" justify="center" gap="0" padding="0" margin="0">
                    <TransparentCard direction="row" justify="end" gap="2">
                        {match.password_hash ? <IconLock /> : <IconPeople />}
                        {match.config?.player_count === match.current_player_count ? <BaseText>{globalThis.t("core.full")}</BaseText> : <BaseText>{match.current_player_count}/{match.config?.player_count || "?"}</BaseText>}
                    </TransparentCard>
                </TransparentCard>
                <TransparentCard width="1/5" direction="col" justify="center" ><JoinButton matchId={match.id} /></TransparentCard>
            </TransparentCard>
        </BaseCard>
    );
}

export { MatchListItem };
