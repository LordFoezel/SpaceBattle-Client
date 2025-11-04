import { useMemo } from "react";
import { MainCard } from "../components/layout/MainCard";
import { PageHeader } from "../components/layout/PageHeader";
import { BaseTab, type BaseTabItem } from "../components/base/tab/BaseTab";
import { UsersTab } from "../components/admin/UsersTab";
import { ShipsTab } from "../components/admin/ShipsTab";
import { FleetConfigsTab } from "../components/admin/FleetConfigsTab";
import { TransparentCard } from "../components/layout/TransparentCard";

export default function DashboardPage() {
  const tabItems = useMemo<BaseTabItem[]>(
    () => [
      {
        key: "users",
        label: globalThis.t?.("admin.tabs.users"),
        content: <UsersTab />,
        roles: ["admin"],
      },
      {
        key: "ships",
        label: globalThis.t?.("admin.tabs.ships"),
        content: <ShipsTab />,
        roles: ["admin"],
      },
      {
        key: "fleet-configs",
        label: globalThis.t?.("admin.tabs.fleetConfigs"),
        content: <FleetConfigsTab />,
        roles: ["admin"],
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
        <TransparentCard direction="col">
          <BaseTab tabs={tabItems} isFitted />
        </TransparentCard>
      </MainCard>
    </section>
  );
}
