import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchById as fetchMatchById } from "../repositories/matches";
import type { Match } from "../models/match";
import { ErrorHelper } from "../helper/errorHelper";
import { TransparentCard } from "../components/layout/TransparentCard";
import { LeaveButton } from "../components/button/LeaveButton";
import { PageHeader } from '../components/layout/PageHeader';
import { MainCard } from '../components/layout/MainCard';

export default function MatchPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [numericMatchId, setNumericMatchId] = useState<number | null>(null);

  useEffect(() => {
    if (!matchId) {
      navigate("/lobby", { replace: true });
      return;
    }

    const parsedMatchId = Number(matchId);
    if (!Number.isFinite(parsedMatchId) || parsedMatchId <= 0) {
      navigate("/lobby", { replace: true });
      return;
    }

    setNumericMatchId(parsedMatchId);
    let isMounted = true;

    (async () => {
      try {
        const data = await fetchMatchById(parsedMatchId);
        if (!data) {
          globalThis.notify.error(globalThis.t("error.notFound", ["core.match"]));
          navigate("/lobby", { replace: true });
          return;
        }
        if (isMounted) setMatch(data);
      } catch (error) {
        ErrorHelper.handleError(error);
        navigate("/lobby", { replace: true });
      }
    })();
  }, [matchId, navigate]);

  return (
    <section className="match-page">
      <MainCard>
        <PageHeader title={match?.name} info={match?.description} />
        <TransparentCard direction='col' gap='2' justify='center'>
          <LeaveButton matchId={numericMatchId} />
        </ TransparentCard>
      </MainCard>
    </section>
  );
}
