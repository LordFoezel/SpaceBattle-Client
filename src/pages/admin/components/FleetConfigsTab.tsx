import { useEffect, useState } from "react";
import { BaseText } from "../../../components/base/text/BaseText";
import type { ConfigFleet } from "../../../models/config_fleet";
import { fetchAll as fetchAllFleetConfigs } from "../../../repositories/config_fleet";
import { ErrorHelper } from "../../../helper/errorHelper.js";

const FleetConfigsTab = function FleetConfigsTab() {
  const [fleetConfigs, setFleetConfigs] = useState<ConfigFleet[]>([]);

  useEffect(() => {
    void loadFleetConfigs();
  }, []);

  async function loadFleetConfigs() {
    try {
      const data = await fetchAllFleetConfigs({});
      setFleetConfigs(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {fleetConfigs.map((config, index) => (
        <div
          key={config.id ?? index}
          className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-sm transition-colors hover:bg-slate-800/70"
        >
          <BaseText fontWeight="semibold">{config.name}</BaseText>
          <BaseText fontSize="sm" color="gray-400">
            {/* {`${createdLabel}: ${config.created_at.toLocaleString()}`} */}
          </BaseText>
        </div>
      ))}
    </div>
  );
};

export { FleetConfigsTab };
