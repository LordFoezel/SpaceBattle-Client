import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton";
import { Match, MatchState } from "../../models/match";
import { Player, PlayerState } from "../../models/player";
import { updateOne as updateMatchById } from "../../repositories/matches";
import { updateOne as updatePlayerById } from "../../repositories/players";
import { ErrorHelper } from "../../helper/errorHelper";

interface StopGameButtonProps {
  match: Match | null;
  players: Player[];
}

function buildPlayerUpdatePromises(players: Player[]) {
  return players.map((player) =>
    updatePlayerById(player.id, { state: PlayerState.PLACE })
  );
}

export function StopGameButton({ match, players }: StopGameButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const isDisabled = !match || isSubmitting;

  async function handleClick() {
    if (!match || isDisabled) return;
    setIsSubmitting(true);
    try {
      await Promise.all([
        updateMatchById(match.id, { state: MatchState.LOBBY }),
        Promise.all(buildPlayerUpdatePromises(players)),
      ]);
      navigate(`/match/${match.id}`, { replace: true });
    } catch (error) {
      ErrorHelper.handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <BaseButton
      name="stop-game"
      colorScheme="red"
      onClick={handleClick}
      isDisabled={isDisabled}
      isLoading={isSubmitting}
    >
      {globalThis.t?.("game.stop") ?? "Stop Game"}
    </BaseButton>
  );
}

