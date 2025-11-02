import { useMemo } from "react";
import { MainCard } from "../components/layout/MainCard";
import { PageHeader } from "../components/layout/PageHeader";
import { BaseTab } from "../components/base/tab/BaseTab";
import { UsersTab } from "./admin/components/UsersTab";
import { ShipsTab } from "./admin/components/ShipsTab";
import { FleetConfigsTab } from "./admin/components/FleetConfigsTab";

export default function DashboardPage() {
  const tabItems = useMemo(
    () => [
      {
        key: "users",
        label: globalThis.t?.("admin.tabs.users"),
        content: <UsersTab />,
      },
      {
        key: "ships",
        label: globalThis.t?.("admin.tabs.ships"),
        content: <ShipsTab />,
      },
      {
        key: "fleet-configs",
        label: globalThis.t?.("admin.tabs.fleetConfigs"),
        content: <FleetConfigsTab />,
      },
    ],
    []
  );

  return (
    <section className="admin-page">
      <MainCard>
        <PageHeader
          title={globalThis.t("page.admin.title")}
          info={globalThis.t("page.admin.info")}
        />
        <div className="mt-6">
          <BaseTab tabs={tabItems} isFitted />
        </div>
      </MainCard>
    </section>
  );
}
