import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchById as fetchMatchById } from "../repositories/matches";
import { fetchAll as fetchAllPlayer } from "../repositories/players"
import { ErrorHelper } from "../helper/errorHelper";
import { TransparentCard } from "../components/layout/TransparentCard";
import { LeaveButton } from "../components/button/LeaveButton";
import { PageHeader } from '../components/layout/PageHeader';
import { MainCard } from '../components/layout/MainCard';
import { PlayerList } from "../components/list/PlayerList";
import { MatchConfigModal } from "../components/modal/MatchConfigModal";
import { SelfCheck } from "../helper/SelfCheck";
import { MatchConfigDisplay } from "../components/layout/match/MatchConfigDisplay";
import type { Match } from "../models/match";
import type { Player } from "../models/player";

export default function MatchPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [numericMatchId, setNumericMatchId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);

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
    
    if (SelfCheck({playerId})) navigate("/lobby", { replace: true });
    loadPlayer();
    loadMatch();
  }

  function onChangeState() {
    loadPlayer();
  }

  return (
    <section className="match-page">
      <MainCard>
        <PageHeader title={match?.name} info={match?.description} />
        <TransparentCard direction='col' gap='2'>
          <PlayerList players={players} onDeleted={onDeletedPlayer} onChangeState={onChangeState} />
          <MatchConfigDisplay match={match} />
          <TransparentCard direction='row' gap='2'>
            {SelfCheck({userId: match?.createdBy}) && <MatchConfigModal matchId={numericMatchId} />}
            <LeaveButton matchId={numericMatchId} />
          </ TransparentCard>
        </ TransparentCard>
      </MainCard>
    </section>
  );
}
