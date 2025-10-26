import { BaseCard } from "../../../components/base/layout/BaseCard";
import { Match } from "../../../models/match";
import { BaseText } from "../../../components/base/text/BaseText";
import { TransparentCard } from "../TransparentCard";
import { useEffect, useState } from "react";

interface MatchConfigDisplayProps {
    match: Match;
}


const MatchConfigDisplay = function MatchConfigDisplay({ match }: MatchConfigDisplayProps) {
    if (!match?.config) return;

    return (
        <BaseCard direction="col" variant="light" padding="5" gap="2">
            <TransparentCard direction="row" justify="between"><BaseText>{globalThis.t("match.maxPlayers")}</BaseText><BaseText>{match.config?.player_count}/{match.current_player_count}</BaseText></TransparentCard>
            <TransparentCard direction="row" justify="between"><BaseText>{globalThis.t("match.dimension")}</BaseText><BaseText>{match.config?.dimension_x}/{match.config?.dimension_y}</BaseText></TransparentCard>
            <TransparentCard direction="row" justify="between"><BaseText>{globalThis.t("match.turnTimeout")}</BaseText><BaseText>{match.config?.turn_timeout}</BaseText></TransparentCard>
        </BaseCard>
    );
};

export { MatchConfigDisplay };

