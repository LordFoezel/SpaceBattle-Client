import { MainCard } from '../components/layout/MainCard.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { ErrorHelper } from "../helper/errorHelper.js";

export default function LobbyPage() {

  return (
    <section className="lobby-page">
      <MainCard>
        <PageHeader title={t("page.lobby.title")} info={t("page.lobby.info")} />
      </MainCard>
    </section>
  );
}
