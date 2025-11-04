import { useEffect, useState } from "react";
import type { ConfigFleet, ConfigFleetCreate } from "../../models/config_fleet";
import {
  fetchAll,
  deleteOne,
  createOne
} from "../../repositories/config_fleet";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { FleetConfigItem } from "./FleetConfigItem";
import { BaseButtonAdd } from "../base/button/BaseButtonAdd";
import { BaseCard } from "../base/layout/BaseCard";
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
      const newItem: ConfigFleetCreate = { name: "tset" }
      await createOne(newItem);
      loadFleetConfigs();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (

    <TransparentCard direction="col" gap="2">
      <BaseButtonAdd onClick={handleAdd} />
      <TransparentCard direction="col" gap="2">
        {fleetConfigs.map((config) => (
          <FleetConfigItem configFleet={config} handleDelete={handleDelete} />
        ))}
      </TransparentCard>
    </TransparentCard>
  );
};

export { FleetConfigsTab };
