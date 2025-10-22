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

    const maxSize = 4;
    let currentSize = 3;

    return (
        <BaseCard direction='col' variant="light" gap='2' padding="2">
            <TransparentCard direction="row" gap="2">
                <TransparentCard direction="col" justify="center">
                    <BaseText fontSize="lg">{match.name}</BaseText>
                    <BaseText fontSize="xs" color="gray">{match.description}</BaseText>
                </TransparentCard>
                <TransparentCard direction="col" justify="center" gap="0" padding="0" margin="0">
                <TransparentCard direction="row" justify="end" gap="2">
                    {match.password_hash ? <IconLock /> : <IconPeople />}
                    {maxSize === currentSize ? <BaseText>{globalThis.t("core.full")}</BaseText> : <BaseText>{currentSize}/{maxSize}</BaseText>}
                </TransparentCard>
                </TransparentCard>
                <TransparentCard direction="col" justify="center" ><JoinButton matchId={match.id} /></TransparentCard>
            </TransparentCard>
        </BaseCard>
    );
}

export { MatchListItem };
