import { MainCard } from '../components/layout/MainCard.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { ErrorHelper } from "../helper/errorHelper.js";
import { BaseInputSearch } from '../components/base/input/BaseInputSearch.jsx';

export default function LobbyPage() {
 function onChange(e) {
    console.log(e.target.value);
  }

  return (
    <section className="lobby-page">
      <MainCard>
        <PageHeader title={t("page.lobby.title")} info={t("page.lobby.info")} />
        <BaseInputSearch onChange={onChange} />
      </MainCard>
    </section>
  );
}
