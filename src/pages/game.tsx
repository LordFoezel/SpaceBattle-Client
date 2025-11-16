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
import { BaseCard } from "../components/base/layout/BaseCard";
import { BaseText } from "../components/base/text/BaseText";

export default function GamePage() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
          <TransparentCard direction="col" gap="3" width="full" padding="4">
            // todo: make a field komponente, die das feld gemäs mathces anzeigt: dimenion x / y
          </TransparentCard>
        </TransparentCard>
      </MainCard>
    </section>
  );
}
