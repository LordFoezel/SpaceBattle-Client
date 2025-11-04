import { useEffect, useState } from "react";
import { BaseText } from "../../../components/base/text/BaseText";
import { BaseButtonDelete } from "../../../components/base/button/BaseButtonDelete";
import type { ConfigFleet } from "../../../models/config_fleet";
import {
  fetchAll as fetchAllFleetConfigs,
  deleteOne as deleteFleetConfig,
} from "../../../repositories/config_fleet";
import { ErrorHelper } from "../../../helper/errorHelper.js";

const FleetConfigsTab = function FleetConfigsTab() {
  const [fleetConfigs, setFleetConfigs] = useState<ConfigFleet[]>([]);

  useEffect(() => {
    loadFleetConfigs();
  }, []);

  async function loadFleetConfigs() {
    try {
      const data = await fetchAllFleetConfigs({});
      setFleetConfigs(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteFleetConfig(id);
      loadFleetConfigs();
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
          <div className="flex items-start justify-between gap-3">
            <BaseText fontWeight="semibold">{config.name}</BaseText>
            {config.id != null && (
              <BaseButtonDelete
                id={config.id}
                onClick={handleDelete}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { FleetConfigsTab };
