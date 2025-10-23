import { MainCard } from '../components/layout/MainCard';
import { PageHeader } from '../components/layout/PageHeader';
import { TransparentCard } from "../components/layout/TransparentCard";
import { ToLobbyButton } from '../components/button/ToLobbyButton';

export default function UserSettingPage() {


  return (
    <section className="user-setting-page">
      <MainCard height="screen">
        <PageHeader title={globalThis.t("page.userSetting.title")} info={globalThis.t("page.userSetting.info")} />
        <TransparentCard direction='col' gap='2' justify='center'>
          commin soon
          <ToLobbyButton />
        </TransparentCard>
      </MainCard>
    </section>
  );
}
