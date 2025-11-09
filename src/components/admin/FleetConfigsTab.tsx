import { useEffect, useState } from "react";
import type { ConfigFleet, ConfigFleetCreate } from "../../models/config_fleet";
import {
  fetchAll,
  deleteOne,
  createOne,
  updateOne,
} from "../../repositories/config_fleet";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { FleetConfigItem } from "./FleetConfigItem";
import { BaseButtonAdd } from "../base/button/BaseButtonAdd";
import { TransparentCard } from "../layout/TransparentCard";

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

  async function handleAdd() {
     try {
      const newItem: ConfigFleetCreate = { name: "test" }
      await createOne(newItem);
      loadFleetConfigs();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleUpdate(update: { id: number; [key: string]: any }) {
    const { id, ...payload } = update;
    if (!id || Object.keys(payload).length === 0) return;

    setFleetConfigs((prev) =>
      prev.map((existing) =>
        existing.id === id ? { ...existing, ...payload } : existing
      )
    );

    try {
      await updateOne(id, payload);
    } catch (error) {
      ErrorHelper.handleError(error);
    } finally {
      loadFleetConfigs();
    }
  }

  return (
    <TransparentCard direction="col" gap="2">
      <BaseButtonAdd onClick={handleAdd} />
      <TransparentCard direction="col" gap="2">
        {fleetConfigs.map((config) => (
          <FleetConfigItem
            configFleet={config}
            handleDelete={handleDelete}
            // handleUpdate={handleUpdate}
            key={config.id}
          />
        ))}
      </TransparentCard>
    </TransparentCard>
  );
};

export { FleetConfigsTab };
