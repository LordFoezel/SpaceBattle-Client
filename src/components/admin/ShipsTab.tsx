import { useEffect, useState } from "react";
import type { Ship, ShipCreate } from "../../models/ship";
import {
  fetchAll,
  deleteOne,
  createOne,
  updateOne,
} from "../../repositories/ships";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { BaseButtonAdd } from "../base/button/BaseButtonAdd";
import { TransparentCard } from "../layout/TransparentCard";
import { ShipItem } from "./ShipItem";

const ShipsTab = function ShipsTab() {
  const [ships, setShips] = useState<Ship[]>([]);

  useEffect(() => {
    loadShips();
  }, []);

  async function loadShips() {
    try {
      const data = await fetchAll({});
      setShips(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteOne(id);
      loadShips();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleAdd() {
    try {
      const newItem: ShipCreate = { name: "New Ship", dimension: 1, icon_tag: "SatelliteImage" };
      await createOne(newItem);
      loadShips();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleUpdate(update: { id: number; [key: string]: any }) {
    const { id, ...payload } = update;
    try {
      await updateOne(id, payload);
      loadShips();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <TransparentCard direction="col" gap="2">
      <BaseButtonAdd onClick={handleAdd} />
      <TransparentCard direction="col" gap="2">
        {ships.map((ship) => (
          <ShipItem
            ship={ship}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            key={ship.id}
          />
        ))}
      </TransparentCard>
    </TransparentCard>
  );
};

export { ShipsTab };
