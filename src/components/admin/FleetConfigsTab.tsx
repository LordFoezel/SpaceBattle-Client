import { useEffect, useState } from "react";
import type { ConfigFleet } from "../../models/config_fleet";
import {
  fetchAll,
  deleteOne,
  updateOne,
} from "../../repositories/config_fleet";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { FleetConfigItem } from "./FleetConfigItem";
import { TransparentCard } from "../layout/TransparentCard";
import { AddFleetConfigModal } from "./AddFleetConfigModal";

const FleetConfigsTab = function FleetConfigsTab() {
  const [fleetConfigs, setFleetConfigs] = useState<ConfigFleet[]>([]);

  useEffect(() => {
    loadFleetConfigs();
  }, []);

  async function loadFleetConfigs() {
    try {
      const data = await fetchAll({});
      setFleetConfigs(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteOne(id);
      loadFleetConfigs();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleUpdate(update: { id: number;[key: string]: any }) {
    const { id, ...payload } = update;


    try {
      await updateOne(id, payload);
      loadFleetConfigs();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <TransparentCard direction="col" gap="2">
      <AddFleetConfigModal onCreated={loadFleetConfigs} />
      <TransparentCard direction="col" gap="2">
        {fleetConfigs.map((config) => (
          <FleetConfigItem
            configFleet={config}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            key={config.id}
          />
        ))}
      </TransparentCard>
    </TransparentCard>
  );
};

export { FleetConfigsTab };
