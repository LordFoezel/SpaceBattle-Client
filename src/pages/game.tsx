import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainCard } from "../components/layout/MainCard";
import { PageHeader } from "../components/layout/PageHeader";
import { fetchById as fetchMatchById } from "../repositories/matches";
import { fetchAll as fetchAllPlayer } from "../repositories/players";
import { type Match } from "../models/match";
import type { Player } from "../models/player";
import { ErrorHelper } from "../helper/errorHelper";
import { checkMatchState } from "../helper/matchState";
import { PlayerTurnStrip } from "../components/layout/game/PlayerTurnStrip";
import { PlayerSelectionIndicator } from "../components/layout/game/PlayerSelectionIndicator";
import { TransparentCard } from "../components/layout/TransparentCard";
import { StopGameButton } from "../components/button/StopGameButton";
import { Field } from "../components/game/Field";
import { BaseButton } from "../components/base/button/BaseButton";

export default function GamePage() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showShips, setShowShips] = useState(true);
  const [showShots, setShowShots] = useState(true);

  useEffect(() => {
    if (!matchId) {
      navigate("/lobby", { replace: true });
      return;
    }
    (async () => {
      try {
        setIsLoading(true);
        const parsedMatchId = Number(matchId);
        if (!Number.isFinite(parsedMatchId) || parsedMatchId <= 0) {
          navigate("/lobby", { replace: true });
          return;
        }
        const [fetchedMatch, fetchedPlayers] = await Promise.all([
          fetchMatchById(parsedMatchId),
          fetchAllPlayer({ where: { match_id: parsedMatchId } }),
        ]);
        if (!fetchedMatch) {
          globalThis.notify.error(globalThis.t("error.notFound", ["core.match"]));
          navigate("/lobby", { replace: true });
          return;
        }
        const destination = checkMatchState(fetchedMatch);
        if (destination !== `/game/${fetchedMatch.id}`) {
          navigate(destination, { replace: true });
          return;
        }
        setMatch(fetchedMatch);
        setPlayers(fetchedPlayers);
        setSelectedIndex((previous) => {
          if (fetchedPlayers.length === 0) return 0;
          return Math.min(previous, fetchedPlayers.length - 1);
        });
      } catch (error) {
        ErrorHelper.handleError(error);
        navigate("/lobby", { replace: true });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [matchId, navigate]);

  const currentPlayer = useMemo(() => {
    if (!players.length) return null;
    const normalizedIndex = ((selectedIndex % players.length) + players.length) % players.length;
    return players[normalizedIndex];
  }, [players, selectedIndex]);

  const disableNavigation = players.length <= 1;

  function handleNextPlayer() {
    if (!players.length) return;
    setSelectedIndex((prev) => (prev + 1) % players.length);
  }

  function handlePreviousPlayer() {
    if (!players.length) return;
    setSelectedIndex((prev) => (prev - 1 + players.length) % players.length);
  }

  function handleToggleShips() {
    setShowShips((prev) => !prev);
  }

  function handleToggleShots() {
    setShowShots((prev) => !prev);
  }

  function onClick(e: any) {
    console.log(e);

  }


  if (!match) return;
  return (
    <section className="game-page">
      <MainCard>
        <PageHeader
          title={match.name}
          info={match.description}
        />
        <TransparentCard direction='col' gap='2'>
          <PlayerTurnStrip players={players} currentIndex={selectedIndex} />
          <PlayerSelectionIndicator
            playerName={currentPlayer?.name}
            onPrevious={handlePreviousPlayer}
            onNext={handleNextPlayer}
            isDisabled={disableNavigation}
          />
          <TransparentCard direction="row" gap="2" padding="0">
            <BaseButton onClick={handleToggleShips} size="sm">
              {showShips ? "Hide Ships" : "Show Ships"}
            </BaseButton>
            <BaseButton onClick={handleToggleShots} size="sm">
              {showShots ? "Hide Shots" : "Show Shots"}
            </BaseButton>
          </TransparentCard>
          <Field
            playerId={currentPlayer?.id ?? 0}
            matchId={match.id}
            showShips={showShips}
            showShots={showShots}
            onClick={onClick}
          />
          <TransparentCard direction="col" gap="3" width="full" padding="4">
            <StopGameButton match={match} players={players} />
          </TransparentCard>
        </TransparentCard>
      </MainCard>
    </section>
  );
}
