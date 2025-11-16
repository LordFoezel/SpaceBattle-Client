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
import { Field, type FieldItemDefinition } from "../components/game/Field";
import type { FieldClickPayload } from "../components/game/Field.types";
import { AuthTokenHelper } from "../helper/authToken.js";
import { fetchAll as fetchFleet } from "../repositories/fleet";
import { fetchAll as fetchShips } from "../repositories/ships";

function readLocalPlayerId(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem("spacebattle.playerId");
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function GamePage() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localPlayerId, setLocalPlayerId] = useState<number | null>(null);
  const [authUserId, setAuthUserId] = useState<number | null>(null);
  const [fieldItems, setFieldItems] = useState<FieldItemDefinition[]>([]);

  useEffect(() => {
    if (!matchId) {
      navigate("/lobby", { replace: true });
      return;
    }
    (async () => {
      try {
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
        setLocalPlayerId(readLocalPlayerId());
      }
    })();
  }, [matchId, navigate]);

  useEffect(() => {
    setLocalPlayerId(readLocalPlayerId());
  }, [players]);

  useEffect(() => {
    try {
      const { id } = AuthTokenHelper.getUserIdentity();
      setAuthUserId(id);
    } catch {
      setAuthUserId(null);
    }
  }, []);

  const currentPlayer = useMemo(() => {
    if (!players.length) return null;
    const normalizedIndex = ((selectedIndex % players.length) + players.length) % players.length;
    return players[normalizedIndex];
  }, [players, selectedIndex]);

  const disableNavigation = players.length <= 1;
  const isOwnSelection = !!(currentPlayer && localPlayerId != null && currentPlayer.id === localPlayerId);

  function handleNextPlayer() {
    if (!players.length) return;
    setSelectedIndex((prev) => (prev + 1) % players.length);
  }

  function handlePreviousPlayer() {
    if (!players.length) return;
    setSelectedIndex((prev) => (prev - 1 + players.length) % players.length);
  }

  useEffect(() => {
    async function loadShipsForPlayer() {
      if (!currentPlayer || !match) {
        setFieldItems([]);
        return;
      }
      try {
        const [fleets, ships] = await Promise.all([
          fetchFleet({ where: { player_id: currentPlayer.id, match_id: match.id } }),
          fetchShips({}),
        ]);
        const shipMap = new Map<number, { dimension: number; icon_tag: string | null }>();
        ships.forEach((ship) => {
          shipMap.set(ship.id, { dimension: ship.dimension ?? 1, icon_tag: ship.icon_tag ?? null });
        });
        const shouldHide = authUserId != null && currentPlayer.user_id !== authUserId;
        const nextItems = fleets
          .filter((fleet) => Number.isFinite(fleet.position))
          .map<FieldItemDefinition>((fleet) => {
            const info = shipMap.get(fleet.ship_id);
            return {
              id: `fleet-${fleet.id}`,
              type: "ship",
              startPosition: Number(fleet.position) || 0,
              dimension: info?.dimension ?? 1,
              direction: fleet.direction === "vertical" ? "vertical" : "horizontal",
              selectable: false,
              opacity: shouldHide ? 0 : 1,
              iconTag: info?.icon_tag ?? null,
            };
          });
        setFieldItems(nextItems);
      } catch (error) {
        console.error("Failed to load ships", error);
        setFieldItems([]);
      }
    }
    loadShipsForPlayer();
  }, [currentPlayer?.id, currentPlayer?.user_id, match?.id, authUserId]);

  const dimensionX = match?.config?.dimension_x ?? 10;
  const dimensionY = match?.config?.dimension_y ?? 10;

  function handleFieldClick(event: FieldClickPayload) {
    console.log(event);
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
          <PlayerTurnStrip players={players} currentIndex={currentPlayer?.sequence ?? -1} />
          <PlayerSelectionIndicator
            playerName={currentPlayer?.name}
            onPrevious={handlePreviousPlayer}
            onNext={handleNextPlayer}
            isDisabled={disableNavigation}
          />
          <Field
            dimensionX={dimensionX}
            dimensionY={dimensionY}
            interactable={!isOwnSelection}
            items={fieldItems}
            onClick={handleFieldClick}
          />
          <TransparentCard direction="col" gap="3" width="full" padding="4">
            <StopGameButton match={match} players={players} />
          </TransparentCard>
        </TransparentCard>
      </MainCard>
    </section>
  );
}
