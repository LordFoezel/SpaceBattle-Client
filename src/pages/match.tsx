import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchById as fetchMatchById } from "../repositories/matches";
import type { Match } from "../models/match";
import { ErrorHelper } from "../helper/errorHelper";
import { TransparentCard } from "../components/layout/TransparentCard";
import { BaseText } from "../components/base/text/BaseText";

export default function MatchPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!matchId) {
        navigate("/lobby", { replace: true });
        return;
      }

      const numericId = Number(matchId);
      if (!Number.isFinite(numericId) || numericId <= 0) {
        navigate("/lobby", { replace: true });
        return;
      }

      try {
        const data = await fetchMatchById(numericId);
        if (!data) {
          globalThis.notify.error(globalThis.t("error.notFound", ["core.match"]));
          navigate("/lobby", { replace: true });
          return;
        }
        setMatch(data);
      } catch (error) {
        ErrorHelper.handleError(error);
        navigate("/lobby", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [matchId, navigate]);

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
      </TransparentCard>
    </section>
  );
}
