import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchById as fetchMatchById, updateOne as updateMatchById } from "../repositories/matches";
import { fetchAll as fetchAllPlayer, updateOne as updatePlayerById } from "../repositories/players";
import { ErrorHelper } from "../helper/errorHelper";
import { TransparentCard } from "../components/layout/TransparentCard";
import { LeaveButton } from "../components/button/LeaveButton";
import { PageHeader } from '../components/layout/PageHeader';
import { MainCard } from '../components/layout/MainCard';
import { PlayerList } from "../components/list/PlayerList";
import { MatchConfigModal } from "../components/modal/MatchConfigModal";
import { SelfCheck } from "../helper/SelfCheck";
import { MatchConfigDisplay } from "../components/layout/match/MatchConfigDisplay";
import { MatchState, type Match } from "../models/match";
import { PlayerState, type Player } from "../models/player";
import { FleetModal } from "../components/modal/FleetModal";
import { BaseButton } from "../components/base/button/BaseButton";
import { autoplaceFleet, fetchAll as fetchAllFleet } from "../repositories/fleet";
import { checkMatchState } from "../helper/matchState";

interface PlayButtonProps {
  match: Match;
  players: Player[];
}

function PlayButton({ match, players }: PlayButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const isDisabled = isSubmitting || !match?.config;

  async function ensureFleetPlacement(player: Player) {
    if (!match.config) return;
    const fleets = await fetchAllFleet({
      where: { player_id: player.id, match_id: match.id },
      orderBy: "sequence",
    });
    const hasPlacement = fleets.length > 0 && fleets.every((fleet) => typeof fleet.position === "number");
    if (hasPlacement) {
      return;
    }
    await autoplaceFleet({
      player_id: player.id,
      match_id: match.id,
      dimension_x: match.config.dimension_x,
      dimension_y: match.config.dimension_y,
    });
  }

  async function handleClick() {
    if (isDisabled) return;
    if (!match.config) {
      ErrorHelper.handleError(new Error("Match configuration missing"));
      return;
    }
    setIsSubmitting(true);
    try {
      for (const player of players) {
        await ensureFleetPlacement(player);
      }
      await Promise.all([
        updateMatchById(match.id, { state: MatchState.GAME }),
        Promise.all(
          players.map((player, index) =>
            updatePlayerById(player.id, { state: PlayerState.GAME, sequence: index })
          )
        ),
      ]);
      navigate(`/game/${match.id}`);
    } catch (error) {
      ErrorHelper.handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <BaseButton
      name="play"
      onClick={handleClick}
      isDisabled={isDisabled}
      isLoading={isSubmitting}
      colorScheme="green"
    >
      {globalThis.t?.("match.play")}
    </BaseButton>
  );
}

export default function MatchPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [numericMatchId, setNumericMatchId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const currentPlayer = players.find((player) => SelfCheck({ playerId: player.id }));
  const isCurrentPlayerReady = currentPlayer?.state === PlayerState.READY;

  useEffect(() => {
    if (!matchId) {
      navigate("/lobby", { replace: true });
      return;
    }
    loadMatch();
    loadPlayer();
  }, [matchId, navigate]);

  async function loadMatch() {
    try {
      const parsedMatchId = Number(matchId);
      setNumericMatchId(parsedMatchId);
      if (!Number.isFinite(parsedMatchId) || parsedMatchId <= 0) {
        navigate("/lobby", { replace: true });
        return;
      }
      const match = await fetchMatchById(parsedMatchId);
      if (!match) {
        globalThis.notify.error(globalThis.t("error.notFound", ["core.match"]));
        navigate("/lobby", { replace: true });
        return;
      }
      const destinationPath = checkMatchState(match);
      if (destinationPath !== `/match/${match.id}`) {
        navigate(destinationPath, { replace: true });
        return;
      }
      setMatch(match);
    } catch (error) {
      ErrorHelper.handleError(error);
      navigate("/lobby", { replace: true });
    }
  }

  async function loadPlayer() {
    try {
      const players = await fetchAllPlayer({ where: { match_id: matchId } });
      setPlayers(players);
    } catch (error) {
      ErrorHelper.handleError(error);
      navigate("/lobby", { replace: true });
    }
  }

  function onDeletedPlayer(playerId: number) {
    if (SelfCheck({ playerId })) navigate("/lobby", { replace: true });
    loadPlayer();
    loadMatch();
  }

  function onChangeState() {
    loadPlayer();
  }

  function onConfigChange() {
    loadMatch();
  }

  function onLeave() {
    loadPlayer();
  }

  if (match) return (
    <section className="match-page">
      <MainCard>
        <PageHeader title={match.name} info={match.description} />
        <TransparentCard direction='col' gap='2'>
          <PlayerList players={players} onDeleted={onDeletedPlayer} onChangeState={onChangeState} matchId={Number(matchId)} />
          <MatchConfigDisplay match={match} />
          <TransparentCard direction='row' gap='2'>
            {SelfCheck({ userId: match?.created_by }) && (
              <MatchConfigModal
                match={match}
                onChange={onConfigChange}
                isDisabled={isCurrentPlayerReady}
              />
            )}
            <FleetModal match={match} isDisabled={isCurrentPlayerReady} />
            {SelfCheck({ userId: match?.created_by }) && (
              <PlayButton match={match} players={players} />
            )}
            <LeaveButton matchId={numericMatchId} onLeave={onLeave} isDisabled={isCurrentPlayerReady} />
          </ TransparentCard>
        </ TransparentCard>
      </MainCard>
    </section>
  );
  return (
    <section className="match-page">
      <MainCard></MainCard>
    </section>
  );
}
