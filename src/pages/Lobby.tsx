import { MainCard } from '../components/layout/MainCard';
import { PageHeader } from '../components/layout/PageHeader';
import { BaseInputSearch } from '../components/base/input/BaseInputSearch';

export default function LobbyPage() {
 function onChange(e) {
    console.log(e.target.value);
  }

  return (
    <section className="lobby-page">
      <MainCard>
        <PageHeader title={globalThis.t("page.lobby.title")} info={globalThis.t("page.lobby.info")} />
        <BaseInputSearch onChange={onChange} />
      </MainCard>
    </section>
  );
}



