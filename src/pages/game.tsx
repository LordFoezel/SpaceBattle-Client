import { useParams } from "react-router-dom";

import { MainCard } from "../components/layout/MainCard";
import { PageHeader } from "../components/layout/PageHeader";

export default function GamePage() {
  const { matchId } = useParams<{ matchId: string }>();

  return (
    <section className="game-page">
      <MainCard>
        <PageHeader
          title={globalThis.t?.("game.title") ?? "Game"}
          info={(globalThis.t?.("game.subtitle") ?? "Prepare for battle") + (matchId ? ` (#${matchId})` : "")}
        />
        <p>{globalThis.t?.("game.placeholder") ?? "Game layout coming soon."}</p>
      </MainCard>
    </section>
  );
}
