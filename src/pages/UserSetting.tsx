import { MainCard } from '../components/layout/MainCard';
import { PageHeader } from '../components/layout/PageHeader';
import { TransparentCard } from "../components/layout/TransparentCard";
import { ToLobbyButton } from '../components/button/ToLobbyButton';
import { LogoutButton } from '../components/button/LogoutButton';

export default function userSettingPage() {

  return (
    <section className="user-setting-page">
      <MainCard>        
        <TransparentCard direction='col' gap='2'>
        <PageHeader title={globalThis.t("page.userSetting.title")} info={globalThis.t("page.userSetting.info")} />
        <TransparentCard direction='row' gap='2'>
          <LogoutButton />
          <ToLobbyButton />
        </TransparentCard>
      </TransparentCard>
      </MainCard>
    </section>
  );
}
