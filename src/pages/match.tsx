import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchById as fetchMatchById } from "../repositories/matches";
import { fetchOne as fetchPlayer } from "../repositories/players";
import type { Match } from "../models/match";
import { ErrorHelper } from "../helper/errorHelper";
import { TransparentCard } from "../components/layout/TransparentCard";
import { BaseText } from "../components/base/text/BaseText";
import { LeaveButton } from "../components/button/LeaveButton";
import { AuthTokenHelper } from "../helper/authToken.js";
import { getApiBaseUrl } from "../config/api";

export default function MatchPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [numericMatchId, setNumericMatchId] = useState<number | null>(null);
  const [playerId, setPlayerId] = useState<number | null>(null);

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
    setLoading(true);

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
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [matchId, navigate]);

  useEffect(() => {
    if (!numericMatchId) return;

    setPlayerId(null);
    let cancelled = false;

    (async () => {
      try {
        const { id: userId } = AuthTokenHelper.getUserIdentity();
        const player = await fetchPlayer({ where: { userId, matchId: numericMatchId } });
        if (!cancelled) setPlayerId(player?.id ?? null);
      } catch (error) {
        ErrorHelper.handleError(error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [numericMatchId]);

  useEffect(() => {
    if (!playerId) return;

    const handleUnload = () => {
      const baseUrl = getApiBaseUrl().replace(/\/$/, "");
      const url = `${baseUrl}/players/${playerId}`;
      const headers: Record<string, string> = { Accept: "application/json" };
      const token = AuthTokenHelper.getStoredToken();
      if (token) headers.Authorization = `Bearer ${token}`;

      fetch(url, {
        method: "DELETE",
        headers,
        keepalive: true,
      }).catch(() => { /* ignore errors during unload */ });
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, [playerId]);

  return (
    <section className="match-page pt-20">
      <TransparentCard direction="col" gap="4" align="center">
        <BaseText fontSize="2xl">
          {loading ? globalThis.t("core.loading") : match?.name ?? globalThis.t("error.notFound", ["core.match"])}
        </BaseText>
        {!loading && match && (
          <BaseText fontSize="md" color="gray">
            {match.description || "-"}
          </BaseText>
        )}
        {numericMatchId && <LeaveButton matchId={numericMatchId} />}
      </TransparentCard>
    </section>
  );
}
